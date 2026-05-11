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

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.category === filter))
    .slice(0, limit);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".project-card-item");
    
    // 초기 상태 설정
    gsap.set(cards, { 
      x: -60, 
      opacity: 0,
      clipPath: "inset(0 100% 0 0)"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true, // 한 번만 실행되도록 설정
      }
    });

    tl.to(cards, {
      x: 0,
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.1,
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [filtered]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-mine-shaft/10 overflow-hidden">
      {filtered.map((project, i) => (
        <div key={project.slug} className="project-card-item will-change-transform">
          <ProjectCard
            src={project.heroImg}
            alt={project.title}
            category={project.services}
            title={project.title}
            href={`/work/${project.slug}`}
            index={i}
            className=""
          />
        </div>
      ))}
    </div>
  );
};
