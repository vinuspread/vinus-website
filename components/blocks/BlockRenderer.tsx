import type { Block } from '@/types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import VideoBlock from './VideoBlock'
import DividerBlock from './DividerBlock'
import FileBlock from './FileBlock'

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map(block => {
        switch (block.type) {
          case 'text':    return <TextBlock key={block.id} block={block} />
          case 'image':   return <ImageBlock key={block.id} block={block} />
          case 'gallery': return <GalleryBlock key={block.id} block={block} />
          case 'video':   return <VideoBlock key={block.id} block={block} />
          case 'divider': return <DividerBlock key={block.id} block={block} />
          case 'file':    return <FileBlock key={block.id} block={block} />
        }
      })}
    </div>
  )
}
