import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  if (!block.src) return null

  const align = block.align ?? 'full'

  if (align === 'full') {
    return (
      <div className="-mx-6 md:-mx-16">
        <Image
          src={block.src}
          alt={block.alt}
          width={0}
          height={0}
          sizes="100vw"
          quality={90}
          className="w-full h-auto block"
        />
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Image
        src={block.src}
        alt={block.alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 80vw"
        quality={90}
        className="w-auto max-w-full h-auto block"
      />
    </div>
  )
}
