'use client'

import Image from 'next/image'
import { DoubleButton } from '@/components/common/DoubleButton'
import { useReveal } from '@/hooks/useReveal'

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=860&h=742&fit=crop&auto=format&q=80',
    tag: 'Article',
    date: '3 Feb 2024',
    readTime: '4 Min Read',
    title: 'Why Strong Brand Identity Is Important in Web Design',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=860&h=742&fit=crop&auto=format&q=80',
    tag: 'Article',
    date: '3 Mar 2024',
    readTime: '4 Min Read',
    title: 'The Benefits of Aligning Your Team with Your Business Objectives',
  },
]

export function LatestNewsSection() {
  const revealRef = useReveal()

  return (
    <section ref={revealRef as any} className="anim-wrap pt-[80px] px-page-padding bg-gallery pb-[120px]">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[46.5px] tracking-[-1.6px] uppercase leading-none">
          <span className="anim-clip">
            <span className="anim-move-up">Latest news</span>
          </span>
        </h2>
        <div className="anim-clip">
          <div className="anim-move-up" data-delay="100">
            <DoubleButton labelFront="View All" href="/blog" />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#ccc4b9]/30 anim-fill-width" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] pt-[38.4px]">
        {articles.map((article, idx) => (
          <a key={idx} href="/blog" className="flex-1 grid grid-cols-2 gap-[38.4px] h-[411px]">
            <div className="aspect-[429/371] relative overflow-hidden anim-clip">
              <div className="anim-move-up-img w-full h-full relative" data-delay={idx * 150}>
                <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[16px] uppercase tracking-[-0.38px] font-normal">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 150 + 100}>
                    {article.tag} <span className="mx-1 text-[#ccc4b9]">•</span> {article.date} <span className="mx-1 text-[#ccc4b9]">•</span> {article.readTime}
                  </span>
                </span>
              </p>
              <h3 className="text-[26.9px] tracking-[-0.86px] uppercase leading-[1.2] font-normal">
                {article.title.split(' ').map((word, i) => (
                  <span key={i} className="anim-clip mr-[0.2em] inline-block">
                    <span className="anim-move-up" data-delay={idx * 150 + 200 + i * 30}>{word}</span>
                  </span>
                ))}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
