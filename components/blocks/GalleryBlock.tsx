import type { GalleryBlock as GalleryBlockType, MotionType } from '@/types'
import SequenceGallery from './SequenceGallery'
import HorizontalSequenceGallery from './HorizontalSequenceGallery'

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const images = block.images ?? []
  const motion: MotionType = block.motion ?? 'none'
  return (
    <div className="-mx-6 md:-mx-16">
      {block.layout === 'sequence-h'
        ? <HorizontalSequenceGallery images={images} motion={motion} />
        : <SequenceGallery images={images} motion={motion} />}
    </div>
  )
}
