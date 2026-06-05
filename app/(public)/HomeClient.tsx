"use client";

import { useLayoutEffect, useRef } from "react";
import { HeroSectionV2 as HeroSection } from "@/components/sections/HeroSectionV2";
import { HexTransitionSection } from "@/components/sections/HexTransitionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClientsBrandsSection } from "@/components/sections/ClientsBrandsSection";
import { ImageSliderSection } from "@/components/sections/ImageSliderSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Marquee } from "@/components/common/Marquee";
import { ArrowLink } from "@/components/common/ArrowLink";
import { gsap } from "@/lib/gsap";

export interface WorkItem {
  slug: string
  title: string
  subtitle: string | null
  thumbnail_url: string | null
  category: string | null
}

interface Props {
  works: WorkItem[]
}

export default function HomeClient({ works }: Props) {
  const fullImgRef = useRef<HTMLImageElement>(null);
  const fullSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const ctx = gsap.context(() => {
      if (!fullImgRef.current || !fullSectionRef.current) return;

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
      <div className="relative bg-white z-10">
        <HeroSection />
      </div>

      <div className="relative z-20">
        <HexTransitionSection />
      </div>

      <div id="content-container" className="relative z-20">
        <section className="pt-[20em] pb-[6em] relative z-0">
          <WorkGrid
            works={works}
            limit={6}
            marquee={
              <div className="mb-[3em] overflow-hidden bg-white">
                <Marquee
                  text="AI PRODUCT • PRODUCT MANAGEMENT • DIGITAL EXPERIENCE • BRAND IDENTITY • CHARACTER & IP"
                  speed={520}
                  scrollReactive
                  className="font-inter font-medium text-[clamp(120px,14.8vw,213px)] leading-none tracking-[-0.04em] text-mine-shaft uppercase"
                />
              </div>
            }
          />
          <div className="px-page-padding mt-[6em] flex items-center justify-between">
            <ArrowLink href="/work" className="anim-move-up text-[18px] md:text-[22px] font-semibold" data-delay="300">
              View All Work
            </ArrowLink>
          </div>
        </section>

        <AboutSection />
        <ClientsBrandsSection />

        <div ref={fullSectionRef} className="relative">
          <section className="sticky top-0 w-full h-[100vh] overflow-hidden">
            <img
              ref={fullImgRef}
              src="https://picsum.photos/seed/full/2000/1200"
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
