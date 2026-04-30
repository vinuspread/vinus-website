'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Work } from '@/types'
import { useCursor } from '@/components/ui/CustomCursor'

export default function WorkCard({ work, index = 0 }: { work: Work, index?: number }) {
  const { setCursorState } = useCursor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.1 }}
    >
      <Link
        href={`/work/${work.slug}`}
        className="group block relative w-full h-full"
        aria-label={work.title}
        onMouseEnter={() => setCursorState('text', 'VIEW')}
        onMouseLeave={() => setCursorState('default')}
      >
        {/* 썸네일 컨테이너 */}
        <motion.div
          className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#050505]"
          whileHover="hovered"
          initial="idle"
        >
          {work.thumbnail_url ? (
            <motion.div
              className="w-full h-full"
              variants={{
                idle: { scale: 1, filter: "grayscale(100%) opacity(0.7)" },
                hovered: { scale: 1.05, filter: "grayscale(0%) opacity(1)" },
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={work.thumbnail_url}
                alt={work.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
            </motion.div>
          ) : (
            <div
              className="w-full h-full opacity-50"
              style={{ backgroundColor: work.thumbnail_color ?? '#333' }}
            />
          )}

          {/* 호버 오버레이 (초현실적 깊이감) */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none"
            style={{ 
              background: work.thumbnail_color 
                ? `linear-gradient(to top, ${work.thumbnail_color}FA, ${work.thumbnail_color}00)`
                : 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' 
            }}
            variants={{
              idle: { opacity: 0 },
              hovered: { opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top right indicator */}
            <motion.div className="self-end overflow-hidden">
              <motion.div
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black"
                variants={{
                  idle: { scale: 0, opacity: 0, x: -20, y: 20 },
                  hovered: { scale: 1, opacity: 1, x: 0, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>

            {/* Bottom text info */}
            <div>
              <motion.span
                className="block text-white/60 text-sm tracking-[0.3em] uppercase mb-4"
                variants={{
                  idle: { y: 20, opacity: 0 },
                  hovered: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {work.category}
              </motion.span>
              <motion.h3
                className="text-white font-light text-4xl md:text-5xl leading-[1.1] tracking-tight"
                variants={{
                  idle: { y: 20, opacity: 0 },
                  hovered: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {work.title}
              </motion.h3>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}


