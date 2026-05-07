"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const BG_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format&q=80";

export const HeroSectionV2 = () => {
  const ref = useReveal();

  return (
    <section
      ref={ref as any}
      className="anim-wrap relative w-full h-screen flex flex-col justify-between px-page-padding pt-[120px] pb-0 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter">
          Design Studio — Seoul
        </span>
        <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter">
          Est. 2015
        </span>
      </div>

      {/* Main typography */}
      <div className="relative z-10 -mt-[4vh]">
        <div className="block overflow-hidden">
          <p
            className="anim-move-up font-inter font-normal uppercase leading-[0.88] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            data-delay="200"
          >
            We focus on
          </p>
        </div>
        <div className="block overflow-hidden">
          <p
            className="anim-move-up font-inter font-bold uppercase leading-[0.88] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            data-delay="300"
          >
            the essential
          </p>
        </div>
        <div className="block overflow-hidden">
          <p
            className="anim-move-up font-inter uppercase leading-[0.88] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            data-delay="400"
          >
            <span className="font-bold">values</span>
            <span className="font-normal"> of your</span>
          </p>
        </div>
        <div className="block overflow-hidden">
          <p
            className="anim-move-up font-inter font-normal uppercase leading-[0.88] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            data-delay="500"
          >
            brand.
          </p>
        </div>

        {/* Sub copy */}
        <div className="block overflow-hidden mt-[32px]">
          <p
            className="anim-move-up text-white/70 font-light leading-[1.5] tracking-[-0.3px] break-keep"
            style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
            data-delay="640"
          >
            리서치와 전략을 바탕으로 <span className="font-bold text-white">브랜드와 사용자를 잇는 디지털 경험</span>을 설계합니다.
          </p>
        </div>

        {/* Scroll down CTA */}
        <div className="block overflow-hidden mt-[28px]">
          <Link
            href="/work"
            className="anim-move-up inline-flex items-center gap-3 group"
            data-delay="760"
          >
            <span className="text-[13px] uppercase tracking-[0.15em] font-inter border-b border-white/40 pb-[2px] text-white/70 group-hover:text-white group-hover:border-white transition-all duration-300">
              Scroll down
            </span>
            <span className="text-[16px] text-white/50 group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </Link>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="pb-[40px]" />

    </section>
  );
};
