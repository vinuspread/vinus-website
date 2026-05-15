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
                Our passion for technology drives us to excel in research, strategy, branding, UX/UI, and development. 
                Our focus is on creating impactful experiences that bring value to our clients and their customers. 
                While we don't chase awards, it's always gratifying to receive recognition for our work.
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
  );
};
