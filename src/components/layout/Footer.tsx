"use client";

import Link from "next/link";
import { DoubleButton } from "@/components/common/DoubleButton";
import { useReveal } from "@/hooks/useReveal";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "vinuspread", href: "/about" },
  { label: "experience", href: "/work" },
  { label: "services",   href: "/services" },
  { label: "story",      href: "/story" },
  { label: "contact",    href: "/contact" },
];

export const Footer = () => {
  const revealRef = useReveal();
  const pathname = usePathname();

  const currentIndex = NAV.findIndex((n) => pathname.startsWith(n.href));
  const next = NAV[(currentIndex + 1) % NAV.length];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={revealRef as any} className="anim-wrap text-mine-shaft">
      {/* Footer Inner */}
      <div className="px-page-padding py-[80px] flex flex-col justify-between">
        <div className="flex flex-col md:grid md:grid-cols-8 md:gap-column">
          {/* Next Page */}
          <div className="md:col-span-4 mb-[48px] md:mb-[64px]">
            <p className="text-[12px] md:text-[17.1px] uppercase tracking-[-0.38px] mb-4">
              <span className="anim-clip">
                <span className="anim-move-up">Next Page</span>
              </span>
            </p>
            <Link href={next.href} className="flex items-center gap-8 group w-fit">
              <div className="flex items-start gap-2">
                <span className="text-[clamp(48px,10vw,120px)] tracking-[-2.8px] md:tracking-[-4px] uppercase leading-[0.9] font-normal">
                  <span className="anim-clip">
                    <span className="anim-move-up" data-delay="100">{next.label}</span>
                  </span>
                </span>
              </div>
              <div className="flex items-center overflow-visible">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-4 transition-transform duration-500 md:w-[60px] md:h-[60px]"
                >
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <polyline points="15 5 22 12 15 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>

          <div className="hidden md:block col-span-4" />

          {/* Contact */}
          <div className="md:col-span-2 flex flex-col gap-6 mb-12 md:mb-0">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] md:text-[15px] uppercase tracking-normal text-mine-shaft font-inter">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay="300">CONTACT</span>
                </span>
              </p>
              <p className="text-[14px] md:text-[16px] font-medium leading-[1.6] md:leading-[1.5] tracking-[-0.3px] text-mine-shaft/60">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay="350">
                    아이디어를 가치있는 경험으로 만들 준비가 되어 있습니다.<br />
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

          <div className="hidden md:block col-span-2" />

          {/* Business Enquiries & Open Positions */}
          <div className="md:col-span-2 flex flex-col gap-8 md:gap-12 mb-10 md:mb-0">
            <div>
              <p className="text-[12px] md:text-[14.9px] text-mine-shaft/40 uppercase mb-2">Business enquiries</p>
              <p className="text-[14px] md:text-[16.9px]">vinus@vinus.co.kr</p>
              <p className="text-[14px] md:text-[16.9px] text-mine-shaft/60 mt-1">TEL : 02-3661-1907 &nbsp; FAX : 02-3661-1906</p>
            </div>
            <div>
              <p className="text-[12px] md:text-[15px] text-mine-shaft/40 uppercase mb-2">Open Positions</p>
              <a href="mailto:vinus@vinus.co.kr" className="text-[14px] md:text-[16.9px] hover:underline underline-offset-4">
                vinus@vinus.co.kr
              </a>
            </div>
          </div>

          {/* Business Hours & Address */}
          <div className="md:col-span-2 flex flex-col gap-8 md:gap-12">
            <div>
              <p className="text-[12px] md:text-[15px] text-mine-shaft/40 uppercase mb-2">Business Hours</p>
              <p className="text-[14px] md:text-[16.8px] uppercase">Monday to Friday</p>
              <p className="text-[14px] md:text-[16.5px] uppercase text-mine-shaft/60 mt-1">10:00 AM – 18:00 PM GMT (+9)</p>
            </div>
            <div>
              <p className="text-[12px] md:text-[15.1px] text-mine-shaft/40 uppercase mb-2">KOREA</p>
              <address className="text-[14px] md:text-[16.5px] not-italic">
                07802 서울시 강서구 공항대로 227, 1202호
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="h-[77px] border-t border-alto px-page-padding flex items-center">
        <div className="grid grid-cols-8 w-full items-center">
          <div className="col-span-4 md:col-span-2 flex items-center">
            <img src="/images/logo.svg" alt="Vinuspread" className="h-[16px] w-auto" data-pin-nopin="true" />
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
              className="text-[13px] md:text-[15.1px] uppercase hover:underline underline-offset-4"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
