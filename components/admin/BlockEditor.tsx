'use client'

import { useState, useRef, useEffect } from 'react'
import type { Block, TextFont, TextAlign, TextSize, TextWeight, TextLetterSpacing, ImageAlign, GalleryLayout, ImageDisplayMode } from '@/types'
import type { HeadingSize, HeadingWeight } from '@/types'

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
  { value: 'heading-text', label: '제목+텍스트' },
  { value: 'image', label: '이미지' },
  { value: 'gallery', label: '갤러리' },
  { value: 'multi-thumbnail', label: '다중썸네일' },
  { value: 'scroll-story', label: '스크롤 스토리' },
  { value: 'video', label: '비디오' },
  { value: 'embed', label: '임베드' },
  { value: 'divider', label: '구분선' },
  { value: 'file', label: '파일' },
]

function createBlock(type: BlockType): Block {
  const id = crypto.randomUUID()
  switch (type) {
    case 'text': return { id, type, content: '', motion: 'none', spacing: 'md' }
    case 'heading-text': return { id, type, heading: '', body: '', headingSize: 'md', headingWeight: 'normal', font: 'pretendard', align: 'left', motion: 'none', spacing: 'md' }
    case 'image': return { id, type, src: '', alt: '', displayMode: 'normal' as ImageDisplayMode, motion: 'none', spacing: 'md' }
    case 'gallery': return { id, type, images: [], layout: 'sequence', motion: 'none', spacing: 'md' }
    case 'video': return { id, type, url: '', motion: 'none', spacing: 'md' }
    case 'embed': return { id, type, embedType: 'url', url: '', code: '', caption: '', motion: 'none', spacing: 'md' }
    case 'divider': return { id, type, height: 40, motion: 'none', spacing: 'none' }
    case 'file': return { id, type, url: '', label: '', motion: 'none', spacing: 'md' }
    case 'multi-thumbnail': return { id, type, images: [], columns: 5, spacing: 'md' }
    case 'scroll-story': return { id, type, layout: 'A', slides: [{ image: '', title: '', body: '' }], spacing: 'lg' }
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

function resolveContentType(file: File): string {
  if (file.type) return file.type
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const map: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    heic: 'image/heic', heif: 'image/heif', avif: 'image/avif',
  }
  return map[ext] ?? 'application/octet-stream'
}

async function uploadFile(file: File): Promise<string> {
  const contentType = resolveContentType(file)
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, contentType }),
  })
  const json = await res.json() as { signedUrl?: string; publicUrl?: string; error?: string }
  if (!res.ok || !json.signedUrl || !json.publicUrl) throw new Error(json.error ?? '업로드 실패')

  const uploadRes = await fetch(json.signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  })
  if (!uploadRes.ok) throw new Error('파일 업로드 실패')

  return json.publicUrl
}

