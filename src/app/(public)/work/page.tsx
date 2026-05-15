"use client";

import { useState } from "react";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { PageHeader } from "@/components/common/PageHeader";
import { PageHeaderDescription } from "@/components/common/PageHeaderDescription";
import { FilterBar } from "@/components/common/FilterBar";
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
        noBorder
        title={<>Seamless new <span className="font-bold">experiences</span></>}
        description={
          <PageHeaderDescription
            en="We design seamless digital experiences - intuitive, meaningful, and built to last."
            ko="우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며, 새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다."
          />
        }
      />

      <FilterBar
        categories={categories}
        active={active}
        onSelect={setActive}
        count={count}
        total={projects.length}
        totalLabel="Projects"
      />

      {/* Projects Grid */}
      <WorkGrid filter={active} isSlider={false} />
    </main>
  );
}
