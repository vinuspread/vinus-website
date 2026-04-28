import Image from 'next/image'
import type { GalleryBlock as GalleryBlockType } from '@/types'

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-3">
      {block.images.map((img, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}
