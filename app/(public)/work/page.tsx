import { createClient } from '@/lib/supabase/server'
import { WorkPageClient } from './WorkPageClient'
import type { Work } from '@/types'

export default async function WorkPage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return <WorkPageClient works={(works as Work[]) ?? []} />
}
