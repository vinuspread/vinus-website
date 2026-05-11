"use client";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

export const ServicesSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap py-[100px] px-page-padding bg-white border-b border-alto">
      
      {/* 섹션 레이블 */}
      <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 mb-[80px]">
        ( Choose Your Purpose )
      </p>

      {/* 대형 링크 목록 */}
      <div className="flex flex-col gap-0 border-t border-alto">
        {[
          { label: "Explore our services", href: "/services" },
          { label: "See our case studies", href: "/work" },
          { label: "Discover our methodology", href: "/about" },
        ].map(({ label, href }, i) => (
          <div key={href} className="border-b border-alto group">
            <ArrowLink
              href={href}
              className="anim-move-up w-full justify-between border-none pb-0 py-[28px]
                font-inter text-[clamp(22px,3vw,40px)] font-medium tracking-[-0.02em]"
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
