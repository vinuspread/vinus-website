import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import JsonLd from '@/components/seo/JsonLd'
import { getMetaTitle, getMetaDescription, formatDate } from '@/lib/utils'
import type { Blog } from '@/types'
import { FadeUp, TextReveal, MagneticLink } from '@/components/ui/MotionWrapper'

export const revalidate = 86400

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = createBrowserClient()
  const { data: blogs } = await supabase
    .from('blog')
    .select('slug')
    .eq('is_published', true)

  return (blogs ?? []).map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blog')
    .select('title, meta_title, meta_description, thumbnail_url, blocks')
    .eq('slug', slug)
    .single()

  if (!blog) return {}

  const description = getMetaDescription(blog.meta_description, blog.blocks as Blog['blocks'])

  return {
    title: getMetaTitle(blog.title, blog.meta_title),
    description,
    openGraph: {
      type: 'article',
      images: blog.thumbnail_url ? [blog.thumbnail_url] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blog')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!blog) notFound()

  const typedBlog = blog as Blog
  const description = getMetaDescription(typedBlog.meta_description, typedBlog.blocks ?? [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: typedBlog.title,
    description,
    url: `${SITE_URL}/blog/${typedBlog.slug}`,
    datePublished: typedBlog.created_at,
    dateModified: typedBlog.created_at,
    ...(typedBlog.thumbnail_url && { image: typedBlog.thumbnail_url }),
    author: {
      '@type': 'Organization',
      name: '바이너스프레드',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '바이너스프레드',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/@profile.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${typedBlog.slug}`,
    },
  }

  return (
    <article className="pb-32 bg-white">
      <JsonLd data={jsonLd} />

      <header className="relative pt-40 pb-20 md:pt-56 md:pb-24 px-6 md:px-12 max-w-[1200px] mx-auto border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp delay={0.2} className="flex items-center justify-center gap-4 mb-10">
            <span className="px-4 py-1.5 text-xs tracking-[0.3em] uppercase border border-gray-200 rounded-full text-gray-500">{typedBlog.category}</span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <time className="text-sm tracking-widest text-gray-400">{formatDate(typedBlog.created_at)}</time>
          </FadeUp>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-light leading-[1.1] tracking-tighter">
            <TextReveal text={typedBlog.title} delay={0.4} className="justify-center" />
          </h1>
        </div>
      </header>

      <div className="mt-20 md:mt-32 px-4 md:px-0 max-w-4xl mx-auto">
        <BlockRenderer blocks={typedBlog.blocks ?? []} />
      </div>

      {typedBlog.file_url && (
        <FadeUp delay={0.2} className="mt-32 pt-24 border-t border-gray-100 max-w-4xl mx-auto px-4 md:px-0 text-center">
          <p className="text-sm text-gray-500 mb-8 tracking-[0.2em] uppercase font-medium">Available Download</p>
          <MagneticLink
            href={typedBlog.file_url}
            className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-[#111] transition-colors rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12V2M8 12L3 7M8 12L13 7M2 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download File
          </MagneticLink>
        </FadeUp>
      )}

      <FadeUp delay={0.4} className="mt-40 text-center">
        <MagneticLink href="/blog" className="inline-block text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-black border-b border-transparent hover:border-black pb-2 transition-all">
          Back to Journal
        </MagneticLink>
      </FadeUp>
    </article>
  )
}
