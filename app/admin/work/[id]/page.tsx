import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import WorkForm from '@/components/admin/WorkForm'
import type { Work } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminWorkEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: work } = await supabase.from('work').select('*').eq('id', id).single()

  if (!work) notFound()

  const typedWork = work as Work

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{typedWork.title}</h1>
      <WorkForm
        initialData={{
          id: typedWork.id,
          title: typedWork.title,
          slug: typedWork.slug,
          category: typedWork.category ?? '',
          thumbnail_url: typedWork.thumbnail_url ?? '',
          thumbnail_color: typedWork.thumbnail_color ?? '',
          blocks: typedWork.blocks ?? [],
          meta_title: typedWork.meta_title ?? '',
          meta_description: typedWork.meta_description ?? '',
          is_published: typedWork.is_published,
          sort_order: typedWork.sort_order,
        }}
      />
    </div>
  )
}
