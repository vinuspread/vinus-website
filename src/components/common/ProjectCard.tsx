// src/components/common/ProjectCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  src: string;
  alt: string;
  category: string;
  title: string;
  href?: string;
  index: number;
  delayOffset?: number;
  className?: string;
}

export const ProjectCard = ({
  src,
  alt,
  category,
  title,
  href,
  index,
  delayOffset = 0,
  className = "",
}: ProjectCardProps) => {
  const content = (
    <>
      {/* Image Reveal */}
      <div className="anim-clip w-full h-full">
        <div 
          className="anim-move-up-img w-full h-full relative" 
          data-delay={delayOffset + (index % 2) * 60}
        >
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
      </div>

      {/* Overlay Content - Unified to stacked layout */}
      <div className="absolute bottom-0 left-0 p-[40px] z-10 w-full pointer-events-none flex flex-col gap-3">
        <div className="anim-clip">
          <p 
            className="text-[15.1px] text-white/80 uppercase tracking-[-0.35px] leading-none anim-move-up"
            data-delay={delayOffset + (index % 2) * 60 + 100}
          >
            {category}
          </p>
        </div>
        <div className="anim-clip">
          <h3 
            className="text-[27.3px] text-white uppercase tracking-[-0.86px] leading-tight anim-move-up font-inter font-bold"
            data-delay={delayOffset + (index % 2) * 60 + 200}
          >
            {title}
          </h3>
        </div>

      </div>

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  const containerClasses = `block aspect-[920/640] overflow-hidden relative group ${className}`;

  if (href) {
    return (
      <Link href={href} className={containerClasses} data-cursor="VIEW">
        {content}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
};
