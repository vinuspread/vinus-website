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
        <p className="body-text-ko">존재하지 않는 게시글입니다.</p>
        <button 
          onClick={() => router.back()}
          className="btn-front"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  // Find next/prev for navigation
  const currentIndex = stories.findIndex((s) => s.slug === story.slug);
  const nextStory = stories[(currentIndex + 1) % stories.length];

  return (
    <main className="bg-white min-h-screen">
      {/* ── Story Hero ── */}
      <header ref={revealRef as any} className="anim-wrap pt-[120px] md:pt-[180px] pb-[80px] px-page-padding">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <span className="section-label !text-mine-shaft/30"><Clip>{story.category}</Clip></span>
            <span className="w-1 h-1 rounded-full bg-mine-shaft/10" />
            <span className="section-label !text-mine-shaft/20"><Clip delay={50}>{story.date}</Clip></span>
          </div>
          
          <h1 className="display-heading !text-[clamp(40px,5vw,80px)] leading-[1.1]">
            <Clip delay={100}>{story.title}</Clip>
          </h1>

          <p className="body-text-ko !text-[20px] !text-mine-shaft/60 max-w-[700px]">
            <Clip delay={150}>{story.summary}</Clip>
          </p>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {story.thumbnail && (
        <section className="px-page-padding pb-[100px]">
          <div className="w-full aspect-[21/9] relative overflow-hidden rounded-[2px] bg-gallery">
            <Image
              src={story.thumbnail}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* ── Content Area ── */}
      <article className="px-page-padding pb-[160px]">
        <div 
          className="max-w-[800px] mx-auto prose-editorial"
          dangerouslySetInnerHTML={{ __html: story.content || "" }}
        />
      </article>

      {/* ── Navigation ── */}
      <footer className="border-t border-alto px-page-padding py-[80px]">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Link 
            href="/story"
            className="text-[14px] font-inter uppercase tracking-widest text-mine-shaft/40 hover:text-mine-shaft transition-colors flex items-center gap-3"
          >
            ← Back to List
          </Link>

          <Link
            href={`/story/${nextStory.slug}`}
            className="group flex flex-col items-end gap-4 text-right"
          >
            <span className="section-label !text-[10px] opacity-30">Next Story</span>
            <span className="display-heading !text-[24px] md:text-[32px] group-hover:opacity-60 transition-opacity">
              {nextStory.title} →
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
