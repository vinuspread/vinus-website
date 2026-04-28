import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Work } from '@/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = createBrowserClient()
  const { data: works } = await supabase
    .from('work')
    .select('slug')
    .eq('is_published', true)

  return (works ?? []).map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from('work')
    .select('title, meta_title, meta_description, thumbnail_url')
    .eq('slug', slug)
    .single()

  if (!work) return {}

  return {
    title: getMetaTitle(work.title, work.meta_title),
    description: getMetaDescription(work.meta_description),
    openGraph: {
      images: work.thumbnail_url ? [work.thumbnail_url] : [],
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from('work')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!work) notFound()

  const typedWork = work as Work

  return (
    <div className="px-8 max-w-4xl mx-auto pb-24">
      <header className="mb-12">
        <p className="text-sm text-gray-500 tracking-wider uppercase mb-3">
          {typedWork.category}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {typedWork.title}
        </h1>
      </header>
      <BlockRenderer blocks={typedWork.blocks ?? []} />
    </div>
  )
}
