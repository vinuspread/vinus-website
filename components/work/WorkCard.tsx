'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Work } from '@/types'
import { formatDate } from '@/lib/utils'

export default function WorkCard({ work }: { work: Work }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${work.slug}`} className="group block relative overflow-hidden">
        {/* 썸네일 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {work.thumbnail_url ? (
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={work.thumbnail_url}
                alt={work.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: work.thumbnail_color ?? '#e5e5e5' }} />
          )}

          {/* 호버 오버레이 */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5"
            style={{ backgroundColor: work.thumbnail_color ?? 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.strong
              className="block text-white font-medium text-base leading-tight"
              initial={{ y: 12, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              {work.title}
            </motion.strong>
            <motion.span
              className="block text-white/70 text-xs mt-1"
              initial={{ y: 12, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              {work.category && <span className="mr-2">{work.category}</span>}
              {formatDate(work.created_at)}
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
