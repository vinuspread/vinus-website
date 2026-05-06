'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { MotionType } from '@/types'

interface Props {
  images: { src: string; alt: string }[]
  motion: MotionType
}

type FramerVariant = { opacity: number; y?: number; scale?: number }

const HIDDEN: Record<MotionType, FramerVariant> = {
  none:          { opacity: 1 },
  fadeIn:        { opacity: 0 },
  slideUp:       { opacity: 0, y: 60 },
  zoomIn:        { opacity: 0, scale: 0.97 },
  textReveal:    { opacity: 0, y: 24 },
  curtainReveal: { opacity: 0, y: 80 },
  stagger:       { opacity: 0, y: 40 },
}

const VISIBLE: FramerVariant = { opacity: 1, y: 0, scale: 1 }

function HSeqItem({ img, motionType, delay }: { img: { src: string; alt: string }; motionType: MotionType; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })

  const transition = motionType === 'none'
    ? {}
    : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN[motionType]}
      animate={inView ? VISIBLE : HIDDEN[motionType]}
      transition={transition}
      className="flex-1"
    >
      {img.src && (
        <Image
          src={img.src}
          alt={img.alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={90}
          className="w-full h-auto block"
        />
      )}
    </motion.div>
  )
}

export default function HorizontalSequenceGallery({ images = [], motion: motionType }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-0">
      {images.map((img, i) => (
        <HSeqItem key={img.src || i} img={img} motionType={motionType} delay={i * 0.15} />
      ))}
    </div>
  )
}
