"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

const primaryServices = [
  {
    index: "01",
    title: "UI/UX",
    main: "Intuitive Digital Experience",
    description:
      "사용자의 행동과 경험의 흐름을 깊이 이해하고,\n새롭지만 직관적인 인터페이스를 통해 브랜드와 사용자가 자연스럽게 연결되는 디지털 경험을 설계합니다.",
    tags: ["UI/UX Design", "Design System", "Prototyping"],
  },
  {
    index: "02",
    title: "Character / Illustration",
    main: "Characters With Identity",
    description:
      "단순한 비주얼을 넘어 브랜드의 성격과 감정을 담아,\n사용자에게 오래 기억되고 다양한 경험 속에서 확장될 수 있는 캐릭터와 일러스트를 만듭니다.",
    tags: ["Character Design", "Illustration", "Brand Mascot"],
  },
  {
    index: "03",
    title: "Branding",
    main: "Brands With Meaning",
    description:
      "브랜드의 본질과 방향성을 바탕으로 전략과 디자인을 유기적으로 연결하여,\n사용자에게 더 가치 있게 기억될 수 있는 브랜드 경험을 구축합니다.",
    tags: ["Brand Identity", "Visual System", "Art Direction"],
  },
];

const serviceDetails = [
  {
    category: "Research",
    items: ["사용자 리서치", "트렌드 분석", "경쟁사 검토", "사용성 테스트", "시장 조사"],
  },
  {
    category: "Strategy",
    items: ["브랜드 포지셔닝", "네이밍", "오디언스 정의", "저니 매핑", "정보 구조 설계"],
  },
  {
    category: "Design",
    items: ["아트 디렉션", "브랜드 아이덴티티", "디자인 시스템", "UI/UX", "모션 디자인", "캐릭터 디자인", "프로토타이핑"],
  },
  {
    category: "Development",
    items: ["기술 전략", "React / Next.js", "Webflow", "WordPress", "SEO 최적화"],
  },
  {
    category: "Content",
    items: ["카피라이팅", "콘텐츠 전략", "SNS 디자인", "키워드 리서치"],
  },
];

export default function ServicesPage() {
  const primaryRef = useReveal();
  const detailRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="bg-gallery">

      <PageHeader
        breadcrumb="Services"
        title={<>Strategic <span className="font-bold">Creative</span> Partner</>}
        description={
          <>
            <span className="block">리서치와 전략을 바탕으로 브랜드 아이덴티티, 디지털 디자인,</span>
            <span className="block mt-[4px]">웹 개발까지 — 처음부터 끝까지 함께합니다.</span>
          </>
        }
      />

      {/* ── Primary Services ── */}
      <section ref={primaryRef as any} className="anim-wrap border-b border-alto">
        {primaryServices.map((svc, i) => (
          <div
            key={svc.index}
            className={`px-page-padding py-[72px] grid grid-cols-1 md:grid-cols-8 gap-column ${
              i < primaryServices.length - 1 ? "border-b border-alto" : ""
            }`}
          >
            {/* 번호 + 서비스명 + Main 카피 */}
            <div className="md:col-span-3 flex flex-col gap-3 mb-8 md:mb-0">
              <p className="text-[11px] text-mine-shaft/30 font-inter">{svc.index}</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-mine-shaft/50 font-inter">{svc.title}</p>
              <h2 className="text-[32px] md:text-[40px] leading-[1.1] tracking-[-1.5px] font-inter">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={i * 80}>
                    {svc.main.split(" ").slice(0, -1).join(" ")}
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="anim-move-up block font-bold" data-delay={i * 80 + 60}>
                    {svc.main.split(" ").slice(-1)[0]}
                  </span>
                </span>
              </h2>
            </div>

            {/* 설명 + 태그 */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col justify-between gap-8">
              <p className="text-[17px] font-light leading-[1.7] tracking-[-0.3px] text-mine-shaft/70 whitespace-pre-line">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={i * 80 + 100}>
                    {svc.description}
                  </span>
                </span>
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-[14px] py-[6px] text-[11px] uppercase tracking-[0.08em] border border-alto text-mine-shaft/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Full Capabilities Accordion ── */}
      <section ref={detailRef as any} className="anim-wrap px-page-padding py-[80px] md:py-[120px]">
        <div className="mb-[60px]">
          <h2 className="text-[36px] md:text-[56px] leading-none tracking-[-2px] uppercase font-inter">
            <span className="block overflow-hidden">
              <span className="anim-move-up block">Full</span>
            </span>
            <span className="block overflow-hidden">
              <span className="anim-move-up block font-bold" data-delay="80">Capabilities</span>
            </span>
          </h2>
        </div>

        <div className="border-t border-alto">
          {serviceDetails.map((detail, i) => (
            <div key={detail.category} className="border-b border-alto">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-[28px] text-left group"
              >
                <div className="flex items-center gap-[48px]">
                  <span className="text-[11px] text-mine-shaft/30 font-inter w-[24px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[22px] md:text-[28px] tracking-[-0.8px] uppercase font-inter group-hover:opacity-50 transition-opacity">
                    {detail.category}
                  </span>
                </div>
                <span
                  className="text-[22px] text-mine-shaft/40 transition-transform duration-300 inline-block"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-[36px] pl-[72px] flex flex-wrap gap-x-[40px] gap-y-[12px]">
                  {detail.items.map((item) => (
                    <span key={item} className="text-[15px] font-light text-mine-shaft/60 tracking-[-0.2px]">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
