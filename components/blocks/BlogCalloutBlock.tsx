import type { BlogCalloutBlock } from '@/types'

export default function BlogCalloutBlock({ block }: { block: BlogCalloutBlock }) {
  return (
    <p className="font-inter text-[clamp(22px,3vw,36px)] font-medium leading-[1.4] tracking-tight text-mine-shaft text-center break-keep py-10 border-y border-mine-shaft/10">
      {block.text}
    </p>
  )
}
