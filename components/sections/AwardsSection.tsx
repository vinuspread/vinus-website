"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ListRow } from "@/components/common/ListRow";

const focusData = [
  {
    name: "Product Strategy",
    items: ["Discovery", "Roadmap", "Service Structure", "AI Opportunity Mapping"],
  },
  {
    name: "Experience Design",
    items: ["UX/UI", "Web", "App", "Interaction"],
  },
  {
    name: "Brand Systems",
    items: ["Identity", "Character & IP", "Visual Direction", "Content Rules"],
  },
  {
    name: "Launch & Operation",
    items: ["CMS", "SEO", "Analytics", "Continuous Improvement"],
  },
];

export const AwardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ListRow 내부 anim-move-up CSS 초기 상태 오버라이드 (GSAP가 직접 제어)
      gsap.set(section.querySelectorAll(".anim-move-up"), { opacity: 1, y: 0 });

      // 초기 숨김
      gsap.set(".awards-heading", { opacity: 0, y: 36 });
      gsap.set(".awards-row",    { opacity: 0, y: 24 });

      // 헤딩
      gsap.to(".awards-heading", {
        opacity: 1, y: 0,
        duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });

      // 리스트 rows — stagger
      gsap.to(".awards-row", {
        opacity: 1, y: 0,
        stagger: 0.13,
        duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad bg-white">
      <div className="flex flex-col gap-12">

        <h2 className="awards-heading display-heading text-mine-shaft" style={{ opacity: 0 }}>
          What we manage.
        </h2>

        <div className="flex flex-col border-t border-alto">
          {focusData.map((focus) => (
            <div key={focus.name} className="awards-row" style={{ opacity: 0 }}>
              <ListRow label={focus.name} detail={focus.items.join(" - ")} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
