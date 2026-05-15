'use client'

import { DoubleButton } from '@/components/common/DoubleButton'
import { useReveal } from '@/hooks/useReveal'

export function AboutSection() {
  const ref = useReveal()

  return (
    <section ref={ref as any} className="anim-wrap h-[417px] pt-[80px] px-page-padding bg-gallery">
      <div className="grid grid-cols-8 gap-column">
        <div className="col-span-8 mb-8">
          <h2 className="text-[83px] leading-none tracking-[-2.8px] font-normal uppercase">
            <span className="anim-clip">
              <span className="anim-move-up">ABOUT</span>
            </span>
          </h2>
        </div>
        <div className="col-span-3 uppercase">
          <h3 className="text-[25.3px] leading-[1.1] font-normal">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="100">
                브랜드와 사람을 연결하는 최상의 디지털 경험을 만드는 스튜디오.
              </span>
            </span>
          </h3>
        </div>
        <div className="col-span-3 col-start-5">
          <p className="text-[17.3px] leading-[1.4] font-light mb-8">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="200">
                바이너스프레드는 치밀한 리서치와 전략을 바탕으로 브랜드의 정체성을 강화하고,
                사용자에게 깊은 인상을 남기는 최상의 디지털 결과물을 만들어냅니다.
              </span>
            </span>
          </p>
          <div className="anim-clip">
            <div className="anim-move-up" data-delay="400">
              <DoubleButton labelFront="ABOUT US" href="/we" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
