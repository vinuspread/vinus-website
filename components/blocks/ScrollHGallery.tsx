'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const GRAY_BLUR = 'data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

const IMG_VW = 75
const GAP_VW = 3

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const totalTravel = (images.length - 1) * (IMG_VW + GAP_VW)
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${totalTravel}vw`])

  if (!images.length) return null

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex gap-[3vw] pl-6 md:pl-16" style={{ x }}>
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 relative bg-[#ebebeb]"
              style={{ width: `${IMG_VW}vw`, height: '70vh' }}
            >
              {img.src && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={GRAY_BLUR}
                  className="object-contain"
                  sizes="75vw"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
