'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'We', href: '/we' },
  { label: 'Work', href: '/work' },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'Story', href: '/blog?category=Story' },
      { label: 'Download', href: '/blog?category=Download' },
    ],
  },
  { label: 'Request', href: '/request' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <Link href="/" aria-label="바이너스프레드 홈">
        <Image
          src="/images/h1_logo2.png"
          alt="바이너스프레드"
          width={44}
          height={44}
          className="invert"
          priority
        />
      </Link>

      {/* 데스크탑 네비게이션 */}
      <nav className="hidden md:flex items-center gap-8" aria-label="메인 메뉴">
        {navItems.map(item => (
          <div key={item.label} className="relative group">
            <Link
              href={item.href}
              className={`text-sm tracking-widest uppercase transition-opacity ${
                (pathname === item.href || pathname.startsWith(item.href + '/')) ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              } text-white`}
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block group-focus-within:block">
                <ul className="bg-white rounded shadow-lg py-2 min-w-[120px]" style={{ mixBlendMode: 'normal' }}>
                  {item.children.map(child => (
                    <li key={child.label}>
                      <Link href={child.href} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 모바일 햄버거 */}
      <button
        ref={buttonRef}
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* 모바일 전체화면 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="모바일 메뉴"
            initial={{ clipPath: 'circle(0% at top right)' }}
            animate={{ clipPath: 'circle(150% at top right)' }}
            exit={{ clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black text-white z-40 md:hidden flex flex-col justify-center px-12"
            style={{ mixBlendMode: 'normal' }}
          >
            <ul className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-light tracking-widest text-white hover:opacity-60 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="text-lg tracking-widest text-white/60 hover:text-white transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="absolute bottom-12 left-12 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a href="https://www.instagram.com/vinuspread/" className="text-sm tracking-widest text-white/40 hover:text-white transition-colors">INSTAGRAM</a>
              <a href="https://www.pinterest.co.kr/vinuspread/" className="text-sm tracking-widest text-white/40 hover:text-white transition-colors">PINTEREST</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
