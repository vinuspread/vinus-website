import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders all nav items', () => {
    render(<Header />)
    expect(screen.getByText('We')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Request')).toBeInTheDocument()
  })

  it('does not render Download as top-level menu', () => {
    render(<Header />)
    const navLinks = screen.getAllByRole('link')
    const hrefs = navLinks.map(link => link.getAttribute('href'))
    expect(hrefs).not.toContain('/download')
  })

  it('renders Blog dropdown with Story and Download subcategories', () => {
    render(<Header />)
    expect(screen.getByText('Story')).toBeInTheDocument()
    expect(screen.getByText('Download')).toBeInTheDocument()
    expect(screen.getByText('Story').closest('a')).toHaveAttribute('href', '/blog?category=Story')
    expect(screen.getByText('Download').closest('a')).toHaveAttribute('href', '/blog?category=Download')
  })
})
