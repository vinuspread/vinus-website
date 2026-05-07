import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WorkGrid from '@/components/work/WorkGrid'
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
    <main className="bg-gallery">
      {/* 페이지 헤더 */}
      <section className="pt-[140px] pb-[80px] px-[40px] border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-[38px]">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase">
              WORK
            </h1>
          </div>
          <div className="md:col-span-5 md:col-start-4">
            <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px]">
              우리는 치밀한 리서치와 전략을 바탕으로 브랜드의 정체성을 강화하고,
              사용자에게 깊은 인상을 남기는 최상의 디지털 결과물을 만들어냅니다.
            </p>
          </div>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <WorkGrid works={(works as Work[]) ?? []} />
    </main>
  )
}
