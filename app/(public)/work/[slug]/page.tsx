import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import HeroParallax from '@/components/work/HeroParallax'
import JsonLd from '@/components/seo/JsonLd'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Work } from '@/types'
import { FadeUp, TextReveal, MagneticLink } from '@/components/ui/MotionWrapper'

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
    creator: {
      '@type': 'Organization',
      name: '바이너스프레드',
      url: SITE_URL,
    },
  }

  return (
    <article>
      <JsonLd data={jsonLd} />

      {typedWork.hero_url && (
        <>
          <HeroParallax url={typedWork.hero_url} type={typedWork.hero_type ?? 'image'} alt={typedWork.title} />
          <div className="h-screen" />
        </>
      )}

      {/* Content scrolls over fixed hero */}
      <div className="relative bg-white pb-32" style={{ zIndex: 10 }}>

      {/* Hero Header for Work Detail */}
      <header className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-6 md:px-12 max-w-4xl mx-auto">
          <h1 className="text-[68px] font-bold tracking-tighter leading-[1] uppercase whitespace-nowrap">
            <TextReveal text={typedWork.title} delay={0.2} nowrap />
          </h1>
          {typedWork.subtitle && (
            <FadeUp delay={0.5} className="mt-4">
              <p className="text-lg md:text-xl text-black font-bold">{typedWork.subtitle}</p>
            </FadeUp>
          )}

          {/* Metadata Row */}
          <FadeUp delay={0.7} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 text-left">
              {[
                { label: 'Client', value: typedWork.client_name || '바이너스프레드' },
                { label: 'Release Date', value: typedWork.period || String(new Date(typedWork.created_at).getFullYear()) },
                { label: 'Type', value: typedWork.category || 'Design & Development' },
              ].map(({ label, value }) => (
                <div key={label} className="border-t-2 border-black pt-6 pb-8 md:pr-12">
                  <p className="text-xs font-bold uppercase tracking-widest mb-4">{label}</p>
                  <p className="text-base font-light text-black">{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {typedWork.summary && (
            <FadeUp delay={1} className="mt-20">
              <p className="text-lg md:text-xl text-black leading-relaxed whitespace-pre-line break-keep">{typedWork.summary}</p>
            </FadeUp>
          )}
      </header>

      <div className="mt-24 md:mt-32">
        <BlockRenderer blocks={typedWork.blocks ?? []} />
      </div>

      {/* Next Project Nav */}
      <div className="mt-40 border-t border-black bg-black text-white px-6 md:px-12 py-32 md:py-48 flex flex-col items-center justify-center text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
        <FadeUp delay={0.2} className="relative z-10 w-full">
          <MagneticLink href="/work" className="group flex flex-col items-center w-full">
            <p className="text-gray-400 tracking-[0.3em] uppercase mb-12 text-sm">Next Project</p>
            <h2 className="text-6xl md:text-9xl font-light tracking-tighter transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-600">
              Coming Soon
            </h2>
          </MagneticLink>
        </FadeUp>
      </div>

      </div>{/* end content wrapper */}
    </article>
  )
}
