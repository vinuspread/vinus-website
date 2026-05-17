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
      {/* Image */}
      <div className="w-full aspect-[920/640] relative overflow-hidden bg-gallery">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          data-pin-nopin="true"
        />
        {/* hover overlay */}
        <div className="absolute inset-0 bg-mine-shaft/0 group-hover:bg-mine-shaft/10 transition-colors duration-500" />
      </div>

      {/* Text */}
      <div className="mt-5 flex flex-col gap-[6px] pointer-events-none">
        <p className="text-[12px] text-mine-shaft/40 uppercase tracking-normal font-inter leading-none transition-colors duration-200 group-hover:text-mine-shaft/70">
          {category}
        </p>
        <h3 className="text-[24px] lg:text-[28px] text-mine-shaft tracking-[-0.03em] leading-tight font-inter font-bold transition-opacity duration-200 group-hover:opacity-60">
          {title}
        </h3>
      </div>
    </div>
  );

  const base = `block relative group ${className}`;

  if (href) {
    return (
      <Link href={href} className={base} data-cursor="VIEW">
        {content}
      </Link>
    );
  }

  return <div className={base}>{content}</div>;
};
