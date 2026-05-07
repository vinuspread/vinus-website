"use client";

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
      <div className="px-page-padding py-[80px] flex flex-col justify-between">
        <div className="grid grid-cols-8 gap-column">
          {/* Next Page 영역 */}
          <div className="col-span-8 md:col-span-4 mb-[64px]">
            <p className="text-[17.1px] uppercase tracking-[-0.38px] mb-4">
              <span className="anim-clip">
                <span className="anim-move-up">Next Page</span>
              </span>
            </p>
            <Link href="/work" className="flex items-center gap-8 group w-fit">
              <div className="flex items-start gap-2">
                <span className="text-[83.5px] md:text-[120px] tracking-[-2.8px] uppercase leading-[0.9] font-normal">
                  <span className="anim-clip">
                    <span className="anim-move-up" data-delay="100">experience</span>
                  </span>
                </span>
                <sup className="text-[24.1px] tracking-[-0.86px] mt-2 font-normal anim-clip">
                  <span className="anim-move-up" data-delay="200">26</span>
                </sup>
              </div>
              <div className="flex items-center overflow-visible">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-4 transition-transform duration-500"
                >
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <polyline points="15 5 22 12 15 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>

          {/* Spacer for 8-column layout */}
          <div className="hidden md:block col-span-4" />

          {/* Contact 영역 */}
          <div className="col-span-8 md:col-span-2 flex flex-col gap-6 mb-16 md:mb-0">
            <div className="flex flex-col gap-2">
              <p className="text-[15px] uppercase tracking-widest text-mine-shaft font-inter">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay="300">CONTACT</span>
                </span>
              </p>
              <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.3px] text-mine-shaft/60">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay="350">
                    아이디어를 더 가치 있는 경험으로 만들 준비가 되어 있습니다.<br />
                    우리와 함께 다음 가능성을 시작해보세요.
                  </span>
                </span>
              </p>
            </div>
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
              <p className="text-[14.9px] text-mine-shaft/40 uppercase mb-2">Business enquiries</p>
              <p className="text-[16.9px]">vinus@vinus.co.kr</p>
              <p className="text-[16.9px] text-mine-shaft/60 mt-1">TEL : 02-3661-1907 &nbsp; FAX : 02-3661-1906</p>
            </div>
            <div>
              <p className="text-[15px] text-mine-shaft/40 uppercase mb-2">Open Positions</p>
              <a href="mailto:vinus@vinus.co.kr" className="text-[16.9px] hover:underline underline-offset-4">
                vinus@vinus.co.kr
              </a>
            </div>
          </div>

          {/* Business Hours & Cape Town Address */}
          <div className="col-span-4 md:col-span-2 flex flex-col gap-12">
            <div>
              <p className="text-[15px] text-mine-shaft/40 uppercase mb-2">Business Hours</p>
              <p className="text-[16.8px] uppercase">Monday to Friday</p>
              <p className="text-[16.5px] uppercase text-mine-shaft/60 mt-1">10:00 AM – 18:00 PM GMT (+9)</p>
            </div>
            <div>
              <p className="text-[15.1px] text-mine-shaft/40 uppercase mb-2">KOREA</p>
              <address className="text-[16.5px] not-italic">
                07802 서울시 강서구 공항대로 227, 1202호
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* 9-3. Footer Meta 하단 바 */}
      <div className="h-[77px] border-t border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-8 w-full items-center">
          <div className="col-span-4 md:col-span-2 flex items-center">
            <img src="/logo.svg" alt="Vinuspread" className="h-[16px] w-auto" />
          </div>
          <div className="hidden md:flex col-span-2 md:col-span-4 justify-center gap-[38.4px] text-[15.5px]">
            <a href="#" className="hover:underline underline-offset-4">instagram</a>
            <a href="#" className="hover:underline underline-offset-4">pinterest</a>
            <a href="#" className="hover:underline underline-offset-4">behance</a>
            <a href="#" className="hover:underline underline-offset-4">vinorleague</a>
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
