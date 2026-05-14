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
    <section ref={ref as any} className="anim-wrap section-pad bg-white">
      <div className="flex flex-col gap-12">
        
        <h2 className="anim-move-up display-heading text-mine-shaft">
          Awards & Recognitions.
        </h2>

        <div className="flex flex-col border-t border-alto mt-8">
          {awardsData.map((award, idx) => (
            <div
              key={award.name}
              className="grid grid-cols-12 items-center py-[32px] border-b border-alto group transition-colors hover:bg-mine-shaft/[0.02]"
            >
              <div className="col-span-6 lg:col-span-4">
                <div className="anim-clip block">
                  <span className="anim-move-up font-inter font-medium text-[20px] lg:text-[22px] tracking-[-0.02em]" data-delay={idx * 60}>
                    {award.name}
                  </span>
                </div>
              </div>
              <div className="col-span-5 lg:col-span-7">
                <div className="anim-clip block">
                  <span className="anim-move-up font-inter font-light text-[15px] leading-relaxed text-mine-shaft/40" data-delay={idx * 60 + 60}>
                    {award.items.join(" — ")}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex justify-end">
                <span className="opacity-20 group-hover:opacity-100 transition-all duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
