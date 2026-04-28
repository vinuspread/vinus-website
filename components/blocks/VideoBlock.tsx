import type { VideoBlock as VideoBlockType } from '@/types'

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/
  )
  return match ? match[1] : null
}

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const youtubeId = getYoutubeId(block.url)

  if (youtubeId) {
    return (
      <div className="my-8 relative aspect-video w-full rounded overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded video"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-fullscreen"
        />
      </div>
    )
  }

  return (
    <div className="my-8">
      <video src={block.url} controls className="w-full rounded">
        <p>이 브라우저는 동영상 재생을 지원하지 않습니다.</p>
      </video>
    </div>
  )
}
