import { createPublicClient } from '@/lib/supabase/public'
import { getMetaDescription } from '@/lib/utils'
import type { Blog } from '@/types'
import HomeClient from './HomeClient'

type BlogHighlightSource = Pick<Blog, 'slug' | 'title' | 'category' | 'meta_description' | 'thumbnail_url' | 'created_at' | 'blocks'>

export default async function Home() {
  const supabase = createPublicClient()
  const [{ data: all }, { data: blog }] = await Promise.all([
    supabase
      .from('work')
      .select('slug, title, subtitle, thumbnail_url, category')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('blog')
      .select('slug, title, category, meta_description, thumbnail_url, created_at, blocks')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(6),
  ])

  const works = (all ?? [])
    .filter(w => !!w.thumbnail_url)
    .slice(0, 6)

  const stories = ((blog as BlogHighlightSource[] | null) ?? []).map((story) => ({
    slug: story.slug,
    title: story.title,
    category: story.category,
    meta_description: getMetaDescription(story.meta_description, story.blocks),
    thumbnail_url: story.thumbnail_url,
    created_at: story.created_at,
  }))

  return <HomeClient works={works} stories={stories} />
}
