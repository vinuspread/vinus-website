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
            For brands building what's next and entering a phase of growth.
          </h2>

          {/* Description */}
          <p className="anim-move-up font-inter text-[clamp(18px,1.5vw,22px)] leading-[1.6] text-mine-shaft/60 max-w-[800px] break-keep" data-delay="150">
            Vinuspread partners with leadership teams at pivotal moments to codify 
            the strategic idea at the center of the company and turn it into a 
            brand system the organization can scale. Our work translates vision 
            into strategy, category differentiation, language, and design systems 
            that align teams and carry forward into the world.
          </p>

          {/* Purpose Section (Merged) */}
          <div className="mt-20">
            <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 mb-10">
              (Choose Your Purpose)
            </p>

            <div className="flex flex-col border-t border-mine-shaft/10">
              {[
                { label: "Explore our services", href: "/services" },
                { label: "See our case studies", href: "/work" },
                { label: "Discover our methodology", href: "/about" },
              ].map(({ label, href }, i) => (
                <div key={href} className="border-b border-mine-shaft/10 group">
                  <ArrowLink
                    href={href}
                    className="anim-move-up w-full justify-between border-none py-[32px]
                      font-inter text-[clamp(24px,2.5vw,36px)] font-medium tracking-[-0.02em]"
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
