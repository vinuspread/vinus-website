"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

export const MissionSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap px-page-padding py-[140px] bg-white border-b border-alto">

      {/* Label */}
      <p className="anim-move-up font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40 mb-[80px]">
        ( About )
      </p>

      {/* Main statement — 대형 타이포 */}
      <div className="mb-[100px]">
        <h2 className="font-inter leading-[1.0] tracking-[-0.05em] text-mine-shaft"
          style={{ fontSize: "clamp(44px, 6.5vw, 100px)" }}>
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-light" data-delay="80">Spread the</span>
          </span>
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-bold" data-delay="140">Beautiful Things.</span>
          </span>
        </h2>
      </div>

      {/* 2컬럼 — 본문 + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-end">
        <p className="anim-move-up font-pretendard font-light text-[17px] leading-[1.85] tracking-[-0.01em] text-mine-shaft/55 break-keep" data-delay="200">
          우리는 브랜드의 본질을 연구하고, 구조적 아름다움을 설계하며,
          한계 없는 기술력을 구현합니다. 바이너스프레드는 고객사와 함께
          성장하며 지속 가능한 가치를 창출하는 디지털 파트너입니다.
        </p>
        <div className="anim-move-up flex flex-col gap-6 items-start" data-delay="280">
          <p className="font-pretendard font-light text-[17px] leading-[1.85] text-mine-shaft/55 break-keep">
            브랜드와 사용자 모두에게 의미 있는 경험을 만드는 데 집중합니다.
            사람에서 시작한다는 철학으로, 변화하는 트렌드 속에서도
            흔들리지 않는 핵심 본질을 포착합니다.
          </p>
          <ArrowLink href="/about">About Us</ArrowLink>
        </div>
      </div>

    </section>
  );
};
