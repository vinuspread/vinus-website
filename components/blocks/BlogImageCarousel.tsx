'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  caption?: string
}

export default function BlogImageCarousel({ images, caption }: Props) {
  const [current, setCurrent] = useState(0)
  if (!images.length) return null

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <figure>
      <div className="relative w-full overflow-hidden bg-gallery select-none">
        {/* Slide strip */}
        <div
          className="flex"
          style={{ transform: `translateX(-${current * 100}%)`, transition: 'transform 0.35s ease-in-out' }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full shrink-0">
              <Image
                src={src}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                data-pin-nopin="true"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white rounded-full text-xl leading-none transition-colors"
              aria-label="이전"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white rounded-full text-xl leading-none transition-colors"
              aria-label="다음"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
                  aria-label={`${i + 1}번째 이미지`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-mine-shaft/30 text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
