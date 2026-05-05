import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkCard from './WorkCard'
import type { Work } from '@/types'

const mockWork: Work = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  subtitle: null,
  summary: null,
  client_name: null,
  category: 'web',
  period: null,
  hero_url: null,
  hero_type: null,
  thumbnail_url: '/test.jpg',
  thumbnail_color: 'rgba(78,78,78,0.9)',
  blocks: [],
  meta_title: null,
  meta_description: null,
  is_published: true,
  sort_order: 1,
  created_at: '2024-03-01T00:00:00Z',
}

describe('WorkCard', () => {
  it('renders title', () => {
    render(<WorkCard work={mockWork} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('links to correct slug', () => {
    render(<WorkCard work={mockWork} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/work/test-project')
  })

  it('renders date', () => {
    render(<WorkCard work={mockWork} />)
    expect(screen.getByText('2024.03')).toBeInTheDocument()
  })
})
