"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection = () => {
  const ref = useReveal();
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;
    const container = imageRef.current.parentElement;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(container,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" }
        }
      );
      gsap.fromTo(imageRef.current,
        { y: 50 },
        {
          y: -50, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true }
        }
      );
    });

    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_2fr] gap-12 items-start">

        {/* Left Side: Image */}
        <div className="hidden lg:flex flex-col">
          <div className="sticky top-[120px] overflow-hidden aspect-[2/3] w-full">
            <div className="w-full h-full will-change-transform">
              <img
                ref={imageRef}
                src="/about_vertical.png"
                alt="About Vinuspread"
                className="w-full h-full object-cover scale-125 will-change-transform"
              />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block"></div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-12">
          <h2 className="anim-move-up display-heading text-[clamp(40px,5vw,72px)] text-mine-shaft">
            Focusing on the enduring value of what truly matters.
          </h2>

          <p className="anim-move-up font-inter text-[clamp(18px,1.5vw,22px)] leading-[1.6] text-mine-shaft/60 break-keep" data-delay="150">
            VINUSPREAD partners with visionary leaders to capture the essential essence at the core of their brand.
            By transforming strategic insights into beautiful design systems and digital ecosystems, we help
            organizations transcend physical and structural boundaries. Our work translates bold vision into
            scalable impact, creating experiences that resonate deeply and carry forward into the world.
          </p>

          <div className="mt-12">
            <div className="flex flex-col border-t border-mine-shaft/10">
              {[
                { label: "Explore our services", href: "/services" },
                { label: "See our work", href: "/work" },
                { label: "Discover our story", href: "/we" },
              ].map(({ label, href }, i) => (
                <div key={href} className="border-b border-mine-shaft/10 group">
                  <ArrowLink
                    href={href}
                    className="anim-move-up flex flex-row items-center justify-between w-full border-none py-[32px] font-inter text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] whitespace-nowrap"
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
