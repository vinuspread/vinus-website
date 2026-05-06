import type { GalleryBlock as GalleryBlockType } from '@/types'
import SequenceGallery from './SequenceGallery'
import HorizontalSequenceGallery from './HorizontalSequenceGallery'

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const images = block.images ?? []
  if (block.layout === 'sequence-h') return <HorizontalSequenceGallery images={images} />
  return <SequenceGallery images={images} />
}
