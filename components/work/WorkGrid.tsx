'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Work } from '@/types'

const ease = [0.65, 0, 0.35, 1] as [number, number, number, number]

function WorkGridItem({ work }: { work: Work }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const imgSrc = work.hero_url || work.thumbnail_url

  return (
    <div ref={ref} className="border-b border-alto md:odd:border-r">
      <Link
        href={`/work/${work.slug}`}
        className="aspect-[920/640] overflow-hidden relative group flex"
      >
        {imgSrc ? (
          <div className="absolute inset-0 overflow-hidden">
            {/* 커버: 위로 빠져나가며 이미지 드러냄 */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: '#d6d6d6' }}
              initial={{ y: 0 }}
              animate={inView ? { y: '-101%' } : { y: 0 }}
              transition={{ duration: 0.85, ease }}
            />
            {/* 이미지: 아래에서 올라오며 scale */}
            <motion.div
              className="absolute inset-0"
              initial={{ y: '100%', scale: 1.08 }}
              animate={inView ? { y: 0, scale: 1 } : { y: '100%', scale: 1.08 }}
              transition={{ duration: 1.0, delay: 0.1, ease }}
            >
              <Image
                src={imgSrc}
                alt={work.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: work.thumbnail_color ?? '#d6d6d6' }}
          />
        )}

        {/* 텍스트 오버레이 */}
        <div className="absolute bottom-0 left-0 p-[40px] z-20 w-full pointer-events-none">
          {work.category && (
            <motion.p
              className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              {work.category}
            </motion.p>
          )}
          <div className="overflow-hidden">
            <motion.h3
              className="text-[24px] text-white uppercase tracking-[-0.7px] leading-tight"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
            >
              {work.title}
            </motion.h3>
          </div>
        </div>

        {/* 호버 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </div>
  )
}

export default function WorkGrid({ works }: { works: Work[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {works.map(work => (
        <WorkGridItem key={work.id} work={work} />
      ))}
    </div>
  )
}
