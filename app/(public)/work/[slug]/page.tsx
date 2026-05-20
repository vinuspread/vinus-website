import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import JsonLd from '@/components/seo/JsonLd'
import type { Work } from '@/types'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from('work')
    .select('title, meta_title, meta_description, blocks, thumbnail_url, tags, category')
    .eq('slug', slug)
    .single()

  if (!work) return { title: 'Not Found' }

  const title = getMetaTitle(work.title, work.meta_title)
  const description = getMetaDescription(work.meta_description, work.blocks)
  const tags: string[] = work.tags ?? []
  const url = `${SITE_URL}/work/${slug}`

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
      images: work.thumbnail_url ? [work.thumbnail_url] : undefined,
      tags: tags.length ? tags : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
      images: work.thumbnail_url ? [work.thumbnail_url] : undefined,
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: work }, { data: works }] = await Promise.all([
    supabase.from('work').select('*').eq('slug', slug).single(),
    supabase.from('work').select('slug, title, thumbnail_url, thumbnail_color').eq('is_published', true).order('sort_order', { ascending: true }),
  ])

  if (!work) notFound()

  const allWorks = (works ?? []) as Pick<Work, 'slug' | 'title' | 'thumbnail_url' | 'thumbnail_color'>[]
  const currentIdx = allWorks.findIndex((w) => w.slug === slug)
  const nextWork = allWorks[(currentIdx + 1) % allWorks.length]

  const heroSrc = (work as Work).hero_url ?? (work as Work).thumbnail_url
  const tags: string[] = (work as Work).tags ?? []
  const url = `${SITE_URL}/work/${slug}`
  const description = getMetaDescription((work as Work).meta_description, (work as Work).blocks)

  const creativeWorkLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: getMetaTitle((work as Work).title, (work as Work).meta_title),
    description: description ?? undefined,
    url,
    image: (work as Work).thumbnail_url ?? undefined,
    creator: {
      '@type': 'Organization',
      name: '바이너스프레드',
      url: SITE_URL,
    },
    keywords: tags.length ? tags.join(', ') : undefined,
    genre: (work as Work).category ?? undefined,
    inLanguage: 'ko-KR',
  }

  return (
    <article className="bg-gallery">
      <JsonLd data={creativeWorkLd} />

      {/* 1. Hero */}
      {heroSrc && (
        <section className="relative w-full h-screen overflow-hidden">
          <Image src={heroSrc} alt={(work as Work).title} fill className="object-cover" priority />
          <div className="absolute bottom-0 left-0 p-page-padding pb-[60px] z-10 w-full bg-gradient-to-t from-black/50 to-transparent">
            {(work as Work).category && (
              <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-3">
                {(work as Work).category}
              </p>
            )}
            <h1 className="text-[48px] md:text-[64px] leading-none tracking-[-2px] text-white uppercase max-w-[800px]">
              {(work as Work).title}
            </h1>
          </div>
        </section>
      )}

      {/* 2. Meta Bar */}
      <section className="px-page-padding py-[48px] border-b border-alto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Client',   value: (work as Work).client_name },
          { label: 'Period',   value: (work as Work).period },
          { label: 'Category', value: (work as Work).category },
          { label: 'Subtitle', value: (work as Work).subtitle },
        ].filter(({ value }) => value).map(({ label, value }) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40 mb-2">{label}</p>
            <p className="text-[15px] leading-snug">{value}</p>
          </div>
        ))}
      </section>

      {/* 3. Summary / Challenge */}
      {(work as Work).summary && (
        <section className="px-page-padding py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-2 mb-8 md:mb-0">
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Overview</p>
          </div>
          <div className="md:col-span-5">
            <p className="text-[22px] md:text-[26px] font-light leading-[1.4] tracking-[-0.4px]">
              {(work as Work).summary}
            </p>
          </div>
        </section>
      )}

      {/* 4. Content blocks */}
      {(work as Work).blocks?.length > 0 && (
        <div className="pb-[120px]">
          <BlockRenderer blocks={(work as Work).blocks} />
        </div>
      )}

      {/* 5. Tags */}
      {tags.length > 0 && (
        <div className="px-page-padding pb-16 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-mine-shaft/40 border border-mine-shaft/15 px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 6. Next Project */}
      {nextWork && (
        <section className="px-page-padding py-[80px] md:py-[120px] border-t border-alto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Next Project</p>
          <Link
            href={`/work/${nextWork.slug}`}
            className="group flex items-center gap-4 w-full md:w-auto"
          >
            <span className="text-[32px] md:text-[46px] tracking-[-1.5px] uppercase group-hover:opacity-60 transition-opacity leading-none">
              {nextWork.title}
            </span>
            <span className="text-[24px] group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </section>
      )}
    </article>
  )
}
