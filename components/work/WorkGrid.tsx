'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import type { Work } from '@/types'

function WorkGridItem({ work }: { work: Work }) {
  const revealRef = useReveal()
  const imgSrc = work.hero_url || work.thumbnail_url

  return (
    <div
      ref={revealRef as React.RefObject<HTMLDivElement>}
      className="anim-wrap border-b border-alto md:odd:border-r"
    >
      <Link
        href={`/work/${work.slug}`}
        className="aspect-[920/640] overflow-hidden relative group block"
      >
        {imgSrc ? (
          /* 1단계: 회색 박스가 아래에서 위로 슬라이드 */
          <div className="anim-box-reveal absolute inset-0" data-delay="0">
            {/* 2단계: 이미지가 박스 안에서 뒤따라 슬라이드 */}
            <div className="anim-img-inner w-full h-full relative" data-delay="200">
              <Image
                src={imgSrc}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: work.thumbnail_color ?? '#d6d6d6' }}
          />
        )}

        {/* 오버레이 콘텐츠 */}
        <div className="absolute bottom-0 left-0 p-[40px] z-10 w-full pointer-events-none">
          {work.category && (
            <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-2 anim-clip block">
              <span className="anim-move-up" data-delay="100">
                {work.category}
              </span>
            </p>
          )}
          <h3 className="text-[24px] text-white uppercase tracking-[-0.7px] leading-tight anim-clip block">
            <span className="anim-move-up" data-delay="200">
              {work.title}
            </span>
          </h3>
        </div>

        {/* 호버 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </div>
  )
}

export default function WorkGrid({ works }: { works: Work[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {works.map(work => (
        <WorkGridItem key={work.id} work={work} />
      ))}
    </div>
  )
}
