"use client";

import React from "react";
import { RevealText } from "@/components/common/RevealText";

export const Footer = () => {
  return (
    <footer className="h-[1200px] bg-mine-shaft text-gallery px-page-padding flex flex-col justify-between py-20">
      <div className="grid grid-cols-8 gap-column">
        <div className="col-span-8 md:col-span-4">
          <h2 className="text-[120px] leading-[0.8] tracking-[-4px] mb-20">
            <RevealText className="text-gallery">LET'S BUILD</RevealText>
            <br />
            <RevealText delay={0.1} className="text-gallery">SOMETHING</RevealText>
            <br />
            <RevealText delay={0.2} className="text-gallery">GREAT.</RevealText>
          </h2>
        </div>

        <div className="col-span-8 md:col-span-4 grid grid-cols-2 gap-column">
          <div className="space-y-4">
            <h4 className="text-alto/50 text-[12px]">Contact</h4>
            <p className="text-[17px]">hello@dashdigital.com</p>
            <p className="text-[17px]">+27 21 422 0308</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-alto/50 text-[12px]">Social</h4>
            <p className="text-[17px]">Instagram</p>
            <p className="text-[17px]">LinkedIn</p>
            <p className="text-[17px]">Behance</p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-alto/20 pt-10">
        <div className="text-[100px] font-bold tracking-tighter leading-none opacity-10">
          DASHDIGITAL®
        </div>
        <div className="text-[12px] text-alto/50">
          © 2024 DashDigital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
