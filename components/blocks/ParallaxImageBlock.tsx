'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import type { ImageBlock as ImageBlockType } from '@/types'

export default function ParallaxImageBlock({ block }: { block: ImageBlockType }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: outerRef })

  const height = block.containerHeight ?? 600
  const travel = Math.round(height * 0.25)
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel])

  if (!block.src) return null

  return (
    // 외부: 스크롤을 소비하는 컨테이너 (높이 2배 = 고정 구간 확보)
    <div
      ref={outerRef}
      style={{ height: `${height * 2}px` }}
      className="-mx-6 md:-mx-16 w-[calc(100%+3rem)] md:w-[calc(100%+8rem)]"
    >
      {/* 내부: 뷰포트 상단에 고정 */}
      <div
        style={{ height: `${height}px` }}
        className="sticky top-0 overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-[1.6]">
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
    </div>
  )
}
