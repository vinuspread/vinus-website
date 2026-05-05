'use client'

import { useEffect, useRef } from 'react'
import type { HeadingTextBlock as HeadingTextBlockType } from '@/types'

const HEADING_SIZE_CLASS: Record<string, string> = {
  sm:    'text-[20px] md:text-[24px]',
  md:    'text-[22px] md:text-[28px]',
  lg:    'text-[26px] md:text-[32px]',
  xl:    'text-[28px] md:text-[36px]',
  '2xl': 'text-[32px] md:text-[40px]',
  '3xl': 'text-[40px] md:text-[60px]',
  '4xl': 'text-[48px] md:text-[80px]',
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

const BODY_SIZE_CLASS: Record<string, string> = {
  '14': 'text-sm',
  '16': 'text-base',
  '18': 'text-lg',
  '20': 'text-xl',
}

const BODY_WEIGHT_CLASS: Record<string, string> = {
  regular: 'font-normal',
  medium:  'font-medium',
  bold:    'font-bold',
}

const BODY_LETTER_SPACING_CLASS: Record<string, string> = {
  '-2':   'tracking-[-0.02em]',
  '-1.5': 'tracking-[-0.015em]',
  '-1':   'tracking-[-0.01em]',
  '-0.5': 'tracking-[-0.005em]',
  '0':    'tracking-normal',
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

  const bodyCls = [
    BODY_SIZE_CLASS[block.bodySize ?? '16'],
    BODY_WEIGHT_CLASS[block.bodyWeight ?? 'regular'],
    BODY_LETTER_SPACING_CLASS[block.bodyLetterSpacing ?? '0'],
    'leading-[1.3] text-gray-600 whitespace-pre-wrap',
    fontCls,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={`ht-block ${alignCls}`}>
      <h2 className={`ht-block-heading leading-tight tracking-tight ${headingSizeCls} ${headingWeightCls} ${fontCls}`}>
        {block.heading}
      </h2>
      {block.body && (
        <p className={`ht-block-body mt-6 ${bodyCls}`}>
          {block.body}
        </p>
      )}
    </div>
  )
}
