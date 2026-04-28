'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode } from 'react'
import { ScrollTrigger } from '../../lib/gsap'

function GSAPScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })
  return null
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <GSAPScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
