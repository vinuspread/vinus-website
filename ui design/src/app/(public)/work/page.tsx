"use client";

import React from "react";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { useReveal } from "@/hooks/useReveal";

export default function WorkPage() {
  const revealRef = useReveal();

  return (
    <main className="bg-gallery">
      {/* Page Header */}
      <section ref={revealRef as any} className="anim-wrap pt-[140px] pb-[80px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase">
              <span className="anim-clip block">
                <span className="anim-move-up">WORK</span>
              </span>
            </h1>
          </div>
          
          <div className="md:col-span-5 md:col-start-4">
            <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px] anim-clip block">
              <span className="anim-move-up" data-delay="200">
                우리는 치밀한 리서치와 전략을 바탕으로 브랜드의 정체성을 강화하고,
                사용자에게 깊은 인상을 남기는 최상의 디지털 결과물을 만들어냅니다.
                아래는 바이너스가 진행한 대표적인 프로젝트들입니다.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <WorkGrid />
    </main>
  );
}
