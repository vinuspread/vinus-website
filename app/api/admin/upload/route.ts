import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { filename, contentType } = await req.json() as { filename: string; contentType: string }
  if (!filename || !contentType) {
    return NextResponse.json({ error: '파일 정보가 없습니다.' }, { status: 400 })
  }

  const ext = filename.split('.').pop()
  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const supabase = createAdminClient()
  const { data, error } = await supabase.storage
    .from('media')
    .createSignedUploadUrl(key)

  if (error || !data) {
    return NextResponse.json({ error: '업로드 URL 생성 실패' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(key)

  return NextResponse.json({ signedUrl: data.signedUrl, token: data.token, path: key, publicUrl })
}
