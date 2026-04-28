'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Blog } from '@/types'
import { formatDate } from '@/lib/utils'

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/blog/${blog.slug}`}
        className="group flex items-start justify-between gap-4 py-6 border-b border-gray-100 hover:border-black transition-colors"
      >
        <div>
          <span className="text-xs text-gray-400 tracking-wider uppercase">{blog.category}</span>
          <h2 className="text-lg font-medium mt-1 group-hover:underline underline-offset-4">{blog.title}</h2>
        </div>
        <time className="text-sm text-gray-400 shrink-0">{formatDate(blog.created_at)}</time>
      </Link>
    </motion.article>
  )
}
