'use client'

import { useReveal } from '@/hooks/useReveal'
import { Clip } from '@/components/common/Clip'

interface Props {
  category: string
  date: string
  title: string
  metaDescription?: string | null
}

export function StoryHero({ category, date, title, metaDescription }: Props) {
  const ref = useReveal()

  return (
    <header ref={ref} className="anim-wrap px-page-padding pt-[140px] md:pt-[200px] pb-[80px]">
      <div className="flex flex-col gap-8 max-w-[900px]">
        <div className="flex items-center gap-4">
          <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/30">
            <Clip>{category}</Clip>
          </span>
          <span className="w-1 h-1 rounded-full bg-mine-shaft/10" />
          <span className="font-inter text-[12px] text-mine-shaft/20">
            <Clip delay={30}>{date}</Clip>
          </span>
        </div>

        <h1 className="font-inter font-bold text-mine-shaft text-[clamp(26px,4vw,64px)] tracking-tight leading-[1.0]">
          <Clip delay={80}>{title}</Clip>
        </h1>

        {metaDescription && (
          <p className="font-inter text-mine-shaft/50 text-[clamp(18px,2vw,28px)] leading-snug max-w-[600px]">
            <Clip delay={120}>{metaDescription}</Clip>
          </p>
        )}
      </div>
    </header>
  )
}
