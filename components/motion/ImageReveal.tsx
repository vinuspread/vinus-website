'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

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

  useEffect(() => {
    const wrapper = wrapperRef.current
    const curtain = curtainRef.current
    if (!wrapper || !curtain) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtain,
        { scaleX: 1, transformOrigin: 'left center' },
        {
          scaleX: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className ?? ''}`}>
      {fill ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} className="w-full h-auto" />
      )}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: curtainColor }}
      />
    </div>
  )
}
