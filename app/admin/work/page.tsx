import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Work } from '@/types'
import RevalidateButton from './RevalidateButton'

export default async function AdminWorkPage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('id, title, category, is_published, sort_order, created_at')
    .order('sort_order', { ascending: true })

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
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 font-normal text-gray-500">제목</th>
            <th className="text-left py-3 font-normal text-gray-500">카테고리</th>
            <th className="text-left py-3 font-normal text-gray-500">순서</th>
            <th className="text-left py-3 font-normal text-gray-500">공개</th>
          </tr>
        </thead>
        <tbody>
          {((works as Work[]) ?? []).map((work) => (
            <tr key={work.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3">
                <Link href={`/admin/work/${work.id}`} className="hover:underline">
                  {work.title}
                </Link>
              </td>
              <td className="py-3 text-gray-500">{work.category ?? '-'}</td>
              <td className="py-3 text-gray-500">{work.sort_order}</td>
              <td className="py-3">{work.is_published ? '✓' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
