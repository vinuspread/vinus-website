import type { BlogHeadingTextBlock } from '@/types'

export default function BlogHeadingTextBlock({ block }: { block: BlogHeadingTextBlock }) {
  return (
    <div>
      <h3 className="font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft break-keep">
        {block.heading}
      </h3>
      {block.body && (
        <p className="mt-4 text-[16px] text-[#333333] leading-[1.8] whitespace-pre-wrap break-keep">
          {block.body}
        </p>
      )}
    </div>
  )
}
