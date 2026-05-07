import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Work',
  description: '바이너스프레드의 포트폴리오 — 웹사이트, 앱, 캐릭터 디자인 프로젝트',
}

export default async function WorkPage() {
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
