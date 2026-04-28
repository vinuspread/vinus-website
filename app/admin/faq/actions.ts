'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Faq } from '@/types'

export async function saveFaqs(faqs: Faq[]) {
  const supabase = await createClient()

  for (const faq of faqs) {
    if (!faq.id || faq.id.startsWith('new-')) {
      const { error } = await supabase.from('faq').insert({
        question: faq.question,
        answer: faq.answer,
        sort_order: faq.sort_order,
        is_published: faq.is_published,
      })
      if (error) throw new Error(error.message)
    } else {
      const { error } = await supabase.from('faq').update({
        question: faq.question,
        answer: faq.answer,
        sort_order: faq.sort_order,
        is_published: faq.is_published,
      }).eq('id', faq.id)
      if (error) throw new Error(error.message)
    }
  }

  revalidatePath('/we')
}

export async function deleteFaq(id: string) {
  if (id.startsWith('new-')) return
  const supabase = await createClient()
  const { error } = await supabase.from('faq').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/we')
}
