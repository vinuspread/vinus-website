"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

export const AboutSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
        
        {/* Left Side: Side Label */}
        <div className="hidden lg:block">
          <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 sticky top-[120px]">
            (About)
          </p>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-12">
          
          {/* Main Heading */}
          <h2 className="anim-move-up font-inter text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.04em] text-mine-shaft max-w-[900px]">
            Focusing on the enduring value of what truly matters.
          </h2>

          {/* Description */}
          <p className="anim-move-up font-inter text-[clamp(18px,1.5vw,22px)] leading-[1.6] text-mine-shaft/60 max-w-[800px] break-keep" data-delay="150">
            VINUSPREAD partners with visionary leaders to capture the essential essence at the core of their brand. 
            By transforming strategic insights into beautiful design systems and digital ecosystems, we help 
            organizations transcend physical and structural boundaries. Our work translates bold vision into 
            scalable impact, creating experiences that resonate deeply and carry forward into the world.
          </p>

          {/* Purpose Section (Merged) */}
          <div className="mt-12">
            <div className="flex flex-col border-t border-mine-shaft/10">
              {[
                { label: "Explore our services", href: "/services" },
                { label: "See our work", href: "/work" },
                { label: "Discover our story", href: "/story" },
              ].map(({ label, href }, i) => (
                <div key={href} className="border-b border-mine-shaft/10 group">
                  <ArrowLink
                    href={href}
                    className="anim-move-up flex flex-row items-center justify-between w-full border-none py-[32px]
                      font-inter text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] whitespace-nowrap"
                    data-delay={200 + i * 80}
                  >
                    {label}
                  </ArrowLink>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
