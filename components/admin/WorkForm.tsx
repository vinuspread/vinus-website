'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import BlockEditor from './BlockEditor'
import { saveWork, deleteWork, type WorkFormData } from '@/app/admin/work/actions'
import type { Block } from '@/types'

const CATEGORIES = ['web', 'mobile', 'character', 'product', 'etc']

interface Props {
  initialData?: WorkFormData & { id: string }
}

export default function WorkForm({ initialData }: Props) {
  const isEdit = !!initialData
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [blocks, setBlocks] = useState<Block[]>(initialData?.blocks ?? [])
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url ?? '')
  const [uploading, setUploading] = useState(false)

  function toSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  async function uploadThumbnail(e: { target: { files?: FileList | null } }) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json() as { url?: string; error?: string }
      if (!res.ok || !json.url) {
        setError(json.error ?? '업로드 실패')
      } else {
        setThumbnailUrl(json.url)
      }
    } catch {
      setError('업로드 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value

    const data: WorkFormData = {
      id: initialData?.id,
      title: get('title'),
      slug: get('slug'),
      subtitle: get('subtitle'),
      client_name: get('client_name'),
      category: get('category'),
      period: get('period'),
      thumbnail_url: thumbnailUrl,
      blocks,
      meta_title: get('meta_title'),
      meta_description: get('meta_description'),
      is_published: (form.elements.namedItem('is_published') as HTMLInputElement).checked,
    }

    startTransition(async () => {
      try {
        const result = await saveWork(data)
        const goToList = confirm('저장이 완료되었습니다.\n목록으로 이동하시겠습니까?')
        if (goToList) {
          router.push('/admin/work')
        } else if (!data.id) {
          router.replace(`/admin/work/${result.id}`)
        } else {
          router.refresh()
        }
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        setError(err instanceof Error ? err.message : '저장 실패')
      }
    })
  }

  function handleDelete() {
    if (!initialData || !confirm('삭제하시겠습니까?')) return
    startTransition(async () => {
      try {
        await deleteWork(initialData.id, initialData.slug)
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        setError(err instanceof Error ? err.message : '삭제 실패')
      }
    })
  }

  const inputClass = "border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-[160px_1fr] gap-4 items-start">

        {/* 슬러그 — 숨김, 제목에서 자동생성 */}
        <input
          name="slug"
          type="hidden"
          defaultValue={initialData?.slug ?? ''}
          id="slug-input"
        />

        <label className="text-sm text-gray-500 pt-3">제목 *</label>
        <input
          name="title"
          required
          defaultValue={initialData?.title}
          onChange={(e) => {
            if (!isEdit) {
              const slugInput = document.getElementById('slug-input') as HTMLInputElement
              if (slugInput) slugInput.value = toSlug(e.target.value)
            }
          }}
          className={inputClass}
        />

        <label className="text-sm text-gray-500 pt-3">서브제목</label>
        <input
          name="subtitle"
          defaultValue={initialData?.subtitle ?? ''}
          placeholder="예: 브랜드 아이덴티티 & 웹사이트"
          className={inputClass}
        />

        <label className="text-sm text-gray-500 pt-3">클라이언트</label>
        <input
          name="client_name"
          defaultValue={initialData?.client_name ?? ''}
          placeholder="클라이언트명"
          className={inputClass}
        />

        <label className="text-sm text-gray-500 pt-3">카테고리</label>
        <select
          name="category"
          defaultValue={initialData?.category ?? 'web'}
          className={inputClass}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="text-sm text-gray-500 pt-3">개발기간</label>
        <input
          name="period"
          defaultValue={initialData?.period ?? ''}
          placeholder="예: 2024.01 ~ 2024.03"
          className={inputClass}
        />

        <label className="text-sm text-gray-500 pt-3">썸네일</label>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="URL 직접 입력"
              className="flex-1 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
            />
            <label className="cursor-pointer border border-gray-300 px-3 py-2 text-xs hover:bg-gray-100">
              {uploading ? '업로드 중...' : '파일 선택'}
              <input type="file" accept="image/*" className="hidden" onChange={uploadThumbnail} />
            </label>
          </div>
          {thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="thumbnail preview" className="max-h-24 object-contain" />
          )}
        </div>

        <label className="text-sm text-gray-500 pt-3">공개</label>
        <input
          name="is_published"
          type="checkbox"
          defaultChecked={initialData?.is_published ?? false}
          className="mt-3"
        />

        <label className="text-sm text-gray-500 pt-3">Meta 타이틀</label>
        <input
          name="meta_title"
          defaultValue={initialData?.meta_title ?? ''}
          className={inputClass}
        />

        <label className="text-sm text-gray-500 pt-3">Meta 설명</label>
        <input
          name="meta_description"
          defaultValue={initialData?.meta_description ?? ''}
          className={inputClass}
        />
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-4">콘텐츠 블록</p>
        <BlockEditor blocks={blocks} onChange={setBlocks} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isPending}
          className="border border-[#FF3B5C] text-[#FF3B5C] px-8 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/work')}
          className="border border-black text-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors"
        >
          목록
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto border border-red-400 text-red-500 px-6 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
          >
            삭제
          </button>
        )}
      </div>
    </form>
  )
}
