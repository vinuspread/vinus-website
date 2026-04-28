// types/index.test.ts
import { describe, it, expect } from 'vitest'
import type { Block, Work } from './index'

describe('Block types', () => {
  it('TextBlock has required fields', () => {
    const block: Block = {
      id: '1',
      type: 'text',
      content: 'Hello',
      motion: 'fadeIn',
    }
    expect(block.type).toBe('text')
  })

  it('ImageBlock has src and alt', () => {
    const block: Block = {
      id: '2',
      type: 'image',
      src: '/image.jpg',
      alt: 'test image',
      motion: 'curtainReveal',
    }
    expect(block.type).toBe('image')
  })
})

describe('Work type', () => {
  it('Work has required fields', () => {
    const work: Work = {
      id: 'uuid-1',
      slug: 'test-project',
      title: 'Test Project',
      category: 'UX/UI',
      thumbnail_url: '/thumb.jpg',
      thumbnail_color: 'rgba(0,0,0,0.9)',
      blocks: [],
      meta_title: null,
      meta_description: null,
      is_published: true,
      sort_order: 1,
      created_at: '2025-01-01T00:00:00Z',
    }
    expect(work.slug).toBe('test-project')
  })
})
