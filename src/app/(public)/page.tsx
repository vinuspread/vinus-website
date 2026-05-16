"use client";

import { useLayoutEffect } from "react";
import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Marquee } from "@/components/common/Marquee";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";


export default function Home() {
  useLayoutEffect(() => {
    // 0. Force scroll to top on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
    });

    return () => ctx.revert();
  }, []);

  return (
      <div className="relative">
        {/* 100vh 스크롤 공간: B3 텍스트 정지 및 자연스러운 섹션 전환 */}
        <div style={{ height: "100vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden bg-white">
            <HeroSection />
          </div>
        </div>
        
        <div 
          id="content-container" 
          className="relative z-20"
          style={{ marginTop: "0" }}
        >
          <div className="mb-[10vw] overflow-hidden">
            <Marquee 
              text="SELECTED PROJECTS • DIGITAL EXPERIENCE • INNOVATIVE DESIGN • PRODUCT MANAGEMENT • BRAND IDENTITY • " 
              speed={150} 
              className="font-inter font-medium text-[clamp(40px,6vw,120px)] tracking-tighter text-mine-shaft uppercase"
            />
          </div>
          {/* 1. Featured Work Section */}
          <section className="pt-0 pb-0 relative">
          <WorkGrid limit={8} />
          

          <div className="px-page-padding mt-16 anim-clip">
            <ArrowLink href="/work" className="anim-move-up" data-delay="300">View All Work</ArrowLink>
          </div>
        </section>

        <AboutSection />
        <section className="bg-white section-pad">
          <ClientsBrandsSection />
        </section>
        <section className="w-full px-page-padding overflow-hidden">
          <img
            src="/images/section_full.png"
            alt=""
            className="w-full h-[680px] object-cover block"
            data-pin-nopin="true"
          />
        </section>
        <section className="bg-white section-pad">
          <AwardsSection />
        </section>
        <div className="pb-[10vw]">
          <ImageSliderSection />
        </div>
      </div>
    </div>
  );
}
