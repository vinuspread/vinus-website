'use client'

import { useState, useTransition } from 'react'
import { addCategory, deleteCategory, moveCategory, renameCategory } from '@/app/admin/categories/actions'
import type { Category } from '@/app/admin/categories/actions'

interface Props {
  type: 'work' | 'blog'
  initialCategories: Category[]
}

export default function CategoriesManager({ type, initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  function handleAdd(e: { preventDefault: () => void }) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await addCategory(type, input)
        setInput('')
        setCategories(prev => [...prev, { id: crypto.randomUUID(), type, name: input.trim(), sort_order: prev.length }])
      } catch (err) {
        setError(err instanceof Error ? err.message : '추가 실패')
      }
    })
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" 카테고리를 삭제하시겠습니까?\n해당 카테고리의 게시물은 자동으로 "etc"로 변경됩니다.`)) return
    startTransition(async () => {
      try {
        await deleteCategory(id)
        setCategories(prev => prev.filter(c => c.id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : '삭제 실패')
      }
    })
  }

  function handleMove(id: string, direction: 'up' | 'down') {
    startTransition(async () => {
      try {
        await moveCategory(id, direction)
        setCategories(prev => {
          const arr = [...prev]
          const idx = arr.findIndex(c => c.id === id)
          const swapIdx = direction === 'up' ? idx - 1 : idx + 1
          if (swapIdx < 0 || swapIdx >= arr.length) return arr
          ;[arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]]
          return arr
        })
      } catch {
        // silent
      }
    })
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id)
    setEditingName(cat.name)
  }

  function handleRename(id: string) {
    setError('')
    startTransition(async () => {
      try {
        await renameCategory(id, editingName)
        setCategories(prev => prev.map(c => c.id === id ? { ...c, name: editingName.trim() } : c))
        setEditingId(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : '수정 실패')
      }
    })
  }

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-gray-100 border border-gray-200">
        {categories.length === 0 && (
          <li className="py-4 px-4 text-sm text-gray-400">카테고리가 없습니다.</li>
        )}
        {categories.map((cat, idx) => (
          <li key={cat.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            {editingId === cat.id ? (
              <input
                autoFocus
                value={editingName}
                onChange={e => setEditingName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleRename(cat.id)
                  if (e.key === 'Escape') setEditingId(null)
                }}
                className="flex-1 border-b border-black py-1 text-sm text-gray-900 focus:outline-none bg-transparent mr-2"
              />
            ) : (
              <span
                className="text-sm text-gray-800 cursor-pointer hover:text-black"
                onDoubleClick={() => startEdit(cat)}
                title="더블클릭하여 수정"
              >
                {cat.name}
              </span>
            )}
            <div className="flex items-center gap-1 shrink-0">
              {editingId === cat.id ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleRename(cat.id)}
                    disabled={isPending || !editingName.trim()}
                    className="text-xs px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors disabled:opacity-40"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs px-2 py-1 border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => startEdit(cat)}
                    disabled={isPending}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-20 text-xs"
                    title="수정"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(cat.id, 'up')}
                    disabled={idx === 0 || isPending}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-20"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(cat.id, 'down')}
                    disabled={idx === categories.length - 1 || isPending}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-20"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    disabled={isPending}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 disabled:opacity-50 ml-1"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="새 카테고리명"
          required
          className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="border border-black px-4 py-1.5 text-sm hover:bg-black hover:text-white transition-colors disabled:opacity-40"
        >
          추가
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
