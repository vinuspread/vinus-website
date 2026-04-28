import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlogCard from '@/components/blog/BlogCard'
import type { Blog } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: '바이너스프레드의 이야기, 프로젝트 노트, 다운로드 자료',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = category ?? 'all'

  const supabase = await createClient()
  let query = supabase
    .from('blog')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (activeCategory !== 'all') {
    query = query.eq('category', activeCategory)
  }

  const { data: blogs } = await query

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Story', value: 'Story' },
    { label: 'Download', value: 'Download' },
  ]

  return (
    <div className="px-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-4xl font-bold mb-8 tracking-tight">Blog</h1>
      <nav className="flex gap-6 mb-12 border-b border-gray-200" aria-label="블로그 카테고리">
        {tabs.map(tab => (
          <Link
            key={tab.value}
            href={tab.value === 'all' ? '/blog' : `/blog?category=${tab.value}`}
            className={`pb-3 text-sm tracking-wider transition-colors border-b-2 -mb-px ${
              activeCategory === tab.value
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <ul className="space-y-0">
        {((blogs as Blog[]) ?? []).map(blog => (
          <li key={blog.id}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  )
}
