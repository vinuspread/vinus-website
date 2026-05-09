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
      {/* 커버: 아래서 올라와 덮은 뒤 위로 빠져나감 */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: '#d6d6d6' }}
        initial={{ y: '100%' }}
        animate={inView ? { y: ['100%', '0%', '-101%'] } : { y: '100%' }}
        transition={{
          duration: 1.6,
          times: [0, 0.4, 1],
          ease: [[0.16, 1, 0.3, 1], [0.65, 0, 0.35, 1]],
        }}
      />
      {/* 이미지: 커버 아래에서 제자리로 */}
      <motion.div
        initial={{ y: '5%', scale: 1.03 }}
        animate={inView ? { y: 0, scale: 1 } : { y: '5%', scale: 1.03 }}
        transition={{ duration: 0.7, ease }}
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
