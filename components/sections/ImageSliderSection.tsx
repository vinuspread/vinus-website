'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const slides = [
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 1' },
  { src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 2' },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 3' },
  { src: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 4' },
  { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 5' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=461&fit=crop&auto=format&q=80', alt: 'Project 6' },
]

export function ImageSliderSection() {
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
    <section ref={revealRef as any} className="anim-wrap h-[538px] py-[40px] bg-gallery overflow-hidden">
      <div ref={containerRef} className="px-page-padding h-[461px]">
        <div
          ref={sliderRef}
          className="flex gap-4 cursor-grab active:cursor-grabbing h-full"
          data-cursor="DRAG"
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-[600px] h-full relative group overflow-hidden">
              <div className="anim-clip w-full h-full">
                <div className="anim-move-up-img w-full h-full" data-delay={i * 100}>
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
