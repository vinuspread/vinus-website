'use client'

import { useReveal } from '@/hooks/useReveal'

const awardsData = [
  { name: 'Awwwards', items: ['1x Studio of the Year Nominee', '2x E-commerce of the Year Nominee', '1x Site of the Month', '1x Honours Awards', '13x Site of the Day', '12x Developer Award', '21x Honourable Mention'] },
  { name: 'The FWA', items: ['10x FWA of the Day'] },
  { name: 'CSS Design Awards', items: ['1x Website of the Year Nominee', '1x Website of the Month', '11x Website of the Day', '15x Innovation', '15x UX Design', '15x UI Design'] },
  { name: 'Webby', items: ['1x Webby nominee'] },
]

export function AwardsSection() {
  const ref = useReveal()

  return (
    <section ref={ref as any} className="anim-wrap py-[77px] px-page-padding bg-gallery">
      <div className="grid grid-cols-8 gap-column">
        <div className="col-span-4">
          <h2 className="text-[82.4px] leading-[0.9] tracking-[-2.8px] mb-8 uppercase">
            <span className="anim-clip">
              <span className="anim-move-up">AWARDS &<br />RECOGNITIONS</span>
            </span>
          </h2>
          <p className="text-[17.1px] font-light max-w-sm">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="200">
                우리의 열정은 리서치, 전략, 브랜딩, UX/UI, 개발 전 분야에서
                탁월한 성과를 이끌어냅니다. 고객과 사용자 모두에게 가치 있는
                경험을 만드는 것이 우리의 목표입니다.
              </span>
            </span>
          </p>
        </div>
        <div className="col-span-4">
          {awardsData.map((award, idx) => (
            <div key={award.name} className="border-t border-alto pt-6 mb-12">
              <h3 className="text-[25.7px] font-normal uppercase mb-4">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 100}>{award.name}</span>
                </span>
              </h3>
              <ul className="text-left text-[16.5px] font-light space-y-1">
                {award.items.map((item, i) => (
                  <li key={i} className="anim-clip block">
                    <span className="anim-move-up" data-delay={idx * 100 + i * 50}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
