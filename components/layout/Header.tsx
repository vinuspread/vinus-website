'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

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
  
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

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
    // Close menu on route change
    setMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`
        flex items-center justify-between px-6 md:px-12 py-4 md:py-6 transition-colors duration-500
        ${isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm' : 'bg-transparent'}
      `}>
        <Link href="/" aria-label="바이너스프레드 홈" className="relative z-50">
          <motion.div
            animate={{ scale: isScrolled ? 0.85 : 1 }}
            transition={{ duration: 0.4 }}
            className="origin-left"
          >
            <Image
              src="/images/h1_logo2.png"
              alt="바이너스프레드"
              width={48}
              height={48}
              className={`transition-all duration-500 ${!isScrolled && pathname === '/' ? 'invert' : ''}`}
              priority
            />
          </motion.div>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-10" aria-label="메인 메뉴">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const textColorClass = isScrolled || pathname !== '/' ? 'text-gray-900' : 'text-white'
            
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    relative text-sm tracking-[0.15em] uppercase transition-colors duration-300 font-medium
                    ${isActive ? textColorClass : `${textColorClass} opacity-60 hover:opacity-100`}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute -bottom-2 left-0 right-0 h-0.5 ${isScrolled || pathname !== '/' ? 'bg-black' : 'bg-white'}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                
                {/* 드롭다운 메뉴 (Glassmorphism) */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 hidden group-hover:block group-focus-within:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ul className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-3 min-w-[140px] overflow-hidden">
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link 
                            href={child.href} 
                            className="block px-6 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50/50 transition-colors tracking-widest"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* 모바일 햄버거 */}
        <button
          ref={buttonRef}
          className={`md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-black' : (isScrolled || pathname !== '/' ? 'bg-black' : 'bg-white')}`}></span>
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'opacity-0 bg-black' : (isScrolled || pathname !== '/' ? 'bg-black' : 'bg-white')}`}></span>
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5 bg-black' : (isScrolled || pathname !== '/' ? 'bg-black' : 'bg-white')}`}></span>
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
              className="fixed inset-0 bg-white z-40 md:hidden flex flex-col justify-center px-12"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white -z-10" />
              
              <ul className="flex flex-col gap-8">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link 
                      href={item.href} 
                      className="text-4xl sm:text-5xl font-light tracking-widest text-black hover:text-gray-500 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    
                    {item.children && (
                      <ul className="mt-4 flex flex-col gap-3">
                        {item.children.map((child, j) => (
                          <motion.li 
                            key={child.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 + j * 0.1, duration: 0.4 }}
                          >
                            <Link 
                              href={child.href} 
                              className="text-lg tracking-widest text-gray-500 hover:text-black transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </motion.li>
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
                <a href="https://www.instagram.com/vinuspread/" className="text-sm tracking-widest text-gray-400 hover:text-black transition-colors">INSTAGRAM</a>
                <a href="https://www.pinterest.co.kr/vinuspread/" className="text-sm tracking-widest text-gray-400 hover:text-black transition-colors">PINTEREST</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
