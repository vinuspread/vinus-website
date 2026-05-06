"use client";

import React from "react";
import { DoubleButton } from "@/components/common/DoubleButton";
import { useReveal } from "@/hooks/useReveal";

export const AboutSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap h-[417px] pt-[80px] px-page-padding bg-gallery">
      <div className="grid grid-cols-8 gap-column">
        {/* Heading */}
        <div className="col-span-8 mb-8">
          <h2 className="text-[83px] leading-none tracking-[-2.8px] font-normal uppercase">
            <span className="anim-clip">
              <span className="anim-move-up">ABOUT</span>
            </span>
          </h2>
        </div>

        {/* Subheading */}
        <div className="col-span-3 uppercase">
          <h3 className="text-[25.3px] leading-[1.1] font-normal">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="100">
                AN INTERNATIONAL DIGITAL DESIGN STUDIO REIMAGINING HOW PEOPLE CONNECT WITH BRANDS.
              </span>
            </span>
          </h3>
        </div>

        {/* Body & Button */}
        <div className="col-span-3 col-start-5">
          <p className="text-[17.3px] leading-[1.4] font-light mb-8">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="200">
                We are a global digital design studio dedicated to crafting world-class digital experiences. 
                We bridge strategy and design to build connected brand ecosystems that create lasting value 
                for brands and their customers.
              </span>
            </span>
          </p>
          <div className="anim-clip">
            <div className="anim-move-up" data-delay="400">
              <DoubleButton labelFront="ABOUT US" labelBack="GET TO KNOW US" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
