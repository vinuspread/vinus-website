// components/admin/BlockEditor.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BlockEditor from './BlockEditor'
import type { Block } from '@/types'

const textBlock: Block = { id: '1', type: 'text', content: 'Hello', motion: 'none' }
const imageBlock: Block = { id: '2', type: 'image', src: '/a.jpg', alt: 'Alt', motion: 'none' }

describe('BlockEditor', () => {
  it('renders existing blocks', () => {
    render(<BlockEditor blocks={[textBlock]} onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument()
  })

  it('calls onChange when block content is updated', () => {
    const onChange = vi.fn()
    render(<BlockEditor blocks={[textBlock]} onChange={onChange} />)
    fireEvent.change(screen.getByDisplayValue('Hello'), { target: { value: 'World' } })
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ content: 'World' }),
    ])
  })

  it('moves block up when ↑ is clicked', () => {
    const onChange = vi.fn()
    render(<BlockEditor blocks={[textBlock, imageBlock]} onChange={onChange} />)
    const upButtons = screen.getAllByText('↑')
    fireEvent.click(upButtons[1])
    expect(onChange).toHaveBeenCalledWith([imageBlock, textBlock])
  })

  it('moves block down when ↓ is clicked', () => {
    const onChange = vi.fn()
    render(<BlockEditor blocks={[textBlock, imageBlock]} onChange={onChange} />)
    const downButtons = screen.getAllByText('↓')
    fireEvent.click(downButtons[0])
    expect(onChange).toHaveBeenCalledWith([imageBlock, textBlock])
  })

  it('removes block when delete is clicked', () => {
    const onChange = vi.fn()
    render(<BlockEditor blocks={[textBlock, imageBlock]} onChange={onChange} />)
    const deleteButtons = screen.getAllByText('삭제')
    fireEvent.click(deleteButtons[0])
    expect(onChange).toHaveBeenCalledWith([imageBlock])
  })

  it('first block ↑ button is disabled', () => {
    render(<BlockEditor blocks={[textBlock, imageBlock]} onChange={vi.fn()} />)
    const upButtons = screen.getAllByText('↑')
    expect(upButtons[0]).toBeDisabled()
  })

  it('last block ↓ button is disabled', () => {
    render(<BlockEditor blocks={[textBlock, imageBlock]} onChange={vi.fn()} />)
    const downButtons = screen.getAllByText('↓')
    expect(downButtons[1]).toBeDisabled()
  })
})
