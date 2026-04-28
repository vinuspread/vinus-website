'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import Image from 'next/image'

interface ImageRevealProps {
  src: string
  alt: string
  curtainColor?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

export default function ImageReveal({
  src,
  alt,
  curtainColor = '#1a1a1a',
  className,
  fill = false,
  width,
  height,
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    gsap.fromTo(
      curtain,
      { scaleX: 1, transformOrigin: 'left center' },
      {
        scaleX: 0,
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className ?? ''}`}>
      {fill ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} className="w-full h-auto" />
      )}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: curtainColor }}
      />
    </div>
  )
}
