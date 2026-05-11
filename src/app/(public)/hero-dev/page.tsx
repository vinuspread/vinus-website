"use client";

import { HeroSectionV2 } from "@/components/sections/HeroSectionV2";

export default function HeroDevPage() {
  return (
    <div>
      <HeroSectionV2 />
      {/* 히어로 아래 여백 — 스크롤 핀 해제 후 빈 공간 */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-mine-shaft/20">
          — Hero section ends —
        </p>
      </div>
    </div>
  );
}
