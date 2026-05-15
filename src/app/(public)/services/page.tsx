"use client";

import { useReveal } from "@/hooks/useReveal";
import { PageHeader } from "@/components/common/PageHeader";
import { PageHeaderDescription } from "@/components/common/PageHeaderDescription";

const primaryServices = [
  {
    index: "01",
    title: "UI/UX DESIGN",
    main: ["Strategic Interface &", "Seamless Interaction"],
    descEn: "We design digital experiences where brand value and user needs align perfectly through deep analysis of user behavior.\nbeyond simple visuals, we create intuitive flows that connect users to brands naturally.",
    descKo: "사용자의 행동과 경험의 흐름을 깊이 이해하고, 브랜드와 사용자가 자연스럽게 연결되는 직관적인 디지털 경험을 설계합니다.",
    tags: ["UX STRATEGY", "MOBILE FIRST", "PROTOTYPING"],
  },
  {
    index: "02",
    title: "CHARACTER / ILLUSTRATION",
    main: ["Emotive Visuals with", "Bold Identity"],
    descEn: "We create characters and illustrations that transcend simple visuals to embody the brand's personality and emotions.\nThese visual assets provide a memorable experience and build a lasting emotional bond with the audience.",
    descKo: "단순한 비주얼을 넘어 브랜드의 성격과 감정을 담아, 사용자에게 오래 기억되고 다양한 경험 속에서 확장될 수 있는 캐릭터와 일러스트를 만듭니다.",
    tags: ["3D ARTWORK", "BRAND MASCOT", "STORYTELLING"],
  },
  {
    index: "03",
    title: "BRANDING",
    main: ["Cohesive Systems &", "Sustainable Value"],
    descEn: "Based on the essence of the brand, we organically connect strategy and design to build a brand experience with lasting value.\nWe define a consistent visual language that ensures your brand stands out in any environment.",
    descKo: "브랜드의 본질을 바탕으로 전략과 디자인을 유기적으로 연결하여, 시간이 흐를수록 더 가치 있게 기억될 수 있는 브랜드 경험을 구축합니다.",
    tags: ["VISUAL SYSTEM", "BRAND GUIDELINE", "ART DIRECTION"],
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

  return (
    <main className="bg-white">
      <PageHeader
        breadcrumb="Services"
        title={<>Strategic <span className="font-bold">Creative</span> Partner</>}
        description={
          <PageHeaderDescription
            en="From strategy to design and development — we partner with brands to create lasting value."
            ko={<>리서치와 전략을 바탕으로 브랜드 아이덴티티, 디지털 디자인, 웹 개발까지<br />- 브랜드의 처음부터 끝까지 함께하며 지속 가능한 가치를 창출합니다.</>}
          />
        }
      />

      {/* ── Primary Services ── */}
      <section ref={primaryRef as any} className="anim-wrap">
        {primaryServices.map((svc, i) => (
          <div
            key={svc.index}
            className="px-page-padding py-[60px] md:section-pad border-b border-alto last:border-b-0"
          >
            {/* Content Column - Full Width Left Aligned */}
            <div className="flex flex-col gap-10 max-w-[1200px]">
              <h2 className="display-heading">
                {svc.main.map((line, lineIdx) => (
                  <span key={lineIdx} className="block overflow-hidden">
                    <span className="anim-move-up block pb-2" data-delay={i * 80 + lineIdx * 40}>
                      {line}
                    </span>
                  </span>
                ))}
              </h2>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <span className="block overflow-hidden">
                    <span className="anim-move-up block body-text !text-mine-shaft/70 whitespace-pre-line" data-delay={i * 80 + 100}>
                      {svc.descEn}
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="anim-move-up block body-text-ko" data-delay={i * 80 + 150}>
                      {svc.descKo}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag, j) => (
                    <span
                      key={tag}
                      className="anim-move-up px-4 py-2 text-[12px] uppercase tracking-normal bg-mine-shaft/5 text-mine-shaft/40 font-bold rounded-full border border-alto/50"
                      data-delay={i * 80 + 200 + (j * 30)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Expertise & Disciplines (Dark) ── */}
      <section ref={detailRef as any} className="anim-wrap bg-mine-shaft text-white section-pad-large">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="flex-1 mb-10 md:mb-0">
            <h3 className="display-heading !text-white mb-6">
              Expertise & <br />
              Disciplines
            </h3>
            <p className="body-text !text-white/50 max-w-[300px]">
              A comprehensive breakdown of our strategic approach and technical depth.
            </p>
          </div>

          <div className="flex-[1.5] flex flex-col gap-8 md:gap-12 pt-8 md:pt-4">
            {serviceDetails.map((detail, i) => (
              <div 
                key={detail.category} 
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline anim-move-up border-b border-white/5 pb-4 last:border-0"
                data-delay={i * 40}
              >
                <div className="sm:col-span-3">
                  <p className="text-[16px] md:text-[18px] text-white font-normal leading-relaxed">{detail.category}</p>
                </div>
                <div className="sm:col-span-9">
                  <p className="text-[16px] md:text-[18px] text-white/60 font-normal leading-relaxed">
                    {detail.items.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
