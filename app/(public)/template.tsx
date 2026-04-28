'use client'

import { ViewTransition } from 'react'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return <ViewTransition>{children}</ViewTransition>
}
