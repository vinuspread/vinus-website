'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'

interface Props {
  src: string
  alt: string
}

export default function BlogThumbParallax({ src, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [90, -90])

  return (
    <div ref={ref} className="w-full aspect-[21/6] relative overflow-hidden">
      <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          data-pin-nopin="true"
        />
      </motion.div>
    </div>
  )
}
