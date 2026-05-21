'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Block } from '@/types'

export interface BlogFormData {
  id?: string
  title: string
  slug: string
  category: string
  thumbnail_url: string
  blocks: Block[]
  file_url: string
  meta_title: string
  meta_description: string
  tags: string[]
  is_published: boolean
  sort_order: number
  created_at?: string
}

export async function saveBlog(data: BlogFormData): Promise<{ id: string; slug: string }> {
  const supabase = await createClient()
  const payload = {
    title: data.title,
    slug: data.slug,
    category: data.category,
    thumbnail_url: data.thumbnail_url || null,
    blocks: data.blocks,
    file_url: data.file_url || null,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    tags: data.tags ?? [],
    is_published: data.is_published,
    sort_order: data.sort_order,
    ...(data.created_at ? { created_at: data.created_at } : {}),
  }

  if (data.id) {
    const { error } = await supabase.from('blog').update(payload).eq('id', data.id)
    if (error) throw new Error(error.message)
    revalidatePath('/story')
    revalidatePath(`/story/${data.slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: data.id, slug: data.slug }
  } else {
    // slug 중복 시 suffix 자동 추가
    let slug = payload.slug
    let attempt = 0
    let inserted: { id: string } | null = null
    while (attempt < 5) {
      const trySlug = attempt === 0 ? slug : `${slug}-${attempt}`
      const { data: row, error } = await supabase
        .from('blog').insert({ ...payload, slug: trySlug }).select('id').single()
      if (!error && row) { inserted = row; slug = trySlug; break }
      if (error?.code !== '23505') throw new Error(error?.message ?? '저장 실패')
      attempt++
    }
    if (!inserted) throw new Error('슬러그가 중복됩니다. 제목을 변경해주세요.')
    revalidatePath('/story')
    revalidatePath(`/story/${slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: inserted.id, slug }
  }
}

export async function deleteBlog(id: string, slug: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blog').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/story')
  revalidatePath(`/story/${slug}`, 'page')
  revalidatePath('/sitemap.xml')
}
