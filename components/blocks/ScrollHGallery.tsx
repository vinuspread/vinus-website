'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const IMG_HEIGHT = '65vh'

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef(0)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, (v: number) => -v * travelRef.current)

  const measureTravel = useCallback(() => {
    if (!stripRef.current) return
    travelRef.current = Math.max(0, stripRef.current.scrollWidth - window.innerWidth)
  }, [])

  if (!images.length) return null

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={stripRef}
          className="flex gap-[3vw] pl-6 md:pl-16"
          style={{ x }}
        >
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0 bg-[#ebebeb]" style={{ height: IMG_HEIGHT }}>
              {img.src && (
                <img
                  src={img.src}
                  alt={img.alt}
                  onLoad={measureTravel}
                  style={{ height: IMG_HEIGHT, width: 'auto', display: 'block' }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
