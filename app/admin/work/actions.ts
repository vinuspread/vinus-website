'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Block } from '@/types'

export interface WorkFormData {
  id?: string
  title: string
  slug: string
  category: string
  thumbnail_url: string
  thumbnail_color: string
  blocks: Block[]
  meta_title: string
  meta_description: string
  is_published: boolean
  sort_order: number
}

export async function saveWork(data: WorkFormData) {
  const supabase = await createClient()
  const payload = {
    title: data.title,
    slug: data.slug,
    category: data.category || null,
    thumbnail_url: data.thumbnail_url || null,
    thumbnail_color: data.thumbnail_color || null,
    blocks: data.blocks,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    is_published: data.is_published,
    sort_order: data.sort_order,
  }

  if (data.id) {
    const { error } = await supabase.from('work').update(payload).eq('id', data.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('work').insert(payload)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/work')
  revalidatePath(`/work/${data.slug}`, 'page')
  revalidatePath('/sitemap.xml')
  redirect('/admin/work')
}

export async function deleteWork(id: string, slug: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('work').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/work')
  revalidatePath(`/work/${slug}`, 'page')
  redirect('/admin/work')
}
