'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export default function TextReveal({ children, as: Tag = 'p', className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return

    const lines = el.querySelectorAll('.line-inner')

    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {children.split('\n').map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <Tag className="line-inner block">{line}</Tag>
        </div>
      ))}
    </div>
  )
}
