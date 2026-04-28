'use client'

import { useState } from 'react'

export default function RequestPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      tel: (form.elements.namedItem('tel') as HTMLInputElement).value,
      budget: (form.elements.namedItem('budget') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setStatus(res.ok ? 'done' : 'error')
  }

  return (
    <div className="px-8 max-w-2xl mx-auto pb-24">
      <h1 className="text-4xl font-bold mb-4">Request</h1>
      <p className="text-gray-500 mb-12 text-sm">
        내용을 디테일하게 남겨주시면 정확한 견적과 컨설팅이 가능합니다.<br />
        남겨주신 의뢰는 담당자 이메일로 발송되며, 어떠한 정보도 저장하지 않습니다.
      </p>

      {status === 'done' ? (
        <div className="text-center py-16">
          <p className="text-xl font-medium">의뢰가 접수되었습니다.</p>
          <p className="text-gray-500 mt-2 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: 'name', label: '이름 *', type: 'text', required: true },
            { name: 'email', label: '이메일 *', type: 'email', required: true },
            { name: 'tel', label: '연락처', type: 'tel', required: false },
            { name: 'budget', label: '예산', type: 'text', required: false },
          ].map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm mb-2">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
              />
            </div>
          ))}

          <div>
            <label htmlFor="description" className="block text-sm mb-2">프로젝트 내용 *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm" role="alert">발송에 실패했습니다. 다시 시도해주세요.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? '발송 중...' : '의뢰하기'}
          </button>
        </form>
      )}
    </div>
  )
}
