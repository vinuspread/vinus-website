'use client'

import Link from 'next/link'
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <Link href="/" className="text-white font-bold text-lg tracking-wider" aria-label="바이너스프레드 홈">
        VINUS
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
                <ul className="bg-white rounded shadow-lg py-2 min-w-[120px]">
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
        className="md:hidden text-white"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
      </button>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="모바일 메뉴"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black text-white p-8 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-2xl" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-2 ml-4 flex flex-col gap-2">
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link href={child.href} className="text-base opacity-60" onClick={() => setMenuOpen(false)}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
