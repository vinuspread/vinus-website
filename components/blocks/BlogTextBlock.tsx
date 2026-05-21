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
      <p className="font-inter font-medium text-[clamp(18px,2vw,24px)] text-mine-shaft leading-[1.6] whitespace-pre-wrap break-keep">
        {block.content}
      </p>
    )
  }
  return (
    <p className="font-inter text-[16px] text-[#333333] leading-[1.8] whitespace-pre-wrap break-keep">
      {block.content}
    </p>
  )
}
