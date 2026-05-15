"use client";

import React from "react";
import Link from "next/link";
import { DoubleButton } from "@/components/common/DoubleButton";
import { useReveal } from "@/hooks/useReveal";

export const Footer = () => {
  const revealRef = useReveal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={revealRef as any} className="anim-wrap bg-gallery text-mine-shaft">
      {/* 9-1. Footer Nav 상단 바 */}
      <div className="h-[56px] border-b border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-2 hidden md:block" />
          <div className="col-span-2 flex justify-between text-[14px] uppercase tracking-tight">
            {/* 메뉴 확보 시 추가 (현재 빈 상태 유지) */}
            <span className="opacity-0">Menu Item</span>
          </div>
        </div>
      </div>

      {/* 9-2. Footer Inner */}
      <div className="min-h-[1123px] px-page-padding py-[120px] flex flex-col justify-between">
        <div className="grid grid-cols-8 gap-column">
          {/* Next Page 영역 */}
          <div className="col-span-8 md:col-span-4 mb-[160px]">
            <p className="text-[17.1px] uppercase tracking-[-0.38px] mb-4">
              <span className="anim-clip">
                <span className="anim-move-up">Next Page</span>
              </span>
            </p>
            <Link href="/work" className="flex items-start gap-2 group">
              <span className="text-[83.5px] md:text-[120px] tracking-[-2.8px] uppercase leading-[0.9] font-normal">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay="100">Work</span>
                </span>
              </span>
              <sup className="text-[24.1px] tracking-[-0.86px] mt-2 font-normal anim-clip">
                <span className="anim-move-up" data-delay="200">26</span>
              </sup>
            </Link>
          </div>

          {/* Spacer for 8-column layout */}
          <div className="hidden md:block col-span-4" />

          {/* Contact 영역 */}
          <div className="col-span-8 md:col-span-2 flex flex-col gap-8 mb-16 md:mb-0">
            <p className="text-[25.1px] tracking-[-0.86px] uppercase leading-[1.2]">
              <span className="anim-clip">
                <span className="anim-move-up" data-delay="300">
                  We would love to hear from you. Let's work — together.
                </span>
              </span>
            </p>
            <div className="anim-clip">
              <div className="anim-move-up" data-delay="400">
                <DoubleButton labelFront="Contact us" labelBack="Get in touch" />
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block col-span-2" />

          {/* Business Enquiries & Open Positions */}
          <div className="col-span-4 md:col-span-2 flex flex-col gap-12">
            <div>
              <p className="text-[14.9px] text-[#757575] uppercase mb-2">Business enquiries</p>
              <p className="text-[16.9px] uppercase">hello@dashdigital.io</p>
              <p className="text-[16.9px] uppercase">+27 72 611 3343</p>
            </div>
            <div>
              <p className="text-[15px] text-[#757575] uppercase mb-2">Open Positions</p>
              <a href="mailto:careers@dashdigital.io" className="text-[16.9px] uppercase hover:underline underline-offset-4">
                careers@dashdigital.io
              </a>
            </div>
          </div>

          {/* Business Hours & Cape Town Address */}
          <div className="col-span-4 md:col-span-2 flex flex-col gap-12">
            <div>
              <p className="text-[15px] text-[#757575] uppercase mb-2">Business Hours</p>
              <p className="text-[16.8px] uppercase">Monday to Friday</p>
              <p className="text-[16.7px] uppercase">08:00 AM – 18:00 PM</p>
              <p className="text-[16.5px] uppercase">GMT (+2)</p>
            </div>
            <div>
              <p className="text-[15.1px] text-[#757575] uppercase mb-2">Cape Town</p>
              <address className="text-[16.5px] uppercase not-italic">
                14 Upper Pepper Street<br/>
                Cape Town CBD, 8001<br/>
                South Africa
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* 9-3. Footer Meta 하단 바 */}
      <div className="h-[77px] border-t border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-8 w-full items-center">
          <div className="col-span-4 md:col-span-2 text-[14.7px] uppercase">
            DashDigital® ©2026
          </div>
          <div className="hidden md:flex col-span-2 md:col-span-4 justify-center gap-[38.4px] text-[15.5px] uppercase">
            <a href="#" className="hover:underline underline-offset-4">Dribbble</a>
            <a href="#" className="hover:underline underline-offset-4">Instagram</a>
            <a href="#" className="hover:underline underline-offset-4">LinkedIn</a>
          </div>
          <div className="col-span-4 md:col-span-2 text-right">
            <button 
              onClick={scrollToTop}
              className="text-[15.1px] uppercase hover:underline underline-offset-4"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
