'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Props {
  images: { src: string; alt: string }[]
}

export default function HorizontalSequenceGallery({ images = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.h-seq-item').forEach((item, i) => {
            setTimeout(() => item.classList.add('is-visible'), i * 180)
          })
          obs.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -35% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [images])

  return (
    <div ref={containerRef} className="flex gap-3">
      {images.map((img, i) => (
        <div key={img.src || i} className="h-seq-item flex-1">
          {img.src && (
            <Image src={img.src} alt={img.alt} width={0} height={0} sizes="33vw" className="w-auto max-w-full h-auto block" />
          )}
        </div>
      ))}
    </div>
  )
}
