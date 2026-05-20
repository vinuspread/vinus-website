'use client'

import { useState, useRef, useEffect } from 'react'
import type { Block, BlogTextVariant, BlogDividerStyle, CodeLanguage } from '@/types'
import type { BlogTextBlock, BlogQuoteBlock, BlogDividerBlock, BlogLinkCardBlock, BlogVideoBlock, BlogCodeBlock, BlogHeadingTextBlock, BlogBulletBlock } from '@/types'

type BlogBlock = BlogTextBlock | BlogQuoteBlock | BlogDividerBlock | BlogLinkCardBlock | BlogVideoBlock | BlogCodeBlock | BlogHeadingTextBlock | BlogBulletBlock
type BlogBlockType = BlogBlock['type']

interface Props {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const BLOG_BLOCK_TYPES: { value: BlogBlockType; label: string }[] = [
  { value: 'blog-text',         label: '텍스트' },
  { value: 'blog-heading-text', label: '제목+내용' },
  { value: 'blog-bullet',       label: '불릿 목록' },
  { value: 'blog-quote',        label: '인용구' },
  { value: 'blog-divider',      label: '구분선' },
  { value: 'blog-link-card',    label: '링크 카드' },
  { value: 'blog-video',        label: '동영상' },
  { value: 'blog-code',         label: '코드 블록' },
]

const CODE_LANGUAGES: CodeLanguage[] = ['javascript', 'typescript', 'css', 'html', 'bash', 'json', 'python', 'text']

function createBlogBlock(type: BlogBlockType): BlogBlock {
  const id = crypto.randomUUID()
  switch (type) {
    case 'blog-text':         return { id, type, variant: 'paragraph', content: '', spacing: 'md' }
    case 'blog-heading-text': return { id, type, heading: '', body: '', spacing: 'md' }
    case 'blog-bullet':       return { id, type, items: [{ text: '', level: 0 as const }], spacing: 'md' }
    case 'blog-quote':        return { id, type, quote: '', attribution: '', spacing: 'md' }
    case 'blog-divider':      return { id, type, style: 'line', spacing: 'lg' }
    case 'blog-link-card':    return { id, type, url: '', ogTitle: '', ogDescription: '', ogImage: '', ogSiteName: '', spacing: 'md' }
    case 'blog-video':        return { id, type, url: '', caption: '', spacing: 'md' }
    case 'blog-code':         return { id, type, code: '', language: 'javascript', spacing: 'md' }
  }
}

function isBlogBlock(b: Block): b is BlogBlock {
  return b.type === 'blog-text' || b.type === 'blog-heading-text' || b.type === 'blog-bullet' ||
    b.type === 'blog-quote' || b.type === 'blog-divider' || b.type === 'blog-link-card' ||
    b.type === 'blog-video' || b.type === 'blog-code'
}

function moveUp(blocks: Block[], index: number): Block[] {
  if (index === 0) return blocks
  const next = [...blocks]
  ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
  return next
}

function moveDown(blocks: Block[], index: number): Block[] {
  if (index === blocks.length - 1) return blocks
  const next = [...blocks]
  ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
  return next
}

function updateBlock(blocks: Block[], index: number, updated: Block): Block[] {
  return blocks.map((b, i) => (i === index ? updated : b))
}

function removeBlock(blocks: Block[], index: number): Block[] {
  return blocks.filter((_, i) => i !== index)
}

const BLOCK_LABELS: Record<BlogBlockType, string> = {
  'blog-text':         '텍스트',
  'blog-heading-text': '제목+내용',
  'blog-bullet':       '불릿 목록',
  'blog-quote':        '인용구',
  'blog-divider':      '구분선',
  'blog-link-card':    '링크 카드',
  'blog-video':        '동영상',
  'blog-code':         '코드 블록',
}

export default function BlogBlockEditor({ blocks, onChange }: Props) {
  const [addType, setAddType] = useState<BlogBlockType>('blog-text')
  const [fetchingOg, setFetchingOg] = useState<Record<string, boolean>>({})
  const [movedId, setMovedId] = useState<string | null>(null)
  const blocksRef = useRef(blocks)
  useEffect(() => { blocksRef.current = blocks }, [blocks])

  function handleMove(newBlocks: Block[], movedBlockId: string) {
    onChange(newBlocks)
    setMovedId(movedBlockId)
    setTimeout(() => setMovedId(null), 800)
  }

  function handleAdd() {
    onChange([...blocks, createBlogBlock(addType)])
  }

  async function fetchOg(blockId: string, index: number, url: string) {
    if (!url) return
    setFetchingOg(prev => ({ ...prev, [blockId]: true }))
    try {
      const res = await fetch(`/api/admin/og?url=${encodeURIComponent(url)}`)
      const json = await res.json() as { ogTitle?: string; ogDescription?: string; ogImage?: string; ogSiteName?: string; error?: string }
      if (!res.ok || json.error) {
        alert('OG 정보를 가져올 수 없습니다: ' + (json.error ?? '알 수 없는 오류'))
        return
      }
      const block = blocksRef.current[index]
      if (block.type === 'blog-link-card') {
        onChange(updateBlock(blocksRef.current, index, {
          ...block,
          ogTitle: json.ogTitle ?? '',
          ogDescription: json.ogDescription ?? '',
          ogImage: json.ogImage ?? '',
          ogSiteName: json.ogSiteName ?? '',
        }))
      }
    } catch {
      alert('OG 정보 fetch 중 오류가 발생했습니다.')
    } finally {
      setFetchingOg(prev => ({ ...prev, [blockId]: false }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {blocks.map((block, index) => {
          if (!isBlogBlock(block)) return null

          return (
            <div key={block.id} className={`border p-4 transition-colors duration-300 ${movedId === block.id ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {BLOCK_LABELS[block.type as BlogBlockType]}
                  </span>
                  <select
                    value={block.spacing ?? 'md'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, spacing: e.target.value as Block['spacing'] }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="none">간격 없음</option>
                    <option value="sm">간격 24px</option>
                    <option value="md">간격 48px</option>
                    <option value="lg">간격 80px</option>
                    <option value="xl">간격 120px</option>
                    <option value="2xl">간격 200px</option>
                    <option value="3xl">간격 240px</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => handleMove(moveUp(blocks, index), block.id)} disabled={index === 0}
                    className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↑</button>
                  <button type="button" onClick={() => handleMove(moveDown(blocks, index), block.id)} disabled={index === blocks.length - 1}
                    className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↓</button>
                  <button type="button" onClick={() => onChange(removeBlock(blocks, index))}
                    className="px-2 py-1 text-xs border border-red-300 text-red-500 hover:bg-red-50">삭제</button>
                </div>
              </div>

              {/* blog-text */}
              {block.type === 'blog-text' && (
                <div className="space-y-2">
                  <select
                    value={block.variant}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, variant: e.target.value as BlogTextVariant }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="paragraph">문단 (Paragraph)</option>
                    <option value="h3">제목</option>
                  </select>
                  <textarea
                    value={block.content}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, content: e.target.value }))}
                    rows={block.variant === 'paragraph' ? 5 : 2}
                    placeholder={block.variant === 'paragraph' ? '본문 텍스트 입력' : '제목 입력'}
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  />
                </div>
              )}

              {/* blog-heading-text */}
              {block.type === 'blog-heading-text' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={block.heading}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, heading: e.target.value }))}
                    placeholder="제목 입력"
                    className="w-full border-b border-gray-300 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                  <textarea
                    value={block.body}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, body: e.target.value }))}
                    rows={4}
                    placeholder="내용 입력"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  />
                </div>
              )}

              {/* blog-bullet */}
              {block.type === 'blog-bullet' && (
                <div className="space-y-1">
                  {block.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const items = block.items.map((it, i) =>
                            i === itemIdx ? { ...it, level: (it.level === 0 ? 1 : 0) as 0 | 1 } : it
                          )
                          onChange(updateBlock(blocks, index, { ...block, items }))
                        }}
                        className={`shrink-0 w-6 h-6 text-xs border flex items-center justify-center ${item.level === 1 ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-400'}`}
                        title="들여쓰기 토글"
                      >
                        ↳
                      </button>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const items = block.items.map((it, i) =>
                            i === itemIdx ? { ...it, text: e.target.value } : it
                          )
                          onChange(updateBlock(blocks, index, { ...block, items }))
                        }}
                        placeholder={`항목 ${itemIdx + 1}`}
                        className={`flex-1 border-b border-gray-300 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent ${item.level === 1 ? 'pl-4' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = block.items.filter((_, i) => i !== itemIdx)
                          onChange(updateBlock(blocks, index, { ...block, items: items.length ? items : [{ text: '', level: 0 }] }))
                        }}
                        className="shrink-0 text-xs text-red-400 hover:text-red-600 px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => onChange(updateBlock(blocks, index, { ...block, items: [...block.items, { text: '', level: 0 }] }))}
                    className="mt-1 text-xs text-gray-400 hover:text-black border border-dashed border-gray-300 px-3 py-1 w-full"
                  >
                    + 항목 추가
                  </button>
                </div>
              )}

              {/* blog-quote */}
              {block.type === 'blog-quote' && (
                <div className="space-y-2">
                  <textarea
                    value={block.quote}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, quote: e.target.value }))}
                    rows={3}
                    placeholder="인용문 내용"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={block.attribution ?? ''}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, attribution: e.target.value }))}
                    placeholder="출처 / 저자 (선택)"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
              )}

              {/* blog-divider */}
              {block.type === 'blog-divider' && (
                <div className="flex gap-2">
                  {(['line', 'space'] as BlogDividerStyle[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onChange(updateBlock(blocks, index, { ...block, style: s }))}
                      className={`text-xs px-3 py-1 border ${block.style === s ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {s === 'line' ? '가로선' : '빈 공간'}
                    </button>
                  ))}
                </div>
              )}

              {/* blog-link-card */}
              {block.type === 'blog-link-card' && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={block.url}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => fetchOg(block.id, index, block.url)}
                      disabled={!block.url || fetchingOg[block.id]}
                      className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40 whitespace-nowrap"
                    >
                      {fetchingOg[block.id] ? '불러오는 중...' : 'OG 정보 가져오기'}
                    </button>
                  </div>
                  {block.ogTitle && (
                    <div className="border border-gray-100 p-3 space-y-1 bg-gray-50">
                      {block.ogImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={block.ogImage} alt="" className="w-full h-24 object-cover mb-2" />
                      )}
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{block.ogSiteName}</p>
                      <p className="text-sm font-medium text-gray-800 leading-tight">{block.ogTitle}</p>
                      {block.ogDescription && (
                        <p className="text-xs text-gray-500 line-clamp-2">{block.ogDescription}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* blog-video */}
              {block.type === 'blog-video' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))}
                    placeholder="YouTube 또는 Vimeo URL"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                  <input
                    type="text"
                    value={block.caption ?? ''}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, caption: e.target.value }))}
                    placeholder="캡션 (선택)"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
              )}

              {/* blog-code */}
              {block.type === 'blog-code' && (
                <div className="space-y-2">
                  <select
                    value={block.language}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, language: e.target.value as CodeLanguage }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    {CODE_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <textarea
                    value={block.code}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, code: e.target.value }))}
                    rows={8}
                    placeholder="코드 입력..."
                    className="w-full border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-y bg-transparent font-mono"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add block */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <select
          value={addType}
          onChange={(e) => setAddType(e.target.value as BlogBlockType)}
          className="border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        >
          {BLOG_BLOCK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
        >
          + 블록 추가
        </button>
      </div>
    </div>
  )
}
