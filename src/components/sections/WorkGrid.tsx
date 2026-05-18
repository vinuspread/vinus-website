"use client";

import React, { useLayoutEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/common/ProjectCard";
import { gsap } from "@/lib/gsap";

type Category = "All" | "UI/UX" | "Character/Illustration" | "Branding" | "Etc";

interface WorkGridProps {
  filter?: Category;
  limit?: number;
  isSlider?: boolean;
  marquee?: React.ReactNode;
}

export const WorkGrid = ({ filter = "All", limit, isSlider: isSliderProp, marquee }: WorkGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.category === filter))
    .slice(0, limit);

  const isSlider = isSliderProp !== undefined ? isSliderProp : filtered.length > 4;

  useLayoutEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const slider = scrollRef.current;
    const cards = container.querySelectorAll(".project-card-item");

    const ctx = gsap.context(() => {
      // 카드 입장 애니메이션 (타겟이 존재할 때만 실행)
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "top 70%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (!isSlider || !slider) return;

      // 수직 스크롤 → 수평 변환 (ScrollTrigger pin)
      const getMaxScroll = () => slider.scrollWidth - window.innerWidth;

      gsap.to(slider, {
        x: () => -getMaxScroll(),
        ease: "none", // 스크럽 애니메이션에서는 선형(none) 보간이 가장 자연스럽습니다.
        scrollTrigger: {
          trigger: container,
          start: "top 80px",
          end: () => `+=${getMaxScroll() * 1.5}`, // 스크롤 길이를 1.5배로 늘려 부드럽고 여유롭게 전환되도록 개선
          scrub: 1, // 반응성을 높이기 위해 스크럽 댐핑을 1초로 최적화 (기존 2초는 너무 느리게 쫓아왔음)
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [filtered, isSlider]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isSlider ? "overflow-clip bg-white" : "py-16 md:py-24"}`}
    >
      {isSlider && marquee}
      <div
        ref={scrollRef}
        className={`flex w-full gap-5 md:gap-10 px-page-padding ${
          isSlider ? "flex-nowrap" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className={`project-card-item flex-shrink-0 ${
              isSlider ? "w-[88vw] sm:w-[58vw] lg:w-[37vw]" : "w-full"
            }`}
          >
            <ProjectCard
              src={project.heroImg}
              alt={project.title}
              category={project.services}
              title={project.title}
              href={`/work/${project.slug}`}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
