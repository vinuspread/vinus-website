import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'

const SIZE_CLASS: Record<string, string> = {
  sm:   'max-w-xs mx-auto',
  md:   'max-w-xl mx-auto',
  lg:   'max-w-3xl mx-auto',
  full: 'w-full',
}

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  if (!block.src) return null
  return (
    <div className={SIZE_CLASS[block.size ?? 'full']}>
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={block.src}
          alt={block.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    </div>
  )
}
