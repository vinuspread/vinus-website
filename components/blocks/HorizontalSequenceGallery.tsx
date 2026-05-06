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
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [images])

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row gap-0">
      {images.map((img, i) => (
        <div key={img.src || i} className="h-seq-item flex-1">
          {img.src && (
            <Image src={img.src} alt={img.alt} width={0} height={0} sizes="(max-width: 768px) 100vw, 33vw" quality={90} className="w-full h-auto block" />
          )}
        </div>
      ))}
    </div>
  )
}
