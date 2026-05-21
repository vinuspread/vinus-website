'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Block } from '@/types'

export interface WorkFormData {
  id?: string
  title: string
  slug: string
  subtitle: string
  summary: string
  client_name: string
  category: string
  period: string
  hero_url: string
  hero_type: 'image' | 'video'
  thumbnail_url: string
  blocks: Block[]
  meta_title: string
  meta_description: string
  tags: string[]
  is_published: boolean
}

export async function saveWork(data: WorkFormData): Promise<{ id: string; slug: string }> {
  const supabase = await createClient()
  const payload = {
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle || null,
    summary: data.summary || null,
    client_name: data.client_name || null,
    category: data.category || null,
    period: data.period || null,
    hero_url: data.hero_url || null,
    hero_type: data.hero_url ? data.hero_type : null,
    thumbnail_url: data.thumbnail_url || null,
    blocks: data.blocks,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    tags: data.tags ?? [],
    is_published: data.is_published,
  }

  if (data.id) {
    const { error } = await supabase.from('work').update(payload).eq('id', data.id)
    if (error) throw new Error(error.message)
    revalidatePath('/work')
    revalidatePath(`/work/${data.slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: data.id, slug: data.slug }
  } else {
    let slug = payload.slug
    let attempt = 0
    let inserted: { id: string } | null = null
    while (attempt < 5) {
      const trySlug = attempt === 0 ? slug : `${slug}-${attempt}`
      const { data: row, error } = await supabase
        .from('work').insert({ ...payload, slug: trySlug }).select('id').single()
      if (!error && row) { inserted = row; slug = trySlug; break }
      if (error?.code !== '23505') throw new Error(error?.message ?? '저장 실패')
      attempt++
    }
    if (!inserted) throw new Error('슬러그가 중복됩니다. 제목을 변경해주세요.')
    revalidatePath('/work')
    revalidatePath(`/work/${slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: inserted.id, slug }
  }
}

export async function revalidateAllWork() {
  const supabase = await createClient()
  const { data: works } = await supabase.from('work').select('slug')
  revalidatePath('/work')
  revalidatePath('/work', 'layout')
  for (const w of works ?? []) {
    revalidatePath(`/work/${w.slug}`, 'page')
  }
  revalidatePath('/sitemap.xml')
}

export async function deleteWork(id: string, slug: string) {
  const { redirect } = await import('next/navigation')
  const supabase = await createClient()
  const { error } = await supabase.from('work').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/work')
  revalidatePath(`/work/${slug}`, 'page')
  redirect('/admin/work')
}
