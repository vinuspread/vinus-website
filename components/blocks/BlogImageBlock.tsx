import type { BlogImageBlock } from '@/types'
import BlogImageCarousel from './BlogImageCarousel'

export default function BlogImageBlock({ block }: { block: BlogImageBlock }) {
  if (block.images?.length) {
    return <BlogImageCarousel images={block.images} caption={block.caption} />
  }
  if (!block.src) return null
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.src}
        alt={block.alt ?? ''}
        className="max-w-full h-auto block mx-auto"
        data-pin-nopin="true"
      />
      {block.caption && (
        <figcaption className="mt-3 text-xs text-mine-shaft/30 text-left">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}
