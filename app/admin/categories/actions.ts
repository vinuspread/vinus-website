'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface Category {
  id: string
  type: 'work' | 'blog'
  name: string
  sort_order: number
}

export async function getCategories(type: 'work' | 'blog'): Promise<Category[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('id, type, name, sort_order')
    .eq('type', type)
    .order('sort_order')
  return (data ?? []) as Category[]
}

export async function addCategory(type: 'work' | 'blog', name: string) {
  const trimmed = name.trim()
  if (!trimmed) throw new Error('카테고리명을 입력해주세요')

  const supabase = await createClient()
  const { data: last } = await supabase
    .from('categories')
    .select('sort_order')
    .eq('type', type)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const sort_order = last ? last.sort_order + 1 : 0
  const { error } = await supabase.from('categories').insert({ type, name: trimmed, sort_order })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}

export async function renameCategory(id: string, newName: string) {
  const trimmed = newName.trim()
  if (!trimmed) throw new Error('카테고리명을 입력해주세요')

  const supabase = await createClient()
  const { data: target } = await supabase
    .from('categories')
    .select('type, name')
    .eq('id', id)
    .single()
  if (!target) throw new Error('카테고리를 찾을 수 없습니다')

  const oldName = target.name
  const type = target.type as 'work' | 'blog'

  await supabase.from('categories').update({ name: trimmed }).eq('id', id)
  await supabase.from(type).update({ category: trimmed }).eq('category', oldName)

  revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { data: target } = await supabase
    .from('categories')
    .select('type, name')
    .eq('id', id)
    .single()
  if (!target) return

  const type = target.type as 'work' | 'blog'
  await supabase.from(type).update({ category: 'etc' }).eq('category', target.name)
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}

export async function moveCategory(id: string, direction: 'up' | 'down') {
  const supabase = await createClient()
  const { data: target } = await supabase
    .from('categories')
    .select('id, type, sort_order')
    .eq('id', id)
    .single()
  if (!target) return

  const { data: neighbor } = await supabase
    .from('categories')
    .select('id, sort_order')
    .eq('type', target.type)
    .filter('sort_order', direction === 'up' ? 'lt' : 'gt', target.sort_order)
    .order('sort_order', { ascending: direction !== 'up' })
    .limit(1)
    .single()
  if (!neighbor) return

  await supabase.from('categories').update({ sort_order: neighbor.sort_order }).eq('id', target.id)
  await supabase.from('categories').update({ sort_order: target.sort_order }).eq('id', neighbor.id)
  revalidatePath('/admin/categories')
}
