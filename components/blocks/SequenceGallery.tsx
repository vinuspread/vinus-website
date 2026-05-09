'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const ease = [0.65, 0, 0.35, 1] as [number, number, number, number]
const GRAY_BLUR = 'data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

function SequenceItem({ img }: { img: { src: string; alt: string } }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <div ref={ref} className="relative overflow-hidden w-full">
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
        initial={{ y: '5%', scale: 1.03 }}
        animate={inView ? { y: 0, scale: 1 } : { y: '5%', scale: 1.03 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
      >
        {img.src && (
          <Image
            src={img.src}
            alt={img.alt}
            width={0}
            height={0}
            sizes="100vw"
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

export default function SequenceGallery({ images = [] }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="space-y-0">
      {images.map((img, i) => (
        <SequenceItem key={img.src || i} img={img} />
      ))}
    </div>
  )
}
