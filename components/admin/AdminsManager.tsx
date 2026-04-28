'use client'

import { useState, useTransition } from 'react'

interface AdminUser {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

interface Props {
  users: AdminUser[]
  currentUserId: string
}

export default function AdminsManager({ users: initialUsers, currentUserId }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [inviteEmail, setInviteEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleInvite(e: { preventDefault: () => void }) {
    e.preventDefault()
    setMessage('')
    setError('')
    startTransition(async () => {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      })
      const json = await res.json() as { success?: boolean; error?: string }
      if (!res.ok) {
        setError(json.error ?? '초대 실패')
      } else {
        setMessage(`${inviteEmail}으로 초대 이메일을 발송했습니다.`)
        setInviteEmail('')
      }
    })
  }

  async function handleDelete(userId: string, email: string) {
    if (!confirm(`${email} 계정을 삭제하시겠습니까?`)) return
    setError('')
    startTransition(async () => {
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const json = await res.json() as { success?: boolean; error?: string }
      if (!res.ok) {
        setError(json.error ?? '삭제 실패')
      } else {
        setUsers(users.filter((u) => u.id !== userId))
      }
    })
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold mb-6">관리자 목록</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-normal text-gray-500">이메일</th>
              <th className="text-left py-3 font-normal text-gray-500">가입일</th>
              <th className="text-left py-3 font-normal text-gray-500">마지막 로그인</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100">
                <td className="py-3">
                  {u.email}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-xs text-gray-400">(나)</span>
                  )}
                </td>
                <td className="py-3 text-gray-500">
                  {new Date(u.created_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="py-3 text-gray-500">
                  {u.last_sign_in_at
                    ? new Date(u.last_sign_in_at).toLocaleDateString('ko-KR')
                    : '-'}
                </td>
                <td className="py-3 text-right">
                  {u.id !== currentUserId && (
                    <button
                      onClick={() => handleDelete(u.id, u.email)}
                      disabled={isPending}
                      className="text-xs border border-red-300 text-red-500 px-2 py-1 hover:bg-red-50 disabled:opacity-50"
                    >
                      삭제
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h2 className="text-lg font-semibold mb-6">관리자 초대</h2>
        <form onSubmit={handleInvite} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-2">이메일</label>
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black bg-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="border border-[#FF3B5C] text-[#FF3B5C] px-6 py-3 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors disabled:opacity-50"
          >
            {isPending ? '발송 중...' : '초대 발송'}
          </button>
        </form>
        {message && <p className="text-green-600 text-sm mt-3">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  )
}
