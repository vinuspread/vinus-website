"use client";

import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ArrowLink } from "@/components/common/ArrowLink";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div id="content-container" className="relative z-20">
        
        {/* 1. Featured Work Section */}
        <section className="bg-white py-[100px]">
          <div className="px-page-padding mb-16">
             <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 mb-4">
              ( Selected Work )
            </p>
            <h2 className="anim-move-up font-inter text-[clamp(32px,4vw,56px)] font-bold tracking-[-0.03em]">
              Crafting premium digital<br />experiences.
            </h2>
          </div>
          <WorkGrid limit={4} />
          <div className="px-page-padding mt-16 anim-clip">
            <ArrowLink href="/work" className="anim-move-up" data-delay="300">View All Work</ArrowLink>
          </div>
        </section>

        {/* 2. Motto Style About & Purpose */}
        <AboutSection />

        <section className="bg-white py-[100px]">
          <ClientsBrandsSection />
        </section>

        <section className="bg-white py-[100px]">
          <AwardsSection />
        </section>
      </div>

      <ImageSliderSection />
    </div>
  );
}
