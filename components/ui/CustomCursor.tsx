'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'text' | 'hidden'

interface CursorContextType {
  setCursorState: (state: CursorState, text?: string) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) throw new Error('useCursor must be used within CursorProvider')
  return context
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorStateInner] = useState<CursorState>('default')
  const [cursorText, setCursorText] = useState<string | undefined>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is touch capable
    if (typeof window !== 'undefined') {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  const setCursorState = (state: CursorState, text?: string) => {
    setCursorStateInner(state)
    setCursorText(text)
  }

  // Define variants for framer motion
  const variants = {
    default: {
      width: 16,
      height: 16,
      x: position.x - 8,
      y: position.y - 8,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      mixBlendMode: 'normal' as any,
    },
    hover: {
      width: 64,
      height: 64,
      x: position.x - 32,
      y: position.y - 32,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference' as any,
    },
    text: {
      width: 100,
      height: 100,
      x: position.x - 50,
      y: position.y - 50,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      mixBlendMode: 'normal' as any,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    }
  }

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      {children}
      {!isMobile && (
        <motion.div
          variants={variants}
          animate={cursorState}
          transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-white text-sm tracking-widest font-medium overflow-hidden"
          style={{ willChange: 'transform, width, height' }}
        >
          {cursorState === 'text' && cursorText ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 text-center leading-none"
            >
              {cursorText}
            </motion.span>
          ) : null}
        </motion.div>
      )}
    </CursorContext.Provider>
  )
}
