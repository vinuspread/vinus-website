import { createClient } from '@/lib/supabase/server'
import { StoryListClient } from './StoryListClient'
import type { Blog } from '@/types'

export const revalidate = 3600

export default async function StoryPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return <StoryListClient stories={(data as Blog[]) ?? []} />
}
