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
          subtitle: typedWork.subtitle ?? '',
          summary: typedWork.summary ?? '',
          client_name: typedWork.client_name ?? '',
          category: typedWork.category ?? 'web',
          period: typedWork.period ?? '',
          hero_url: typedWork.hero_url ?? '',
          hero_type: typedWork.hero_type ?? 'image',
          thumbnail_url: typedWork.thumbnail_url ?? '',
          blocks: typedWork.blocks ?? [],
          meta_title: typedWork.meta_title ?? '',
          meta_description: typedWork.meta_description ?? '',
          is_published: typedWork.is_published,
        }}
      />
    </div>
  )
}
