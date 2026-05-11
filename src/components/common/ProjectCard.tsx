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
  const delay = delayOffset + (index % 2) * 60;

  const content = (
    <>
      {/* Image Container — Managed by parent GSAP */}
      <div className="w-full h-full relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Gradient removed as per request */}

      {/* Text overlay — Always visible with subtle text shadow for legibility */}
      <div className="absolute bottom-0 left-0 p-[24px] lg:p-[32px] z-10 w-full pointer-events-none flex flex-col gap-[6px] translate-y-0 opacity-100 transition-all duration-500 ease-out">
        <p className="text-[10px] lg:text-[11px] text-white uppercase tracking-[0.15em] font-inter leading-none drop-shadow-md">
          {category}
        </p>
        <h3 className="text-[20px] lg:text-[24px] text-white uppercase tracking-[-0.03em] leading-tight font-inter font-bold drop-shadow-md">
          {title}
        </h3>
      </div>
    </>
  );

  const base = `block aspect-[920/640] overflow-hidden relative group ${className}`;

  if (href) {
    return (
      <Link href={href} className={base} data-cursor="VIEW">
        {content}
      </Link>
    );
  }

  return <div className={base}>{content}</div>;
};
