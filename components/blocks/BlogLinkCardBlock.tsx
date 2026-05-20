import type { BlogLinkCardBlock } from '@/types'

export default function BlogLinkCardBlock({ block }: { block: BlogLinkCardBlock }) {
  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border border-alto hover:border-mine-shaft/30 transition-colors overflow-hidden group no-underline"
    >
      {block.ogImage && (
        <div className="w-32 h-24 flex-shrink-0 relative overflow-hidden bg-gallery">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.ogImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col justify-center gap-1 min-w-0">
        {block.ogSiteName && (
          <p className="font-inter text-[11px] text-mine-shaft/30 uppercase tracking-widest">
            {block.ogSiteName}
          </p>
        )}
        <p className="font-inter font-medium text-sm text-mine-shaft leading-tight truncate group-hover:underline underline-offset-2">
          {block.ogTitle || block.url}
        </p>
        {block.ogDescription && (
          <p className="text-xs text-mine-shaft/40 line-clamp-2 leading-relaxed">
            {block.ogDescription}
          </p>
        )}
      </div>
    </a>
  )
}
