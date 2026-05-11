"use client";

import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { useStackCards } from "@/hooks/useStackCards";

export default function Home() {
  useStackCards("#stack-container");

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div id="stack-container" className="stack-container">
        <section className="stack-card bg-gallery">
          <WorkGrid limit={4} />
        </section>
        <section className="stack-card bg-mine-shaft text-white">
          <AboutSection />
        </section>
        <section className="stack-card bg-gallery">
          <VideoSection />
        </section>
        <section className="stack-card bg-gallery">
          <ClientsBrandsSection />
        </section>
        <section className="stack-card bg-gallery">
          <AwardsSection />
        </section>
        <section className="stack-card bg-gallery">
          <LatestNewsSection />
        </section>
      </div>

      <ImageSliderSection />
    </div>
  );
}
