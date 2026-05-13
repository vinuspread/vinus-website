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
    
    // Initial state
    gsap.set(cards, { 
      y: 60, 
      opacity: 0,
    });

    // 1. Reveal Animation: Triggers ONCE when the section enters view
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1, // Quick, natural sequence
        });
      },
      once: true
    });

    // 2. Horizontal Scroll Logic (only if it's a slider)
    if (isSlider) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const xDistance = Math.max(0, scrollWidth - viewportWidth + 320);

      gsap.to(scrollRef.current, {
        x: -xDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${xDistance + 1000}`,
          scrub: 1, // Responsive follow
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
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
