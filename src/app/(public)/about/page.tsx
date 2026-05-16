"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { PageHeader } from "@/components/common/PageHeader";
import { PageHeaderDescription } from "@/components/common/PageHeaderDescription";
import { Clip } from "@/components/common/Clip";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const letters = text.split("");
    const visibleCount = letters.filter((c) => c !== " ").length;
    const framesPerChar = 8;
    const totalFrames = visibleCount * framesPerChar;

    function runScramble(startDelay: number) {
      return setTimeout(() => {
        let frame = 0;
        const id = setInterval(() => {
          let resolved = 0;
          setDisplay(
            letters
              .map((char) => {
                if (char === " ") return " ";
                if (resolved < Math.floor(frame / framesPerChar)) { resolved++; return char; }
                resolved++;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );
          frame++;
          if (frame > totalFrames) {
            clearInterval(id);
            setDisplay(text);
          }
        }, 45);
      }, startDelay);
    }

    const el = ref.current;
    if (!el) return;

    let firstRun: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        firstRun = runScramble(delay);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(firstRun);
    };
  }, [text, delay]);

  return <span ref={ref}>{display}</span>;
}

/* ─── 데이터 ─────────────────────────────────────────────── */
const pillars = [
  {
    num: "01",
    title: "Think",
    sub: "Problem Discovery",
    desc: "시장의 데이터와 사용자 행동을 분석하여 진짜 문제를 발견합니다.",
  },
  {
    num: "02",
    title: "Mind",
    sub: "Product Strategy",
    desc: "클라이언트의 비즈니스 모델에 진정성을 더해 제품의 코어를 설계합니다.",
  },
  {
    num: "03",
    title: "Behavior",
    sub: "Impact Solution",
    desc: "사용자의 경험(UX)을 유도하여 비즈니스 임팩트를 만들어내는 행동을 설계합니다.",
  },
];


const milestones = [
  {
    year: "2024",
    projects: ["동아 온북/두클래스", "한국 SGI SDGS 모바일 앱 제작", "대교 드림스/드림스 어드민 제작", "메이드인 헤븐 브랜드 리뉴얼", "여행서비스 캐릭터 YOMO 개발"],
  },
  {
    year: "2023",
    projects: ["아주대학교 MBA 고도화", "동아출판사 온북·두클래스 플랫폼 UI 개편", "LG사이언스파크 컬처워크 마케팅 디자인", "KT 환경DX플랫폼 고도화"],
  },
  {
    year: "2022",
    projects: ["KT 케이온 캐릭터 개발", "삼성전자 PDP 디자인", "메쉬코리아 그룹웨어 UI 디자인", "MG손해보험 영업포털 UI 디자인", "코스콤 체크 Mobile APP"],
  },
  {
    year: "2021",
    projects: ["삼성서울병원 APP", "부동산114 웹사이트", "풀무원 GAP 영농일지 APP", "KT헬스 MyData 플랫폼 디자인", "신한은행 Easy 금융플랫폼 디자인"],
  },
  {
    year: "2019",
    projects: ["용진씽크빅 AI 캐릭터 개발", "K쇼핑 모바일라이브 APP", "KBS 아카이브 UI 디자인", "신한카드 SOL 가감승제 APP", "KMDB 한국영화 데이터베이스 리뉴얼"],
  },
  {
    year: "2018",
    projects: ["바이너스프레드 공식사이트 오픈", "한국타이어 글로벌 세일즈 가이드", "삼성전자 글로벌 세일즈 키비주얼", "KOSCOM BC_Platform 디자인"],
  },
];

