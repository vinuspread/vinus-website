import { createClient } from '@/lib/supabase/server'
import FaqEditor from '@/components/admin/FaqEditor'
import type { Faq } from '@/types'

export default async function AdminFaqPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase
    .from('faq')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">FAQ</h1>
      <FaqEditor initialFaqs={(faqs as Faq[]) ?? []} />
    </div>
  )
}
