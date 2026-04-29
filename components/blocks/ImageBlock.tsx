import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'
import SequenceGallery from './SequenceGallery'

const SIZE_STYLE: Record<string, React.CSSProperties> = {
  sm:   { maxWidth: '20rem', marginLeft: 'auto', marginRight: 'auto' },
  md:   { maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' },
  lg:   { maxWidth: '52rem', marginLeft: 'auto', marginRight: 'auto' },
  full: {},
}

function SingleImage({ src, alt, size }: { src: string; alt: string; size?: string }) {
  return (
    <div style={SIZE_STYLE[size ?? 'full']}>
      <div className="relative w-full aspect-video overflow-hidden">
        <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 80vw" />
      </div>
    </div>
  )
}

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  const layout = block.layout ?? 'single'

  if (layout === 'single') {
    if (!block.src) return null
    return <SingleImage src={block.src} alt={block.alt} size={block.size} />
  }

  const images = block.images ?? []

  if (layout === 'sequence') {
    return <SequenceGallery images={images} />
  }

  const cols = layout === 'pair' ? 'grid-cols-2' : 'grid-cols-3'
  return (
    <div className={`grid ${cols} gap-3`}>
      {images.map((img, i) => (
        <div key={i} className="relative aspect-square overflow-hidden">
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
        </div>
      ))}
    </div>
  )
}
