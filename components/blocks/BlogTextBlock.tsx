import type { BlogTextBlock } from '@/types'

export default function BlogTextBlock({ block }: { block: BlogTextBlock }) {
  if (block.variant === 'h2') {
    return (
      <h2 className="font-inter font-bold text-[clamp(24px,3vw,48px)] tracking-tight leading-tight text-mine-shaft">
        {block.content}
      </h2>
    )
  }
  if (block.variant === 'h3') {
    return (
      <h3 className="font-inter font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft">
        {block.content}
      </h3>
    )
  }
  return (
    <p className="font-inter text-[17px] text-mine-shaft/50 leading-[1.8] whitespace-pre-wrap">
      {block.content}
    </p>
  )
}
