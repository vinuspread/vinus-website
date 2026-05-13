"use client";

import { useLayoutEffect } from "react";
import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ArrowLink } from "@/components/common/ArrowLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useLayoutEffect(() => {
    // 0. Force scroll to top on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="relative">
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <HeroSection />
        </div>
        
        <div 
          id="content-container" 
          className="relative z-20"
        >
          {/* 1. Featured Work Section */}
          <section className="pt-0 pb-0">
          <WorkGrid limit={12} />
          <div className="px-page-padding mt-16 anim-clip">
            <ArrowLink href="/work" className="anim-move-up" data-delay="300">View All Work</ArrowLink>
          </div>
        </section>

        <AboutSection />
        <section className="bg-white py-[100px]">
          <ClientsBrandsSection />
        </section>
        <section className="bg-white py-[100px]">
          <AwardsSection />
        </section>
        <ImageSliderSection />
      </div>
    </div>
  );
}
