'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { MotionType } from '@/types'

interface Props {
  motion: MotionType
  children: React.ReactNode
}

type Variant = { opacity: number; y?: number; scale?: number }

const INITIAL: Record<MotionType, Variant> = {
  none:          { opacity: 1 },
  fadeIn:        { opacity: 0 },
  slideUp:       { opacity: 0, y: 80 },
  zoomIn:        { opacity: 0, scale: 0.95 },
  textReveal:    { opacity: 0, y: 24 },
  curtainReveal: { opacity: 0, y: 100 },
  stagger:       { opacity: 0, y: 20 },
}

const TRANSITION: Record<MotionType, object> = {
  none:          {},
  fadeIn:        { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  slideUp:       { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  zoomIn:        { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  textReveal:    { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  curtainReveal: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  stagger:       { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

const STAGGER_CHILD: Variant = { opacity: 0, y: 20 }
const STAGGER_VISIBLE = {
  opacity: 1,
  y: 0,
  transition: { staggerChildren: 0.1, delayChildren: 0 },
}

export default function BlockMotion({ motion: motionType, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  if (motionType === 'none') return <>{children}</>

  const initial = INITIAL[motionType]
  const animate = inView ? { opacity: 1, y: 0, scale: 1 } : initial
  const transition = TRANSITION[motionType]

  if (motionType === 'stagger') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 1 }}
        animate={inView ? STAGGER_VISIBLE : { opacity: 1 }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={{ hidden: STAGGER_CHILD, visible: { opacity: 1, y: 0 } }}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={{ hidden: STAGGER_CHILD, visible: { opacity: 1, y: 0 } }}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, ease: 'easeOut' }}>
              {children}
            </motion.div>
        }
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
