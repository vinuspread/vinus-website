import sanitizeHtml from 'sanitize-html'
import type { TextBlock as TextBlockType } from '@/types'

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'strong', 'em', 'u', 's', 'del',
  'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span',
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height'],
  '*': ['class'],
}

export default function TextBlock({ block }: { block: TextBlockType }) {
  const clean = sanitizeHtml(block.content, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  })
  return (
    <div
      className="prose prose-lg max-w-none my-8"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
