"use client";

import React from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const introRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="pt-[115px] pb-[77px] px-page-padding">
      {/* 2-1. Hero Intro */}
      <div ref={introRef as any} className="anim-wrap grid grid-cols-8 gap-column mb-[77px]">
        <div className="col-span-8">
          <h1 className="text-[120px] leading-[0.89] tracking-[-4px] font-normal text-mine-shaft">
            <span className="anim-clip">
              <span className="anim-move-up" style={{ "--delay": "0s" } as any}>A DIGITAL DESIGN STUDIO</span>
            </span>
            <br />
            <span className="anim-clip">
              <span className="anim-move-up" style={{ "--delay": "0.1s" } as any}>DRIVEN BY RESEARCH &</span>
            </span>
            <br />
            <span className="anim-clip">
              <span className="anim-move-up" style={{ "--delay": "0.2s" } as any}>STRATEGY</span>
            </span>
          </h1>
        </div>

        <div className="col-span-2 pt-[77px]">
          <div className="text-[16.9px] tracking-[-0.38px] leading-[1.2]">
            <div className="anim-clip">
              <span className="anim-move-up" style={{ "--delay": "0.5s" } as any}>DESIGNED TO ENGAGE</span>
            </div>
            <br />
            <div className="anim-clip">
              <span className="anim-move-up" style={{ "--delay": "0.6s" } as any}>BUILT TO CONNECT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-2. Work Grid */}
      <div ref={gridRef as any} className="anim-wrap grid grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="aspect-[920/640] bg-alto relative group overflow-hidden border border-gallery/10"
            style={{ "--delay": `${0.1 * i}s` } as any}
          >
            <div className="anim-move-up-img w-full h-full bg-alto">
               <div className="absolute inset-0 bg-mine-shaft/0 group-hover:bg-mine-shaft/10 transition-colors duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
