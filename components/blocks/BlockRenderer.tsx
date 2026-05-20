import type { Block } from '@/types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import MultiThumbnailBlock from './MultiThumbnailBlock'
import VideoBlock from './VideoBlock'
import DividerBlock from './DividerBlock'
import FileBlock from './FileBlock'
import HeadingTextBlock from './HeadingTextBlock'
import EmbedBlock from './EmbedBlock'
import ScrollStoryBlock from './ScrollStoryBlock'
import BlockMotion from './BlockMotion'
import BlogTextBlock from './BlogTextBlock'
import BlogQuoteBlock from './BlogQuoteBlock'
import BlogDividerBlock from './BlogDividerBlock'
import BlogLinkCardBlock from './BlogLinkCardBlock'
import BlogVideoBlock from './BlogVideoBlock'
import BlogCodeBlock from './BlogCodeBlock'

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map(block => {
        const inner = (() => {
          switch (block.type) {
            case 'text':              return <TextBlock key={block.id} block={block} />
            case 'image':             return <ImageBlock key={block.id} block={block} />
            case 'gallery':           return <GalleryBlock key={block.id} block={block} />
            case 'multi-thumbnail':   return <MultiThumbnailBlock key={block.id} block={block} />
            case 'video':             return <VideoBlock key={block.id} block={block} />
            case 'divider':           return <DividerBlock key={block.id} block={block} />
            case 'file':              return <FileBlock key={block.id} block={block} />
            case 'heading-text':      return <HeadingTextBlock key={block.id} block={block} />
            case 'embed':             return <EmbedBlock key={block.id} block={block} />
            case 'scroll-story':      return <ScrollStoryBlock key={block.id} block={block} />
            case 'blog-text':         return <BlogTextBlock key={block.id} block={block} />
            case 'blog-quote':        return <BlogQuoteBlock key={block.id} block={block} />
            case 'blog-divider':      return <BlogDividerBlock key={block.id} block={block} />
            case 'blog-link-card':    return <BlogLinkCardBlock key={block.id} block={block} />
            case 'blog-video':        return <BlogVideoBlock key={block.id} block={block} />
            case 'blog-code':         return <BlogCodeBlock key={block.id} block={block} />
            default:                  return null
          }
        })()
        if (!inner) return null

        // scroll-story: 뷰포트 전체 사용, 래퍼 없이 직접 렌더
        if (block.type === 'scroll-story') {
          return (
            <div key={block.id} className={`block-spacing-${block.spacing ?? 'lg'}`}>
              {inner}
            </div>
          )
        }

        const isFullWidth =
          block.type === 'image' ||
          block.type === 'gallery' ||
          ('fullWidth' in block && block.fullWidth === true)

        // 패럴랙스·스크롤 갤러리는 뷰포트 전체 폭 사용 — 래퍼 max-width/padding 없음
        const isEdgeFull =
          (block.type === 'image' && block.displayMode === 'parallax') ||
          (block.type === 'gallery' && block.layout === 'scroll-h')

        const spacingClass = `block-spacing-${block.spacing ?? 'md'}`
        // spacing-none 이미지/갤러리 블록은 -mb-px 로 서브픽셀 틈 제거
        const noGapOverlap =
          block.spacing === 'none' &&
          (block.type === 'image' || block.type === 'gallery' || block.type === 'multi-thumbnail')
            ? ' -mb-px'
            : ''
        const wrapClass = isEdgeFull
          ? `${spacingClass}${noGapOverlap} edge-full`
          : isFullWidth
            ? `${spacingClass}${noGapOverlap} max-w-[1920px] mx-auto px-6 md:px-16`
            : `${spacingClass}${noGapOverlap} max-w-4xl mx-auto px-6 md:px-12`

        const skipMotion =
          block.type === 'heading-text' ||
          block.type === 'gallery' ||
          block.type === 'image' ||
          block.type === 'multi-thumbnail'

        return (
          <div key={block.id} className={wrapClass}>
            {skipMotion || !('motion' in block) ? inner : (
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
