'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useCursor } from './CustomCursor'

// 1. Fade Up Reveal
export function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 2. Parallax Image
export function ParallaxImage({ src, alt, className = '' }: { src: string, alt: string, className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

// 3. Magnetic Hover Link (for Cursor)
export function MagneticLink({ children, href, className = '' }: { children: ReactNode, href: string, className?: string }) {
  const { setCursorState } = useCursor()
  
  return (
    <a
      href={href}
      className={`inline-block ${className}`}
      onMouseEnter={() => setCursorState('hover')}
      onMouseLeave={() => setCursorState('default')}
    >
      {children}
    </a>
  )
}

// 4. Staggered Text Reveal
export function TextReveal({ text, className = '', delay = 0, nowrap = false }: { text: string, className?: string, delay?: number, nowrap?: boolean }) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  }

  return (
    <motion.div
      className={`flex ${nowrap ? 'flex-nowrap' : 'flex-wrap'} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// 5. Letter Reveal (Striking in character by character)
export function LetterReveal({ text, className = '', delay = 0 }: { text: string, className?: string, delay?: number }) {
  const characters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
  }

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index} className={char === ' ' ? 'w-[0.25em]' : ''}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
