// types/index.ts

export type MotionType = 'none' | 'fadeIn' | 'slideUp' | 'textReveal' | 'curtainReveal' | 'zoomIn' | 'stagger'
export type SpacingType = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type TextVariant = 'body' | 'heading' | 'subheading' | 'caption'
export type TextSize = '14' | '16' | '18' | '20'
export type TextWeight = 'regular' | 'medium' | 'bold'
export type TextLetterSpacing = '-2' | '-1.5' | '-1' | '-0.5' | '0'
export type TextFont = 'pretendard' | 'syne'
export type TextAlign = 'left' | 'center' | 'right'
export type ImageAlign = 'center' | 'full'
export type GalleryLayout = 'sequence' | 'sequence-h' | 'scroll-h'
export type ImageDisplayMode = 'normal' | 'parallax'
export type ThumbnailColumns = 2 | 3 | 4 | 5
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type HeadingWeight = 'light' | 'normal' | 'bold'
export type EmbedInputType = 'url' | 'code'
export type BlogTextVariant = 'paragraph' | 'h3'
export type BlogDividerStyle = 'line' | 'space'
export type CodeLanguage = 'javascript' | 'typescript' | 'css' | 'html' | 'bash' | 'json' | 'python' | 'text'

export interface TextBlock {
  id: string
  type: 'text'
  content: string
  variant?: TextVariant
  size?: TextSize
  weight?: TextWeight
  letterSpacing?: TextLetterSpacing
  font?: TextFont
  align?: TextAlign
  motion: MotionType
  spacing: SpacingType
}

export interface ImageBlock {
  id: string
  type: 'image'
  src: string
  alt: string
  displayMode?: ImageDisplayMode
  align?: ImageAlign
  containerHeight?: number
  fullWidth?: boolean
  motion: MotionType
  spacing: SpacingType
}

export interface GalleryBlock {
  id: string
  type: 'gallery'
  images: { src: string; alt: string }[]
  layout?: GalleryLayout
  fullWidth?: boolean
  motion: MotionType
  spacing: SpacingType
}

export interface MultiThumbnailBlock {
  id: string
  type: 'multi-thumbnail'
  images: { src: string; alt: string }[]
  columns?: ThumbnailColumns
  spacing: SpacingType
}

export interface VideoBlock {
  id: string
  type: 'video'
  url: string
  fullWidth?: boolean
  motion: MotionType
  spacing: SpacingType
}

export interface DividerBlock {
  id: string
  type: 'divider'
  height: number
  motion: MotionType
  spacing: SpacingType
}

export interface FileBlock {
  id: string
  type: 'file'
  url: string
  label: string
  motion: MotionType
  spacing: SpacingType
}

export interface HeadingTextBlock {
  id: string
  type: 'heading-text'
  heading: string
  body: string
  headingSize?: HeadingSize
  headingWeight?: HeadingWeight
  font?: TextFont
  align?: TextAlign
  bodySize?: TextSize
  bodyWeight?: TextWeight
  bodyLetterSpacing?: TextLetterSpacing
  motion: MotionType
  spacing: SpacingType
}

export interface EmbedBlock {
  id: string
  type: 'embed'
  embedType: EmbedInputType
  url: string
  code: string
  caption: string
  motion: MotionType
  spacing: SpacingType
}

export interface ScrollStorySlide {
  image: string
  title?: string
  body?: string
}

export interface ScrollStoryBlock {
  id: string
  type: 'scroll-story'
  layout: 'A' | 'B'
  slides: ScrollStorySlide[]
  spacing: SpacingType
}

export interface BlogTextBlock {
  id: string
  type: 'blog-text'
  variant: BlogTextVariant
  content: string
  spacing: SpacingType
}

export interface BlogQuoteBlock {
  id: string
  type: 'blog-quote'
  quote: string
  attribution?: string
  spacing: SpacingType
}

export interface BlogDividerBlock {
  id: string
  type: 'blog-divider'
  style: BlogDividerStyle
  spacing: SpacingType
}

export interface BlogLinkCardBlock {
  id: string
  type: 'blog-link-card'
  url: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogSiteName: string
  spacing: SpacingType
}

export interface BlogVideoBlock {
  id: string
  type: 'blog-video'
  url: string
  caption?: string
  aspectRatio?: string
  spacing: SpacingType
}

export interface BlogCodeBlock {
  id: string
  type: 'blog-code'
  code: string
  language: CodeLanguage
  spacing: SpacingType
}

export interface BlogHeadingTextBlock {
  id: string
  type: 'blog-heading-text'
  heading: string
  body: string
  spacing: SpacingType
}

export interface BlogImageBlock {
  id: string
  type: 'blog-image'
  src: string
  alt?: string
  caption?: string
  spacing: SpacingType
}

export interface BlogBulletItem {
  text: string
  level: 0 | 1
  href?: string
}

export interface BlogBulletBlock {
  id: string
  type: 'blog-bullet'
  items: BlogBulletItem[]
  spacing: SpacingType
}

export type Block = TextBlock | ImageBlock | GalleryBlock | MultiThumbnailBlock | VideoBlock | DividerBlock | FileBlock | HeadingTextBlock | EmbedBlock | ScrollStoryBlock | BlogTextBlock | BlogQuoteBlock | BlogDividerBlock | BlogLinkCardBlock | BlogVideoBlock | BlogCodeBlock | BlogHeadingTextBlock | BlogBulletBlock | BlogImageBlock

export interface Work {
  id: string
  slug: string
  title: string
  subtitle: string | null
  summary: string | null
  client_name: string | null
  category: string | null
  period: string | null
  hero_url: string | null
  hero_type: 'image' | 'video' | null
  thumbnail_url: string | null
  thumbnail_color: string | null
  blocks: Block[]
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  category: 'Story' | 'Download'
  thumbnail_url: string | null
  blocks: Block[]
  file_url: string | null
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
  is_published: boolean
}

export type Settings = Record<string, string | undefined>

declare global {
  interface Window {
    __lenis: import('lenis').default | undefined
  }
}
