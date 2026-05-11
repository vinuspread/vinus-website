"use client";

import { ArrowLink } from "@/components/common/ArrowLink";
import { useReveal } from "@/hooks/useReveal";

export const AboutSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap px-page-padding py-[100px] bg-gallery border-b border-alto">
      <div className="flex flex-col gap-10 max-w-[920px]">
        {/* Heading */}
        <h2 className="text-[83px] leading-none tracking-[-2.8px] font-normal uppercase font-inter">
          <span className="anim-clip">
            <span className="anim-move-up">ABOUT</span>
          </span>
        </h2>

        {/* Subheading */}
        <div className="uppercase font-inter">
          <h3 className="text-[25.3px] leading-[1.1] font-normal">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="100">
                Spread the Beautiful Things
              </span>
            </span>
          </h3>
        </div>

        {/* Body & Button */}
        <div>
          <p className="text-[17px] leading-[1.4] font-medium mb-12 opacity-60 max-w-[640px] break-keep">
            <span className="block overflow-hidden">
              <span className="anim-move-up block" data-delay="200">
                우리는 브랜드의 본질을 연구하고, 구조적 아름다움을 설계하며, 한계 없는 기술력을 구현합니다.
              </span>
            </span>
            <span className="block overflow-hidden mt-[6px]">
              <span className="anim-move-up block" data-delay="280">
                바이너스프레드는 고객사와 함께 성장하며 지속 가능한 가치를 창출하는 디지털 파트너입니다.
              </span>
            </span>
          </p>
          <div className="anim-clip">
            <div className="anim-move-up" data-delay="400">
              <ArrowLink href="/about">About Us</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
