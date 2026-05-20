import Image from 'next/image'
import type { BlogImageBlock } from '@/types'
import BlogImageCarousel from './BlogImageCarousel'

export default function BlogImageBlock({ block }: { block: BlogImageBlock }) {
  if (block.images?.length) {
    return <BlogImageCarousel images={block.images} caption={block.caption} />
  }
  if (!block.src) return null
  return (
    <figure>
      <div className="relative w-full overflow-hidden bg-gallery">
        <Image
          src={block.src}
          alt={block.alt ?? ''}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          data-pin-nopin="true"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-xs text-mine-shaft/30 text-left">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}
