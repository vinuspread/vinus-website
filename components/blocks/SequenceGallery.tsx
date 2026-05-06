'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Props {
  images: { src: string; alt: string }[]
}

export default function SequenceGallery({ images = [] }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        el.classList.add('is-visible')
        return
      }
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [images])

  return (
    <div className="space-y-0">
      {images.map((img, i) => (
        <div
          key={img.src || i}
          ref={(el) => { refs.current[i] = el }}
          className="sequence-item w-full"
        >
          {img.src && (
            <Image src={img.src} alt={img.alt} width={0} height={0} sizes="100vw" quality={90} className="w-auto max-w-full h-auto block" />
          )}
        </div>
      ))}
    </div>
  )
}
