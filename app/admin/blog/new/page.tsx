import BlogForm from '@/components/admin/BlogForm'
import { getCategories } from '@/app/admin/categories/actions'

export default async function AdminBlogNewPage() {
  const cats = await getCategories('blog')
  const categories = cats.map(c => c.name)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">새 Blog</h1>
      <BlogForm categories={categories} />
    </div>
  )
}
