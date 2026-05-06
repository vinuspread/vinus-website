import type { Block } from '@/types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import ParallaxImageBlock from './ParallaxImageBlock'
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
            case 'text':             return <TextBlock key={block.id} block={block} />
            case 'image':            return <ImageBlock key={block.id} block={block} />
            case 'parallax-image':   return <ParallaxImageBlock key={block.id} block={block} />
            case 'gallery':          return <GalleryBlock key={block.id} block={block} />
            case 'video':        return <VideoBlock key={block.id} block={block} />
            case 'divider':      return <DividerBlock key={block.id} block={block} />
            case 'file':         return <FileBlock key={block.id} block={block} />
            case 'heading-text': return <HeadingTextBlock key={block.id} block={block} />
            case 'embed':        return <EmbedBlock key={block.id} block={block} />
            default:             return null
          }
        })()
        if (!inner) return null

        const isFullWidth =
          block.type === 'image' ||
          block.type === 'parallax-image' ||
          block.type === 'gallery' ||
          ('fullWidth' in block && block.fullWidth === true)
        const wrapClass = isFullWidth
          ? `block-spacing-${block.spacing ?? 'md'} max-w-[1920px] mx-auto px-6 md:px-16`
          : `block-spacing-${block.spacing ?? 'md'} max-w-4xl mx-auto px-6 md:px-12`

        const skipMotion = block.type === 'heading-text' || block.type === 'gallery'

        return (
          <div key={block.id} className={wrapClass}>
            {skipMotion ? inner : (
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
