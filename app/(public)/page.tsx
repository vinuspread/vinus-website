import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'

export const revalidate = 3600

export default async function HomePage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
      aria-label="포트폴리오"
    >
      {((works as Work[]) ?? []).map(work => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  )
}
