'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ScrollStoryBlock as ScrollStoryBlockType } from '@/types'

const HALF = 0.07  // transition window half-width (in scroll-progress units)

function TextPanel({ slide }: { slide: { title?: string; body?: string } }) {
  return (
    <div>
      {slide.title && (
        <h2 className="text-[clamp(24px,4vw,52px)] font-bold leading-tight tracking-tight break-keep mb-6">
          {slide.title}
        </h2>
      )}
      {slide.body && (
        <p className="text-[clamp(14px,1.2vw,18px)] text-mine-shaft/60 leading-relaxed break-keep whitespace-pre-wrap">
          {slide.body}
        </p>
      )}
    </div>
  )
}

export default function ScrollStoryBlock({ block }: { block: ScrollStoryBlockType }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const n = block.slides.length

  // Transition mid-points: t1 between slide 0→1, t2 between slide 1→2
  const t1 = n >= 2 ? 1 / n : 2   // push beyond 1 if unused
  const t2 = n >= 3 ? 2 / n : 2

  // ── Image Y transforms ─────────────────────────────────────
  // Slide 0: starts visible, exits upward at t1
  const img0Y = useTransform(
    scrollYProgress,
    [t1 - HALF, t1 + HALF],
    ['0%', '-110%']
  )
  // Slide 1: enters from below at t1, exits upward at t2
  const img1Y = useTransform(
    scrollYProgress,
    [t1 - HALF, t1 + HALF, t2 - HALF, t2 + HALF],
    ['110%', '0%', '0%', '-110%']
  )
  // Slide 2: enters from below at t2, stays
  const img2Y = useTransform(
    scrollYProgress,
    [t2 - HALF, t2 + HALF],
    ['110%', '0%']
  )

  // ── Text opacity ───────────────────────────────────────────
  // Text fades out just before image transition, next fades in just after
  const text0Opacity = useTransform(
    scrollYProgress,
    [t1 - HALF * 2, t1 - HALF * 0.5],
    [1, 0]
  )
  const text1Opacity = useTransform(
    scrollYProgress,
    [t1 + HALF * 0.5, t1 + HALF * 2, t2 - HALF * 2, t2 - HALF * 0.5],
    [0, 1, 1, 0]
  )
  const text2Opacity = useTransform(
    scrollYProgress,
    [t2 + HALF * 0.5, t2 + HALF * 2],
    [0, 1]
  )

  const slides = block.slides
  const imageLeft = block.layout === 'A'

  const imagePanel = (
    <div className="relative w-1/2 h-full overflow-hidden bg-gallery">
      {slides[0] && (
        <motion.div
          className="absolute inset-0"
          style={{ y: n >= 2 ? img0Y : undefined }}
        >
          <Image
            src={slides[0].image}
            alt={slides[0].title ?? ''}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
      )}
      {slides[1] && (
        <motion.div className="absolute inset-0" style={{ y: img1Y }}>
          <Image
            src={slides[1].image}
            alt={slides[1].title ?? ''}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
      )}
      {slides[2] && (
        <motion.div className="absolute inset-0" style={{ y: img2Y }}>
          <Image
            src={slides[2].image}
            alt={slides[2].title ?? ''}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
      )}
    </div>
  )

  const textPanel = (
    <div className="relative w-1/2 h-full overflow-hidden">
      {slides[0] && (
        <motion.div
          className="absolute inset-0 flex items-center px-[clamp(32px,6vw,96px)]"
          style={{ opacity: n >= 2 ? text0Opacity : 1 }}
        >
          <TextPanel slide={slides[0]} />
        </motion.div>
      )}
      {slides[1] && (
        <motion.div
          className="absolute inset-0 flex items-center px-[clamp(32px,6vw,96px)]"
          style={{ opacity: text1Opacity }}
        >
          <TextPanel slide={slides[1]} />
        </motion.div>
      )}
      {slides[2] && (
        <motion.div
          className="absolute inset-0 flex items-center px-[clamp(32px,6vw,96px)]"
          style={{ opacity: text2Opacity }}
        >
          <TextPanel slide={slides[2]} />
        </motion.div>
      )}
    </div>
  )

  return (
    <div
      ref={containerRef}
      style={{ height: `${n * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {imageLeft ? (
          <>{imagePanel}{textPanel}</>
        ) : (
          <>{textPanel}{imagePanel}</>
        )}
      </div>
    </div>
  )
}
