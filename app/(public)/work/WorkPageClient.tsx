'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { ProjectCard } from '@/components/common/ProjectCard'
import type { Work } from '@/types'

const CATEGORIES = ['All', 'UI/UX', 'Branding', 'Web', 'App', 'Etc'] as const
type Category = typeof CATEGORIES[number]

export function WorkPageClient({ works }: { works: Work[] }) {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All'
    ? works
    : works.filter((w) => w.category?.toLowerCase().includes(active.toLowerCase()))

  const count = (cat: Category) =>
    cat === 'All' ? works.length : works.filter((w) => w.category?.toLowerCase().includes(cat.toLowerCase())).length

  return (
    <main className="bg-white">
      <PageHeader
        breadcrumb="Experience"
        sideLabel={`${works.length} Projects`}
        noBorder
        title={<>Seamless new <span className="font-bold">experiences</span></>}
        description={
          <>
            <span className="block">
              우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며,
            </span>
            <span className="block mt-[4px]">
              새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다.
            </span>
          </>
        }
      />

      {/* Category Filter */}
      <div className="px-page-padding border-b border-alto flex items-center gap-[32px] py-[20px]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[12px] uppercase tracking-[0.1em] font-inter pb-[2px] transition-all duration-300 ${
              active === cat
                ? 'text-mine-shaft border-b border-mine-shaft'
                : 'text-mine-shaft/40 hover:text-mine-shaft'
            }`}
          >
            {cat}
            <span className="ml-[6px] opacity-50">{count(cat)}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="py-24 px-page-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {filtered.map((work, i) => (
            <ProjectCard
              key={work.slug}
              src={work.thumbnail_url ?? work.hero_url ?? ''}
              alt={work.title}
              category={work.category ?? ''}
              title={work.title}
              href={`/work/${work.slug}`}
              index={i}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
