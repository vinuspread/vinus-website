'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'We',      href: '/we' },
  { label: 'Work',    href: '/work' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Request', href: '/request' },
]

export default function Header() {
  const pathname = usePathname()
  const [isHidden, setIsHidden] = useState(false)
  const lastYRef = useRef(0)

  const pageLabel = navItems.find(n => pathname.startsWith(n.href))?.label ?? 'Home'

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsHidden(y > lastYRef.current && y > 100)
      lastYRef.current = y
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full h-[56px] bg-gallery z-[1000] border-b border-alto px-page-padding flex items-center justify-between transition-transform duration-1000 header-enter',
        isHidden && 'nav-hidden'
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/h1_logo2.png" alt="바이너스프레드" width={40} height={40} />
        </Link>
        <div className="hidden md:flex items-center gap-2 text-mine-shaft/40 text-[14px]">
          <span className="nav-dash bg-alto h-[1px]" />
          {pageLabel}
        </div>
      </div>

      {/* Right: Nav */}
      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'text-[12px] uppercase tracking-wider hover:opacity-50 transition-opacity hidden md:block',
              pathname.startsWith(item.href) && 'opacity-50'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
