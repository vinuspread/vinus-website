"use client";

import Image from "next/image";
import Link from "next/link";
import { DoubleButton } from "@/components/common/DoubleButton";
import { useReveal } from "@/hooks/useReveal";
import { stories } from "@/lib/stories";

const latest = [...stories].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

export const LatestNewsSection = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} className="anim-wrap pt-[80px] px-page-padding bg-gallery pb-[120px]">
      {/* Header Row */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-[46.5px] tracking-[-1.6px] uppercase leading-none font-inter">
          <span className="anim-clip">
            <span className="anim-move-up">Ideas & Insights</span>
          </span>
        </h2>
        <div className="anim-clip">
          <div className="anim-move-up" data-delay="100">
            <DoubleButton labelFront="View All" labelBack="View All" href="/story" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-alto anim-fill-width" />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] pt-[38.4px]">
        {latest.map((story, idx) => (
          <Link key={story.slug} href={`/story/${story.slug}`} className="flex-1 grid grid-cols-2 gap-[38.4px] h-[411px] group">
            {/* Left: Image */}
            <div className="aspect-[429/371] relative overflow-hidden anim-clip">
              <div className="anim-move-up-img w-full h-full relative" data-delay={idx * 150}>
                {story.thumbnail ? (
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-alto/40" />
                )}
              </div>
            </div>
            {/* Right: Meta + Title */}
            <div className="flex flex-col gap-3">
              <p className="text-[14px] uppercase tracking-[0.05em] text-mine-shaft/40 font-inter">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 150 + 100}>
                    {story.category} · {story.date}
                  </span>
                </span>
              </p>
              <h3 className="text-[22px] tracking-[-0.6px] leading-[1.3] font-normal group-hover:opacity-60 transition-opacity">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 150 + 180}>
                    {story.title}
                  </span>
                </span>
              </h3>
              {story.summary && (
                <p className="text-[14px] font-light text-mine-shaft/50 leading-[1.5] line-clamp-3 mt-2">
                  {story.summary}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
