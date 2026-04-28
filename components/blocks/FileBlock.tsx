import type { FileBlock as FileBlockType } from '@/types'

export default function FileBlock({ block }: { block: FileBlockType }) {
  return (
    <div className="my-8">
      <a
        href={block.url}
        download
        className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors"
      >
        <span>↓</span>
        {block.label}
      </a>
    </div>
  )
}
