'use client'

import { useEffect, useRef } from 'react'
import type { MotionType } from '@/types'

interface Props {
  motion: MotionType
  children: React.ReactNode
}

export default function BlockMotion({ motion, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (motion === 'none') return
    const el = ref.current
    if (!el) return

    // Already in viewport on mount — defer one rAF so browser paints initial state first
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-visible')))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [motion])

  if (motion === 'none') return <>{children}</>

  return (
    <div ref={ref} className={`block-anim block-${motion}`}>
      {children}
    </div>
  )
}
