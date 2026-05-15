"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ArrowLink } from "@/components/common/ArrowLink";

export const WorkSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap bg-white border-b border-alto">

      {/* Header row */}
      <div className="px-page-padding py-[40px] flex items-center justify-between border-b border-alto">
        <p className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">
          ( Selected Work )
        </p>
        <div className="anim-move-up" data-delay="100">
          <ArrowLink href="/work">View All Work</ArrowLink>
        </div>
      </div>

      {/* Full-bleed grid */}
      <WorkGrid limit={4} />

    </section>
  );
};
