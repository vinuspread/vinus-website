import { createPublicClient } from '@/lib/supabase/public'
import HomeClient from './HomeClient'

export default async function Home() {
  const supabase = createPublicClient()
  const { data: all } = await supabase
    .from('work')
    .select('slug, title, subtitle, thumbnail_url, category')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  const works = (all ?? [])
    .filter(w => !!w.thumbnail_url)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)

  return <HomeClient works={works} />
}
