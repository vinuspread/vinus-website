import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/readonly'

export const revalidate = 86400
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'
  const supabase = createClient()

  const [{ data: works }, { data: blogs }] = await Promise.all([
    supabase.from('work').select('slug, created_at').eq('is_published', true),
    supabase.from('blog').select('slug, created_at').eq('is_published', true),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/we`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/request`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  const workRoutes: MetadataRoute.Sitemap = (works ?? []).map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: new Date(w.created_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...workRoutes, ...blogRoutes]
}
