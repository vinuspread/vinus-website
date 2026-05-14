'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const IMG_VW = 75   // image width in vw
const GAP_VW = 3    // gap in vw

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef(0)
  const loadedRef = useRef(0)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, (v: number) => -v * travelRef.current)

  const handleLoad = useCallback(() => {
    loadedRef.current += 1
    if (loadedRef.current < images.length) return
    const vw = window.innerWidth
    const imgW = (IMG_VW / 100) * vw
    const gap = (GAP_VW / 100) * vw
    const totalW = images.length * imgW + (images.length - 1) * gap
    travelRef.current = Math.max(0, totalW - vw)
  }, [images.length])

  if (!images.length) return null

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex gap-[3vw] pl-6 md:pl-16" style={{ x }}>
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0 bg-[#ebebeb]" style={{ width: `${IMG_VW}vw` }}>
              {img.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  onLoad={handleLoad}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
