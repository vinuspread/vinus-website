import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: workCount },
    { count: blogCount },
    { count: faqCount },
  ] = await Promise.all([
    supabase.from('work').select('*', { count: 'exact', head: true }),
    supabase.from('blog').select('*', { count: 'exact', head: true }),
    supabase.from('faq').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Work', count: workCount ?? 0, href: '/admin/work' },
    { label: 'Blog', count: blogCount ?? 0, href: '/admin/blog' },
    { label: 'FAQ', count: faqCount ?? 0, href: '/admin/faq' },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-gray-200 p-8 hover:border-black transition-colors"
          >
            <p className="text-3xl font-bold">{s.count}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
