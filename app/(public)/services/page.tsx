'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'
import { ServiceRow } from '@/components/sections/ServiceRow'

const serviceCards = [
  {
    title: 'Branding',
    description: '브랜드 아이덴티티는 모든 비즈니스에서 가장 중요한 요소 중 하나입니다. 우리는 신뢰와 감성적 연결을 구축하고 모든 접점에서 지속적인 인식을 만드는 기억에 남는 아이덴티티를 제작합니다.',
    tags: ['Brand Identity', 'Creative Direction', 'Digital Design'],
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=1000&fit=crop&auto=format&q=80',
  },
  {
    title: 'E-Commerce',
    description: 'UX 원칙에 기반한 전략적 방향성으로 고객을 유지하는 경험을 만듭니다. 아름다움과 기능성을 모두 갖춘 솔루션으로 브라우저를 구매자로 전환합니다.',
    tags: ['Strategy', 'UX Design', 'Development'],
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=1000&fit=crop&auto=format&q=80',
  },
  {
    title: 'Websites',
    description: '의미 있는 인터랙션으로 변화를 이끄는 디지털 경험을 디자인하고 개발합니다. 실용성, 직관적인 디자인, 스토리텔링을 결합하여 브랜드와 사용자를 연결합니다.',
    tags: ['UI/UX Design', 'Web Development', 'Motion Design'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop&auto=format&q=80',
  },
]

const services = [
  { title: 'Research', items: ['Customer Research', 'User Testing', 'Competitive Analysis', 'Trends Analysis', 'Brand Audit', 'Analytics Reports'] },
  { title: 'Strategy', items: ['Brand Strategy', 'Digital Strategy', 'Content Strategy', 'Go-to-Market', 'Product Roadmap', 'Information Architecture'] },
  { title: 'Design', items: ['Brand Identity', 'UI/UX Design', 'Motion Design', 'Design System', 'Concept Design', 'Prototyping'] },
  { title: 'Development', items: ['Web Development', 'React / Next.js', 'E-Commerce', 'CMS Integration', 'Performance Optimization', 'Quality Assurance'] },
  { title: 'Content', items: ['Copywriting', 'Photography Direction', 'Video Production', 'Social Content', 'SEO'] },
]

export default function ServicesPage() {
  const heroRef = useReveal()
  const cardsRef = useReveal()
  const accordionRef = useReveal()

  return (
    <div className="min-h-screen bg-gallery">
      {/* 1. Hero */}
      <section ref={heroRef as any} className="anim-wrap pt-[140px] pb-[120px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-8 gap-column items-end">
          <div className="col-span-6">
            <h1 className="text-[82.5px] leading-none tracking-[-2.8px] uppercase">
              <div className="anim-clip overflow-hidden">
                <div className="anim-move-up" data-delay="0">아이디어를</div>
              </div>
              <div className="anim-clip overflow-hidden">
                <div className="anim-move-up" data-delay="100">디지털 경험으로</div>
              </div>
            </h1>
          </div>
          <div className="col-span-2 pb-2 flex flex-col gap-2">
            <div className="anim-clip overflow-hidden">
              <p className="anim-move-up text-[15px] font-light text-mine-shaft/60" data-delay="200">창의적으로 이끌고</p>
            </div>
            <div className="anim-clip overflow-hidden">
              <p className="anim-move-up text-[15px] font-light text-mine-shaft/60" data-delay="300">솔루션으로 완성합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Cards */}
      <section ref={cardsRef as any} className="anim-wrap">
        {serviceCards.map((card, i) => (
          <div key={card.title} className="border-b border-alto">
            <div className="w-full aspect-[16/7] relative anim-clip overflow-hidden">
              <div className="anim-move-up-img w-full h-full" data-delay={i * 100}>
                <Image src={card.img} alt={card.title} fill className="object-cover" />
              </div>
            </div>
            <div className="px-page-padding py-[60px] grid grid-cols-8 gap-column">
              <div className="col-span-2">
                <div className="anim-clip overflow-hidden">
                  <h2 className="anim-move-up text-[46.8px] leading-none tracking-[-1.5px] uppercase" data-delay="0">
                    {card.title}
                  </h2>
                </div>
              </div>
              <div className="col-span-4 col-start-4">
                <div className="anim-clip overflow-hidden mb-6">
                  <p className="anim-move-up text-[17px] font-light leading-[1.6] tracking-[-0.3px]" data-delay="100">
                    {card.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="btn-front text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Services Accordion */}
      <section ref={accordionRef as any} className="anim-wrap px-page-padding border-b border-alto">
        <div className="py-[60px] flex items-center justify-between border-b border-alto">
          <div className="anim-clip overflow-hidden">
            <h2 className="anim-move-up text-[46.8px] leading-none tracking-[-1.5px] uppercase">
              Services Unpacked
            </h2>
          </div>
        </div>
        <div className="pb-[80px]">
          {services.map((service, i) => (
            <ServiceRow key={service.title} index={i} service={service} />
          ))}
          <div className="border-t border-alto" />
        </div>
      </section>

      {/* 4. CTA */}
      <section className="px-page-padding py-[160px]">
        <p className="text-[46.8px] leading-none tracking-[-1.5px] uppercase">
          <div className="anim-clip overflow-hidden">
            <div className="anim-move-up">함께 만들어 갈 준비가</div>
          </div>
          <div className="anim-clip overflow-hidden">
            <div className="anim-move-up" data-delay="100">되셨나요?</div>
          </div>
        </p>
      </section>
    </div>
  )
}
