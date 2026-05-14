'use client'

import { useRef, useCallback, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef(0)
  const loadedRef = useRef(0)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, (v: number) => -v * travelRef.current)

  const measure = useCallback(() => {
    if (!stripRef.current) return
    travelRef.current = Math.max(0, stripRef.current.scrollWidth - window.innerWidth)
  }, [])

  // 캐시된 이미지는 onLoad가 안 터지므로 마운트 시에도 측정
  useLayoutEffect(() => {
    if (!stripRef.current) return
    const imgs = Array.from(stripRef.current.querySelectorAll('img'))
    if (imgs.every(img => img.complete)) measure()
  }, [images, measure])

  const handleLoad = useCallback(() => {
    loadedRef.current += 1
    if (loadedRef.current >= images.length) measure()
  }, [images.length, measure])

  if (!images.length) return null

  return (
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div ref={stripRef} className="flex gap-[3vw] pl-6 md:pl-16" style={{ x }}>
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0">
              {img.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  onLoad={handleLoad}
                  style={{ maxHeight: '70vh', width: 'auto', height: 'auto', display: 'block' }}
                />
              )}
            </div>
          ))}
          <div className="flex-shrink-0 w-6 md:w-16" />
        </motion.div>
      </div>
    </div>
  )
}
