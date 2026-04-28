'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveSettings(entries: { key: string; value: string }[]) {
  const supabase = await createClient()
  for (const entry of entries) {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: entry.key, value: entry.value }, { onConflict: 'key' })
    if (error) throw new Error(error.message)
  }
  revalidatePath('/', 'layout')
}
