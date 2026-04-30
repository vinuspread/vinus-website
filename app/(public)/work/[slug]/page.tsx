import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Work } from '@/types'
import { FadeUp, TextReveal, MagneticLink } from '@/components/ui/MotionWrapper'

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
    <article className="pb-32 bg-white">
      {/* Hero Header for Work Detail */}
      <header className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-gray-100">
        <div className="max-w-6xl">
          <FadeUp delay={0.2} className="mb-8">
            <p className="text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase">
              {typedWork.category || 'PROJECT'}
            </p>
          </FadeUp>
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-light tracking-tighter leading-[1] uppercase">
            <TextReveal text={typedWork.title} delay={0.4} />
          </h1>
          
          {/* Metadata Row */}
          <FadeUp delay={1} className="mt-16 pt-16 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm md:text-base">
              <div>
                <p className="text-gray-400 mb-3 uppercase tracking-widest text-xs font-medium">Client</p>
                <p className="font-light text-black text-lg">바이너스프레드</p>
              </div>
              <div>
                <p className="text-gray-400 mb-3 uppercase tracking-widest text-xs font-medium">Role</p>
                <p className="font-light text-black text-lg">UX/UI, Development</p>
              </div>
              <div>
                <p className="text-gray-400 mb-3 uppercase tracking-widest text-xs font-medium">Year</p>
                <p className="font-light text-black text-lg">{new Date(typedWork.created_at).getFullYear()}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-3 uppercase tracking-widest text-xs font-medium">Link</p>
                <MagneticLink href="#" className="font-light text-black border-b border-black pb-1 hover:text-gray-500 transition-colors text-lg">
                  Visit Website
                </MagneticLink>
              </div>
            </div>
          </FadeUp>
        </div>
      </header>

      {/* Content Blocks (Do not modify BlockRenderer as instructed) */}
      <div className="mt-24 md:mt-32 px-4 md:px-0 max-w-6xl mx-auto">
        <BlockRenderer blocks={typedWork.blocks ?? []} />
      </div>
      
      {/* Next Project Nav (Global Agency Style) */}
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
    </article>
  )
}


