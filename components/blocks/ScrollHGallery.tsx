'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const GRAY_BLUR = 'data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

export default function ScrollHGallery({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // 이미지 한 장당 75vw, 갭 포함해 전체 이동 거리 계산
  const totalTravel = (images.length - 1) * 78
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${totalTravel}vw`])

  if (!images.length) return null

  return (
    // 스크롤을 소비하는 외부 컨테이너 (높이 = 이미지 수 × 100vh)
    <div ref={containerRef} style={{ height: `${images.length * 100}vh` }}>
      {/* sticky: 뷰포트에 고정된 채로 스크롤 소비 */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="flex gap-[3vw] pl-6 md:pl-16" style={{ x }}>
          {images.map((img, i) => (
            <div key={i} className="w-[75vw] h-[60vh] flex-shrink-0 relative bg-[#ebebeb]">
              {img.src && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={GRAY_BLUR}
                  className="object-cover"
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
