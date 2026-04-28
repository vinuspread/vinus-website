import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const supabase = createAdminClient()
  const { error } = await supabase.storage
    .from('media')
    .upload(filename, file, { contentType: file.type, upsert: false })

  if (error) {
    return NextResponse.json({ error: '업로드 실패.' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filename)

  return NextResponse.json({ url: publicUrl })
}
