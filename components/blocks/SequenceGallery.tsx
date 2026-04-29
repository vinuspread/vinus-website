'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Props {
  images: { src: string; alt: string }[]
}

export default function SequenceGallery({ images }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((el) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -35% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [images])

  return (
    <div className="space-y-12">
      {images.map((img, i) => (
        <div
          key={img.src || i}
          ref={(el) => { refs.current[i] = el }}
          className="sequence-item relative w-full aspect-video overflow-hidden"
        >
          {img.src && (
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="100vw" />
          )}
        </div>
      ))}
    </div>
  )
}
