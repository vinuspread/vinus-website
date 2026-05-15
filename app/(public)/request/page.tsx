'use client'

import { useState } from 'react'

export default function RequestPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name:     (form.elements.namedItem('name')     as HTMLInputElement).value,
      email:    (form.elements.namedItem('email')    as HTMLInputElement).value,
      tel:      (form.elements.namedItem('tel')      as HTMLInputElement).value,
      budget:   (form.elements.namedItem('budget')   as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-transparent border-b border-alto py-[16px] text-[15px] tracking-[-0.3px] placeholder:text-mine-shaft/30 focus:outline-none focus:border-mine-shaft transition-colors"

  return (
    <main className="bg-gallery">
      {/* Header */}
      <section className="pt-[140px] pb-[80px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase">
              REQUEST
            </h1>
          </div>
          <div className="md:col-span-5 md:col-start-4">
            <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px]">
              프로젝트에 대해 알려주세요. 검토 후 빠르게 연락드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-page-padding py-[120px]">
        {status === 'done' ? (
          <div className="md:col-start-4 md:col-span-5">
            <p className="text-[24px] tracking-[-0.5px]">문의해 주셔서 감사합니다.<br />빠른 시일 내에 연락드리겠습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-8 gap-column">
            <div className="md:col-span-5 md:col-start-4 flex flex-col gap-0">
              <input name="name"  type="text"  required placeholder="이름 *"       className={inputClass} />
              <input name="email" type="email" required placeholder="이메일 *"     className={inputClass} />
              <input name="tel"   type="tel"            placeholder="연락처"       className={inputClass} />
              <input name="budget" type="text"          placeholder="예산 규모"    className={inputClass} />
              <textarea
                name="description"
                required
                placeholder="프로젝트 내용 *"
                rows={6}
                className={`${inputClass} resize-none`}
              />

              {status === 'error' && (
                <p className="text-[13px] text-red-500 mt-4">전송에 실패했습니다. 다시 시도해주세요.</p>
              )}

              <div className="mt-[60px]">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-front text-[13px] px-8 py-3 disabled:opacity-40"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
