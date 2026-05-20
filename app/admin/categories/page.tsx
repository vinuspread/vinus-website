import { getCategories } from './actions'
import CategoriesManager from '@/components/admin/CategoriesManager'

export default async function AdminCategoriesPage() {
  const [workCategories, blogCategories] = await Promise.all([
    getCategories('work'),
    getCategories('blog'),
  ])

  return (
    <div className="max-w-xl space-y-12">
      <h1 className="text-4xl font-bold">카테고리 관리</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Work</h2>
        <CategoriesManager type="work" initialCategories={workCategories} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Blog</h2>
        <CategoriesManager type="blog" initialCategories={blogCategories} />
      </section>
    </div>
  )
}
