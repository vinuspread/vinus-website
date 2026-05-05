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

const SIZE_CLASS: Record<string, string> = {
  '14': 'text-sm',
  '16': 'text-base',
  '18': 'text-lg',
  '20': 'text-xl',
}

const WEIGHT_CLASS: Record<string, string> = {
  regular: 'font-normal',
  medium:  'font-medium',
  bold:    'font-bold',
}

const LETTER_SPACING_CLASS: Record<string, string> = {
  '-2':   'tracking-[-0.02em]',
  '-1.5': 'tracking-[-0.015em]',
  '-1':   'tracking-[-0.01em]',
  '-0.5': 'tracking-[-0.005em]',
  '0':    'tracking-normal',
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
  const withBreaks = block.content.replace(/\n/g, '<br>')
  const clean = sanitizeHtml(withBreaks, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  })

  const cls = [
    SIZE_CLASS[block.size ?? '16'],
    WEIGHT_CLASS[block.weight ?? 'regular'],
    LETTER_SPACING_CLASS[block.letterSpacing ?? '0'],
    'leading-[1.8]',
    FONT_CLASS[block.font ?? 'pretendard'],
    ALIGN_CLASS[block.align ?? 'left'],
  ].filter(Boolean).join(' ')

  return (
    <p
      className={cls}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
