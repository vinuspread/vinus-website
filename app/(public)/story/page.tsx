import { createClient } from '@/lib/supabase/server'
import { getCategories } from '@/app/admin/categories/actions'
import { StoryListClient } from './StoryListClient'
import type { Blog } from '@/types'

export const revalidate = 3600

export default async function StoryPage() {
  const supabase = await createClient()
  const [{ data }, cats] = await Promise.all([
    supabase.from('blog').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
    getCategories('blog'),
  ])

  return (
    <StoryListClient
      stories={(data as Blog[]) ?? []}
      categories={cats.map(c => c.name)}
    />
  )
}
