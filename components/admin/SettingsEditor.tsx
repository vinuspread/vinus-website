'use client'

import { useState, useTransition } from 'react'
import { saveSettings } from '@/app/admin/settings/actions'

interface Entry {
  key: string
  value: string
}

interface Props {
  initialEntries: Entry[]
}

export default function SettingsEditor({ initialEntries }: Props) {
  const [entries, setEntries] = useState<Entry[]>(initialEntries)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(index: number, value: string) {
    setEntries(entries.map((e, i) => (i === index ? { ...e, value } : e)))
  }

  function handleSave() {
    setError('')
    setSuccess(false)
    startTransition(async () => {
      try {
        await saveSettings(entries)
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : '저장 실패')
      }
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {entries.map((entry, index) => (
        <div key={entry.key} className="grid grid-cols-[160px_1fr] gap-4 items-center">
          <label className="text-sm text-gray-500">{entry.key}</label>
          <input
            value={entry.value}
            onChange={(e) => update(index, e.target.value)}
            className="border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black bg-transparent"
          />
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">저장되었습니다.</p>}

      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="border border-[#FF3B5C] text-[#FF3B5C] px-8 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors disabled:opacity-50"
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  )
}
