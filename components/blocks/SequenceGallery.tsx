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
  slideUp:       { opacity: 0, y: 80 },
  zoomIn:        { opacity: 0, scale: 0.97 },
  textReveal:    { opacity: 0, y: 24 },
  curtainReveal: { opacity: 0, y: 100 },
  stagger:       { opacity: 0, y: 40 },
}

const TRANSITION: Record<MotionType, Parameters<typeof motion.div>[0]['transition']> = {
  none:          {},
  fadeIn:        { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  slideUp:       { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  zoomIn:        { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  textReveal:    { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  curtainReveal: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  stagger:       { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
}

const VISIBLE: FramerVariant = { opacity: 1, y: 0, scale: 1 }

function SequenceItem({ img, motionType }: { img: { src: string; alt: string }; motionType: MotionType }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN[motionType]}
      animate={inView ? VISIBLE : HIDDEN[motionType]}
      transition={TRANSITION[motionType]}
      className="w-full"
    >
      {img.src && (
        <Image
          src={img.src}
          alt={img.alt}
          width={0}
          height={0}
          sizes="100vw"
          quality={90}
          className="w-full h-auto block"
        />
      )}
    </motion.div>
  )
}

export default function SequenceGallery({ images = [], motion: motionType }: Props) {
  return (
    <div className="space-y-0">
      {images.map((img, i) => (
        <SequenceItem key={img.src || i} img={img} motionType={motionType} />
      ))}
    </div>
  )
}
