"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export interface BlogHighlightItem {
  slug: string;
  title: string;
  category: string | null;
  meta_description: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

interface BlogHighlightsSectionProps {
  stories: BlogHighlightItem[];
}

interface StoryThumbnailProps {
  src: string;
  priority: boolean;
}

const formatStoryDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const StoryThumbnail = ({ src, priority }: StoryThumbnailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = { current: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const box = ref.current;
      const image = imageRef.current;
      if (!box || !image) return;

      if (prefersReducedMotion) {
        image.style.transform = "translate3d(0, 0, 0) scale(1)";
        return;
      }

      const rect = box.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
      const y = 1.5 - progress * 3;
      image.style.transform = `translate3d(0, ${y}em, 0)`;
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={ref} className="relative mb-[1.5em] size-[7em] overflow-hidden rounded-full bg-gallery md:size-[8em]">
      <div ref={imageRef} className="absolute inset-x-0 top-[-1.5em] h-[calc(100%+3em)] will-change-transform">
        <Image
          src={src}
          alt=""
          fill
          sizes="8em"
          loading={priority ? "eager" : "lazy"}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export const BlogHighlightsSection = ({ stories }: BlogHighlightsSectionProps) => {
  const visibleStories = stories.slice(0, 3);

  if (visibleStories.length === 0) return null;

  return (
    <section className="relative z-[10] bg-white py-[clamp(6em,12vw,10.5em)]">
      <div className="px-[clamp(1.5em,8vw,10em)]">
        <div className="grid grid-cols-1 gap-[4em] lg:grid-cols-12 lg:gap-[10em]">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2">
              <h2 className="font-inter text-[clamp(3.5em,8vw,7.5em)] font-bold leading-[0.96] tracking-[-0.04em] text-mine-shaft">
                Ideas &amp; Insights
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-[clamp(3.5em,8vw,7em)]">
              {visibleStories.map((story, index) => (
                <Link
                  key={story.slug}
                  href={`/story/${story.slug}`}
                  className="group relative flex min-h-[30vh] w-full max-w-[45em] flex-col items-start gap-[1.5em] pt-0 text-left md:flex-row md:gap-[2em] lg:self-start"
                >
                  {story.thumbnail_url && <StoryThumbnail src={story.thumbnail_url} priority={index === 0} />}

                  <div className="flex min-w-0 flex-1 flex-col pt-1 md:pt-0">
                    <div className="mb-[1em] flex items-center gap-[0.75em] font-inter text-[0.6875em] font-semibold uppercase tracking-[0.08em] text-mine-shaft/35">
                      <span>{story.category ?? "Story"}</span>
                      <span className="size-[0.25em] rounded-full bg-mine-shaft/15" />
                      <time dateTime={story.created_at}>{formatStoryDate(story.created_at)}</time>
                    </div>

                    <h3 className="font-inter text-[2em] font-bold leading-[1.12] tracking-[-0.03em] text-mine-shaft transition-opacity duration-300 group-hover:opacity-55">
                      {story.title}
                    </h3>
                    {story.meta_description && (
                      <p className="mt-[1.25em] line-clamp-2 overflow-hidden text-ellipsis font-pretendard text-[1em] font-medium leading-[1.65] text-mine-shaft/55">
                        {story.meta_description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
