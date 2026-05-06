'use client'

import { useTransition } from 'react'
import { revalidateAllWork } from './actions'

export default function RevalidateButton() {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await revalidateAllWork()
      alert('모든 Work 페이지 캐시가 초기화됐어요.')
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="border border-gray-400 text-gray-600 px-4 py-2 text-xs hover:bg-gray-100 transition-colors disabled:opacity-50"
    >
      {pending ? '초기화 중...' : '캐시 초기화'}
    </button>
  )
}
