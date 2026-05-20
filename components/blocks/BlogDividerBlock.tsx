import type { BlogDividerBlock } from '@/types'

export default function BlogDividerBlock({ block }: { block: BlogDividerBlock }) {
  if (block.style === 'line') {
    return <hr className="border-t border-alto" />
  }
  return <div className="h-16" />
}
