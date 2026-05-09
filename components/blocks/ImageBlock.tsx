'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ImageBlock as ImageBlockType } from '@/types'

const ease = [0.65, 0, 0.35, 1] as [number, number, number, number]
const GRAY_BLUR = 'data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  if (!block.src) return null

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const align = block.align ?? 'full'

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden${align === 'full' ? ' -mx-6 md:-mx-16' : ''}`}
    >
      {/* 회색 커버: 위로 슬라이드 아웃 */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: '#d6d6d6' }}
        initial={{ y: 0 }}
        animate={inView ? { y: '-101%' } : { y: 0 }}
        transition={{ duration: 0.85, ease }}
      />
      {/* 이미지: 아래서 올라오며 scale */}
      <motion.div
        className={align === 'full' ? 'w-full' : 'flex justify-center'}
        initial={{ y: '5%', scale: 1.03 }}
        animate={inView ? { y: 0, scale: 1 } : { y: '5%', scale: 1.03 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
      >
        <Image
          src={block.src}
          alt={block.alt}
          width={0}
          height={0}
          sizes={align === 'full' ? '100vw' : '(max-width: 768px) 100vw, 80vw'}
          quality={90}
          placeholder="blur"
          blurDataURL={GRAY_BLUR}
          className={align === 'full' ? 'w-full h-auto block' : 'w-auto max-w-full h-auto block'}
        />
      </motion.div>
    </div>
  )
}
