'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import BlogBlockEditor from './BlogBlockEditor'
import { saveBlog, deleteBlog, type BlogFormData } from '@/app/admin/blog/actions'
import type { Block } from '@/types'

interface Props {
  initialData?: BlogFormData & { id: string }
}

export default function BlogForm({ initialData }: Props) {
  const isEdit = !!initialData
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [blocks, setBlocks] = useState<Block[]>(initialData?.blocks ?? [])
  const [category, setCategory] = useState<'Story' | 'Download'>(initialData?.category ?? 'Story')
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url ?? '')
  const [fileUrl, setFileUrl] = useState(initialData?.file_url ?? '')
  const [slugEdited, setSlugEdited] = useState(isEdit)
  const [uploading, setUploading] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)

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
    setThumbnailUploading(true)
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
      setThumbnailUploading(false)
    }
  }

  async function uploadFile(e: { target: { files?: FileList | null } }) {
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
        setFileUrl(json.url)
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

    const data: BlogFormData = {
      id: initialData?.id,
      title: get('title'),
      slug: get('slug'),
      category,
      thumbnail_url: thumbnailUrl,
      blocks,
      file_url: fileUrl,
      meta_title: get('meta_title'),
      meta_description: get('meta_description'),
      is_published: (form.elements.namedItem('is_published') as HTMLInputElement).checked,
      sort_order: Number(get('sort_order')) || 0,
    }

    startTransition(async () => {
      try {
        await saveBlog(data)
        router.push('/admin/blog')
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
        await deleteBlog(initialData.id, initialData.slug)
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err) throw err
        setError(err instanceof Error ? err.message : '삭제 실패')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
        <label className="text-sm text-gray-500 pt-3">제목 *</label>
        <input
          name="title"
          required
          defaultValue={initialData?.title}
          onChange={(e) => { if (!slugEdited) { const slugInput = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement; if (slugInput) slugInput.value = toSlug(e.target.value) } }}
          className="border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        />

        <label className="text-sm text-gray-500 pt-3">슬러그 *</label>
        <input
          name="slug"
          required
          defaultValue={initialData?.slug}
          onChange={() => setSlugEdited(true)}
          className="border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        />

        <label className="text-sm text-gray-500 pt-3">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'Story' | 'Download')}
          className="border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        >
          <option value="Story">Story</option>
          <option value="Download">Download</option>
        </select>

        <label className="text-sm text-gray-500 pt-3">썸네일</label>
        <div className="flex flex-col gap-2">
          {thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="thumbnail" className="w-32 h-20 object-cover rounded border border-gray-200" />
          )}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="이미지 URL"
              className="flex-1 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
            />
            <label className="cursor-pointer border border-gray-300 px-3 py-2 text-xs hover:bg-gray-100 whitespace-nowrap">
              {thumbnailUploading ? '업로드 중...' : '파일 선택'}
              <input type="file" accept="image/*" className="hidden" onChange={uploadThumbnail} />
            </label>
          </div>
        </div>

        {category === 'Download' && (
          <>
            <label className="text-sm text-gray-500 pt-3">첨부 파일</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="파일 URL"
                className="flex-1 border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
              />
              <label className="cursor-pointer border border-gray-300 px-3 py-2 text-xs hover:bg-gray-100">
                {uploading ? '업로드 중...' : '파일 선택'}
                <input type="file" className="hidden" onChange={uploadFile} />
              </label>
            </div>
          </>
        )}

        <label className="text-sm text-gray-500 pt-3">정렬 순서</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={initialData?.sort_order ?? 0}
          className="border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        />

        <div className="col-span-2 flex items-center gap-3 py-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked={initialData?.is_published ?? false}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
          </label>
          <span className="text-sm text-gray-500">공개</span>
        </div>

        <label className="text-sm text-gray-500 pt-3">Meta 타이틀</label>
        <div className="space-y-1">
          <input
            name="meta_title"
            defaultValue={initialData?.meta_title ?? ''}
            placeholder="비워두면 제목이 자동 사용됩니다"
            maxLength={60}
            className="w-full border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
            style={{ width: '100%' }}
          />
          <p className="text-xs text-gray-400">권장 60자 이내 · 비우면 자동 생성</p>
        </div>

        <label className="text-sm text-gray-500 pt-3">Meta 설명</label>
        <div className="space-y-1">
          <textarea
            name="meta_description"
            defaultValue={initialData?.meta_description ?? ''}
            placeholder="비워두면 콘텐츠에서 자동 추출됩니다"
            maxLength={160}
            rows={2}
            className="w-full border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent resize-none"
          />
          <p className="text-xs text-gray-400">권장 120~160자 · 비우면 첫 번째 텍스트 블록에서 자동 추출</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-4">콘텐츠 블록</p>
        <BlogBlockEditor blocks={blocks} onChange={setBlocks} />
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
          onClick={() => router.push('/admin/blog')}
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
