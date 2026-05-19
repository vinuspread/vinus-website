'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ImageBlock as ImageBlockType } from '@/types'
import ParallaxImageBlock from './ParallaxImageBlock'
import { ease, GRAY_BLUR } from '@/lib/constants'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  if (!block.src) return null
  if (block.displayMode === 'parallax') return <ParallaxImageBlock block={block} />

  const align = block.align ?? 'full'

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden${align === 'full' ? ' -mx-6 md:-mx-16' : ''}`}
    >
      {/* 회색 배경: 하단에서 위로 성장, 유지됨 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#ebebeb', originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
      {/* 이미지: clipPath로 하단부터 드러남, 위에 유지 */}
      <motion.div
        className={`relative z-10${align === 'full' ? ' w-full' : ' flex justify-center'}`}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.0, delay: 0.3, ease }}
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
