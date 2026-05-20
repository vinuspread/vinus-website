import WorkForm from '@/components/admin/WorkForm'
import { getCategories } from '@/app/admin/categories/actions'

export default async function AdminWorkNewPage() {
  const cats = await getCategories('work')
  const categories = cats.map(c => c.name)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">새 Work</h1>
      <WorkForm categories={categories} />
    </div>
  )
}
