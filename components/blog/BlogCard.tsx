'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Blog } from '@/types'
import { formatDate } from '@/lib/utils'

export default function BlogCard({ blog, index = 0 }: { blog: Blog, index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 5) * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/blog/${blog.slug}`}
        className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12 py-8 md:py-12 border-b border-gray-200 hover:border-black transition-colors"
      >
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-xs text-gray-500 tracking-[0.2em] uppercase border border-gray-200 rounded-full mb-4">
            {blog.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-light leading-tight group-hover:text-gray-600 transition-colors">
            {blog.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-6 shrink-0 mt-4 md:mt-0">
          <time className="text-sm md:text-base text-gray-400 tracking-widest uppercase">
            {formatDate(blog.created_at)}
          </time>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

