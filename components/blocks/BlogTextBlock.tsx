import type { BlogTextBlock } from '@/types'

export default function BlogTextBlock({ block }: { block: BlogTextBlock }) {
  if (block.variant === 'h3') {
    return (
      <h3 className="font-inter font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft">
        {block.content}
      </h3>
    )
  }
  return (
    <p className="font-inter text-[20px] text-[#333333] leading-[1.8] whitespace-pre-wrap">
      {block.content}
    </p>
  )
}
