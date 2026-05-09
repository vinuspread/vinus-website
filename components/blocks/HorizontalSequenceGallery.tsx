'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const ease = [0.65, 0, 0.35, 1] as [number, number, number, number]
const GRAY_BLUR = 'data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

function HSeqItem({ img, delay }: { img: { src: string; alt: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <div ref={ref} className="flex-1 relative overflow-hidden">
      {/* 회색 배경: 아래서 슬라이드 인, 유지됨 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#d6d6d6' }}
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
      {/* 이미지: 회색 뒤따라 슬라이드 인, 위에 유지 */}
      <motion.div
        className="relative z-10"
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 1.1, delay: delay + 0.15, ease }}
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
