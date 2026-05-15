import { createClient } from '@/lib/supabase/server'
import { HeroSectionV2 } from '@/components/sections/HeroSectionV2'
import { AboutSection } from '@/components/sections/AboutSection'
import { ClientsBrandsSection } from '@/components/sections/ClientsBrandsSection'
import { ImageSliderSection } from '@/components/sections/ImageSliderSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { WorkGrid } from '@/components/sections/WorkGrid'
import { ArrowLink } from '@/components/common/ArrowLink'
import { Marquee } from '@/components/common/Marquee'
import type { Work } from '@/types'

export default async function Home() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(8)

  return (
    <div className="relative">
      <div style={{ height: "100vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <HeroSectionV2 />
        </div>
      </div>

      <div id="content-container" className="relative z-20">
        <div className="mb-[40px] overflow-hidden">
          <Marquee
            text="SELECTED PROJECTS • DIGITAL EXPERIENCE • INNOVATIVE DESIGN • PRODUCT MANAGEMENT • BRAND IDENTITY • "
            speed={150}
            className="font-inter font-light text-[clamp(40px,6vw,120px)] tracking-tighter text-mine-shaft uppercase"
          />
        </div>

        <section className="pt-0 pb-0">
          <WorkGrid works={(works as Work[]) ?? []} />
          <div className="px-page-padding mt-16 anim-clip">
            <ArrowLink href="/work" className="anim-move-up">View All Work</ArrowLink>
          </div>
        </section>

        <AboutSection />

        <section className="bg-white py-[100px]">
          <ClientsBrandsSection />
        </section>

        <section className="bg-white py-[100px]">
          <AwardsSection />
        </section>

        <ImageSliderSection />
      </div>
    </div>
  )
}
