"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

const links = [
  { label: "Explore our services", href: "/services" },
  { label: "See our case studies", href: "/work" },
  { label: "Discover our methodology", href: "/about" },
];

export const PurposeSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap px-page-padding py-[100px] bg-white border-b border-alto">

      {/* Label */}
      <p className="anim-move-up font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40 mb-[64px]">
        ( Choose Your Purpose )
      </p>

      {/* Large text links */}
      <div className="border-t border-alto">
        {links.map(({ label, href }, i) => (
          <div key={href} className="border-b border-alto">
            <Link
              href={href}
              className="group flex items-center justify-between w-full py-[28px]
                font-inter font-medium text-[clamp(20px,3vw,42px)] tracking-[-0.02em] text-mine-shaft
                hover:text-mine-shaft/50 transition-colors duration-200"
            >
              <span className="anim-move-up block" data-delay={i * 80}>{label}</span>
              <span className="text-[clamp(16px,2vw,28px)] transition-transform duration-300 group-hover:translate-x-2 shrink-0 ml-4">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};
