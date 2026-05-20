import type { BlogQuoteBlock } from '@/types'

export default function BlogQuoteBlock({ block }: { block: BlogQuoteBlock }) {
  return (
    <blockquote className="pl-10 border-l-2 border-mine-shaft/10 italic text-[clamp(10px,1.25vw,18px)] text-mine-shaft/40 leading-tight">
      <p>{block.quote}</p>
      {block.attribution && (
        <cite className="block mt-4 not-italic text-[7px] text-mine-shaft/30">
          — {block.attribution}
        </cite>
      )}
    </blockquote>
  )
}
