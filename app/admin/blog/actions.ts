'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Block } from '@/types'

export interface BlogFormData {
  id?: string
  title: string
  slug: string
  category: 'Story' | 'Download'
  thumbnail_url: string
  blocks: Block[]
  file_url: string
  meta_title: string
  meta_description: string
  tags: string[]
  is_published: boolean
  sort_order: number
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
  }

  if (data.id) {
    const { error } = await supabase.from('blog').update(payload).eq('id', data.id)
    if (error) throw new Error(error.message)
    revalidatePath('/story')
    revalidatePath(`/story/${data.slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: data.id, slug: data.slug }
  } else {
    const { data: inserted, error } = await supabase.from('blog').insert(payload).select('id').single()
    if (error) throw new Error(error.message)
    revalidatePath('/story')
    revalidatePath(`/story/${data.slug}`, 'page')
    revalidatePath('/sitemap.xml')
    return { id: inserted.id, slug: data.slug }
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
