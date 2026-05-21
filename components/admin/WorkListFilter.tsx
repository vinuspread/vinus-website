'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface WorkItem {
  id: string
  title: string
  category: string | null
  is_published: boolean
  sort_order: number
}

interface Props {
  works: WorkItem[]
}

export default function WorkListFilter({ works }: Props) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return works
    return works.filter((w) => w.title.toLowerCase().includes(query))
  }, [works, q])

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
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-10 text-center text-gray-400 text-sm">검색 결과가 없습니다</td>
            </tr>
          ) : filtered.map((work) => (
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
      <p className="mt-3 text-xs text-gray-400">{filtered.length} / {works.length}개</p>
    </div>
  )
}
