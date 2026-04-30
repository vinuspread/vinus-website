import type { Block } from '@/types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import VideoBlock from './VideoBlock'
import DividerBlock from './DividerBlock'
import FileBlock from './FileBlock'
import HeadingTextBlock from './HeadingTextBlock'
import EmbedBlock from './EmbedBlock'
import BlockMotion from './BlockMotion'

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map(block => {
        const inner = (() => {
          switch (block.type) {
            case 'text':         return <TextBlock key={block.id} block={block} />
            case 'image':        return <ImageBlock key={block.id} block={block} />
            case 'gallery':      return <GalleryBlock key={block.id} block={block} />
            case 'video':        return <VideoBlock key={block.id} block={block} />
            case 'divider':      return <DividerBlock key={block.id} block={block} />
            case 'file':         return <FileBlock key={block.id} block={block} />
            case 'heading-text': return <HeadingTextBlock key={block.id} block={block} />
            case 'embed':        return <EmbedBlock key={block.id} block={block} />
            default:             return null
          }
        })()
        if (!inner) return null
        return (
          <div key={block.id} className={`block-spacing-${block.spacing ?? 'md'}`}>
            {block.type === 'heading-text' ? inner : (
              <BlockMotion motion={block.motion}>
                {inner}
              </BlockMotion>
            )}
          </div>
        )
      })}
    </div>
  )
}
