import { NextResponse } from 'next/server'

function isSafeUrl(rawUrl: string): boolean {
  let parsed: URL
  try { parsed = new URL(rawUrl) } catch { return false }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
  const hostname = parsed.hostname
  // Block private IP ranges and localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return false
  if (/^10\./.test(hostname)) return false
  if (/^192\.168\./.test(hostname)) return false
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return false
  if (/^169\.254\./.test(hostname)) return false
  return true
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })
  if (!isSafeUrl(url)) return NextResponse.json({ error: 'invalid url' }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return NextResponse.json({ error: 'fetch failed' }, { status: 502 })

    const contentLength = res.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 2_000_000) {
      return NextResponse.json({ error: 'response too large' }, { status: 502 })
    }

    const html = await res.text()

    function getMeta(prop: string): string {
      const patterns = [
        new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${prop}["']`, 'i'),
        new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      ]
      for (const re of patterns) {
        const m = html.match(re)
        if (m?.[1]) return m[1].trim()
      }
      return ''
    }

    const ogTitle =
      getMeta('title') ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      ''

    let ogSiteName = getMeta('site_name')
    if (!ogSiteName) {
      try { ogSiteName = new URL(url).hostname.replace(/^www\./, '') } catch { ogSiteName = '' }
    }

    const rawImage = getMeta('image')
    let ogImage = ''
    if (rawImage) {
      try {
        ogImage = new URL(rawImage, url).href
      } catch {
        ogImage = rawImage
      }
    }

    return NextResponse.json({
      ogTitle,
      ogDescription: getMeta('description'),
      ogImage,
      ogSiteName,
    })
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 })
  }
}
