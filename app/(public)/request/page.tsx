'use client'

import { useState } from 'react'
import { FadeUp, LetterReveal } from '@/components/ui/MotionWrapper'

export default function RequestPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement }) {
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
    <main className="pt-32 md:pt-48 pb-32 min-h-screen bg-white text-center">
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto flex flex-col items-center">
        <header className="mb-24 md:mb-40 flex flex-col items-center gap-12 w-full">
          <div className="flex flex-col items-center w-full">
            <FadeUp delay={0.2}>
              <p className="text-sm text-gray-400 tracking-[0.3em] uppercase mb-8 font-syne">
                Start a project
              </p>
            </FadeUp>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-syne font-bold tracking-tighter leading-[0.9] text-black">
              <LetterReveal text="Let's build something." delay={0.4} className="justify-center flex-wrap max-w-[80vw]" />
            </h1>
          </div>
          <FadeUp delay={1.2} className="max-w-xl text-center">
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-6">
              내용을 디테일하게 남겨주시면 정확한 견적과 컨설팅이 가능합니다.
            </p>
            <p className="text-sm text-gray-400">
              남겨주신 의뢰는 담당자 이메일로 발송되며, 어떠한 정보도 저장하지 않습니다.
            </p>
          </FadeUp>
        </header>

        {status === 'done' ? (
          <FadeUp delay={0.2}>
            <div className="text-center py-32 bg-gray-50 border border-gray-100 rounded-3xl">
              <h2 className="text-5xl md:text-7xl font-light mb-8">Thank you.</h2>
              <p className="text-xl text-gray-500 font-light">의뢰가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.</p>
            </div>
          </FadeUp>
        ) : (
          <FadeUp delay={1.4}>
            <form onSubmit={handleSubmit} className="space-y-20 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-16">
                {[
                  { name: 'name', label: 'Name *', type: 'text', required: true, placeholder: '홍길동' },
                  { name: 'email', label: 'Email *', type: 'email', required: true, placeholder: 'hello@example.com' },
                  { name: 'tel', label: 'Phone', type: 'tel', required: false, placeholder: '010-0000-0000' },
                  { name: 'budget', label: 'Budget', type: 'text', required: false, placeholder: '예상 예산을 입력해주세요' },
                ].map(field => (
                  <div key={field.name} className="relative group">
                    <label htmlFor={field.name} className="block text-sm tracking-[0.2em] uppercase text-gray-400 mb-6 transition-colors group-focus-within:text-black">{field.label}</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-2xl md:text-3xl font-light focus:outline-none focus:border-black transition-all placeholder:text-gray-100"
                    />
                  </div>
                ))}
              </div>

              <div className="relative group">
                <label htmlFor="description" className="block text-sm tracking-[0.2em] uppercase text-gray-400 mb-6 transition-colors group-focus-within:text-black">Project Details *</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="어떤 프로젝트를 준비 중이신가요?"
                  className="w-full bg-transparent border-b border-gray-200 py-4 text-2xl md:text-3xl font-light focus:outline-none focus:border-black transition-all placeholder:text-gray-100 resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-[#FF3B5C] text-sm" role="alert">발송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
              )}

              <div className="pt-12">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative inline-flex items-center justify-center px-16 py-8 text-sm tracking-[0.2em] uppercase overflow-hidden rounded-full bg-black text-white font-medium transition-all hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-6">
                    {status === 'sending' ? 'Sending...' : 'Send Request'}
                    {status !== 'sending' && (
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-transform duration-300">
                        <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </FadeUp>
        )}
      </div>
    </main>
  )
}


