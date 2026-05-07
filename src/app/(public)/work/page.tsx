"use client";

import { useState } from "react";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { PageHeader } from "@/components/common/PageHeader";

const categories = ["All", "UI/UX", "Character/Illustration", "Branding", "Etc"] as const;
type Category = (typeof categories)[number];

export default function WorkPage() {
  const [active, setActive] = useState<Category>("All");

  return (
    <main className="bg-gallery">
      <PageHeader
        breadcrumb="Experience"
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
      <div className="px-page-padding flex items-center gap-[4px] py-[20px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-[16px] py-[7px] text-[12px] uppercase tracking-[0.08em] border transition-colors ${
              active === cat
                ? "bg-mine-shaft text-gallery border-mine-shaft"
                : "bg-transparent text-mine-shaft/50 border-alto hover:border-mine-shaft hover:text-mine-shaft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <WorkGrid filter={active} />
    </main>
  );
}
