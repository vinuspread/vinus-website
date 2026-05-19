"use client";

import { stories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PageHeader } from "@/components/common/PageHeader";
import { PageHeaderDescription } from "@/components/common/PageHeaderDescription";
import { FilterBar } from "@/components/common/FilterBar";

const categories = ["All", "Story", "Notice", "Etc"] as const;
type Category = (typeof categories)[number];

export default function StoryPage() {
  const listRef = useReveal();
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);

  const count = (cat: Category) =>
    cat === "All" ? stories.length : stories.filter((s) => s.category === cat).length;

  return (
    <main className="bg-white">

      <PageHeader
        breadcrumb="Story"
        noBorder
        title={<>Ideas &amp; <span className="font-bold">Insights</span></>}
        description={
          <PageHeaderDescription
            en="Thoughts, perspectives, and ideas that drive our work."
            ko="프로젝트와 경험, 그리고 브랜드에 대한 바이너스프레드의 시선과 기록을 담았습니다."
          />
        }
      />

      {/* ── Category Filter ── */}
      <FilterBar
        categories={categories}
        active={active}
        onSelect={setActive}
        count={count}
        total={stories.length}
        totalLabel="Stories"
      />

      {/* ── Story Grid ── */}
      <section ref={listRef} className="anim-wrap px-page-padding py-[80px] md:py-[120px]">
        {filtered.length === 0 ? (
          <div className="py-[120px] text-center body-text-ko opacity-40">
            등록된 글이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filtered.map((story, i) => (
              <Link
                key={story.slug}
                href={`/story/${story.slug}`}
                className="group flex flex-col gap-6"
              >
                <div className="aspect-[4/5] relative overflow-hidden rounded-[2px] bg-gallery">
                  <div className="anim-move-up-img w-full h-full relative" data-delay={i * 60}>
                    {story.thumbnail ? (
                      <Image
                        src={story.thumbnail}
                        alt={story.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.04]"
                        data-pin-nopin="true"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span className="section-label">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="section-label !text-[12px] opacity-40">{story.category}</span>
                    <span className="w-1 h-1 bg-mine-shaft/10 rounded-full" />
                    <span className="section-label !text-[12px] opacity-20">{story.date}</span>
                  </div>
                  <h3 className="text-[20px] font-medium leading-[1.3] tracking-tight group-hover:opacity-60 transition-opacity">
                    {story.title}
                  </h3>
                  <p className="body-text-ko !text-[14px] !text-mine-shaft/40 line-clamp-2">
                    {story.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
