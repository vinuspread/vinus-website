"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const workImages = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=920&h=640&fit=crop&auto=format&q=80",
    alt: "Gavin Schneider Productions",
    tag: "Digital Design - Web Development",
    title: "Gavin Schneider Productions",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=920&h=640&fit=crop&auto=format&q=80",
    alt: "Freshman",
    tag: "Digital Design - Web Development",
    title: "Freshman",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=920&h=640&fit=crop&auto=format&q=80",
    alt: "PIC Studio",
    tag: "Digital Design - Web Development",
    title: "PIC Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=920&h=640&fit=crop&auto=format&q=80",
    alt: "Lo2S",
    tag: "Digital Design - Web Development",
    title: "Lo2S",
  },
];

export const HeroSection = () => {
  const introRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="pt-[115px] pb-[77px] px-page-padding">
      {/* 2-1. Hero Intro */}
      <div ref={introRef as any} className="anim-wrap grid grid-cols-8 gap-column mb-[77px]">
        <div className="col-span-8">
          <h1 className="text-[120px] leading-[0.89] tracking-[-4px] font-normal text-mine-shaft uppercase flex flex-wrap gap-x-[0.2em]">
            {["A", "DIGITAL", "DESIGN", "STUDIO"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className="anim-move-up" data-delay={i * 50}>{word}</span>
              </span>
            ))}
            <div className="w-full h-0" />
            {["DRIVEN", "BY", "RESEARCH", "&"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className="anim-move-up" data-delay={200 + i * 50}>{word}</span>
              </span>
            ))}
            <div className="w-full h-0" />
            {["STRATEGY"].map((word, i) => (
              <span key={i} className="anim-clip">
                <span className="anim-move-up" data-delay={400 + i * 50}>{word}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="col-span-2 pt-[77px]">
          <div className="text-[16.9px] tracking-[-0.38px] leading-[1.2] uppercase">
            <div className="anim-clip">
              <span className="anim-move-up" data-delay="500">DESIGNED TO ENGAGE</span>
            </div>
            <br />
            <div className="anim-clip">
              <span className="anim-move-up" data-delay="600">BUILT TO CONNECT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-2. Work Grid */}
      <div ref={gridRef as any} className="anim-wrap grid grid-cols-2">
        {workImages.map((img, i) => (
          <div
            key={i}
            className="aspect-[920/640] relative group overflow-hidden"
          >
            <div className="anim-clip w-full h-full">
              <div className="anim-move-up-img w-full h-full relative" data-delay={i * 100}>
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            {/* 이미지 하단 오버레이 텍스트 */}
            <div className="absolute bottom-0 left-0 p-[40px] flex flex-col gap-3">
              <p className="text-[15.1px] text-white uppercase tracking-[-0.35px] leading-none anim-clip block">
                <span className="anim-move-up" data-delay={i * 100 + 100}>{img.tag}</span>
              </p>
              <p className="text-[27.3px] text-white uppercase tracking-[-0.86px] leading-none anim-clip block">
                <span className="anim-move-up" data-delay={i * 100 + 200}>{img.title}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
