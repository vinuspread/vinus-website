"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { Clip } from "@/components/common/Clip";
import { experiments, typeConfig, statusConfig } from "@/lib/experiments";

export default function LabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const revealRef = useReveal();

  const exp = experiments.find((e) => e.id === params.id);

  if (!exp) {
    return (
      <div className="min-h-screen bg-mine-shaft flex items-center justify-center flex-col gap-8" data-header-dark>
        <p className="font-inter text-white/40">존재하지 않는 실험입니다.</p>
        <button onClick={() => router.back()} className="font-inter text-white/60 underline underline-offset-4">
          뒤로 가기
        </button>
      </div>
    );
  }

  const currentIndex = experiments.findIndex((e) => e.id === exp.id);
  const prevExp = experiments[(currentIndex - 1 + experiments.length) % experiments.length];
  const nextExp = experiments[(currentIndex + 1) % experiments.length];

  const type = typeConfig[exp.type];
  const status = statusConfig[exp.status];

  return (
    <main className="bg-mine-shaft min-h-screen" data-header-dark>

      {/* ── Hero ── */}
      <header ref={revealRef} className="anim-wrap px-page-padding pt-[140px] md:pt-[200px] pb-[80px]">
        <div className="flex flex-col gap-8 max-w-[900px]">
          <div className="flex items-center gap-4">
            <span className="font-inter text-[13px] uppercase tracking-widest text-white/30">
              <Clip>{type.icon} {type.label}</Clip>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className={`font-inter font-bold text-[12px] uppercase tracking-wide ${status.className}`}>
              <Clip delay={30}>{status.label}</Clip>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-inter text-[12px] text-white/20">
              <Clip delay={50}>{exp.year}</Clip>
            </span>
          </div>

          <h1 className="font-inter font-bold text-white text-[clamp(40px,6vw,96px)] tracking-tight leading-[1.0]">
            <Clip delay={80}>{exp.title}</Clip>
          </h1>

          {exp.subtitle && (
            <p className="font-inter text-white/40 text-[clamp(18px,2vw,28px)] leading-snug max-w-[600px]">
              <Clip delay={120}>{exp.subtitle}</Clip>
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {exp.tags.map((tag, i) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] uppercase tracking-wide font-inter font-bold border border-white/10 text-white/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero Image ── */}
      {exp.heroImage && (
        <section className="px-page-padding pb-[80px] md:pb-[120px]">
          <div className="w-full aspect-[21/9] relative overflow-hidden bg-white/5">
            <Image
              src={exp.heroImage}
              alt={exp.title}
              fill
              className="object-cover opacity-80"
              priority
              data-pin-nopin="true"
            />
          </div>
        </section>
      )}

      {/* ── Content Sections ── */}
      {exp.sections && exp.sections.length > 0 && (
        <article className="px-page-padding pb-[120px] md:pb-[180px]">
          <div className="flex flex-col divide-y divide-white/10">
            {exp.sections.map((section, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-[60px] md:py-[80px]">

                {/* Label */}
                <div className="md:col-span-3">
                  {section.label && (
                    <p className="font-inter text-[11px] uppercase tracking-widest text-white/20 pt-1">
                      {section.label}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-9 flex flex-col gap-8">
                  {section.heading && (
                    <h2 className="font-inter font-bold text-white text-[clamp(24px,3vw,48px)] tracking-tight leading-tight">
                      {section.heading}
                    </h2>
                  )}
                  {section.body && (
                    <p className="body-text-ko !text-[17px] !text-white/50 leading-relaxed max-w-[680px]">
                      {section.body}
                    </p>
                  )}
                  {section.image && (
                    <div className={`w-full ${section.imageAspect ?? "aspect-[16/9]"} relative overflow-hidden bg-white/5 mt-4`}>
                      <Image
                        src={section.image}
                        alt={section.imageAlt ?? ""}
                        fill
                        className="object-cover opacity-80"
                        data-pin-nopin="true"
                      />
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </article>
      )}

      {/* ── Nav ── */}
      <nav className="border-t border-white/10">
        <div className="px-page-padding grid grid-cols-3 divide-x divide-white/10">
          <Link
            href={prevExp.href ?? `/lab/${prevExp.id}`}
            className="group flex items-center gap-5 py-10 md:py-14 hover:bg-white/5 transition-colors duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white transition-colors shrink-0">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-white truncate">{prevExp.title}</span>
          </Link>

          <Link
            href="/lab"
            className="group flex items-center justify-center gap-3 py-10 md:py-14 hover:bg-white/5 transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white transition-colors shrink-0">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="font-inter font-bold text-[22px] text-white/30 group-hover:text-white transition-colors">All Lab</span>
          </Link>

          <Link
            href={nextExp.href ?? `/lab/${nextExp.id}`}
            className="group flex items-center justify-end gap-5 py-10 md:py-14 hover:bg-white/5 transition-colors duration-300"
          >
            <span className="font-inter font-bold text-[18px] md:text-[22px] text-white truncate">{nextExp.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white transition-colors shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>

    </main>
  );
}
