import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import { StoryHero } from '@/components/story/StoryHero'
import JsonLd from '@/components/seo/JsonLd'
import BlogThumbParallax from '@/components/story/BlogThumbParallax'
import type { Blog } from '@/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'

interface Props {
  params: Promise<{ slug: string }>
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog')
    .select('title, meta_title, meta_description, blocks, thumbnail_url, tags, created_at, category')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Not Found' }

  const title = getMetaTitle(data.title, data.meta_title)
  const description = getMetaDescription(data.meta_description, data.blocks)
  const tags: string[] = data.tags ?? []
  const url = `${SITE_URL}/story/${slug}`

  return {
    title,
    description,
    keywords: tags.length ? tags.join(', ') : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: description ?? undefined,
      images: data.thumbnail_url ? [data.thumbnail_url] : undefined,
      publishedTime: data.created_at,
      section: data.category,
      tags: tags.length ? tags : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
      images: data.thumbnail_url ? [data.thumbnail_url] : undefined,
    },
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: story }, { data: allBlogs }] = await Promise.all([
    supabase.from('blog').select('*').eq('slug', slug).single(),
    supabase
      .from('blog')
      .select('slug, title')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
  ])

  if (!story) notFound()

  const blog = story as Blog
  const list = (allBlogs ?? []) as Pick<Blog, 'slug' | 'title'>[]
  const currentIdx = list.findIndex((b) => b.slug === slug)
  const prevStory = list[(currentIdx - 1 + list.length) % list.length]
  const nextStory = list[(currentIdx + 1) % list.length]

  const tags: string[] = blog.tags ?? []
  const url = `${SITE_URL}/story/${slug}`
  const description = getMetaDescription(blog.meta_description, blog.blocks)

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getMetaTitle(blog.title, blog.meta_title),
    description: description ?? undefined,
    url,
    datePublished: blog.created_at,
    image: blog.thumbnail_url ?? undefined,
    author: {
      '@type': 'Organization',
      name: '바이너스프레드',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '바이너스프레드',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/@profile.png` },
    },
    keywords: tags.length ? tags.join(', ') : undefined,
    articleSection: blog.category,
    inLanguage: 'ko-KR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <main className="bg-white min-h-screen">
      <JsonLd data={blogPostingLd} />

      {/* ── Hero ── */}
      <StoryHero
        category={blog.category}
        date={formatDate(blog.created_at)}
        title={blog.title}
        metaDescription={blog.meta_description}
      />

      {/* ── Featured Image ── */}
      {blog.thumbnail_url && (
        <section className="pb-[80px] md:pb-[120px]">
          <BlogThumbParallax src={blog.thumbnail_url} alt={blog.title} />
        </section>
      )}

      {/* ── Content Blocks ── */}
      {blog.blocks?.length > 0 && (
        <article className="pb-[120px] md:pb-[180px] border-t border-alto">
          <BlockRenderer blocks={blog.blocks} />
        </article>
      )}

      {/* ── Tags ── */}
      {tags.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-16 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-mine-shaft/40 border border-mine-shaft/15 px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="border-t border-b border-alto bg-white">
        <div className="px-page-padding grid grid-cols-3 divide-x divide-alto">
          <Link
            href={`/story/${prevStory.slug}`}
            className="group flex items-center gap-5 py-10 md:py-14 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{prevStory.title}</span>
          </Link>

          <Link
            href="/story"
            className="group flex items-center justify-center gap-3 py-10 md:py-14 transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="font-inter font-bold text-[22px] text-mine-shaft/30 group-hover:text-mine-shaft transition-colors">All Stories</span>
          </Link>

          <Link
            href={`/story/${nextStory.slug}`}
            className="group flex items-center justify-end gap-5 py-10 md:py-14 transition-colors duration-200"
          >
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{nextStory.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>

    </main>
  )
}