const companyInfo = [
  { label: "Company", value: "주식회사 바이너스프레드" },
  { label: "CEO", value: "한성영" },
  { label: "Business No.", value: "305-86-09778" },
  { label: "Founded", value: "2011년 03월" },
  { label: "Tel / Fax", value: "02-3661-1907 / 02-3661-1906" },
  { label: "Address", value: "서울 강서구 공항대로 227 (마곡센트럴타워1차) 1202호" },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function AboutPage() {
  const s02Ref = useReveal();
  const s03Ref = useReveal();
  const s04Ref = useReveal();
  const s05Ref = useReveal();

  return (
    <main className="bg-white">

      {/* ══════════════════════════════════════════════════════
          01. HERO — PageHeader (다른 페이지와 동일)
      ══════════════════════════════════════════════════════ */}
      <PageHeader
        breadcrumb="About"
        title={
          <>
            Beyond Design,
            <br />
            <span className="font-bold">We Manage</span> the Product.
          </>
        }
        description={
          <PageHeaderDescription
            en="We diagnose business problems and design optimal product strategies for growth."
            ko="단순히 예쁜 화면을 만드는 에이전시가 아닙니다. 바이너스프레드는 비즈니스 문제를 진단하고, 성장을 위한 최적의 제품 전략을 설계하는 프로덕트 매니저 그룹입니다."
          />
        }
      />

      {/* ══════════════════════════════════════════════════════
          CHAPTER BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="px-page-padding py-[48px] md:py-[80px] overflow-hidden">
        <p
          className="font-inter font-normal uppercase leading-[0.9] tracking-[-0.04em] text-mine-shaft"
          style={{ fontSize: "clamp(72px, 13vw, 200px)" }}
        >
          {["We Make", "Your Ideas", "Visible."].map((line, i) => (
            <span key={i} className="block whitespace-nowrap">
              <ScrambleLine text={line} delay={i * 180} />
            </span>
          ))}
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════
          02. METHODOLOGY
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s02Ref as any}
        className="anim-wrap px-page-padding py-[80px] md:py-[120px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: sticky label + heading */}
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-6 md:gap-12">
            <SectionLabel><Clip>Methodology</Clip></SectionLabel>
            <h2 className="display-heading">
              <Clip delay={40}>Our</Clip>
              <Clip delay={80}>Approach.</Clip>
            </h2>
          </div>

          {/* Right: 3-pillars grid */}
          <div className="flex flex-col">
            {pillars.map(({ num, title, sub, desc }, i) => (
              <div
                key={num}
                className="py-[28px] md:py-[40px] flex flex-col gap-4 md:gap-6 border-b border-alto"
              >
                <p className="section-label opacity-30">
                  <Clip delay={i * 60}>{num}</Clip>
                </p>
                <div className="flex flex-col gap-2">
                  <p className="display-heading !text-[32px]">
                    <Clip delay={i * 60 + 60}>{title}</Clip>
                  </p>
                  <p className="section-label opacity-40">
                    <Clip delay={i * 60 + 90}>{sub}</Clip>
                  </p>
                </div>
                <p className="body-text-ko">
                  <Clip delay={i * 60 + 120}>{desc}</Clip>
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          03. PERSPECTIVE (dark)
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s03Ref as any}
        className="anim-wrap relative px-page-padding py-[100px] md:py-[160px] overflow-hidden"
      >
        {/* BG image */}
        <img
          src="/images/about_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110"
          data-pin-nopin="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mine-shaft/80 via-mine-shaft/40 to-mine-shaft/90" />

        <div className="relative z-10 flex flex-col gap-14">
          <blockquote
            className="font-inter font-bold leading-[1.0] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(28px, 6vw, 72px)" }}
          >
            <span className="block text-white/25">우리가 만드는 것은</span>
            <span className="block text-white/25">화면이 아닙니다.</span>
            <span className="block h-4" />
            <span className="block">사람들이 기억하는</span>
            <span className="block">경험입니다.</span>
          </blockquote>
          <div className="flex flex-col gap-8">
            <p className="body-text !text-white/50 max-w-[600px]">
              디자인의 목적은 아름다움이 아닙니다. 사용자가 원하는 것을 직관적으로 찾고,
              브랜드가 전달하고자 하는 가치를 자연스럽게 느끼게 만드는 것입니다.
            </p>
            <ArrowLink href="/contact" className="!text-white w-fit">Work with us</ArrowLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          04. HISTORY — left: header+stats / right: year grid
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s04Ref as any}
        className="anim-wrap px-page-padding py-[80px] md:py-[120px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: sticky label + heading + stats */}
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-6 lg:gap-12">
            <SectionLabel><Clip>Expertise</Clip></SectionLabel>
            <h2 className="display-heading">
              <Clip delay={40}>Vinuspread</Clip>
              <Clip delay={80}>Left Its Mark.</Clip>
            </h2>
            <p className="body-text !text-mine-shaft/60">
              <Clip delay={100}>Since 2011, we&apos;ve partnered with Korea&apos;s leading brands</Clip>
              <Clip delay={140}>to deliver over 200 digital products.</Clip>
            </p>
          </div>

          {/* Right: 2-col year grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0 border-t border-alto">
            {milestones.map(({ year, projects }, i) => (
              <div key={year} className="py-[40px] md:py-[60px] flex flex-col gap-4 md:gap-6 border-b border-alto">
                <p className="display-heading !text-[40px]">
                  <Clip delay={i * 40}>{year}</Clip>
                </p>
                <ul className="flex flex-col gap-2">
                  {projects.map((proj, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-mine-shaft/20 shrink-0" />
                      <p className="body-text-ko !text-[16px]"><Clip delay={i * 40 + 60 + j * 12}>{proj}</Clip></p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          05. COMPANY
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s05Ref as any}
        className="anim-wrap bg-mine-shaft px-page-padding py-[80px] md:py-[120px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start">

          {/* Left: heading */}
          <div className="flex flex-col gap-10">
            <h2 className="display-heading !text-white">
              Contact<br />Details
            </h2>
            <p className="body-text !text-white/40">
              바이너스프레드의 공식 연락처 및<br />회사 정보입니다.
            </p>
            <ArrowLink href="/contact" className="!text-white w-fit">Get in touch</ArrowLink>
          </div>

          {/* Right: info rows */}
          <div className="flex flex-col gap-6 md:gap-10 pt-4">
            {companyInfo.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline border-b border-white/5 pb-4 last:border-0">
                <div className="sm:col-span-3">
                  <p className="text-[16px] md:text-[18px] text-white font-normal leading-relaxed">{label}</p>
                </div>
                <div className="sm:col-span-9">
                  <p className="text-[16px] md:text-[18px] text-white/60 font-normal leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
