import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'
import { FadeUp, LetterReveal } from '@/components/ui/MotionWrapper'

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
    <main className="pt-32 md:pt-48 pb-24 min-h-screen bg-black text-white text-center">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <header className="mb-16 md:mb-32 flex flex-col items-center gap-12">
          <div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-syne font-bold tracking-tighter leading-none uppercase text-white">
              <LetterReveal text="Selected Works." delay={0.2} className="justify-center" />
            </h1>
          </div>
          <FadeUp delay={0.8} className="max-w-xl">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              우리의 크리에이티브가 담긴 핵심 프로젝트들을 소개합니다. 디자인과 기술의 완벽한 밸런스를 경험해보세요.
            </p>
          </FadeUp>
        </header>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
          {((works as Work[]) ?? []).map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}


