import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 86400
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'
  const supabase = await createClient()

  const { data: works } = await supabase
    .from('work')
    .select('slug, created_at')
    .eq('is_published', true)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/work`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/services`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/lab`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/story`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ]

  const workRoutes: MetadataRoute.Sitemap = (works ?? []).map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: new Date(w.created_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...workRoutes]
}
