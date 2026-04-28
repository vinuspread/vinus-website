import type { DividerBlock as DividerBlockType } from '@/types'

export default function DividerBlock({ block }: { block: DividerBlockType }) {
  return <div style={{ height: `${block.height}px` }} aria-hidden="true" />
}
