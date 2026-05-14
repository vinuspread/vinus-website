"use client";

import { useState } from "react";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { PageHeader } from "@/components/common/PageHeader";
import { projects } from "@/lib/projects";

const categories = ["All", "UI/UX", "Character/Illustration", "Branding", "Etc"] as const;
type Category = (typeof categories)[number];

export default function WorkPage() {
  const [active, setActive] = useState<Category>("All");

  const count = (cat: Category) =>
    cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <main className="bg-white">
      <PageHeader
        breadcrumb="Experience"
        sideLabel={`${projects.length} Projects`}
        noBorder
        title={<>Seamless new <span className="font-bold">experiences</span></>}
        description={
          <>
            <span className="block">
              우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며,
            </span>
            <span className="block mt-[4px]">
              새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다.
            </span>
          </>
        }
      />

      {/* Category Filter */}
      <div className="px-page-padding border-b border-alto flex items-center gap-[32px] py-[20px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[12px] uppercase tracking-[0.1em] font-inter pb-[2px] transition-all duration-300 ${
              active === cat
                ? "text-mine-shaft border-b border-mine-shaft"
                : "text-mine-shaft/40 hover:text-mine-shaft"
            }`}
          >
            {cat}
            <span className="ml-[6px] opacity-50">{count(cat)}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <WorkGrid filter={active} isSlider={false} />
    </main>
  );
}
