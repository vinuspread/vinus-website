import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'
import { FadeUp, TextReveal, LetterReveal } from '@/components/ui/MotionWrapper'

export const revalidate = 3600

export default async function HomePage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center overflow-hidden bg-black text-white px-6 md:px-12">
        {/* Background Animation (Premium Deep Blur) */}
        <div className="absolute inset-0 z-0 mix-blend-screen pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(255,59,92,0.15)_0%,transparent_70%)] rounded-full animate-[spin_20s_linear_infinite] transform-gpu will-change-transform" />
          <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(75,75,255,0.15)_0%,transparent_70%)] rounded-full animate-[spin_25s_linear_infinite_reverse] transform-gpu will-change-transform" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] rounded-full animate-pulse transform-gpu will-change-transform" style={{ animationDuration: '8s' }} />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto w-full text-center flex flex-col items-center">
          <FadeUp delay={0.2} className="mb-6">
            <span className="text-sm uppercase tracking-[0.4em] text-gray-400 font-syne">Vinuspread Design Studio</span>
          </FadeUp>
          
          <h1 className="text-6xl md:text-8xl lg:text-[13rem] font-syne font-bold tracking-tighter leading-[0.9] mix-blend-difference uppercase mb-12 text-white">
            <LetterReveal text="Digital Experience." delay={0.3} className="justify-center" />
          </h1>

          <FadeUp delay={1.2} className="max-w-2xl mx-auto">
            <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide leading-relaxed">
              본질적 가치에 집중하고 경계를 허무는 압도적인 디자인을 창조합니다.
            </p>
          </FadeUp>
        </div>
        
        {/* Scroll Indicator */}
        <FadeUp delay={2} className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 rotate-[-90deg] origin-left">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
        </FadeUp>
      </section>

      {/* Portfolio Grid */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 relative z-10 bg-white"
        aria-label="포트폴리오"
      >
        {((works as Work[]) ?? []).map((work, index) => (
          <WorkCard key={work.id} work={work} index={index} />
        ))}
      </section>
    </main>
  )
}


