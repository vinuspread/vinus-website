'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  url: string
  type: 'image' | 'video'
  alt: string
}

export default function HeroParallax({ url, type, alt }: Props) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>
      {type === 'video' ? (
        <motion.video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
      ) : (
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
          <Image src={url} alt={alt} fill priority quality={90} className="object-cover" sizes="100vw" />
        </motion.div>
      )}
    </div>
  )
}
