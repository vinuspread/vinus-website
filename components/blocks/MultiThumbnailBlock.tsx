'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { MultiThumbnailBlock as MultiThumbnailBlockType } from '@/types'

import { ease, GRAY_BLUR } from '@/lib/constants'

function ThumbnailItem({ img, colDelay }: { img: { src: string; alt: string }; colDelay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <div ref={ref} className="relative aspect-square">
      {/* 회색 배경: 하단에서 위로 성장 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#ebebeb', originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.7, delay: colDelay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
      {/* 이미지: clipPath로 하단부터 드러남 */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 0.8, delay: colDelay + 0.2, ease }}
      >
        {img.src && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            placeholder="blur"
            blurDataURL={GRAY_BLUR}
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        )}
      </motion.div>
    </div>
  )
}

export default function MultiThumbnailBlock({ block }: { block: MultiThumbnailBlockType }) {
  const cols = block.columns ?? 5
  const gridClass: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }

  return (
    <div className={`grid ${gridClass[cols] ?? 'grid-cols-5'} gap-2`}>
      {block.images.map((img, i) => (
        <ThumbnailItem
          key={img.src || i}
          img={img}
          colDelay={(i % cols) * 0.08}
        />
      ))}
    </div>
  )
}
