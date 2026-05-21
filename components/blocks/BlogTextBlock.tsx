import type { BlogTextBlock } from '@/types'

export default function BlogTextBlock({ block }: { block: BlogTextBlock }) {
  if (block.variant === 'h3') {
    return (
      <h3 className="font-inter font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft break-keep">
        {block.content}
      </h3>
    )
  }
  if (block.variant === 'lead') {
    return (
      <p className="text-[clamp(18px,2vw,24px)] text-mine-shaft leading-[1.6] tracking-tight whitespace-pre-wrap break-keep font-bold italic" style={{ fontFamily: 'var(--font-noto-serif-kr)' }}>
        {block.content}
      </p>
    )
  }
  return (
    <p className={`font-inter text-[16px] text-[#333333] leading-[1.8] whitespace-pre-wrap break-keep ${block.bold ? 'font-bold' : ''}`}>
      {block.content}
    </p>
  )
}
