import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'We',
  description: '바이너스프레드 — 웹 개발 및 디자인 전문 스튜디오',
}

const CLIENT_LOGOS = Array.from({ length: 28 }, (_, i) => `/images/we_logo${i + 1}.png`)

const VALUES = [
  {
    key: 'think',
    img: '/images/img_we1.png',
    title: 'think',
    desc: '고객과 공통된 목표를 설정하고 고민합니다. 다양한 선택의 결정을 통해 최선의 방법을 제시합니다.',
  },
  {
    key: 'mind',
    img: '/images/img_we2.png',
    title: 'mind',
    desc: '목적에 맞는 새로운 가치로 재창조 합니다. 우리가 만든 가치가 어제보다 더 아름다운 오늘을 만듭니다.',
  },
  {
    key: 'behavior',
    img: '/images/img_we3.png',
    title: 'behavior',
    desc: '멈추지 않고 끊임없이 탐구하고 실험합니다. 본질적인 가치를 표현하려는 즐거운 고민을 즐깁니다.',
  },
]

export default async function WePage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('key, value')

  const s: Record<string, string> = {}
  settings?.forEach(({ key, value }: { key: string; value: string | null }) => {
    if (value) s[key] = value
  })

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="px-8 max-w-5xl mx-auto pt-24 pb-24">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-12">
          We focus on<br />essential values.
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {s.we_intro ?? '우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다. 빠르고 다양하게 변하는 시대의 치열함 속에서도 변하지 않는 본질의 가치에 주목하고, 구조적 물리적 경계와 한계를 뛰어넘는 아름다운 디자인을 만들기 위해 노력합니다.'}
        </p>
      </section>

      {/* think / mind / behavior */}
      <section className="px-8 max-w-5xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {VALUES.map((v) => (
            <div key={v.key}>
              <div className="relative w-full aspect-[456/213] mb-6 overflow-hidden">
                <Image
                  src={v.img}
                  alt={v.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spread the Beautiful Things */}
      <section className="px-8 max-w-5xl mx-auto pb-24 border-t border-gray-100 pt-16">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
          Spread the<br />Beautiful Things
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          아름다운 바이러스를 세상에 퍼뜨립니다. 우리가 창조하는 시각적인 결과물이 오늘보다 내일을 더 아름답게 만들고자 합니다.
        </p>
      </section>

      {/* Client logos */}
      <section className="px-8 max-w-5xl mx-auto pb-24 border-t border-gray-100 pt-16">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-12">Client</h2>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-8 items-center">
          {CLIENT_LOGOS.map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src={src}
                alt={`client logo ${i + 1}`}
                width={120}
                height={40}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                style={{ maxHeight: 40 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-8 max-w-5xl mx-auto border-t border-gray-100 pt-16">
        <div className="flex flex-col md:flex-row gap-12 text-sm text-gray-500">
          <div className="space-y-1">
            {s.address && <p>{s.address}</p>}
            {s.tel && <p>{s.tel}</p>}
            {s.email && <a href={`mailto:${s.email}`} className="hover:text-black transition-colors">{s.email}</a>}
          </div>
          <div className="flex gap-6">
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
            )}
            {s.pinterest && (
              <a href={s.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Pinterest</a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
