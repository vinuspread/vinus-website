import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BlockRenderer from './BlockRenderer'
import type { Block } from '@/types'

describe('BlockRenderer', () => {
  it('renders text block', () => {
    const blocks: Block[] = [
      { id: '1', type: 'text', content: 'Hello World', motion: 'none' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders divider block', () => {
    const blocks: Block[] = [
      { id: '2', type: 'divider', height: 40, motion: 'none' },
    ]
    const { container } = render(<BlockRenderer blocks={blocks} />)
    const divider = container.querySelector('[style*="height: 40px"]')
    expect(divider).toBeTruthy()
  })

  it('renders file block with download link', () => {
    const blocks: Block[] = [
      { id: '3', type: 'file', url: '/test.pdf', label: 'Download PDF', motion: 'none' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    const link = screen.getByText('Download PDF')
    expect(link.closest('a')).toHaveAttribute('href', '/test.pdf')
  })

  it('renders empty array without error', () => {
    const { container } = render(<BlockRenderer blocks={[]} />)
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
