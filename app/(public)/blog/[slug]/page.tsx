import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Blog } from '@/types'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog')
    .select('title, meta_title, meta_description, blocks, thumbnail_url')
    .eq('slug', slug)
    .single()

  if (!post) return { title: 'Not Found' }

  return {
    title: getMetaTitle(post.title, post.meta_title),
    description: getMetaDescription(post.meta_description, post.blocks),
    openGraph: {
      title: getMetaTitle(post.title, post.meta_title),
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  const blog = post as Blog

  return (
    <article className="bg-gallery">
      {/* Header */}
      <section className="pt-[140px] pb-[80px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          {blog.category && (
            <div className="md:col-span-8 mb-6">
              <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40">{blog.category}</p>
            </div>
          )}
          <div className="md:col-span-6">
            <h1 className="text-[48px] md:text-[72px] leading-[0.95] tracking-[-2px] uppercase">
              {blog.title}
            </h1>
          </div>
          <div className="md:col-span-8 mt-8">
            <p className="text-[13px] text-mine-shaft/40 uppercase tracking-wider">
              {new Date(blog.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      {blog.blocks?.length > 0 && (
        <div className="py-[80px]">
          <BlockRenderer blocks={blog.blocks} />
        </div>
      )}

      {/* Back */}
      <section className="px-page-padding py-[80px] border-t border-alto">
        <Link
          href="/blog"
          className="flex items-center gap-4 group text-[15px] uppercase tracking-wider hover:opacity-60 transition-opacity"
        >
          <span className="group-hover:-translate-x-2 transition-transform">←</span>
          <span>All Posts</span>
        </Link>
      </section>
    </article>
  )
}
