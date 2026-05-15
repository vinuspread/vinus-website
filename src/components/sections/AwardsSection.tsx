"use client";

import { useReveal } from "@/hooks/useReveal";
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
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap section-pad bg-white">
      <div className="flex flex-col gap-12">
        
        <h2 className="anim-move-up display-heading text-mine-shaft">
          Awards & Recognitions.
        </h2>

        <div className="flex flex-col border-t border-alto mt-8">
          {awardsData.map((award, idx) => (
            <ListRow
              key={award.name}
              label={award.name}
              detail={award.items.join(" - ")}
              delay={idx * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
