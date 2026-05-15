'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import type { Work } from '@/types'

interface WorkGridProps {
  works: Work[]
}

export function WorkGrid({ works }: WorkGridProps) {
  const revealRef = useReveal()

  return (
    <div ref={revealRef as any} className="anim-wrap grid grid-cols-1 md:grid-cols-2">
      {works.map((work, i) => (
        <Link
          key={work.slug}
          href={`/work/${work.slug}`}
          className="aspect-[920/640] overflow-hidden relative group border-b border-alto md:even:border-l"
          data-cursor="VIEW"
        >
          <div className="anim-clip w-full h-full">
            <div
              className="anim-move-up-img w-full h-full relative"
              data-delay={i % 2 === 0 ? 0 : 60}
            >
              {work.thumbnail_url ? (
                <Image
                  src={work.thumbnail_url}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: work.thumbnail_color ?? '#d6d6d6' }} />
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-[40px] z-10 w-full pointer-events-none">
            {work.category && (
              <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-2 anim-clip block">
                <span className="anim-move-up" data-delay={(i % 2) * 60 + 100}>
                  {work.category}
                </span>
              </p>
            )}
            <h3 className="text-[24px] text-white uppercase tracking-[-0.7px] leading-tight anim-clip block">
              <span className="anim-move-up" data-delay={(i % 2) * 60 + 200}>
                {work.title}
              </span>
            </h3>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      ))}
    </div>
  )
}
