'use client'

import { useState } from 'react'
import type { BlogCodeBlock } from '@/types'

export default function BlogCodeBlock({ block }: { block: BlogCodeBlock }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(block.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-alto overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-mine-shaft/[0.03] border-b border-alto">
        <span className="font-mono text-[11px] text-mine-shaft/30 uppercase tracking-widest">
          {block.language}
        </span>
        <button
          onClick={handleCopy}
          className="font-inter text-[11px] text-mine-shaft/30 hover:text-mine-shaft transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 bg-mine-shaft/[0.02]">
        <code className="font-mono text-sm text-mine-shaft/60 leading-relaxed">
          {block.code}
        </code>
      </pre>
    </div>
  )
}
