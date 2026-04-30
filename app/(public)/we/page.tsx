import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { FadeUp, LetterReveal, ParallaxImage, MagneticLink } from '@/components/ui/MotionWrapper'

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
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-60 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-center items-center text-center">
        <FadeUp delay={0.2} className="mb-8">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-400 font-syne">About Us</p>
        </FadeUp>
        
        <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-syne font-bold tracking-tighter leading-[0.9] mb-16 uppercase text-black">
          <LetterReveal text="We focus on essential values." delay={0.3} className="justify-center" />
        </h1>
        
        <FadeUp delay={1.2} className="max-w-4xl">
          <p className="text-2xl md:text-4xl text-gray-400 font-light leading-relaxed tracking-wide">
            {s.we_intro ?? '우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다. 빠르고 다양하게 변하는 시대의 치열함 속에서도 변하지 않는 본질의 가치에 주목하고, 구조적 물리적 경계와 한계를 뛰어넘는 아름다운 디자인을 만들기 위해 노력합니다.'}
          </p>
        </FadeUp>
      </section>

      {/* think / mind / behavior */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto py-32 border-t border-gray-100 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {VALUES.map((v, i) => (
            <FadeUp key={v.key} delay={i * 0.2}>
              <div className="group cursor-default">
                <ParallaxImage src={v.img} alt={v.title} className="w-full aspect-[4/5] mb-8 bg-gray-100" />
                <h3 className="text-4xl md:text-5xl font-light mb-6 uppercase tracking-tight">{v.title}.</h3>
                <p className="text-lg text-gray-500 font-light leading-relaxed max-w-sm mx-auto">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Spread the Beautiful Things */}
      <section className="relative bg-black text-white px-6 md:px-12 py-40 md:py-60 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 mix-blend-screen pointer-events-none flex justify-center items-center overflow-hidden">
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] rounded-full animate-[pulse_10s_ease-in-out_infinite] transform-gpu will-change-transform" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto text-center">
          <h2 className="text-6xl md:text-9xl lg:text-[12rem] font-syne font-bold tracking-tighter leading-[0.9] mb-12 mix-blend-difference text-white flex flex-col items-center">
            <LetterReveal text="Spread" delay={0.2} className="justify-center" />
            <LetterReveal text="the Beautiful" delay={0.4} className="justify-center" />
            <LetterReveal text="Things." delay={0.6} className="justify-center" />
          </h2>
          <FadeUp delay={0.8}>
            <p className="text-2xl md:text-3xl text-gray-400 font-light leading-relaxed max-w-4xl mx-auto tracking-widest mix-blend-difference">
              아름다운 바이러스를 세상에 퍼뜨립니다.<br className="hidden md:block" /> 우리가 창조하는 시각적인 결과물이 오늘보다 내일을 더 아름답게 만들고자 합니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Client logos */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto py-32 md:py-48">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">Our <br className="hidden md:block"/><span className="font-medium text-gray-400">Clients.</span></h2>
            <p className="text-sm tracking-[0.2em] uppercase text-gray-400 max-w-xs">Trusted by innovative companies worldwide</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-12 items-center opacity-70 mix-blend-multiply">
          {CLIENT_LOGOS.map((src, i) => (
            <FadeUp key={i} delay={(i % 7) * 0.1}>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer">
                <Image src={src} alt={`client logo ${i + 1}`} width={120} height={40} className="object-contain" style={{ maxHeight: 40 }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto py-32 border-t border-gray-100">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-12">Get in touch</h2>
              {s.email && (
                <MagneticLink href={`mailto:${s.email}`} className="text-4xl md:text-6xl font-medium tracking-tight border-b-2 border-black pb-4 hover:text-gray-500 hover:border-gray-500 transition-all">
                  {s.email}
                </MagneticLink>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 text-xl text-gray-500 font-light">
              <div className="space-y-6">
                <p className="text-sm tracking-[0.2em] uppercase text-black font-medium mb-8">Location</p>
                {s.address && <p>{s.address}</p>}
                {s.tel && <p>T. {s.tel}</p>}
              </div>
              <div className="space-y-6 flex flex-col">
                <p className="text-sm tracking-[0.2em] uppercase text-black font-medium mb-8">Socials</p>
                {s.instagram && (
                  <MagneticLink href={s.instagram} className="hover:text-black transition-colors w-fit">Instagram</MagneticLink>
                )}
                {s.pinterest && (
                  <MagneticLink href={s.pinterest} className="hover:text-black transition-colors w-fit">Pinterest</MagneticLink>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}


