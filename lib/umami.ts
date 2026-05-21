const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const USERNAME = process.env.UMAMI_USERNAME
const PASSWORD = process.env.UMAMI_PASSWORD

async function getToken(): Promise<string | null> {
  if (!UMAMI_URL || !USERNAME || !PASSWORD) return null
  try {
    const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json() as { token?: string }
    return data.token ?? null
  } catch {
    return null
  }
}

export interface UmamiStats {
  pageviews: number
  visitors: number
  visits: number
  bounces: number
}

export interface UmamiPage {
  x: string
  y: number
}

export interface UmamiData {
  stats: UmamiStats
  topPages: UmamiPage[]
  topReferrers: UmamiPage[]
}

export async function getUmamiStats(days = 7): Promise<UmamiData | null> {
  if (!UMAMI_URL || !WEBSITE_ID) return null
  const token = await getToken()
  if (!token) return null

  const endAt = Date.now()
  const startAt = endAt - days * 24 * 60 * 60 * 1000
  const qs = `startAt=${startAt}&endAt=${endAt}`
  const headers = { Authorization: `Bearer ${token}` }
  const opts = { headers, next: { revalidate: 300 } }

  try {
    const [statsRes, pagesRes, refRes] = await Promise.all([
      fetch(`${UMAMI_URL}/api/websites/${WEBSITE_ID}/stats?${qs}`, opts),
      fetch(`${UMAMI_URL}/api/websites/${WEBSITE_ID}/metrics?type=url&${qs}&limit=5`, opts),
      fetch(`${UMAMI_URL}/api/websites/${WEBSITE_ID}/metrics?type=referrer&${qs}&limit=5`, opts),
    ])

    if (!statsRes.ok) return null

    const raw = await statsRes.json() as { pageviews?: { value: number }; visitors?: { value: number }; visits?: { value: number }; bounces?: { value: number } }
    const topPages: UmamiPage[] = pagesRes.ok ? await pagesRes.json() as UmamiPage[] : []
    const topReferrers: UmamiPage[] = refRes.ok ? await refRes.json() as UmamiPage[] : []

    return {
      stats: {
        pageviews: raw.pageviews?.value ?? 0,
        visitors: raw.visitors?.value ?? 0,
        visits: raw.visits?.value ?? 0,
        bounces: raw.bounces?.value ?? 0,
      },
      topPages,
      topReferrers,
    }
  } catch {
    return null
  }
}
