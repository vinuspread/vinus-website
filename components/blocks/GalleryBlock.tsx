import Image from 'next/image'
import type { GalleryBlock as GalleryBlockType } from '@/types'
import SequenceGallery from './SequenceGallery'
import HorizontalSequenceGallery from './HorizontalSequenceGallery'

const GRID_CLASS: Record<string, string> = {
  'grid-2': 'grid grid-cols-2 gap-3',
  'grid-3': 'grid grid-cols-2 md:grid-cols-3 gap-3',
}

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const layout = block.layout ?? 'grid-3'
  const images = block.images ?? []

  if (layout === 'sequence') return <SequenceGallery images={images} />
  if (layout === 'sequence-h') return <HorizontalSequenceGallery images={images} />

  return (
    <div className={GRID_CLASS[layout]}>
      {images.map((img, i) => (
        <div key={img.src || i} className="relative aspect-square overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  )
}
