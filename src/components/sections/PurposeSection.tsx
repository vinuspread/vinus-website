"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

const links = [
  { label: "Explore our services", href: "/services" },
  { label: "See our case studies", href: "/work" },
  { label: "Discover our methodology", href: "/about" },
];

export const PurposeSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap section-pad bg-white">

      {/* Large text links (Left Aligned) */}
      <div className="border-t border-alto">
        {links.map(({ label, href }, i) => (
          <div key={href} className="border-b border-alto">
            <ArrowLink
              href={href}
              className="anim-move-up w-full justify-between border-none py-[48px]
                font-inter font-medium text-[clamp(24px,4vw,64px)] tracking-[-0.02em] text-mine-shaft"
              data-delay={i * 80}
            >
              {label}
            </ArrowLink>
          </div>
        ))}
      </div>

    </section>
  );
};
