import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Blog } from '@/types'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from('blog')
    .select('id, title, category, is_published, sort_order')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="border border-[#FF3B5C] text-[#FF3B5C] px-6 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors"
        >
          + 새 Blog
        </Link>
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
          {((blogs as Blog[]) ?? []).map((blog) => (
            <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3">
                <Link href={`/admin/blog/${blog.id}`} className="hover:underline">
                  {blog.title}
                </Link>
              </td>
              <td className="py-3 text-gray-500">{blog.category}</td>
              <td className="py-3 text-gray-500">{blog.sort_order}</td>
              <td className="py-3">{blog.is_published ? '✓' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
