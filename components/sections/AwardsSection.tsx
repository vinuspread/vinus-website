"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ListRow } from "@/components/common/ListRow";

const awardsData = [
  {
    name: "Awwwards",
    items: ["1x Studio of the Year Nominee", "2x E-commerce of the Year Nominee", "1x Site of the Month", "13x Site of the Day", "12x Developer Award", "21x Honourable Mention"],
  },
  {
    name: "The FWA",
    items: ["10x FWA of the Day"],
  },
  {
    name: "CSS Design Awards",
    items: ["1x Website of the Year Nominee", "1x Website of the Month", "11x Website of the Day", "15x Innovation", "15x UX Design", "15x UI Design"],
  },
  {
    name: "Webby Awards",
    items: ["1x Webby Nominee"],
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
          Awards & Recognitions.
        </h2>

        <div className="flex flex-col border-t border-alto">
          {awardsData.map((award) => (
            <div key={award.name} className="awards-row" style={{ opacity: 0 }}>
              <ListRow label={award.name} detail={award.items.join(" - ")} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
