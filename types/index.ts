// types/index.ts

export type MotionType = 'none' | 'fadeIn' | 'slideUp' | 'textReveal' | 'curtainReveal' | 'zoomIn' | 'stagger'
export type SpacingType = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface TextBlock {
  id: string
  type: 'text'
  content: string
  motion: MotionType
  spacing: SpacingType
}

export interface ImageBlock {
  id: string
  type: 'image'
  src: string
  alt: string
  motion: MotionType
  spacing: SpacingType
}

export interface GalleryBlock {
  id: string
  type: 'gallery'
  images: { src: string; alt: string }[]
  motion: MotionType
  spacing: SpacingType
}

export interface VideoBlock {
  id: string
  type: 'video'
  url: string
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

export type Block = TextBlock | ImageBlock | GalleryBlock | VideoBlock | DividerBlock | FileBlock

export interface Work {
  id: string
  slug: string
  title: string
  category: string | null
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
