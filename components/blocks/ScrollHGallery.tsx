'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const IMG_W = 640
const GAP_VW = 3   // gap-[3vw]
const PAD_PX = 64  // pl-16 (desktop)

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef(0)
  const loadedRef = useRef(0)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, (v: number) => -v * travelRef.current)

  const handleLoad = useCallback(() => {
    loadedRef.current += 1
    if (loadedRef.current < images.length) return
    // all images loaded — compute travel from actual strip width
    const gap = (GAP_VW / 100) * window.innerWidth
    const totalW = images.length * IMG_W + (images.length - 1) * gap + PAD_PX
    travelRef.current = Math.max(0, totalW - window.innerWidth)
  }, [images.length])

  if (!images.length) return null

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex gap-[3vw] pl-16" style={{ x }}>
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0 bg-[#ebebeb]" style={{ width: IMG_W }}>
              {img.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  width={IMG_W}
                  onLoad={handleLoad}
                  style={{ width: IMG_W, height: 'auto', display: 'block' }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
