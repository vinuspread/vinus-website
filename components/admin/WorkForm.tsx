'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import BlockEditor from './BlockEditor'
import { saveWork, deleteWork, type WorkFormData } from '@/app/admin/work/actions'
import { getMetaDescription } from '@/lib/utils'
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
  const [heroUrl, setHeroUrl] = useState(initialData?.hero_url ?? '')
  const [heroType, setHeroType] = useState<'image' | 'video'>(initialData?.hero_type ?? 'image')
  const [uploading, setUploading] = useState(false)
  const [heroUploading, setHeroUploading] = useState(false)
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  const [tagInput, setTagInput] = useState('')

  function toSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  function resolveContentType(file: File): string {
    if (file.type) return file.type
    const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
    const map: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
      heic: 'image/heic', heif: 'image/heif', avif: 'image/avif',
      mp4: 'video/mp4', mov: 'video/quicktime', webm: 'video/webm',
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

  async function uploadThumbnail(e: { target: { files?: FileList | null } }) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      setThumbnailUrl(await uploadFile(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 실패')
    } finally {
      setUploading(false)
    }
  }

  async function uploadHero(e: { target: { files?: FileList | null } }) {
    const file = e.target.files?.[0]
    if (!file) return
    setHeroUploading(true)
    try {
      const url = await uploadFile(file)
      setHeroUrl(url)
      setHeroType(file.type.startsWith('video/') ? 'video' : 'image')
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 실패')
    } finally {
      setHeroUploading(false)
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
      slug,
      subtitle: get('subtitle'),
      summary: get('summary'),
      client_name: get('client_name'),
      category: get('category'),
      period: get('period'),
      hero_url: heroUrl,
      hero_type: heroType,
      thumbnail_url: thumbnailUrl,
      blocks,
      meta_title: get('meta_title'),
      meta_description: get('meta_description'),
      tags,
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
        // re-throw redirect signal so Next.js can navigate away
        if (err && typeof err === 'object' && 'digest' in err &&
            typeof (err as { digest: unknown }).digest === 'string' &&
            (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')) {
          throw err
        }
        setError(err instanceof Error ? err.message : '삭제 실패')
      }
    })
  }

  const inputClass = "border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"

  return (
    <form onSubmit={handleSubmit} className="flex gap-8 items-start">
      <div className="flex-1 space-y-8 min-w-0">
      <div className="grid grid-cols-[160px_1fr] gap-4 items-start">

        <label className="text-sm text-gray-500 pt-3">프로젝트명 *</label>
        <input
          name="title"
          required
          defaultValue={initialData?.title}
          onChange={(e) => {
            if (!isEdit) setSlug(toSlug(e.target.value))
          }}
          className={inputClass}
        />

        <input name="slug" type="hidden" value={slug} readOnly />

        <label className="text-sm text-gray-500 pt-3">서브타이틀</label>
        <input name="subtitle" defaultValue={initialData?.subtitle ?? ''} placeholder="예: 브랜드 아이덴티티 & 웹사이트" className={inputClass} />

        <label className="text-sm text-gray-500 pt-3">써머리</label>
        <textarea name="summary" defaultValue={initialData?.summary ?? ''} placeholder="프로젝트 배경 및 목적을 간략히 설명해주세요" rows={4} className={`${inputClass} resize-none`} />

        <label className="text-sm text-gray-500 pt-3">클라이언트</label>
        <input name="client_name" defaultValue={initialData?.client_name ?? ''} placeholder="클라이언트명" className={inputClass} />

        <label className="text-sm text-gray-500 pt-3">카테고리</label>
        <select name="category" defaultValue={initialData?.category ?? 'web'} className={inputClass}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="text-sm text-gray-500 pt-3">개발기간</label>
        <input name="period" defaultValue={initialData?.period ?? ''} placeholder="예: 2021.05" className={inputClass} />

        {/* 히어로 영역 */}
        <label className="text-sm text-gray-500 pt-3">히어로</label>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <label className="cursor-pointer border border-gray-300 px-3 py-2 text-xs hover:bg-gray-100">
              {heroUploading ? '업로드 중...' : '이미지 / 동영상 선택'}
              <input type="file" accept="image/*,video/*" className="hidden" onChange={uploadHero} />
            </label>
            {heroUrl && (
              <button type="button" onClick={() => { setHeroUrl(''); setHeroType('image') }} className="text-xs text-red-400 hover:text-red-600">
                삭제
              </button>
            )}
          </div>
          {heroUrl && (
            <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
              {heroType === 'video' ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={heroUrl} muted loop className="w-full h-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroUrl} alt="hero preview" className="w-full h-full object-cover" />
              )}
              <span className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5">
                {heroType === 'video' ? '동영상' : '이미지'}
              </span>
            </div>
          )}
          <p className="text-xs text-gray-400">상세 페이지 최상단 전체화면 영역 · 이미지 또는 동영상</p>
        </div>

        {/* 썸네일 */}
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
            {thumbnailUrl && (
              <button type="button" onClick={() => setThumbnailUrl('')} className="text-xs text-red-400 hover:text-red-600">
                삭제
              </button>
            )}
          </div>
          {thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="thumbnail preview" className="max-h-24 object-contain" />
          )}
        </div>

        <div className="col-span-2 flex items-center gap-3 py-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input name="is_published" type="checkbox" defaultChecked={initialData?.is_published ?? false} className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
          </label>
          <span className="text-sm text-gray-500">공개</span>
        </div>

        <label className="text-sm text-gray-500 pt-3">Meta 타이틀</label>
        <div className="space-y-1">
          <input name="meta_title" defaultValue={initialData?.meta_title ?? ''} placeholder={initialData?.title ? `자동: ${initialData.title}` : '비워두면 제목이 자동 사용됩니다'} maxLength={60} className={`w-full ${inputClass}`} />
          <p className="text-xs text-gray-400">권장 60자 이내 · 비우면 제목이 그대로 사용됨</p>
        </div>

        <label className="text-sm text-gray-500 pt-3">Meta 설명</label>
        <div className="space-y-1">
          <textarea name="meta_description" defaultValue={initialData?.meta_description ?? ''} placeholder={(() => { const auto = getMetaDescription(null, blocks); return auto ? `자동: ${auto}` : '비워두면 첫 번째 텍스트 블록에서 자동 추출됩니다' })()} maxLength={160} rows={2} className="w-full border-b border-gray-300 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent resize-none" />
          <p className="text-xs text-gray-400">권장 120~160자 · 비우면 위 회색 미리보기 텍스트가 자동 사용됨</p>
        </div>

        <label className="text-sm text-gray-500 pt-3">태그 (SEO)</label>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5 min-h-[28px]">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-xs text-gray-700">
                #{tag}
                <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="text-gray-400 hover:text-red-500">✕</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                const val = tagInput.replace(/[#,\s]/g, '').trim()
                if (val && !tags.includes(val)) setTags([...tags, val])
                setTagInput('')
              }
            }}
            placeholder="태그 입력 후 Enter 또는 쉼표"
            className={`w-full ${inputClass}`}
          />
          <p className="text-xs text-gray-400">키워드로 입력 · # 없이 입력 · SEO 및 AI 검색 최적화에 반영됨</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-4">콘텐츠 블록</p>
        <BlockEditor blocks={blocks} onChange={setBlocks} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* 우측 sticky 버튼 패널 */}
      <div className="sticky top-8 w-40 flex-shrink-0 flex flex-col gap-3">
        <button type="submit" disabled={isPending} className="w-full border border-[#FF3B5C] text-[#FF3B5C] px-4 py-2.5 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors disabled:opacity-50">
          {isPending ? '저장 중...' : '저장'}
        </button>
        <button type="button" onClick={() => router.push('/admin/work')} className="w-full border border-black text-black px-4 py-2.5 text-sm hover:bg-black hover:text-white transition-colors">
          목록
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} disabled={isPending} className="w-full border border-red-400 text-red-500 px-4 py-2.5 text-sm hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 mt-4">
            삭제
          </button>
        )}
      </div>
    </form>
  )
}
