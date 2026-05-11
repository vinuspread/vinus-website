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
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-white border-t border-mine-shaft/10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
        
        {/* Left Side: Side Label */}
        <div className="hidden lg:block">
          <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 sticky top-[120px]">
            ( Recognition )
          </p>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-12">
          
          {/* Main Heading */}
          <h2 className="anim-move-up font-inter text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.04em] text-mine-shaft">
            Awards & Recognitions.
          </h2>

          {/* Awards List */}
          <div className="flex flex-col border-t border-mine-shaft/10 mt-8">
            {awardsData.map((award, idx) => (
              <div
                key={award.name}
                className="grid grid-cols-12 items-center py-[40px] border-b border-mine-shaft/10 group transition-colors hover:bg-mine-shaft/[0.02]"
              >
                <div className="col-span-6 lg:col-span-4">
                  <div className="anim-clip block">
                    <span className="anim-move-up font-inter font-medium text-[20px] lg:text-[24px] tracking-[-0.02em]" data-delay={idx * 60}>
                      {award.name}
                    </span>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-7">
                  <div className="anim-clip block">
                    <span className="anim-move-up font-inter font-light text-[14px] lg:text-[15px] leading-relaxed text-mine-shaft/40" data-delay={idx * 60 + 60}>
                      {award.items.join(" — ")}
                    </span>
                  </div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 15.5L15.5 4.5M15.5 4.5H6.5M15.5 4.5V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
