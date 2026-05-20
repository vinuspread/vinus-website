import type { BlogBulletBlock } from '@/types'

export default function BlogBulletBlock({ block }: { block: BlogBulletBlock }) {
  if (!block.items?.length) return null
  return (
    <ul className="space-y-2">
      {block.items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2 text-[16px] md:text-[18px] text-[#333333] leading-[1.7] ${item.level === 1 ? 'ml-6' : ''}`}
        >
          <span className={`mt-[0.45em] shrink-0 rounded-full bg-mine-shaft/40 ${item.level === 1 ? 'w-1 h-1' : 'w-1.5 h-1.5'}`} />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  )
}
