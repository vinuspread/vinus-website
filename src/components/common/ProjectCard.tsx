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
    <div className="flex flex-col">
      {/* Image Container — Managed by parent GSAP */}
      <div className="w-full aspect-[920/640] relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Text Info — Moved outside (below) the image */}
      <div className="mt-6 flex flex-col gap-[6px] pointer-events-none">
        <p className="text-[10px] lg:text-[11px] text-mine-shaft/40 uppercase tracking-[0.15em] font-inter leading-none">
          {category}
        </p>
        <h3 className="text-[24px] lg:text-[32px] text-mine-shaft tracking-[-0.03em] leading-tight font-inter font-bold">
          {title}
        </h3>
      </div>
    </div>
  );

  const base = `block overflow-hidden relative group ${className}`;

  if (href) {
    return (
      <Link href={href} className={base} data-cursor="VIEW">
        {content}
      </Link>
    );
  }

  return <div className={base}>{content}</div>;
};
