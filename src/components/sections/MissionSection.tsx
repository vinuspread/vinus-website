"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

export const MissionSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap section-pad bg-white">

      {/* Main statement — 대형 타이포 (Left Aligned) */}
      <div className="mb-[80px]">
        <h2 className="display-heading text-mine-shaft">
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-light" data-delay="80">Spread the</span>
          </span>
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-bold" data-delay="140">Beautiful Things.</span>
          </span>
        </h2>
      </div>

      {/* 2컬럼 — 본문 + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-start">
        <p className="anim-move-up body-text-ko" data-delay="200">
          우리는 브랜드의 본질을 연구하고, 구조적 아름다움을 설계하며,
          한계 없는 기술력을 구현합니다. 바이너스프레드는 고객사와 함께
          성장하며 지속 가능한 가치를 창출하는 디지털 파트너입니다.
        </p>
        <div className="anim-move-up flex flex-col gap-6 items-start" data-delay="280">
          <p className="body-text-ko">
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
