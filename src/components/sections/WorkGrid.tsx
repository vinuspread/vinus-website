"use client";

import { useLayoutEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/common/ProjectCard";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";


type Category = "All" | "UI/UX" | "Character/Illustration" | "Branding" | "Etc";

interface WorkGridProps {
  filter?: Category;
  limit?: number;
  isSlider?: boolean;
}

export const WorkGrid = ({ filter = "All", limit, isSlider: isSliderProp }: WorkGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollXRef = useRef(0);
  const isHoveredRef = useRef(false);

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.category === filter))
    .slice(0, limit);

  const isSlider = isSliderProp !== undefined ? isSliderProp : filtered.length > 4;

  useLayoutEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const slider = scrollRef.current;
    const cards = container.querySelectorAll(".project-card-item");

    // Entry reveal animation
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top 60%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    if (!isSlider) return;

    const getLenis = () => (window as any).__lenis;
    const getMaxScroll = () => slider.scrollWidth - window.innerWidth;

    const releaseScroll = () => {
      isHoveredRef.current = false;
      getLenis()?.start();
    };

    const onMouseEnter = () => {
      isHoveredRef.current = true;
      getLenis()?.stop();
    };

    const onMouseLeave = () => {
      releaseScroll();
    };

    const onWheel = (e: WheelEvent) => {
      if (!isHoveredRef.current) return;

      const maxScroll = getMaxScroll();
      const nextX = scrollXRef.current + e.deltaY;

      // 슬라이드 시작 전 위로 스크롤 → 해제
      if (nextX <= 0 && e.deltaY < 0) {
        scrollXRef.current = 0;
        gsap.to(slider, { x: 0, duration: 0.3, ease: "power2.out", overwrite: true });
        releaseScroll();
        return;
      }

      // 슬라이드 끝 → 해제하여 아래로 스크롤 계속
      if (nextX >= maxScroll && e.deltaY > 0) {
        scrollXRef.current = maxScroll;
        gsap.to(slider, { x: -maxScroll, duration: 0.3, ease: "power2.out", overwrite: true });
        releaseScroll();
        return;
      }

      e.preventDefault();
      scrollXRef.current = Math.max(0, Math.min(maxScroll, nextX));
      gsap.to(slider, {
        x: -scrollXRef.current,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("wheel", onWheel);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      getLenis()?.start();
    };
  }, [filtered, isSlider]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isSlider
          ? "overflow-hidden flex items-start"
          : "py-16 md:py-24"
      }`}
    >
      <div
        ref={scrollRef}
        className={`
          flex w-full gap-5 md:gap-10 px-page-padding py-0
          ${isSlider ? "flex-nowrap" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}
        `}
      >
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className={`
              project-card-item flex-shrink-0
              ${isSlider ? "w-[88vw] sm:w-[58vw] lg:w-[37vw]" : "w-full"}
            `}
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
