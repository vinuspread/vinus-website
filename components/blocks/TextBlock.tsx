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

const VARIANT_CLASS: Record<string, string> = {
  body:       'prose prose-lg max-w-none',
  heading:    'text-4xl md:text-5xl font-bold leading-tight',
  subheading: 'text-2xl md:text-3xl font-semibold leading-snug',
  caption:    'text-sm text-gray-400 leading-relaxed',
}

const FONT_CLASS: Record<string, string> = {
  pretendard: '',
  syne:       'font-syne',
}

const ALIGN_CLASS: Record<string, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}

export default function TextBlock({ block }: { block: TextBlockType }) {
  // preserve plain-text line breaks as <br> before sanitization
  const withBreaks = block.content.replace(/\n/g, '<br>')
  const clean = sanitizeHtml(withBreaks, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  })

  const variant = block.variant ?? 'body'
  const cls = [
    VARIANT_CLASS[variant],
    FONT_CLASS[block.font ?? 'pretendard'],
    ALIGN_CLASS[block.align ?? 'left'],
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
