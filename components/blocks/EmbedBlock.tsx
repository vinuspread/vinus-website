import sanitizeHtml from 'sanitize-html'
import type { EmbedBlock as EmbedBlockType } from '@/types'

function toEmbedUrl(raw: string): string | null {
  try {
    const u = new URL(raw)

    // YouTube
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const videoId = u.hostname.includes('youtu.be')
        ? u.pathname.slice(1).split('?')[0]
        : u.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}?rel=0`
    }

    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (id) return `https://player.vimeo.com/video/${id}`
    }

    // Figma
    if (u.hostname.includes('figma.com')) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(raw)}`
    }

    // Google Maps share URL → embed
    if (u.hostname.includes('google.com') && u.pathname.includes('/maps')) {
      if (raw.includes('/embed')) return raw
      return `https://maps.google.com/maps?output=embed&q=${encodeURIComponent(raw)}`
    }

    // Generic — try using the URL as-is in an iframe
    return raw
  } catch {
    return null
  }
}

function getServiceLabel(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  if (url.includes('vimeo.com')) return 'Vimeo'
  if (url.includes('figma.com')) return 'Figma'
  if (url.includes('google.com/maps') || url.includes('maps.google')) return 'Google Maps'
  return '외부 콘텐츠'
}

const EMBED_CODE_ALLOW: sanitizeHtml.IOptions = {
  allowedTags: ['iframe', 'blockquote', 'a', 'p', 'br', 'img'],
  allowedAttributes: {
    iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow', 'title', 'style', 'loading'],
    blockquote: ['class', 'data-instgrm-permalink', 'data-instgrm-version', 'data-tweet-url', 'data-lang', 'cite'],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt'],
    p: ['class'],
  },
  allowedIframeHostnames: [
    'www.youtube.com', 'youtube.com',
    'player.vimeo.com',
    'www.figma.com',
    'maps.google.com', 'www.google.com',
    'open.spotify.com',
    'w.soundcloud.com',
    'codepen.io',
    'www.canva.com',
  ],
}

export default function EmbedBlock({ block }: { block: EmbedBlockType }) {
  if (block.embedType === 'code') {
    if (!block.code) return null
    const clean = sanitizeHtml(block.code, EMBED_CODE_ALLOW)
    return (
      <figure>
        <div
          className="w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
        {block.caption && (
          <figcaption className="mt-3 text-sm text-gray-400 text-center">{block.caption}</figcaption>
        )}
      </figure>
    )
  }

  // URL 모드
  if (!block.url) return null
  const embedUrl = toEmbedUrl(block.url)
  if (!embedUrl) return null
  const label = getServiceLabel(block.url)

  return (
    <figure>
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        <iframe
          src={embedUrl}
          title={block.caption || label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-sm text-gray-400 text-center">{block.caption}</figcaption>
      )}
    </figure>
  )
}
