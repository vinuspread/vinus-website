import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlogCard from '@/components/blog/BlogCard'
import type { Blog } from '@/types'
import { FadeUp, LetterReveal, MagneticLink } from '@/components/ui/MotionWrapper'

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
    <main className="pt-32 md:pt-48 pb-32 min-h-screen bg-gray-50/50">
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <header className="mb-16 md:mb-24 flex flex-col items-center">
          <FadeUp delay={0.2}>
            <p className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-4 font-syne">
              Our Thoughts
            </p>
          </FadeUp>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-syne font-bold tracking-tighter leading-none uppercase text-black">
            <LetterReveal text="Journal." delay={0.4} className="justify-center" />
          </h1>
        </header>

        <FadeUp delay={0.8}>
          <nav className="flex justify-center gap-8 md:gap-16 mb-16 md:mb-24" aria-label="블로그 카테고리">
            {tabs.map(tab => (
              <MagneticLink
                key={tab.value}
                href={tab.value === 'all' ? '/blog' : `/blog?category=${tab.value}`}
                className={`relative pb-3 text-sm md:text-lg tracking-widest uppercase transition-colors ${
                  activeCategory === tab.value
                    ? 'text-black font-medium'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeCategory === tab.value && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
              </MagneticLink>
            ))}
          </nav>
        </FadeUp>

        <ul className="space-y-0 border-t border-gray-200">
          {((blogs as Blog[]) ?? []).map((blog, index) => (
            <li key={blog.id}>
              <BlogCard blog={blog} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}


