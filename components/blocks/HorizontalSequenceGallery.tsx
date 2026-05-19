'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

import { ease, GRAY_BLUR } from '@/lib/constants'

function HSeqItem({ img, delay }: { img: { src: string; alt: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <div ref={ref} className="flex-1 relative">
      {/* 회색 배경: 하단에서 위로 성장, 유지됨 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#ebebeb', originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
      {/* 이미지: clipPath로 하단부터 드러남, 위에 유지 */}
      <motion.div
        className="relative z-10"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.0, delay: delay + 0.3, ease }}
      >
        {img.src && (
          <Image
            src={img.src}
            alt={img.alt}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={90}
            placeholder="blur"
            blurDataURL={GRAY_BLUR}
            className="w-full h-auto block"
          />
        )}
      </motion.div>
    </div>
  )
}

export default function HorizontalSequenceGallery({ images = [] }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-0">
      {images.map((img, i) => (
        <HSeqItem key={img.src || i} img={img} delay={i * 0.12} />
      ))}
    </div>
  )
}
