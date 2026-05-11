"use client";

import { useLayoutEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/common/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "All" | "UI/UX" | "Character/Illustration" | "Branding" | "Etc";

interface WorkGridProps {
  filter?: Category;
  limit?: number;
}

export const WorkGrid = ({ filter = "All", limit }: WorkGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.category === filter))
    .slice(0, limit);

  const isSlider = filtered.length > 4;

  useLayoutEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const cards = containerRef.current.querySelectorAll(".project-card-item");
    
    // 초기 상태
    gsap.set(cards, { 
      y: 100, 
      opacity: 0,
    });

    const scrollWidth = scrollRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const xDistance = Math.max(0, scrollWidth - viewportWidth + 320); // 320px extra padding for smooth end

    // 메인 타임라인: 등장과 슬라이드를 유기적으로 통합
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center", 
        end: isSlider ? `+=${xDistance + 1500}` : "+=500%", 
        scrub: 4, // 극강의 부드러움을 위해 관성 최대화
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      }
    });

    // 1. 순차적 등장 (빠르게 시작)
    tl.to(cards, {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.8,
    });

    // 2. 가로 슬라이드 (등장과 자연스럽게 겹치도록 배치)
    if (isSlider) {
      tl.to(scrollRef.current, {
        x: -xDistance,
        ease: "sine.inOut", // 가속/감속이 부드러운 사인 곡선 사용
      }, "-=60%"); // 등장 애니메이션이 끝나기 전(약 60% 지점)부터 미리 슬라이드 시작
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [filtered, isSlider]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white">
      <div 
        ref={scrollRef}
        className={`
          flex w-full bg-white gap-6 lg:gap-10 px-page-padding py-24
          ${isSlider ? "flex-nowrap" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}
        `}
      >
        {filtered.map((project, i) => (
          <div 
            key={project.slug} 
            className={`
              project-card-item flex-shrink-0
              ${isSlider ? "w-[85vw] md:w-[45vw] lg:w-[25vw]" : "w-full"}
            `}
          >
            <ProjectCard
              src={project.heroImg}
              alt={project.title}
              category={project.services}
              title={project.title}
              href={`/work/${project.slug}`}
              index={i}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
