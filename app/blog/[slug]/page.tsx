import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription, formatDate } from '@/lib/utils'
import type { Blog } from '@/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createClient()
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
    .select('title, meta_title, meta_description')
    .eq('slug', slug)
    .single()

  if (!blog) return {}

  return {
    title: getMetaTitle(blog.title, blog.meta_title),
    description: getMetaDescription(blog.meta_description),
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

  return (
    <div className="px-8 max-w-3xl mx-auto pb-24">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider uppercase text-gray-400">{typedBlog.category}</span>
          <time className="text-xs text-gray-400">{formatDate(typedBlog.created_at)}</time>
        </div>
        <h1 className="text-4xl font-bold leading-tight">{typedBlog.title}</h1>
      </header>

      <BlockRenderer blocks={typedBlog.blocks ?? []} />

      {typedBlog.file_url && (
        <div className="mt-12 pt-8 border-t">
          <a
            href={typedBlog.file_url}
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm tracking-wider hover:bg-gray-800 transition-colors"
          >
            ↓ 파일 다운로드
          </a>
        </div>
      )}
    </div>
  )
}
