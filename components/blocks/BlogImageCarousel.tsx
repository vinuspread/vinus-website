'use client'

import { useState, useEffect, useCallback } from 'react'

interface Props {
  images: string[]
  caption?: string
}

export default function BlogImageCarousel({ images, caption }: Props) {
  const total = images.length
  // Clone last at front, first at back for seamless infinite loop
  const slides = total > 0 ? [images[total - 1], ...images, images[0]] : []

  const [pos, setPos] = useState(1)
  const [skipTransition, setSkipTransition] = useState(false)

  // Re-enable transition one frame after snap so the next slide animates
  useEffect(() => {
    if (!skipTransition) return
    const raf = requestAnimationFrame(() => setSkipTransition(false))
    return () => cancelAnimationFrame(raf)
  }, [skipTransition])

  if (!total) return null

  const goPrev = () => setPos(p => p - 1)
  const goNext = () => setPos(p => p + 1)
  const goTo  = (i: number) => setPos(i + 1)

  // When a clone slides into view, snap to the real slide without animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTransitionEnd = useCallback(() => {
    if (pos <= 0) {
      setSkipTransition(true)
      setPos(total)
    } else if (pos > total) {
      setSkipTransition(true)
      setPos(1)
    }
  }, [pos, total])

  // Real 0-based index for dot highlighting
  const realIndex = pos <= 0 ? total - 1 : pos > total ? 0 : pos - 1

  // Strip is slides.length × parent width; each slide = 1 parent width
  const slidePct = 100 / slides.length

  return (
    <figure>
      <div className="relative select-none">
        {/* Overflow container — arrows overlay this */}
        <div className="overflow-hidden">
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: 'flex',
              width: `${slides.length * 100}%`,
              transform: `translateX(-${slidePct * pos}%)`,
              transition: skipTransition ? 'none' : 'transform 0.35s ease-in-out',
            }}
          >
            {slides.map((src, i) => (
              <div key={i} style={{ width: `${slidePct}%` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="max-w-full h-auto block mx-auto"
                  data-pin-nopin="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white rounded-full text-xl leading-none transition-colors"
              aria-label="이전"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white rounded-full text-xl leading-none transition-colors"
              aria-label="다음"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots — outside overflow-hidden so they're always visible */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === realIndex ? 'bg-mine-shaft' : 'bg-mine-shaft/20'}`}
              aria-label={`${i + 1}번째 이미지`}
            />
          ))}
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 text-xs text-mine-shaft/30 text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
