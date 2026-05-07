"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

const awardsData = [
  { name: "Awwwards", items: [
    "1x Studio of the Year Nominee",
    "2x E-commerce of the Year Nominee",
    "1x Site of the Month",
    "1x Honours Awards",
    "13x Site of the Day",
    "12x Developer Award",
    "21x Honourable Mention"
  ]},
  { name: "The FWA", items: ["10x FWA of the Day"] },
  { name: "CSS Design Awards", items: [
    "1x Website of the Year Nominee",
    "1x Website of the Month",
    "11x Website of the Day",
    "15x Innovation",
    "15x UX Design",
    "15x UI Design"
  ]},
  { name: "Webby", items: ["1x Webby nominee"] }
];

export const AwardsSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap py-[77px] px-page-padding bg-gallery">
      <div className="grid grid-cols-8 gap-column">
        {/* Left: Heading & Description */}
        <div className="col-span-4">
          <h2 className="text-[82.4px] leading-[0.9] tracking-[-2.8px] mb-8 uppercase">
            <span className="anim-clip">
              <span className="anim-move-up">AWARDS &<br/>RECOGNITIONS</span>
            </span>
          </h2>
          {/* 지시사항 §8 반영: 피그마 원문 사용 및 정렬 교정 */}
          <p className="text-[17.1px] font-light max-w-sm">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="200">
                기술과 경험에 대한 깊은 이해를 바탕으로 리서치, 전략, 브랜딩, UX/UI, 개발을 유기적으로 연결합니다.<br /><br />
                우리는 브랜드와 사용자 모두에게 가치 있는 경험을 만드는 데 집중합니다.
              </span>
            </span>
          </p>
        </div>

        {/* Right: Awards List (Left Aligned within Column) */}
        <div className="col-span-4">
          {awardsData.map((award, idx) => (
            <div key={award.name} className="border-t border-alto pt-6 mb-12">
              <h3 className="text-[25.7px] font-normal uppercase mb-4">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 100}>{award.name}</span>
                </span>
              </h3>
              {/* Awwwards & CSS Design Awards items → single sentence */}
              {award.name === "Awwwards" || award.name === "CSS Design Awards" ? (
                <p className="anim-clip text-[16.5px] font-light leading-[1.4] text-left">
                  <span
                    className="anim-move-up"
                    data-delay={idx * 100}
                  >
                    {award.items.join(', ')}.
                  </span>
                </p>
              ) : (
                <ul className="list-none p-0 m-0 text-left text-[16.5px] font-light flex flex-col gap-1 leading-none">
                  {award.items.map((item, i) => (
                    <li key={i} className="anim-clip">
                      <span
                        className="anim-move-up"
                        data-delay={idx * 100 + i * 50}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
