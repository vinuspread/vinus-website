'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Work', href: '/admin/work' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'FAQ', href: '/admin/faq' },
  { label: 'Settings', href: '/admin/settings' },
  { label: 'Admins', href: '/admin/admins' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 min-h-screen border-r border-gray-200 flex flex-col py-10 px-6 shrink-0">
      <p className="text-xs tracking-widest uppercase text-gray-400 mb-10">바이너스프레드</p>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm py-2 px-3 transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-400 hover:text-black text-left py-2 px-3 transition-colors"
      >
        로그아웃
      </button>
    </aside>
  )
}
