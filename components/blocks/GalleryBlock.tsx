import type { GalleryBlock as GalleryBlockType } from '@/types'
import SequenceGallery from './SequenceGallery'
import HorizontalSequenceGallery from './HorizontalSequenceGallery'
import ScrollHGallery from './ScrollHGallery'

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const images = block.images ?? []

  if (block.layout === 'scroll-h') {
    return (
      <div className="-mx-6 md:-mx-16 w-[calc(100%+3rem)] md:w-[calc(100%+8rem)]">
        <ScrollHGallery images={images} />
      </div>
    )
  }

  return (
    <div className="-mx-6 md:-mx-16">
      {block.layout === 'sequence-h'
        ? <HorizontalSequenceGallery images={images} />
        : <SequenceGallery images={images} />}
    </div>
  )
}
