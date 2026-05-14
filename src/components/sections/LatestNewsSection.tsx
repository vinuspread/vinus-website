"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useReveal } from "@/hooks/useReveal";
import { stories } from "@/lib/stories";

const latest = [...stories].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

export const LatestNewsSection = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} className="anim-wrap section-pad bg-gallery">
      {/* Header Row */}
      <div className="flex justify-between items-end mb-12">
        <h2 className="display-heading uppercase">
          <span className="block overflow-hidden">
            <span className="anim-move-up block">Ideas & Insights</span>
          </span>
        </h2>
        <div className="anim-clip">
          <div className="anim-move-up" data-delay="100">
            <ArrowLink href="/story">View All</ArrowLink>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-column border-t border-alto pt-12">
        {latest.map((story, idx) => (
          <Link key={story.slug} href={`/story/${story.slug}`} className="group flex flex-col gap-6">
            {/* Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              <div className="anim-move-up-img w-full h-full relative" data-delay={idx * 150}>
                {story.thumbnail ? (
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-alto/40" />
                )}
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-3">
              <p className="section-label opacity-40">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={idx * 150 + 100}>
                    {story.category} · {story.date}
                  </span>
                </span>
              </p>
              <h3 className="text-[24px] tracking-[-0.02em] leading-[1.3] font-bold group-hover:opacity-60 transition-opacity">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={idx * 150 + 180}>
                    {story.title}
                  </span>
                </span>
              </h3>
              {story.summary && (
                <p className="body-text-ko !text-[14px] line-clamp-2">
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
