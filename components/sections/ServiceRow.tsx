'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ServiceRowProps {
  index: number
  service: { title: string; items: string[] }
}

export function ServiceRow({ index, service }: ServiceRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-alto group">
      <div
        className="py-[28px] flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-8">
          <span className="text-[11px] text-mine-shaft/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[32px] tracking-[-0.8px] uppercase">
            {service.title}
          </span>
        </div>
        <span className={cn('text-[20px] transition-transform duration-300 font-light', isOpen ? 'rotate-45' : 'rotate-0')}>
          +
        </span>
      </div>
      <div className={cn('overflow-hidden transition-all duration-500 ease-in-out', isOpen ? 'max-h-[500px] pb-[40px]' : 'max-h-0')}>
        <div className="pl-[72px] grid grid-cols-1 md:grid-cols-3 gap-4">
          {service.items.map((item) => (
            <p key={item} className="text-[15px] font-light text-mine-shaft/60">{item}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
