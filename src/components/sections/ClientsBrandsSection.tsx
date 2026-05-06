"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { DoubleButton } from "@/components/common/DoubleButton";
import { useReveal } from "@/hooks/useReveal";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const clients = [
  { name: "Lemkus", logo: "/logos/lemkus.svg", text: "Lemkus reached out to us to create a new design system and conduct an overhaul of the brand's digital experience. The objective was to provide customers with seamless purchasing journeys..." },
  { name: "Tiger Wheel & Tyre", logo: "/logos/tiger.svg", text: "We were brought in to refresh their primary digital properties with a particular focus on building a robust eCommerce capability..." },
  { name: "Kia", logo: "/logos/kia.svg", text: "In collaboration with Kia's development partner +OneX, we created a 'best-in-class' eCommerce experience underpinned and validated by an in-depth research study..." },
  { name: "Afrisam", logo: "/logos/afrisam.svg", text: "In collaboration with Promise Brand Specialists, we were tasked to create an elevated digital experience to reflect the innovative and performance-oriented nature of the brand..." }
];

const brands = [
  { name: "Woolworths", services: "Research — Strategy" },
  { name: "Sneaker LAB", services: "Design" },
  { name: "HKLM", services: "Research — Strategy — Design — Development" },
  { name: "Digitas Liquorice", services: "Design" },
  { name: "Batoka Hospitality", services: "Research — Strategy — Design — Development" },
  { name: "Sendmarc", services: "Strategy — Design — Development" },
  { name: "VANA", services: "Research — Strategy — Design — Development" },
  { name: "Fairways to Africa", services: "Design — Development" },
  { name: "Fincheck", services: "Research — Strategy — Design — Development" },
  { name: "Parrot Print", services: "Research — Design" },
  { name: "Sophie Dallamore", services: "Design — Development" },
  { name: "& Tomorrow", services: "Strategy — Design — Development" }
];

export const ClientsBrandsSection = () => {
  const revealRef = useReveal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      Draggable.create(sliderRef.current, {
        type: "x",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.65,
      });
    }
  }, []);

  return (
    <section ref={revealRef as any} className="anim-wrap py-[80px] px-page-padding bg-gallery">
      {/* 5-1. Featured Clients */}
      <div className="mb-[160px]">
        <h2 className="text-[82.5px] leading-none tracking-[-2.8px] mb-[80px] uppercase">
          <span className="anim-clip">
            <span className="anim-move-up">FEATURED CLIENTS</span>
          </span>
        </h2>
        
        <div ref={containerRef} className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex gap-[48px] cursor-grab active:cursor-grabbing" 
            data-cursor="DRAG"
          >
            {clients.map((client, idx) => (
              <div key={client.name} className="min-w-[421px] flex flex-col gap-8">
                <div className="h-[62px] flex items-center anim-clip">
                  <div className="relative h-10 w-40 anim-move-up" data-delay={idx * 100}>
                    <Image src={client.logo} alt={client.name} fill className="object-contain object-left" />
                  </div>
                </div>
                <p className="text-[17.3px] font-light leading-[1.3] h-[100px]">
                  <span className="anim-clip block">
                    <span className="anim-move-up" data-delay={idx * 100 + 100}>{client.text}</span>
                  </span>
                </p>
                <div className="anim-clip">
                  <div className="anim-move-up" data-delay={idx * 100 + 200}>
                    <DoubleButton labelFront="VIEW CASE STUDY" labelBack={`READ ABOUT ${client.name}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-2. Brands We've Worked With */}
      <div>
        <h2 className="text-[46.8px] leading-none mb-[40px] uppercase">
          <span className="anim-clip">
            <span className="anim-move-up">BRANDS WE'VE WORKED WITH</span>
          </span>
        </h2>
        
        <div className="border-t border-alto">
          {brands.map((brand, idx) => (
            <div key={brand.name} className="grid grid-cols-8 items-center h-[73px] border-b border-alto group hover:bg-white/30 transition-colors">
              <div className="col-span-4 text-[17px]">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 50}>{brand.name}</span>
                </span>
              </div>
              <div className="col-span-3 text-[15px] font-light">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 50 + 20}>{brand.services}</span>
                </span>
              </div>
              <div className="col-span-1 text-right text-[14px]">
                MORE +
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
