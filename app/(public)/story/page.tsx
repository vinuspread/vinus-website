import { createClient } from '@/lib/supabase/server'
import { StoryListClient } from './StoryListClient'
import type { Blog } from '@/types'

export const revalidate = 3600

export default async function StoryPage() {
  const supabase = await createClient()
  const [{ data: stories }, { data: cats }] = await Promise.all([
    supabase.from('blog').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
    supabase.from('categories').select('name').eq('type', 'blog').order('sort_order'),
  ])

  return (
    <StoryListClient
      stories={(stories as Blog[]) ?? []}
      categories={(cats ?? []).map((c: { name: string }) => c.name)}
    />
  )
}
