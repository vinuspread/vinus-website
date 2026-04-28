'use client'

import { useState, useTransition } from 'react'
import { saveFaqs, deleteFaq } from '@/app/admin/faq/actions'
import type { Faq } from '@/types'

interface Props {
  initialFaqs: Faq[]
}

export default function FaqEditor({ initialFaqs }: Props) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(index: number, field: keyof Faq, value: string | number | boolean) {
    setFaqs(faqs.map((f, i) => (i === index ? { ...f, [field]: value } : f)))
  }

  function addRow() {
    setFaqs([
      ...faqs,
      {
        id: `new-${Date.now()}`,
        question: '',
        answer: '',
        sort_order: faqs.length,
        is_published: true,
      },
    ])
  }

  function removeRow(index: number) {
    const faq = faqs[index]
    startTransition(async () => {
      try {
        await deleteFaq(faq.id)
        setFaqs(faqs.filter((_, i) => i !== index))
      } catch (err) {
        setError(err instanceof Error ? err.message : '삭제 실패')
      }
    })
  }

  function moveUp(index: number) {
    if (index === 0) return
    const next = [...faqs]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    setFaqs(next.map((f, i) => ({ ...f, sort_order: i })))
  }

  function moveDown(index: number) {
    if (index === faqs.length - 1) return
    const next = [...faqs]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    setFaqs(next.map((f, i) => ({ ...f, sort_order: i })))
  }

  function handleSave() {
    setError('')
    setSuccess(false)
    startTransition(async () => {
      try {
        await saveFaqs(faqs.map((f, i) => ({ ...f, sort_order: i })))
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : '저장 실패')
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="border border-gray-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <button type="button" onClick={() => moveUp(index)} disabled={index === 0}
                  className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↑</button>
                <button type="button" onClick={() => moveDown(index)} disabled={index === faqs.length - 1}
                  className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↓</button>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-xs text-gray-500">
                  <input type="checkbox" checked={faq.is_published}
                    onChange={(e) => update(index, 'is_published', e.target.checked)} />
                  공개
                </label>
                <button type="button" onClick={() => removeRow(index)}
                  className="text-xs border border-red-300 text-red-500 px-2 py-1 hover:bg-red-50">삭제</button>
              </div>
            </div>
            <input
              value={faq.question}
              onChange={(e) => update(index, 'question', e.target.value)}
              placeholder="질문"
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black bg-transparent"
            />
            <textarea
              value={faq.answer}
              onChange={(e) => update(index, 'answer', e.target.value)}
              placeholder="답변"
              rows={3}
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-black bg-transparent resize-none"
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={addRow}
        className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
        + FAQ 추가
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">저장되었습니다.</p>}

      <div className="pt-4 border-t border-gray-200">
        <button type="button" onClick={handleSave} disabled={isPending}
          className="border border-[#FF3B5C] text-[#FF3B5C] px-8 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors disabled:opacity-50">
          {isPending ? '저장 중...' : '전체 저장'}
        </button>
      </div>
    </div>
  )
}
