'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import type { ParallaxImageBlock as ParallaxImageBlockType } from '@/types'

export default function ParallaxImageBlock({ block }: { block: ParallaxImageBlockType }) {
  if (!block.src) return null

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const height = block.containerHeight ?? 600
  const travel = Math.round(height * 0.18)
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel])

  return (
    <div
      ref={ref}
      style={{ height: `${height}px` }}
      className="-mx-6 md:-mx-16 relative overflow-hidden w-[calc(100%+3rem)] md:w-[calc(100%+8rem)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.4]">
        <Image
          src={block.src}
          alt={block.alt}
          fill
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </div>
  )
}
