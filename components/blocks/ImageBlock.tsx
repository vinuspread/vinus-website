import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  return (
    <div className="my-8 relative w-full">
      <Image
        src={block.src}
        alt={block.alt}
        width={1200}
        height={800}
        className="w-full h-auto rounded"
      />
    </div>
  )
}
