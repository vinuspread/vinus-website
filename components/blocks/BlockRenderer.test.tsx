import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BlockRenderer from './BlockRenderer'
import type { Block } from '@/types'

describe('BlockRenderer', () => {
  it('renders text block', () => {
    const blocks: Block[] = [
      { id: '1', type: 'text', content: 'Hello World', motion: 'none', spacing: 'md' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders divider block', () => {
    const blocks: Block[] = [
      { id: '2', type: 'divider', height: 40, motion: 'none', spacing: 'md' },
    ]
    const { container } = render(<BlockRenderer blocks={blocks} />)
    const divider = container.querySelector('[style*="height: 40px"]')
    expect(divider).toBeTruthy()
  })

  it('renders file block with download link', () => {
    const blocks: Block[] = [
      { id: '3', type: 'file', url: '/test.pdf', label: 'Download PDF', motion: 'none', spacing: 'md' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    const link = screen.getByText('Download PDF')
    expect(link.closest('a')).toHaveAttribute('href', '/test.pdf')
    expect(link.closest('a')).toHaveAttribute('download')
  })

  it('renders empty array without error', () => {
    const { container } = render(<BlockRenderer blocks={[]} />)
    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('renders image block with correct alt text', () => {
    const blocks: Block[] = [
      { id: '4', type: 'image', src: '/test.jpg', alt: 'Test image', motion: 'none', spacing: 'md' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('renders gallery block with correct number of images', () => {
    const blocks: Block[] = [
      {
        id: '5',
        type: 'gallery',
        images: [
          { src: '/a.jpg', alt: 'Image A' },
          { src: '/b.jpg', alt: 'Image B' },
          { src: '/c.jpg', alt: 'Image C' },
        ],
        motion: 'none',
        spacing: 'md',
      },
    ]
    render(<BlockRenderer blocks={blocks} />)
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('renders video block with YouTube embed', () => {
    const blocks: Block[] = [
      { id: '6', type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', motion: 'none', spacing: 'md' },
    ]
    const { container } = render(<BlockRenderer blocks={blocks} />)
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeTruthy()
    expect(iframe?.getAttribute('src')).toContain('dQw4w9WgXcQ')
  })
})
