import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Work } from '@/types'
import { WorkGridClient } from './WorkGridClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Work',
  description: '바이너스프레드의 포트폴리오 — 웹사이트, 앱, 브랜드 디자인 프로젝트',
}

export default async function WorkPage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return <WorkGridClient works={(works as Work[]) ?? []} />
}
