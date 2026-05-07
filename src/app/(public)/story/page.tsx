"use client";

import { stories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PageHeader } from "@/components/common/PageHeader";

const categories = ["All", "Story", "Notice", "Etc"] as const;
type Category = (typeof categories)[number];

export default function StoryPage() {
  const listRef = useReveal();
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);

  const count = (cat: Category) =>
    cat === "All" ? stories.length : stories.filter((s) => s.category === cat).length;

  return (
    <main className="bg-gallery">

      <PageHeader
        breadcrumb="Story"
        noBorder
        title={<>Ideas &amp; <span className="font-bold">Insights</span></>}
        description="프로젝트와 경험, 그리고 브랜드에 대한 바이너스프레드의 시선과 기록을 담았습니다."
      />

      {/* ── Category Filter ── */}
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

      {/* ── Story List ── */}
      <section ref={listRef as any} className="anim-wrap px-page-padding">
        {filtered.length === 0 ? (
          <div className="py-[120px] text-center text-[15px] text-mine-shaft/40">
            등록된 글이 없습니다.
          </div>
        ) : (
          <div>
            {filtered.map((story) => (
              <Link
                key={story.slug}
                href={`/story/${story.slug}`}
                className="flex items-start gap-[40px] py-[40px] border-b border-alto group hover:bg-white/40 transition-colors px-0"
              >
                {/* 썸네일 */}
                {story.thumbnail ? (
                  <div className="flex-shrink-0 w-[160px] h-[100px] relative overflow-hidden">
                    <Image
                      src={story.thumbnail}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-[160px] h-[100px] bg-alto/40 flex items-center justify-center">
                    <span className="text-[11px] uppercase tracking-wider text-mine-shaft/30">No Image</span>
                  </div>
                )}

                {/* 텍스트 */}
                <div className="flex-1 flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[16px]">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-mine-shaft/40 font-inter">{story.category}</span>
                    <span className="text-[11px] text-mine-shaft/30">{story.date}</span>
                  </div>
                  <h2 className="text-[20px] md:text-[24px] tracking-[-0.5px] leading-snug group-hover:opacity-60 transition-opacity">
                    {story.title}
                  </h2>
                  <p className="text-[14px] font-light text-mine-shaft/50 leading-[1.5] line-clamp-2">
                    {story.summary}
                  </p>
                </div>

                {/* 화살표 */}
                <span className="flex-shrink-0 text-[20px] text-mine-shaft/30 group-hover:translate-x-1 transition-transform mt-[4px]">→</span>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
