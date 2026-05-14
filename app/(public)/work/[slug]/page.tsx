import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import JsonLd from '@/components/seo/JsonLd'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Work } from '@/types'

export const revalidate = 86400

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinus.co.kr'

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
    .select('title, meta_title, meta_description, thumbnail_url, blocks')
    .eq('slug', slug)
    .single()

  if (!work) return {}

  const description = getMetaDescription(work.meta_description, work.blocks as Work['blocks'])

  return {
    title: getMetaTitle(work.title, work.meta_title),
    description,
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

  // 다음 프로젝트 쿼리 (sort_order 기준 다음, 없으면 첫 번째)
  const { data: allWorks } = await supabase
    .from('work')
    .select('id, slug, title, sort_order')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  const works = allWorks ?? []
  const currentIdx = works.findIndex(w => w.slug === slug)
  const nextWork = works[(currentIdx + 1) % works.length] ?? null

  const description = getMetaDescription(typedWork.meta_description, typedWork.blocks ?? [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: typedWork.title,
    description,
    url: `${SITE_URL}/work/${typedWork.slug}`,
    ...(typedWork.thumbnail_url && { image: typedWork.thumbnail_url }),
    ...(typedWork.client_name && { producer: { '@type': 'Organization', name: typedWork.client_name } }),
    ...(typedWork.category && { keywords: typedWork.category }),
    ...(typedWork.period && { temporalCoverage: typedWork.period }),
    dateCreated: typedWork.created_at,
    creator: { '@type': 'Organization', name: '바이너스프레드', url: SITE_URL },
  }

  const heroImg = typedWork.hero_url || typedWork.thumbnail_url

  return (
    <article className="bg-white">
      <JsonLd data={jsonLd} />

      {/* 1. Hero 풀스크린 */}
      <section className="relative w-full h-screen overflow-hidden">
        {heroImg ? (
          <Image
            src={heroImg}
            alt={typedWork.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: typedWork.thumbnail_color ?? '#d6d6d6' }}
          />
        )}
        <div className="absolute bottom-0 left-0 px-[40px] pb-[60px] z-10 w-full bg-gradient-to-t from-black/50 to-transparent">
          {typedWork.category && (
            <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-3">
              {typedWork.category}
            </p>
          )}
          <h1 className="text-[48px] md:text-[64px] leading-none tracking-[-2px] text-white uppercase max-w-[800px]">
            {typedWork.title}
          </h1>
        </div>
      </section>

      {/* 2. Meta Bar */}
      <section className="px-[40px] py-[48px] border-b border-alto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Client',   value: typedWork.client_name || '바이너스프레드' },
          { label: 'Year',     value: typedWork.period || String(new Date(typedWork.created_at).getFullYear()) },
          { label: 'Services', value: typedWork.category || 'Design & Development' },
          { label: 'Subtitle', value: typedWork.subtitle || '—' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40 mb-2">{label}</p>
            <p className="text-[15px] leading-snug">{value}</p>
          </div>
        ))}
      </section>

      {/* 3. Challenge (Summary) */}
      {typedWork.summary && (
        <section className="px-[40px] py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-[38px]">
          <div className="md:col-span-2 mb-8 md:mb-0">
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Challenge</p>
          </div>
          <div className="md:col-span-5">
            <p className="text-[22px] md:text-[26px] font-light leading-[1.4] tracking-[-0.4px] whitespace-pre-line break-keep">
              {typedWork.summary}
            </p>
          </div>
        </section>
      )}

      {/* 4. 블록 콘텐츠 */}
      {(typedWork.blocks ?? []).length > 0 && (
        <div className="pb-[120px]">
          <BlockRenderer blocks={typedWork.blocks ?? []} />
        </div>
      )}

      {/* 5. Next Project */}
      {nextWork && nextWork.slug !== slug && (
        <section className="px-[40px] py-[80px] md:py-[120px] border-t border-alto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Next Project</p>
          <Link
            href={`/work/${nextWork.slug}`}
            className="group flex items-center gap-4 w-full md:w-auto"
          >
            <span className="text-[32px] md:text-[46px] tracking-[-1.5px] uppercase group-hover:opacity-60 transition-opacity leading-none">
              {nextWork.title}
            </span>
            <span className="text-[24px] group-hover:translate-x-2 transition-transform inline-block">→</span>
          </Link>
        </section>
      )}
    </article>
  )
}