export default function BlockEditor({ blocks, onChange }: Props) {
  const [addType, setAddType] = useState<BlockType>('text')
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const blocksRef = useRef(blocks)
  useEffect(() => { blocksRef.current = blocks }, [blocks])

  function handleAdd() {
    onChange([...blocks, createBlock(addType)])
  }

  async function handleMultiThumbnailUpload(files: File[], blockIndex: number, blockId: string) {
    const imageFiles = files.filter(f => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    setUploading(prev => ({ ...prev, [blockId]: true }))
    try {
      const urls = await Promise.all(imageFiles.map(uploadFile))
      const newImages = urls.map((src, i) => ({ src, alt: imageFiles[i].name.replace(/\.[^.]+$/, '') }))
      const currentBlocks = blocksRef.current
      const block = currentBlocks[blockIndex]
      if (block.type === 'multi-thumbnail') {
        onChange(updateBlock(currentBlocks, blockIndex, { ...block, images: [...block.images, ...newImages] }))
      }
    } catch (err) {
      alert(`업로드 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`)
    } finally {
      setUploading(prev => ({ ...prev, [blockId]: false }))
    }
  }

  function handleImageUpload(blockId: string, index: number, field: 'src' | null, galleryIndex?: number) {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const input = e.target
      const uploadKey = galleryIndex !== undefined ? `${blockId}-${galleryIndex}` : blockId
      setUploading((prev) => ({ ...prev, [uploadKey]: true }))
      try {
        const url = await uploadFile(file)
        const currentBlocks = blocksRef.current
        const block = currentBlocks[index]
        if (block.type === 'image' && field === 'src') {
          onChange(updateBlock(currentBlocks, index, { ...block, src: url }))
        } else if (block.type === 'gallery' && galleryIndex !== undefined) {
          const images = [...block.images]
          images[galleryIndex] = { ...images[galleryIndex], src: url }
          onChange(updateBlock(currentBlocks, index, { ...block, images }))
        } else if (block.type === 'file') {
          onChange(updateBlock(currentBlocks, index, { ...block, url }))
        }
      } catch (err) {
        alert(`업로드 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`)
      } finally {
        setUploading((prev) => ({ ...prev, [uploadKey]: false }))
        input.value = ''
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
                {block.type !== 'heading-text' && block.type !== 'multi-thumbnail' && block.type !== 'scroll-story' && (
                  <>
                    <select
                      value={block.motion}
                      onChange={(e) => 'motion' in block && onChange(updateBlock(blocks, index, { ...block, motion: e.target.value as never }))}
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
                    {'motion' in block && MOTION_DESC[block.motion] && (
                      <span className="text-xs text-gray-400">{MOTION_DESC[block.motion]}</span>
                    )}
                  </>
                )}
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

            {block.type === 'heading-text' && (
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={block.headingSize ?? 'md'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, headingSize: e.target.value as HeadingSize }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="sm">제목 24px</option>
                    <option value="md">제목 28px</option>
                    <option value="lg">제목 32px</option>
                    <option value="xl">제목 36px</option>
                    <option value="2xl">제목 40px</option>
                    <option value="3xl">제목 60px</option>
                    <option value="4xl">제목 80px</option>
                  </select>
                  <select
                    value={block.headingWeight ?? 'normal'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, headingWeight: e.target.value as HeadingWeight }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="light">가늘게 (Light)</option>
                    <option value="normal">보통 (Normal)</option>
                    <option value="bold">굵게 (Bold)</option>
                  </select>
                  <select
                    value={block.font ?? 'pretendard'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, font: e.target.value as TextFont }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="pretendard">Pretendard (한국어)</option>
                    <option value="syne">Syne (영문)</option>
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
                <input
                  type="text"
                  value={block.heading}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, heading: e.target.value }))}
                  placeholder="제목 입력"
                  className="w-full border-b border-gray-300 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                />
                <div className="flex gap-2 flex-wrap pt-1">
                  <span className="text-xs text-gray-400 self-center">본문</span>
                  <select
                    value={block.bodySize ?? '16'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, bodySize: e.target.value as TextSize }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="14">14px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                    <option value="20">20px</option>
                  </select>
                  <select
                    value={block.bodyWeight ?? 'regular'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, bodyWeight: e.target.value as TextWeight }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="regular">Regular</option>
                    <option value="medium">Medium</option>
                    <option value="bold">Bold</option>
                  </select>
                  <select
                    value={block.bodyLetterSpacing ?? '0'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, bodyLetterSpacing: e.target.value as TextLetterSpacing }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="-2">자간 -2%</option>
                    <option value="-1.5">자간 -1.5%</option>
                    <option value="-1">자간 -1%</option>
                    <option value="-0.5">자간 -0.5%</option>
                    <option value="0">자간 0%</option>
                  </select>
                </div>
                <textarea
                  value={block.body}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, body: e.target.value }))}
                  rows={4}
                  placeholder="본문 텍스트 입력 (줄바꿈은 Enter 키로)"
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                />
              </div>
            )}

            {block.type === 'text' && (
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={block.size ?? '16'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, size: e.target.value as TextSize }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="14">14px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                    <option value="20">20px</option>
                  </select>
                  <select
                    value={block.weight ?? 'regular'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, weight: e.target.value as TextWeight }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="regular">Regular</option>
                    <option value="medium">Medium</option>
                    <option value="bold">Bold</option>
                  </select>
                  <select
                    value={block.letterSpacing ?? '0'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, letterSpacing: e.target.value as TextLetterSpacing }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="-2">자간 -2%</option>
                    <option value="-1.5">자간 -1.5%</option>
                    <option value="-1">자간 -1%</option>
                    <option value="-0.5">자간 -0.5%</option>
                    <option value="0">자간 0%</option>
                  </select>
                  <select
                    value={block.font ?? 'pretendard'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, font: e.target.value as TextFont }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="pretendard">Pretendard</option>
                    <option value="syne">Syne</option>
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

            {block.type === 'image' && (
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
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={block.displayMode ?? 'normal'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, displayMode: e.target.value as ImageDisplayMode }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="normal">일반</option>
                    <option value="parallax">패럴랙스</option>
                  </select>
                  {block.displayMode !== 'parallax' && (
                    <select
                      value={block.align ?? 'full'}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, align: e.target.value as ImageAlign }))}
                      className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                    >
                      <option value="center">센터 정렬</option>
                      <option value="full">전체화면</option>
                    </select>
                  )}
                  {block.displayMode === 'parallax' && (
                    <select
                      value={block.containerHeight ?? 600}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, containerHeight: Number(e.target.value) }))}
                      className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                    >
                      <option value={300}>높이 300px</option>
                      <option value={400}>높이 400px</option>
                      <option value={500}>높이 500px</option>
                      <option value={600}>높이 600px</option>
                      <option value={700}>높이 700px</option>
                      <option value={800}>높이 800px</option>
                      <option value={1000}>높이 1000px</option>
                    </select>
                  )}
                </div>
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

            {block.type === 'gallery' && (
              <div className="space-y-2">
                <select
                  value={block.layout ?? 'grid-3'}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, layout: e.target.value as GalleryLayout }))}
                  className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                >
                  <option value="sequence">세로 시퀀스 — 이미지가 스크롤 따라 순차 등장</option>
                  <option value="sequence-h">가로 시퀀스 — 나란히 배치 후 좌→우 순차 등장</option>
                  <option value="scroll-h">스크롤 갤러리 — 스크롤로 이미지를 좌우 이동</option>
                </select>
                {block.images.map((img, gi) => (
                  <div key={gi} className="space-y-1">
                    <div className="flex gap-2 items-center">
                      {img.src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img.src} alt={img.alt} className="w-12 h-12 object-cover flex-shrink-0 bg-gray-100" />
                      )}
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
                        {uploading[`${block.id}-${gi}`] ? '...' : '업로드'}
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

            {block.type === 'multi-thumbnail' && (
              <div className="space-y-3">
                {/* 드래그앤드롭 업로드 존 */}
                <div
                  className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${uploading[block.id] ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-black'}`}
                  onDrop={(e) => {
                    e.preventDefault()
                    handleMultiThumbnailUpload(Array.from(e.dataTransfer.files), index, block.id)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => !uploading[block.id] && (document.getElementById(`mt-upload-${block.id}`) as HTMLInputElement)?.click()}
                >
                  {uploading[block.id] ? (
                    <p className="text-sm text-gray-400">업로드 중...</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">이미지를 드래그하거나 클릭하여 선택</p>
                      <p className="text-xs text-gray-400 mt-1">여러 장 동시 등록 가능 · 최대 5열 표시</p>
                    </>
                  )}
                  <input
                    id={`mt-upload-${block.id}`}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      handleMultiThumbnailUpload(Array.from(e.target.files ?? []), index, block.id)
                      e.target.value = ''
                    }}
                  />
                </div>

                {/* 등록된 썸네일 미리보기 */}
                {block.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {block.images.map((img, gi) => (
                      <div key={gi} className="relative group aspect-square bg-gray-100">
                        {img.src && (
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const images = block.images.filter((_, i) => i !== gi)
                            onChange(updateBlock(blocks, index, { ...block, images }))
                          }}
                          className="absolute top-0.5 right-0.5 bg-black/60 text-white text-[10px] w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400">{block.images.length}개 등록됨</p>
              </div>
            )}

            {block.type === 'scroll-story' && (
              <div className="space-y-4">
                {/* Layout toggle */}
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-gray-500">레이아웃</span>
                  {(['A', 'B'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => onChange(updateBlock(blocks, index, { ...block, layout: l }))}
                      className={`text-xs px-3 py-1 border ${block.layout === l ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {l === 'A' ? 'A — 이미지 왼쪽' : 'B — 이미지 오른쪽'}
                    </button>
                  ))}
                </div>

                {/* Slides */}
                {block.slides.map((slide, si) => (
                  <div key={si} className="border border-gray-100 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">슬라이드 {si + 1}</span>
                      {block.slides.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const slides = block.slides.filter((_, i) => i !== si)
                            onChange(updateBlock(blocks, index, { ...block, slides }))
                          }}
                          className="text-xs text-red-400 hover:text-red-600"
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    {/* Image upload */}
                    <div className="flex gap-2 items-center">
                      {slide.image && (
                        <img src={slide.image} alt="" className="w-16 h-12 object-cover border border-gray-200" />
                      )}
                      <label className={`cursor-pointer border px-3 py-1.5 text-xs ${uploading[`${block.id}-ss-${si}`] ? 'border-gray-200 text-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}>
                        {uploading[`${block.id}-ss-${si}`] ? '업로드 중...' : slide.image ? '이미지 교체' : '이미지 선택'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            const key = `${block.id}-ss-${si}`
                            setUploading(prev => ({ ...prev, [key]: true }))
                            try {
                              const url = await uploadFile(file)
                              const slides = block.slides.map((s, i) => i === si ? { ...s, image: url } : s)
                              onChange(updateBlock(blocksRef.current, index, { ...block, slides }))
                            } catch (err) {
                              alert(`업로드 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`)
                            } finally {
                              setUploading(prev => ({ ...prev, [key]: false }))
                              e.target.value = ''
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Title */}
                    <input
                      type="text"
                      value={slide.title ?? ''}
                      onChange={(e) => {
                        const slides = block.slides.map((s, i) => i === si ? { ...s, title: e.target.value } : s)
                        onChange(updateBlock(blocks, index, { ...block, slides }))
                      }}
                      placeholder="제목 (선택)"
                      className="w-full border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-black bg-transparent"
                    />

                    {/* Body */}
                    <textarea
                      value={slide.body ?? ''}
                      onChange={(e) => {
                        const slides = block.slides.map((s, i) => i === si ? { ...s, body: e.target.value } : s)
                        onChange(updateBlock(blocks, index, { ...block, slides }))
                      }}
                      rows={3}
                      placeholder="내용 (선택)"
                      className="w-full border border-gray-200 p-2 text-sm placeholder:text-gray-300 focus:outline-none focus:border-black resize-none bg-transparent"
                    />
                  </div>
                ))}

                {/* Add slide */}
                {block.slides.length < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      const slides = [...block.slides, { image: '', title: '', body: '' }]
                      onChange(updateBlock(blocks, index, { ...block, slides }))
                    }}
                    className="w-full border border-dashed border-gray-300 py-2 text-xs text-gray-400 hover:border-black hover:text-black transition-colors"
                  >
                    + 슬라이드 추가 ({block.slides.length}/3)
                  </button>
                )}
              </div>
            )}

            {block.type === 'embed' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange(updateBlock(blocks, index, { ...block, embedType: 'url' }))}
                    className={`text-xs px-3 py-1 border ${block.embedType === 'url' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  >
                    URL 입력
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(updateBlock(blocks, index, { ...block, embedType: 'code' }))}
                    className={`text-xs px-3 py-1 border ${block.embedType === 'code' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  >
                    임베드 코드 붙여넣기
                  </button>
                </div>

                {block.embedType === 'url' ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={block.url}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))}
                      placeholder="YouTube, Vimeo, Figma, Google Maps URL 입력"
                      className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                    />
                    <p className="text-xs text-gray-400">지원: YouTube · Vimeo · Figma · Google Maps · 일반 URL</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <textarea
                      value={block.code}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, code: e.target.value }))}
                      rows={5}
                      placeholder={'플랫폼에서 제공하는 임베드 코드를 붙여넣으세요.\n예: Instagram, Twitter/X, Spotify 등의 <iframe> 또는 <blockquote> 코드'}
                      className="w-full border border-gray-200 p-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent font-mono"
                    />
                    <p className="text-xs text-gray-400">보안상 &lt;script&gt; 태그는 자동으로 제거됩니다.</p>
                  </div>
                )}

                <input
                  type="text"
                  value={block.caption}
                  onChange={(e) => onChange(updateBlock(blocks, index, { ...block, caption: e.target.value }))}
                  placeholder="캡션 (선택)"
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                />
              </div>
            )}

            {block.type === 'video' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.fullWidth ?? false}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, fullWidth: e.target.checked }))}
                    className="accent-black"
                  />
                  <span className="text-xs text-gray-600">전체화면</span>
                </label>
                <input
                  type="text"
                  value={block.url}
                  onChange={(e) =>
                    onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))
                  }
                  placeholder="YouTube URL"
                  className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                />
              </div>
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
