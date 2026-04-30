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
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, syncTouch: true }}>
      <GSAPScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
