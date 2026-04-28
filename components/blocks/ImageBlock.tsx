import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  return (
    <div className="my-8 relative w-full aspect-video overflow-hidden rounded">
      <Image
        src={block.src}
        alt={block.alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 80vw"
      />
    </div>
  )
}
