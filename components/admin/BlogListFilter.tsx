'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface BlogItem {
  id: string
  title: string
  category: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  const yy = String(d.getFullYear()).slice(2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${yy}.${mm}.${dd} ${hh}:${min}`
}

interface Props {
  blogs: BlogItem[]
}

export default function BlogListFilter({ blogs }: Props) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return blogs
    return blogs.filter((b) => b.title.toLowerCase().includes(query))
  }, [blogs, q])

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="제목 검색"
          className="flex-1 border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-black"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="px-3 py-2 text-sm text-gray-400 hover:text-black border border-gray-200"
          >
            초기화
          </button>
        )}
      </div>

      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col style={{ width: '40%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '24%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '8%' }} />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 pr-4 font-normal text-gray-500">제목</th>
            <th className="text-left py-3 pr-4 font-normal text-gray-500">카테고리</th>
            <th className="text-left py-3 pr-4 font-normal text-gray-500">작성일시</th>
            <th className="text-left py-3 pr-4 font-normal text-gray-500">순서</th>
            <th className="text-left py-3 font-normal text-gray-500">공개</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-400 text-sm">검색 결과가 없습니다</td>
            </tr>
          ) : filtered.map((blog) => (
            <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 pr-4">
                <Link href={`/admin/blog/${blog.id}`} className="hover:underline">
                  {blog.title}
                </Link>
              </td>
              <td className="py-3 pr-4 text-gray-500">{blog.category ?? '-'}</td>
              <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{formatDateTime(blog.created_at)}</td>
              <td className="py-3 pr-4 text-gray-500">{blog.sort_order}</td>
              <td className="py-3">{blog.is_published ? '✓' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-gray-400">{filtered.length} / {blogs.length}개</p>
    </div>
  )
}
