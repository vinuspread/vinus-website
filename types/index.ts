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
export type GalleryLayout = 'grid-2' | 'grid-3' | 'sequence' | 'sequence-h'
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type HeadingWeight = 'light' | 'normal' | 'bold'
export type EmbedInputType = 'url' | 'code'

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
  align?: ImageAlign
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

export type Block = TextBlock | ImageBlock | GalleryBlock | VideoBlock | DividerBlock | FileBlock | HeadingTextBlock | EmbedBlock

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
