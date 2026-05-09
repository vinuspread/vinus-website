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
          <div className="absolute inset-0">
            {/* 회색 배경: 하단에서 위로 성장, 유지됨 */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{ backgroundColor: '#ebebeb', originY: 1 }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            />
            {/* 이미지: clipPath로 하단부터 드러남, 위에 유지 */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
              transition={{ duration: 1.0, delay: 0.3, ease }}
            >
              <Image
                src={imgSrc}
                alt={work.title}
                fill
                placeholder="blur"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAPAAANbW1gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
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
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              {work.category}
            </motion.p>
          )}
          <div className="overflow-hidden">
            <motion.h3
              className="text-[24px] text-white uppercase tracking-[-0.7px] leading-tight"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.6, delay: 1.2, ease }}
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
