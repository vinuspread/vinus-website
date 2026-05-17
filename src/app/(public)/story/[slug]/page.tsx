"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { stories } from "@/lib/stories";
import { useReveal } from "@/hooks/useReveal";
import { Clip } from "@/components/common/Clip";

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const revealRef = useReveal();

  const story = stories.find((s) => s.slug === params.slug);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-8">
        <p className="body-text-ko opacity-40">존재하지 않는 게시글입니다.</p>
        <button onClick={() => router.back()} className="body-text underline underline-offset-4 opacity-40">
          뒤로 가기
        </button>
      </div>
    );
  }

  const currentIndex = stories.findIndex((s) => s.slug === story.slug);
  const prevStory = stories[(currentIndex - 1 + stories.length) % stories.length];
  const nextStory = stories[(currentIndex + 1) % stories.length];

  return (
    <main className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <header ref={revealRef as any} className="anim-wrap px-page-padding pt-[140px] md:pt-[200px] pb-[80px]">
        <div className="flex flex-col gap-8 max-w-[900px]">
          <div className="flex items-center gap-4">
            <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/30">
              <Clip>{story.category}</Clip>
            </span>
            <span className="w-1 h-1 rounded-full bg-mine-shaft/10" />
            <span className="font-inter text-[12px] text-mine-shaft/20">
              <Clip delay={30}>{story.date}</Clip>
            </span>
          </div>

          <h1 className="font-inter font-bold text-mine-shaft text-[clamp(40px,6vw,96px)] tracking-tight leading-[1.0]">
            <Clip delay={80}>{story.title}</Clip>
          </h1>

          <p className="font-inter text-mine-shaft/50 text-[clamp(18px,2vw,28px)] leading-snug max-w-[600px]">
            <Clip delay={120}>{story.summary}</Clip>
          </p>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {story.thumbnail && (
        <section className="px-page-padding pb-[80px] md:pb-[120px]">
          <div className="w-full aspect-[21/9] relative overflow-hidden bg-gallery">
            <Image
              src={story.thumbnail}
              alt={story.title}
              fill
              className="object-cover"
              priority
              data-pin-nopin="true"
            />
          </div>
        </section>
      )}

      {/* ── Content ── */}
      {story.content && (
        <article className="px-page-padding pb-[120px] md:pb-[180px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-alto py-[60px] md:py-[80px]">
            <div className="md:col-span-3">
              <p className="font-inter text-[11px] uppercase tracking-widest text-mine-shaft/20 pt-1">Content</p>
            </div>
            <div
              className="md:col-span-9 prose-editorial"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </article>
      )}

      {/* ── Nav ── */}
      <nav className="border-t border-b border-alto bg-white">
        <div className="px-page-padding grid grid-cols-3 divide-x divide-alto">
          <Link
            href={`/story/${prevStory.slug}`}
            className="group flex items-center gap-5 py-10 md:py-14 group transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{prevStory.title}</span>
          </Link>

          <Link
            href="/story"
            className="group flex items-center justify-center gap-3 py-10 md:py-14 group transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="font-inter font-bold text-[22px] text-mine-shaft/30 group-hover:text-mine-shaft transition-colors">All Stories</span>
          </Link>

          <Link
            href={`/story/${nextStory.slug}`}
            className="group flex items-center justify-end gap-5 py-10 md:py-14 group transition-colors duration-200"
          >
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{nextStory.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>

    </main>
  );
}
