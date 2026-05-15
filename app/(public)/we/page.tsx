'use client'

import Image from 'next/image'
import { ServiceRow } from '@/components/sections/ServiceRow'
import { useReveal } from '@/hooks/useReveal'

const services = [
  { title: 'Research', items: ['Customer Research', 'User Testing', 'Competitive Analysis', 'Trends Analysis', 'Brand Audit'] },
  { title: 'Strategy', items: ['Brand Strategy', 'Digital Strategy', 'Content Strategy', 'Go-to-Market', 'Product Roadmap'] },
  { title: 'Design', items: ['Brand Identity', 'UI/UX Design', 'Motion Design', 'Design System', 'Concept Design'] },
  { title: 'Development', items: ['Web Development', 'React / Next.js', 'E-Commerce', 'CMS Integration', 'Performance Optimization'] },
  { title: 'Content', items: ['Copywriting', 'Photography Direction', 'Video Production', 'Social Content', 'SEO'] },
]

export default function WePage() {
  const heroRef = useReveal()
  const servicesRef = useReveal()
  const statsRef = useReveal()
  const collabRef = useReveal()

  return (
    <main className="bg-gallery">
      {/* 1. Hero */}
      <section ref={heroRef as any} className="anim-wrap pt-[140px] pb-[80px] px-page-padding">
        <div className="mb-[80px]">
          <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase">
            <div className="anim-clip overflow-hidden">
              <div className="anim-move-up" data-delay="0">Designed to engage</div>
            </div>
            <div className="anim-clip overflow-hidden">
              <div className="anim-move-up" data-delay="100">Built to connect</div>
            </div>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-5">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 anim-clip block">
                  <span className="anim-move-up" data-delay="500">Location</span>
                </p>
                <div className="flex flex-col anim-clip block">
                  <p className="text-[15px] leading-snug anim-move-up" data-delay="600">Seoul — Korea</p>
                  <p className="text-[15px] leading-snug anim-move-up" data-delay="650">Working Worldwide</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px] anim-clip block">
                  <span className="anim-move-up" data-delay="400">
                    바이너스프레드는 치밀한 리서치와 전략을 바탕으로 브랜드의 정체성을 강화하고,
                    사용자에게 깊은 인상을 남기는 최상의 디지털 결과물을 만들어냅니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="aspect-[4/5] relative overflow-hidden anim-clip">
              <div className="anim-move-up-img w-full h-full relative" data-delay="200">
                <Image src="/images/img_we1.png" alt="바이너스프레드" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <section ref={servicesRef as any} className="anim-wrap px-page-padding border-t border-alto">
        <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 py-[40px] anim-clip block">
          <span className="anim-move-up">Services</span>
        </p>
        <div className="pb-[80px]">
          {services.map((service, i) => (
            <ServiceRow key={service.title} index={i} service={service} />
          ))}
          <div className="border-t border-alto" />
        </div>
      </section>

      {/* 3. Stats */}
      <section ref={statsRef as any} className="anim-wrap px-page-padding py-[120px] border-t border-alto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-alto">
        {[
          { number: '10+', label: 'Years' },
          { number: '200+', label: 'Projects Delivered' },
          { number: '01', label: 'Seoul Office' },
        ].map(({ number, label }, i) => (
          <div key={label} className="px-0 md:px-[60px] py-8 md:py-0 first:pl-0 last:pr-0">
            <p className="text-[82.5px] leading-none tracking-[-3px] mb-4 anim-clip block">
              <span className="anim-move-up" data-delay={i * 100}>{number}</span>
            </p>
            <p className="text-[15px] font-light text-mine-shaft/60 uppercase tracking-wider anim-clip block">
              <span className="anim-move-up" data-delay={i * 100 + 50}>{label}</span>
            </p>
          </div>
        ))}
      </section>

      {/* 4. Client logos */}
      <section className="px-page-padding py-[80px] border-t border-alto">
        <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 mb-[60px]">Clients</p>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-8">
          {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
            <div key={n} className="relative h-12">
              <Image src={`/images/we_logo${n}.png`} alt={`Client ${n}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Collab */}
      <section ref={collabRef as any} className="anim-wrap px-page-padding py-[160px] border-t border-alto">
        <p className="text-[46.8px] leading-none tracking-[-1.5px] uppercase max-w-[700px]">
          <span className="anim-clip block">
            <span className="anim-move-up">함께 일하고 싶으신가요?</span>
          </span>
          <span className="anim-clip block">
            <span className="anim-move-up" data-delay="100">바이너스프레드와 함께</span>
          </span>
          <span className="anim-clip block">
            <span className="anim-move-up" data-delay="200">브랜드를 만들어 보세요.</span>
          </span>
        </p>
      </section>
    </main>
  )
}
