import { createPublicClient } from '@/lib/supabase/public'
import HomeClient from './HomeClient'

export default async function Home() {
  const supabase = createPublicClient()
  const { data: works } = await supabase
    .from('work')
    .select('slug, title, subtitle, thumbnail_url, category')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(8)

  return <HomeClient works={works ?? []} />
}
