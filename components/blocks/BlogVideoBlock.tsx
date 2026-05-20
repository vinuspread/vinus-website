import type { BlogVideoBlock } from '@/types'

function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return null
}

export default function BlogVideoBlock({ block }: { block: BlogVideoBlock }) {
  const embedUrl = getEmbedUrl(block.url)
  if (!embedUrl) return null

  return (
    <figure>
      <div className="relative w-full aspect-video bg-gallery overflow-hidden">
        <iframe
          src={embedUrl}
          title={block.caption ?? 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 font-inter text-xs text-mine-shaft/30 text-left">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}
