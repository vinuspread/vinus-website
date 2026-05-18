"use client";

import { useLayoutEffect, useRef } from "react";
import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Marquee } from "@/components/common/Marquee";
import { gsap } from "@/lib/gsap";

export default function Home() {
  const fullImgRef = useRef<HTMLImageElement>(null);
  const fullSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      if (!fullImgRef.current || !fullSectionRef.current) return;

      // 진입 시 scale-down (1.15 → 1.0), 퇴장 시 유지
      gsap.fromTo(fullImgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: fullSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div style={{ height: "100vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <HeroSection />
        </div>
      </div>

      <div id="content-container" className="relative z-20">
        {/* Marquee + WorkGrid — pinned together */}
        <section className="pt-0 pb-0 relative z-0">
          <WorkGrid
            limit={8}
            marquee={
              <div className="mb-[48px] overflow-hidden bg-white">
                <Marquee
                  text="DIGITAL EXPERIENCE • INNOVATIVE DESIGN • PRODUCT MANAGEMENT • BRAND IDENTITY • CHARACTER&ILLUSTRATION • "
                  speed={150}
                  className="font-inter font-medium text-[clamp(32px,6vw,120px)] leading-none tracking-tighter text-mine-shaft uppercase"
                />
              </div>
            }
          />
          <div className="px-page-padding mt-12 flex items-center justify-between">
            <ArrowLink href="/work" className="anim-move-up text-[18px] md:text-[22px] font-semibold" data-delay="300">
              View All Work
            </ArrowLink>
          </div>
        </section>

        <AboutSection />
        <ClientsBrandsSection />

        {/* Full-bleed sticky image — content slides over it */}
        <div ref={fullSectionRef} className="relative">
          <section className="sticky top-0 w-full h-[100vh] overflow-hidden">
            <img
              ref={fullImgRef}
              src="/images/section_full.png"
              alt=""
              className="w-full h-full object-cover block will-change-transform"
              data-pin-nopin="true"
            />
          </section>
          <div className="relative z-10 bg-white">
            <AwardsSection />
            <div className="pb-[10vw]">
              <ImageSliderSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
