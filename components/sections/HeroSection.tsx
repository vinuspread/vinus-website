"use client";

import { useReveal } from "@/hooks/useReveal";
import { ProjectCard } from "@/components/common/ProjectCard";

const workImages = [
  {
    src: "/images/hero_slide_01.png",
    alt: "동아온북",
    tag: "Digital Design - Branding",
    title: "DongA Onbook",
  },
  {
    src: "/images/hero_slide_02.png",
    alt: "MACADAMIA",
    tag: "Digital Design - UX/UI",
    title: "Macadamia",
  },
  {
    src: "/images/hero_slide_03.png",
    alt: "SAMYANG",
    tag: "Digital Design - Web Development",
    title: "Samyang",
  },
  {
    src: "/images/hero_slide_04.png",
    alt: "SMART CITY JUNGNANG",
    tag: "Digital Design - Strategy",
    title: "Smart City Jungnang",
  },
];

export const HeroSection = () => {
  const introRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="pt-[115px] pb-[77px] px-page-padding">
      {/* 2-1. Hero Intro */}
      <div ref={introRef as any} className="anim-wrap grid grid-cols-8 gap-column mb-[40px]">
        <div className="col-span-8 relative z-10">
          <h1 className="text-[120px] leading-[0.89] tracking-[-4px] font-normal text-mine-shaft uppercase flex flex-wrap gap-x-[0.2em] font-inter relative z-10">
            {["WE", "FOCUS", "ON", "THE"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className="anim-move-up" data-delay={i * 50}>{word}</span>
              </span>
            ))}
            <div className="w-full h-0" />
            {["ESSENTIAL", "VALUES"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className={`anim-move-up ${word === "ESSENTIAL" ? "font-bold" : ""}`} data-delay={200 + i * 50}>{word}</span>
              </span>
            ))}
            <div className="w-full h-0" />
            {["OF", "YOUR", "BRAND"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className="anim-move-up" data-delay={400 + i * 50}>{word}</span>
              </span>
            ))}
          </h1>

        </div>

        <div className="col-span-5 pt-[40px]">
          <div className="text-[17px] tracking-[-0.3px] leading-[1.4] font-medium text-mine-shaft/60">

            <div className="anim-clip">
              <span className="anim-move-up" data-delay="500">
                우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다.
              </span>
            </div>
            <br />
            <div className="anim-clip">
              <span className="anim-move-up" data-delay="600">
                구조적 물리적 경계와 한계를 뛰어넘는 디자인을 만들기 위해 노력합니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-2. Work Grid */}
      <div ref={gridRef as any} className="anim-wrap grid grid-cols-2">
        {workImages.map((img, i) => (
          <ProjectCard
            key={i}
            src={img.src}
            alt={img.alt}
            category={img.tag}
            title={img.title}
            index={i}
            delayOffset={i * 100}
          />
        ))}
      </div>
    </section>
  );
};


