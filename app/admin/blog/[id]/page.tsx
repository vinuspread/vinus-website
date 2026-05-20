import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogForm from '@/components/admin/BlogForm'
import { getCategories } from '@/app/admin/categories/actions'
import type { Blog } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params
  const [supabase, cats] = await Promise.all([
    createClient(),
    getCategories('blog'),
  ])
  const { data: blog } = await supabase.from('blog').select('*').eq('id', id).single()

  if (!blog) notFound()

  const typedBlog = blog as Blog
  const categories = cats.map(c => c.name)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{typedBlog.title}</h1>
      <BlogForm
        categories={categories}
        initialData={{
          id: typedBlog.id,
          title: typedBlog.title,
          slug: typedBlog.slug,
          category: typedBlog.category,
          thumbnail_url: typedBlog.thumbnail_url ?? '',
          blocks: typedBlog.blocks ?? [],
          file_url: typedBlog.file_url ?? '',
          meta_title: typedBlog.meta_title ?? '',
          meta_description: typedBlog.meta_description ?? '',
          tags: typedBlog.tags ?? [],
          is_published: typedBlog.is_published,
          sort_order: typedBlog.sort_order,
          created_at: typedBlog.created_at,
        }}
      />
    </div>
  )
}
