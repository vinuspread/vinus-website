'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { DoubleButton } from '@/components/common/DoubleButton'
import { useReveal } from '@/hooks/useReveal'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const clients = [
  { name: 'Client A', logo: '/images/we_logo1.png', text: '치밀한 리서치와 전략을 바탕으로 브랜드의 정체성을 강화하고 사용자에게 깊은 인상을 남기는 최상의 디지털 결과물을 만들었습니다.' },
  { name: 'Client B', logo: '/images/we_logo2.png', text: '브랜드와 고객을 연결하는 최상의 디지털 경험을 제공하기 위해 전략과 디자인을 유기적으로 결합했습니다.' },
  { name: 'Client C', logo: '/images/we_logo3.png', text: '깊이 있는 리서치를 기반으로 고객의 비즈니스 목표에 맞는 최적의 디지털 솔루션을 제시했습니다.' },
]

const brands = [
  { name: 'Brand 1', services: 'Research — Strategy' },
  { name: 'Brand 2', services: 'Design — Development' },
  { name: 'Brand 3', services: 'Research — Strategy — Design — Development' },
  { name: 'Brand 4', services: 'Strategy — Design' },
  { name: 'Brand 5', services: 'Design — Development' },
  { name: 'Brand 6', services: 'Research — Design' },
]

export function ClientsBrandsSection() {
  const revealRef = useReveal()
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      Draggable.create(sliderRef.current, {
        type: 'x',
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.65,
      })
    }
  }, [])

  return (
    <section ref={revealRef as any} className="anim-wrap py-[80px] px-page-padding bg-gallery">
      <div className="mb-[160px]">
        <h2 className="text-[82.5px] leading-none tracking-[-2.8px] mb-[80px] uppercase">
          <span className="anim-clip">
            <span className="anim-move-up">FEATURED CLIENTS</span>
          </span>
        </h2>
        <div ref={containerRef} className="overflow-hidden">
          <div ref={sliderRef} className="flex gap-[48px] cursor-grab active:cursor-grabbing" data-cursor="DRAG">
            {clients.map((client, idx) => (
              <div key={client.name} className="min-w-[421px] flex flex-col gap-8">
                <div className="h-[62px] flex items-center anim-clip">
                  <div className="relative h-10 w-40 anim-move-up" data-delay={idx * 100}>
                    <Image src={client.logo} alt={client.name} fill className="object-contain object-left" />
                  </div>
                </div>
                <p className="text-[17.3px] font-light leading-[1.3] h-[100px]">
                  <span className="anim-clip block">
                    <span className="anim-move-up" data-delay={idx * 100 + 100}>{client.text}</span>
                  </span>
                </p>
                <div className="anim-clip">
                  <div className="anim-move-up" data-delay={idx * 100 + 200}>
                    <DoubleButton labelFront="VIEW CASE STUDY" href="/work" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[46.8px] leading-none mb-[40px] uppercase">
          <span className="anim-clip">
            <span className="anim-move-up">BRANDS WE&apos;VE WORKED WITH</span>
          </span>
        </h2>
        <div className="border-t border-alto">
          {brands.map((brand, idx) => (
            <div key={brand.name} className="grid grid-cols-8 items-center h-[73px] border-b border-alto group hover:bg-white/30 transition-colors">
              <div className="col-span-4 text-[17px]">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 50}>{brand.name}</span>
                </span>
              </div>
              <div className="col-span-3 text-[15px] font-light">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 50 + 20}>{brand.services}</span>
                </span>
              </div>
              <div className="col-span-1 text-right text-[14px]">MORE +</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
