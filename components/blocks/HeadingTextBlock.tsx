'use client'

import { useEffect, useRef } from 'react'
import type { HeadingTextBlock as HeadingTextBlockType } from '@/types'

const HEADING_SIZE_CLASS: Record<string, string> = {
  sm:  'text-2xl md:text-3xl',
  md:  'text-3xl md:text-4xl',
  lg:  'text-4xl md:text-5xl',
  xl:  'text-5xl md:text-6xl',
  '2xl': 'text-6xl md:text-8xl',
}

const HEADING_WEIGHT_CLASS: Record<string, string> = {
  light:  'font-light',
  normal: 'font-normal',
  bold:   'font-bold',
}

const ALIGN_CLASS: Record<string, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}

const FONT_CLASS: Record<string, string> = {
  pretendard: '',
  syne:       'font-syne',
}

export default function HeadingTextBlock({ block }: { block: HeadingTextBlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const align = block.align ?? 'left'
  const alignCls = ALIGN_CLASS[align]
  const fontCls = FONT_CLASS[block.font ?? 'pretendard']
  const headingSizeCls = HEADING_SIZE_CLASS[block.headingSize ?? 'md']
  const headingWeightCls = HEADING_WEIGHT_CLASS[block.headingWeight ?? 'normal']

  return (
    <div ref={ref} className={`ht-block ${alignCls}`}>
      <h2 className={`ht-block-heading leading-tight tracking-tight ${headingSizeCls} ${headingWeightCls} ${fontCls}`}>
        {block.heading}
      </h2>
      {block.body && (
        <p className={`ht-block-body mt-6 text-base md:text-lg leading-relaxed text-gray-600 whitespace-pre-wrap ${fontCls}`}>
          {block.body}
        </p>
      )}
    </div>
  )
}
