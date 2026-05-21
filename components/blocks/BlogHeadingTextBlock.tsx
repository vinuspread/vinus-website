import type { BlogHeadingTextBlock } from '@/types'

export default function BlogHeadingTextBlock({ block }: { block: BlogHeadingTextBlock }) {
  const level = block.headingLevel ?? 'h3'
  const headingClass = level === 'h3'
    ? 'font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft break-keep'
    : 'font-semibold text-[clamp(17px,1.5vw,22px)] tracking-tight leading-tight text-mine-shaft break-keep'

  return (
    <div>
      {level === 'h3'
        ? <h3 className={headingClass}>{block.heading}</h3>
        : <h5 className={headingClass}>{block.heading}</h5>
      }
      {block.body && (
        <p className="mt-4 text-[16px] text-[#333333] leading-[1.8] whitespace-pre-wrap break-keep">
          {block.body}
        </p>
      )}
    </div>
  )
}
