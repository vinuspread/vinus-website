import type { TextBlock as TextBlockType } from '@/types'

export default function TextBlock({ block }: { block: TextBlockType }) {
  return (
    <div
      className="prose prose-lg max-w-none my-8"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  )
}
