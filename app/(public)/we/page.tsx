import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import TextReveal from '@/components/motion/TextReveal'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'We',
  description: '바이너스프레드 — 웹 개발 및 디자인 전문 스튜디오',
}

export default async function WePage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('key, value')

  const s: Record<string, string> = {}
  settings?.forEach(({ key, value }: { key: string; value: string | null }) => {
    if (value) s[key] = value
  })

  return (
    <div className="px-8 max-w-5xl mx-auto pb-24">
      <TextReveal as="h1" className="text-5xl md:text-7xl font-bold leading-tight mb-16">
        {s.company_name_en ?? 'VINUSPREAD'}
      </TextReveal>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {s.we_intro ?? '웹 개발 및 디자인 전문 스튜디오입니다.'}
          </p>
        </div>
        <div className="space-y-4 text-sm text-gray-500">
          {s.address && <p>{s.address}</p>}
          {s.tel && <p>{s.tel}</p>}
          <div className="flex gap-4 pt-4">
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
            )}
            {s.pinterest && (
              <a href={s.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Pinterest</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
