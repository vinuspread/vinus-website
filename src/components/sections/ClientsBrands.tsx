"use client";

import React, { useState } from "react";
import { RevealText } from "@/components/common/RevealText";
import { DoubleButton } from "@/components/common/DoubleButton";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENTS = [
  {
    name: "Lemkus",
    logo: "LEMKUS",
    text: "Lemkus reached out to us to create a new design system and conduct an overhaul of the brand's digital experience. The objective was to provide customers with seamless purchasing journeys...",
  },
  {
    name: "Tiger Wheel & Tyre",
    logo: "TIGER",
    text: "We were brought in to refresh their primary digital properties with a particular focus on building a robust eCommerce capability...",
  },
  {
    name: "Kia",
    logo: "KIA",
    text: "In collaboration with Kia's development partner +OneX, we created a 'best-in-class' eCommerce experience underpinned and validated by an in-depth research study...",
  },
  {
    name: "AfriSam",
    logo: "AFRISAM",
    text: "In collaboration with Promise Brand Specialists, we were tasked to create an elevated digital experience to reflect the innovative and performance-oriented nature of the brand...",
  },
];

const BRANDS = [
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
  { name: "& Tomorrow", services: "Strategy — Design — Development" },
];

export const ClientsBrands = () => {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  return (
    <section className="section-padding bg-gallery">
      {/* 5-1. Featured Clients */}
      <div className="mb-[160px]">
        <h2 className="text-[82.5px] tracking-[-2.8px] mb-[100px]">
          <RevealText>FEATURED CLIENTS</RevealText>
        </h2>

        <div className="flex gap-[48px] overflow-x-auto pb-10 no-scrollbar">
          {CLIENTS.map((client, idx) => (
            <div key={client.name} className="min-w-[421px] flex flex-col">
              <div className="h-[62px] flex items-center mb-10">
                <span className="text-[32px] font-bold tracking-tighter">
                  {client.logo}
                </span>
              </div>
              <p className="text-[17.3px] font-light leading-[1.4] mb-12 h-[120px]">
                {client.text}
              </p>
              <DoubleButton
                labelFront="View case study"
                labelBack={`Read about ${client.name}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5-2. Brands Accordion */}
      <div>
        <h3 className="text-[46.8px] tracking-tight mb-10">
          <RevealText>BRANDS WE'VE WORKED WITH</RevealText>
        </h3>

        <div className="border-t border-alto">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="border-b border-alto">
              <button
                onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
                className="w-full h-[73px] grid grid-cols-8 gap-column items-center text-left group"
              >
                <div className="col-span-4 text-[17px] tracking-tight group-hover:pl-2 transition-all">
                  {brand.name}
                </div>
                <div className="col-span-3 text-[15px] text-mine-shaft/50 hidden md:block">
                  {brand.services}
                </div>
                <div className="col-span-1 flex justify-end">
                  <Plus className={cn("w-5 h-5 transition-transform duration-300", expandedBrand === brand.name && "rotate-45")} />
                </div>
              </button>
              
              <AnimatePresence>
                {expandedBrand === brand.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pt-4 text-[15px] font-light">
                      Additional details for {brand.name} will be displayed here. 
                      This includes project scope, duration, and key outcomes.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
