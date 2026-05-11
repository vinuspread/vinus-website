"use client";

import { useReveal } from "@/hooks/useReveal";

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
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap px-page-padding py-[120px] bg-white">

      {/* Label + Heading */}
      <div className="mb-[100px]">
        <p className="anim-move-up font-inter font-bold text-[11px] tracking-[0.2em] uppercase text-mine-shaft/40 mb-[60px]">
          ( Recognition )
        </p>
        <h2 className="font-inter font-bold leading-[1.0] tracking-[-0.05em] text-mine-shaft"
          style={{ fontSize: "clamp(48px, 6vw, 100px)" }}>
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-normal" data-delay="80">Awards &</span>
          </span>
          <span className="block overflow-hidden">
            <span className="anim-move-up block font-bold" data-delay="140">Recognitions.</span>
          </span>
        </h2>
      </div>

      {/* Awards 리스트 */}
      <div className="border-t border-mine-shaft/10">
        {awardsData.map((award, idx) => (
          <div key={award.name} className="grid grid-cols-12 gap-[40px] py-[48px] border-b border-mine-shaft/10">
            <div className="col-span-3">
              <span className="anim-clip">
                <span className="anim-move-up font-inter font-medium text-[18px] tracking-[-0.01em]" data-delay={idx * 80}>
                  {award.name}
                </span>
              </span>
            </div>
            <div className="col-span-9">
              <p className="font-inter font-light text-[15px] leading-[1.8] text-mine-shaft/60">
                <span className="anim-clip block">
                  <span className="anim-move-up block" data-delay={idx * 80 + 60}>
                    {award.items.join(" — ")}
                  </span>
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
