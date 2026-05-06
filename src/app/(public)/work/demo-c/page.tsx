"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const project = {
  title: "Freshman",
  client: "Freshman",
  year: "2024",
  services: "Strategy — Brand Identity — Digital Design — Web Development — Creative Direction",
  challenge:
    "Freshman approached us to create a digital brand system that would resonate with a new generation of sneaker culture enthusiasts. The objective was to build a cohesive identity across all digital touchpoints while maintaining an authentic street-level aesthetic.",
  images: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&h=1200&fit=crop&auto=format&q=80",
  ],
};

export default function DemoC() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.style.setProperty(
          "--hero-bg",
          entry.isIntersecting ? "#0f0f0f" : "#f0f0f0"
        );
      },
      { threshold: 0.5 }
    );
    const heroEl = document.getElementById("immersive-hero");
    if (heroEl) obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Demo Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        <Link href="/work/demo-a" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">A — Editorial</Link>
        <Link href="/work/demo-b" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">B — Grid</Link>
        <span className="bg-mine-shaft text-gallery text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider">C — Immersive</span>
      </div>

      {/* 다크 히어로 — 풀스크린 */}
      <section
        id="immersive-hero"
        className="relative h-screen bg-[#0f0f0f] flex flex-col justify-end px-page-padding pb-[80px]"
      >
        <Image src={project.images[0]} alt={project.title} fill className="object-cover opacity-50" />
        <div className="relative z-10">
          <p className="text-[11px] text-white/40 uppercase tracking-widest mb-6">
            {project.services}
          </p>
          <h1
            className="text-white uppercase leading-[0.88] tracking-[-4px] font-normal"
            style={{ fontSize: "clamp(64px, 10vw, 140px)" }}
          >
            {project.title}
          </h1>
        </div>
        {/* 스크롤 힌트 */}
        <div className="absolute bottom-10 right-page-padding z-10 flex flex-col items-center gap-2">
          <div className="w-[1px] h-16 bg-white/30" />
          <p className="text-[9px] text-white/40 uppercase tracking-widest">Scroll</p>
        </div>
      </section>

      {/* 라이트 전환 — 메타 */}
      <div ref={lightRef} className="bg-gallery">
        <section className="px-page-padding py-[80px] border-b border-alto flex gap-[80px]">
          {[
            { label: "Client", value: project.client },
            { label: "Year", value: project.year },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-2">{label}</p>
              <p className="text-[15px]">{value}</p>
            </div>
          ))}
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-2">Services</p>
            <p className="text-[15px]">{project.services}</p>
          </div>
        </section>

        {/* 챌린지 */}
        <section className="px-page-padding py-[120px]">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-10">Challenge</p>
          <p
            className="font-light leading-[1.35] tracking-[-0.5px] max-w-[800px]"
            style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
          >
            {project.challenge}
          </p>
        </section>

        {/* 풀스크린 이미지 섹션 1 */}
        <div className="relative w-full h-screen">
          <Image src={project.images[1]} alt="" fill className="object-cover" />
          <div className="absolute bottom-0 left-0 px-page-padding pb-[60px]">
            <p className="text-[11px] text-white/60 uppercase tracking-widest mb-3">Brand Identity</p>
            <p className="text-[28px] text-white font-light leading-[1.3] max-w-[500px]">
              A visual language rooted in movement and texture.
            </p>
          </div>
        </div>

        {/* 텍스트 인터루드 */}
        <section className="px-page-padding py-[160px] flex justify-center">
          <p
            className="text-center font-light leading-[1.2] tracking-[-1px] max-w-[900px]"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            "We built something that speaks the same language as its audience."
          </p>
        </section>

        {/* 풀스크린 이미지 섹션 2 */}
        <div className="relative w-full h-screen">
          <Image src={project.images[2]} alt="" fill className="object-cover" />
        </div>

        {/* 2열 이미지 */}
        <div className="grid grid-cols-2">
          <div className="aspect-[4/3] relative">
            <Image src={project.images[3]} alt="" fill className="object-cover" />
          </div>
          <div className="aspect-[4/3] relative bg-[#0f0f0f] flex items-center justify-center px-16">
            <p className="text-white text-[22px] font-light leading-[1.5] tracking-[-0.4px]">
              Every detail considered. Every interaction intentional.
            </p>
          </div>
        </div>

        {/* Next Project */}
        <section className="px-page-padding py-[120px] border-t border-alto flex justify-between items-end">
          <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40">Next Project</p>
          <Link href="/work/demo-c" className="group flex items-center gap-6 hover:opacity-60 transition-opacity">
            <span className="text-[46px] leading-none tracking-[-1.5px] uppercase">Lo2s</span>
            <span className="text-[28px]">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
