import type { BlogQuoteBlock } from '@/types'

export default function BlogQuoteBlock({ block }: { block: BlogQuoteBlock }) {
  return (
    <blockquote className="pl-10 border-l-2 border-mine-shaft/10 italic text-[clamp(20px,2.5vw,36px)] font-inter text-mine-shaft/40 leading-tight">
      <p>{block.quote}</p>
      {block.attribution && (
        <cite className="block mt-4 font-inter not-italic text-sm text-mine-shaft/30">
          — {block.attribution}
        </cite>
      )}
    </blockquote>
  )
}
