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
      {/* Image — clip-path reveal via useReveal + GSAP */}
      <div className="anim-clip w-full h-full">
        <div
          className="anim-move-up-img w-full h-full relative"
          data-delay={delay}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Gradient — appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Text overlay — slides up on hover */}
      <div className="absolute bottom-0 left-0 p-[40px] z-10 w-full pointer-events-none flex flex-col gap-[10px] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <p className="text-[12px] text-white/75 uppercase tracking-[0.12em] font-inter leading-none">
          {category}
        </p>
        <h3 className="text-[28px] text-white uppercase tracking-[-0.04em] leading-tight font-inter font-bold">
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
