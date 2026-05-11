"use client";

import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="bg-gallery border-b border-alto">
        <WorkGrid limit={4} />
      </section>
      <AboutSection />
      <ServicesSection />
      <VideoSection />
      <ClientsBrandsSection />
      <AwardsSection />
      <LatestNewsSection />
      <ImageSliderSection />
    </div>
  );
}
