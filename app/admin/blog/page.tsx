import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlogListFilter from '@/components/admin/BlogListFilter'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from('blog')
    .select('id, title, category, is_published, sort_order')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="border border-[#FF3B5C] text-[#FF3B5C] px-6 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors"
        >
          + 새 Blog
        </Link>
      </div>
      <BlogListFilter blogs={blogs ?? []} />
    </div>
  )
}
