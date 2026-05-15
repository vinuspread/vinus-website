"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useReveal } from "@/hooks/useReveal";

export const WorkGrid = () => {
  const revealRef = useReveal();

  return (
    <div ref={revealRef as any} className="anim-wrap grid grid-cols-1 md:grid-cols-2">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="aspect-[920/640] overflow-hidden relative group border-b border-alto md:even:border-l"
          data-cursor="VIEW"
        >
          {/* Image Reveal */}
          <div className="anim-clip w-full h-full">
            <div 
              className="anim-move-up-img w-full h-full relative" 
              data-delay={i % 2 === 0 ? 0 : 60}
            >
              <Image 
                src={project.heroImg} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 p-[40px] z-10 w-full pointer-events-none">
            <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-2 anim-clip block">
              <span className="anim-move-up" data-delay={(i % 2) * 60 + 100}>
                {project.services}
              </span>
            </p>
            <h3 className="text-[24px] text-white uppercase tracking-[-0.7px] leading-tight anim-clip block">
              <span className="anim-move-up" data-delay={(i % 2) * 60 + 200}>
                {project.title}
              </span>
            </h3>
          </div>

          {/* Dark Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      ))}
    </div>
  );
};
