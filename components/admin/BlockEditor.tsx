'use client'

import { useState } from 'react'
import type { Block, TextVariant, TextFont, TextAlign, ImageSize, GalleryLayout, ImageLayout } from '@/types'

interface Props {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const MOTION_DESC: Record<string, string> = {
  none: '',
  fadeIn: '서서히 나타남',
  slideUp: '아래에서 위로 올라오며 나타남',
  zoomIn: '살짝 확대되며 나타남',
  textReveal: '텍스트가 부드럽게 떠오름',
  curtainReveal: '아래에서 크게 올라오며 강조됨',
  stagger: '자식 요소들이 순차적으로 하나씩 나타남',
}

type BlockType = Block['type']
const BLOCK_TYPES: { value: BlockType; label: string }[] = [
  { value: 'text', label: '텍스트' },
  { value: 'image', label: '이미지' },
  { value: 'gallery', label: '갤러리' },
  { value: 'video', label: '비디오' },
  { value: 'divider', label: '구분선' },
  { value: 'file', label: '파일' },
]

function createBlock(type: BlockType): Block {
  const id = crypto.randomUUID()
  switch (type) {
    case 'text': return { id, type, content: '', motion: 'none', spacing: 'md' }
    case 'image': return { id, type, src: '', alt: '', motion: 'none', spacing: 'md' }
    case 'gallery': return { id, type, images: [], motion: 'none', spacing: 'md' }
    case 'video': return { id, type, url: '', motion: 'none', spacing: 'md' }
    case 'divider': return { id, type, height: 40, motion: 'none', spacing: 'none' }
    case 'file': return { id, type, url: '', label: '', motion: 'none', spacing: 'md' }
  }
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

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const json = await res.json() as { url?: string; error?: string }
  if (!res.ok || !json.url) throw new Error(json.error ?? '업로드 실패')
  return json.url
}

export default function BlockEditor({ blocks, onChange }: Props) {
  const [addType, setAddType] = useState<BlockType>('text')
  const [uploading, setUploading] = useState<Record<string, boolean>>({})

  function handleAdd() {
    onChange([...blocks, createBlock(addType)])
  }

  function handleImageUpload(blockId: string, index: number, field: 'src' | null, galleryIndex?: number) {
    return async (e: { target: { files?: FileList | null } }) => {
      const file = e.target.files?.[0]
      if (!file) return
      const uploadKey = galleryIndex !== undefined ? `${blockId}-${galleryIndex}` : blockId
      setUploading((prev) => ({ ...prev, [uploadKey]: true }))
      try {
        const url = await uploadFile(file)
        const block = blocks[index]
        if (block.type === 'image' && field === 'src') {
          onChange(updateBlock(blocks, index, { ...block, src: url }))
        } else if (block.type === 'image' && galleryIndex !== undefined) {
          const images = [...(block.images ?? [])]
          images[galleryIndex] = { ...images[galleryIndex], src: url }
          onChange(updateBlock(blocks, index, { ...block, images }))
        } else if (block.type === 'gallery' && galleryIndex !== undefined) {
          const images = [...block.images]
          images[galleryIndex] = { ...images[galleryIndex], src: url }
          onChange(updateBlock(blocks, index, { ...block, images }))
        } else if (block.type === 'file') {
          onChange(updateBlock(blocks, index, { ...block, url }))
        }
      } finally {
        setUploading((prev) => ({ ...prev, [uploadKey]: false }))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div key={block.id} className="border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">{block.type}</span>
                <select
                  value={block.motion}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, motion: e.target.value as Block['motion'] }))}
                  className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                >
                  <option value="none">모션 없음</option>
                  <option value="fadeIn">Fade In</option>
                  <option value="slideUp">Slide Up</option>
                  <option value="zoomIn">Zoom In</option>
                  <option value="textReveal">Text Reveal</option>
                  <option value="curtainReveal">Curtain Reveal</option>
                  <option value="stagger">Stagger</option>
                </select>
                {MOTION_DESC[block.motion] && (
                  <span className="text-xs text-gray-400">{MOTION_DESC[block.motion]}</span>
                )}
                <select
                  value={block.spacing ?? 'md'}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, spacing: e.target.value as Block['spacing'] }))}
                  className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                >
                  <option value="none">간격 없음</option>
                  <option value="sm">간격 SM</option>
                  <option value="md">간격 MD</option>
                  <option value="lg">간격 LG</option>
                  <option value="xl">간격 XL</option>
                </select>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onChange(moveUp(blocks, index))}
                  disabled={index === 0}
                  className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => onChange(moveDown(blocks, index))}
                  disabled={index === blocks.length - 1}
                  className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => onChange(removeBlock(blocks, index))}
                  className="px-2 py-1 text-xs border border-red-300 text-red-500 hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
            </div>

            {block.type === 'text' && (
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={block.variant ?? 'body'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, variant: e.target.value as TextVariant }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="body">본문 (기본)</option>
                    <option value="heading">제목 — 크고 굵게</option>
                    <option value="subheading">소제목 — 중간 크기</option>
                    <option value="caption">캡션 — 작고 흐리게</option>
                  </select>
                  <select
                    value={block.font ?? 'pretendard'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, font: e.target.value as TextFont }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="pretendard">Pretendard (한국어 기본)</option>
                    <option value="syne">Syne (영문 디스플레이)</option>
                  </select>
                  <select
                    value={block.align ?? 'left'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, align: e.target.value as TextAlign }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="left">왼쪽 정렬</option>
                    <option value="center">가운데 정렬</option>
                    <option value="right">오른쪽 정렬</option>
                  </select>
                </div>
                <textarea
                  value={block.content}
                  onChange={(e) =>
                    onChange(updateBlock(blocks, index, { ...block, content: e.target.value }))
                  }
                  rows={4}
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  placeholder="텍스트 또는 HTML 입력 (줄바꿈은 Enter 키로)"
                />
              </div>
            )}

            {block.type === 'image' && (() => {
              const imgLayout = block.layout ?? 'single'
              const imgs = block.images ?? []
              const targetCount = imgLayout === 'pair' ? 2 : imgLayout === 'trio' || imgLayout === 'sequence' ? 3 : 1
              return (
                <div className="space-y-3">
                  {/* 레이아웃 선택 */}
                  <select
                    value={imgLayout}
                    onChange={(e) => {
                      const next = e.target.value as ImageLayout
                      const count = next === 'pair' ? 2 : next === 'trio' || next === 'sequence' ? 3 : 1
                      const nextImages = Array.from({ length: count }, (_, i) => imgs[i] ?? { src: '', alt: '' })
                      onChange(updateBlock(blocks, index, { ...block, layout: next, images: nextImages }))
                    }}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="single">1장 — 단독 이미지</option>
                    <option value="pair">2장 — 나란히 배치</option>
                    <option value="trio">3장 — 나란히 배치</option>
                    <option value="sequence">3장 — 스크롤 순차 등장</option>
                  </select>

                  {/* 1장: 기존 단독 이미지 */}
                  {imgLayout === 'single' && (
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={block.src}
                          onChange={(e) => onChange(updateBlock(blocks, index, { ...block, src: e.target.value }))}
                          placeholder="이미지 URL 직접 입력"
                          className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                        />
                        <label className="cursor-pointer border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100">
                          {uploading[block.id] ? '업로드 중...' : '파일 선택'}
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(block.id, index, 'src')} />
                        </label>
                      </div>
                      <select
                        value={block.size ?? 'full'}
                        onChange={(e) => onChange(updateBlock(blocks, index, { ...block, size: e.target.value as ImageSize }))}
                        className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                      >
                        <option value="sm">작게 — 중앙 1/3 크기</option>
                        <option value="md">중간 — 중앙 2/3 크기</option>
                        <option value="lg">크게 — 거의 전체 너비</option>
                        <option value="full">전체 너비</option>
                      </select>
                      {block.src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={block.src} alt="preview" className="max-h-32 object-contain" />
                      )}
                      <input
                        type="text"
                        value={block.alt}
                        onChange={(e) => onChange(updateBlock(blocks, index, { ...block, alt: e.target.value }))}
                        placeholder="Alt 텍스트"
                        className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                      />
                    </div>
                  )}

                  {/* 2장·3장·순차: 이미지 배열 */}
                  {imgLayout !== 'single' && (
                    <div className="space-y-2">
                      {Array.from({ length: targetCount }, (_, gi) => {
                        const img = imgs[gi] ?? { src: '', alt: '' }
                        return (
                          <div key={gi} className="flex gap-2 items-center">
                            <span className="text-xs text-gray-400 w-6 shrink-0">{gi + 1}</span>
                            <input
                              type="text"
                              value={img.src}
                              onChange={(e) => {
                                const next = [...imgs]
                                next[gi] = { ...img, src: e.target.value }
                                onChange(updateBlock(blocks, index, { ...block, images: next }))
                              }}
                              placeholder="이미지 URL"
                              className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                            />
                            <label className="cursor-pointer border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100 shrink-0">
                              {uploading[`${block.id}-${gi}`] ? '업로드 중...' : '업로드'}
                              <input
                                type="file" accept="image/*" className="hidden"
                                onChange={handleImageUpload(block.id, index, null, gi)}
                              />
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })()}

            {block.type === 'gallery' && (
              <div className="space-y-2">
                <select
                  value={block.layout ?? 'grid-3'}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, layout: e.target.value as GalleryLayout }))}
                  className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                >
                  <option value="grid-2">2열 그리드 — 이미지 2개 나란히</option>
                  <option value="grid-3">3열 그리드 — 이미지 3개 나란히</option>
                  <option value="sequence">세로 시퀀스 — 이미지가 스크롤 따라 순차 등장</option>
                </select>
                {block.images.map((img, gi) => (
                  <div key={gi} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={img.src}
                      onChange={(e) => {
                        const images = [...block.images]
                        images[gi] = { ...images[gi], src: e.target.value }
                        onChange(updateBlock(blocks, index, { ...block, images }))
                      }}
                      placeholder="이미지 URL"
                      className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                    />
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => {
                        const images = [...block.images]
                        images[gi] = { ...images[gi], alt: e.target.value }
                        onChange(updateBlock(blocks, index, { ...block, images }))
                      }}
                      placeholder="Alt"
                      className="w-24 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                    />
                    <label className="cursor-pointer border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100">
                      업로드
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(block.id, index, null, gi)} />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const images = block.images.filter((_, i) => i !== gi)
                        onChange(updateBlock(blocks, index, { ...block, images }))
                      }}
                      className="text-xs text-red-500 px-2 py-1 border border-red-200 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const images = [...block.images, { src: '', alt: '' }]
                    onChange(updateBlock(blocks, index, { ...block, images }))
                  }}
                  className="text-xs border border-gray-300 px-3 py-1 hover:bg-gray-100"
                >
                  + 이미지 추가
                </button>
              </div>
            )}

            {block.type === 'video' && (
              <input
                type="text"
                value={block.url}
                onChange={(e) =>
                  onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))
                }
                placeholder="YouTube URL"
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
              />
            )}

            {block.type === 'divider' && (
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-500">높이 (px)</label>
                <input
                  type="number"
                  value={block.height}
                  onChange={(e) =>
                    onChange(updateBlock(blocks, index, { ...block, height: Number(e.target.value) }))
                  }
                  className="w-24 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                />
              </div>
            )}

            {block.type === 'file' && (
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) =>
                      onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))
                    }
                    placeholder="파일 URL 직접 입력"
                    className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                  <label className="cursor-pointer border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100">
                    {uploading[block.id] ? '업로드 중...' : '파일 선택'}
                    <input type="file" className="hidden" onChange={handleImageUpload(block.id, index, null)} />
                  </label>
                </div>
                <input
                  type="text"
                  value={block.label}
                  onChange={(e) =>
                    onChange(updateBlock(blocks, index, { ...block, label: e.target.value }))
                  }
                  placeholder="다운로드 버튼 레이블"
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <select
          value={addType}
          onChange={(e) => setAddType(e.target.value as BlockType)}
          className="border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        >
          {BLOCK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
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
