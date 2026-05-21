import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCategories } from '@/app/admin/categories/actions'
import WorkListFilter from '@/components/admin/WorkListFilter'
import RevalidateButton from './RevalidateButton'

export default async function AdminWorkPage() {
  const supabase = await createClient()
  const [{ data: works }, categories] = await Promise.all([
    supabase
      .from('work')
      .select('id, title, category, is_published, sort_order')
      .order('sort_order', { ascending: true }),
    getCategories('work'),
  ])

  const categoryNames = categories.map((c) => c.name)

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Work</h1>
        <div className="flex gap-2">
          <RevalidateButton />
          <Link
            href="/admin/work/new"
            className="border border-[#FF3B5C] text-[#FF3B5C] px-6 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors"
          >
            + 새 Work
          </Link>
        </div>
      </div>
      <WorkListFilter works={works ?? []} categories={categoryNames} />
    </div>
  )
}
