"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { PageHeader } from "@/components/common/PageHeader";

/* ─── Clip 헬퍼 ─────────────────────────────────────────── */
function Clip({ children, delay }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <span className="anim-move-up block" data-delay={delay ?? 0}>
        {children}
      </span>
    </span>
  );
}

/* ─── 데이터 ─────────────────────────────────────────────── */
const pillars = [
  {
    num: "01",
    title: "Think",
    sub: "Problem Discovery",
    desc: "시장의 데이터와 사용자 행동을 분석하여 진짜 문제를 발견합니다.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    num: "02",
    title: "Mind",
    sub: "Product Strategy",
    desc: "클라이언트의 비즈니스 모델에 진정성을 더해 제품의 코어를 설계합니다.",
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    num: "03",
    title: "Behavior",
    sub: "Impact Solution",
    desc: "사용자의 경험(UX)을 유도하여 비즈니스 임팩트를 만들어내는 행동을 설계합니다.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop&auto=format&q=80",
  },
];

const stats = [
  { n: "15+", l: "Years of Experience" },
  { n: "200+", l: "Projects Delivered" },
  { n: "60+", l: "Brand Partners" },
];

const milestones = [
  {
    year: "2024",
    projects: [
      "동아 온북/두클래스",
      "한국 SGI SDGS 모바일 앱 제작",
      "대교 드림스/드림스 어드민 제작",
      "메이드인 헤븐 브랜드 리뉴얼",
      "여행서비스 캐릭터 YOMO 개발",
    ],
  },
  {
    year: "2023",
    projects: [
      "아주대학교 MBA 고도화",
      "동아출판사 온북·두클래스 플랫폼 UI 개편",
      "LG사이언스파크 컬처워크 마케팅 디자인",
      "KT 환경DX플랫폼 고도화",
    ],
  },
  {
    year: "2022",
    projects: [
      "KT 케이온 캐릭터 개발",
      "삼성전자 PDP 디자인",
      "메쉬코리아 그룹웨어 UI 디자인",
      "MG손해보험 영업포털 UI 디자인",
      "코스콤 체크 Mobile APP",
    ],
  },
  {
    year: "2021",
    projects: [
      "삼성서울병원 APP",
      "부동산114 웹사이트",
      "풀무원 GAP 영농일지 APP",
      "KT헬스 MyData 플랫폼 디자인",
      "신한은행 Easy 금융플랫폼 디자인",
    ],
  },
  {
    year: "2019",
    projects: [
      "용진씽크빅 AI 캐릭터 개발",
      "K쇼핑 모바일라이브 APP",
      "KBS 아카이브 UI 디자인",
      "신한카드 SOL 가감승제 APP",
      "KMDB 한국영화 데이터베이스 리뉴얼",
    ],
  },
  {
    year: "2018",
    projects: [
      "바이너스프레드 공식사이트 오픈",
      "한국타이어 글로벌 세일즈 가이드",
      "삼성전자 글로벌 세일즈 키비주얼",
      "KOSCOM BC_Platform 디자인",
    ],
  },
];

const companyInfo = [
  { label: "회사명", value: "주식회사 바이너스프레드" },
  { label: "대표", value: "한성영" },
  { label: "사업자번호", value: "305-86-09778" },
  { label: "설립일자", value: "2011년 03월" },
  { label: "전화 / 팩스", value: "02-3661-1907 / 02-3661-1906" },
  { label: "주소", value: "서울 강서구 공항대로 227 (마곡센트럴타워1차) 1202호" },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function AboutPage() {
  const heroImgRef = useReveal();
  const s02Ref = useReveal();
  const s03Ref = useReveal();
  const s04Ref = useReveal();
  const s05Ref = useReveal();

  return (
    <main className="bg-white">

      {/* ══════════════════════════════════════════════════════
          01. HERO — PageHeader + Full-bleed Image
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
        description="단순히 예쁜 화면을 만드는 에이전시가 아닙니다. 바이너스프레드는 비즈니스 문제를 진단하고, 성장을 위한 최적의 제품 전략을 설계하는 프로덕트 매니저 그룹입니다."
      />

      {/* Full-bleed image */}
      <section
        ref={heroImgRef as any}
        className="anim-wrap w-full border-b border-alto"
      >
        <div className="w-full aspect-[16/7] relative overflow-hidden">
          <div className="anim-move-up-img w-full h-full relative">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=840&fit=crop&auto=format&q=80"
              alt="Vinuspread workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          02. METHODOLOGY — PM's 3-Pillars
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s02Ref as any}
        className="anim-wrap pt-[140px] pb-[120px] px-page-padding border-b border-alto"
      >
        {/* Section label + heading */}
        <div className="mb-[80px]">
          <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30 mb-8">
            <Clip>Methodology</Clip>
          </p>
          <h2 className="font-inter font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(52px,7.5vw,112px)]">
            <Clip delay={60}>PM's</Clip>
            <Clip delay={100}>3-Pillars</Clip>
          </h2>
        </div>

        {/* 3 pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-alto">
          {pillars.map(({ num, title, sub, desc, img }, i) => (
            <div
              key={num}
              className={`group flex flex-col${i < 2 ? " md:border-r border-alto" : ""}`}
            >
              {/* Image */}
              <div className="w-full aspect-[4/5] relative overflow-hidden">
                <div
                  className="anim-move-up-img w-full h-full relative"
                  data-delay={i * 80}
                >
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>

              {/* Text */}
              <div className="px-8 py-10 border-t border-alto flex flex-col gap-4">
                <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30">
                  <Clip delay={i * 80 + 60}>{num}</Clip>
                </p>
                <p className="font-inter font-bold leading-[0.9] tracking-[-0.04em] text-[40px]">
                  <Clip delay={i * 80 + 100}>{title}</Clip>
                </p>
                <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30">
                  <Clip delay={i * 80 + 130}>{sub}</Clip>
                </p>
                <div className="pt-4 border-t border-alto">
                  <p className="text-[15px] font-medium leading-[1.8] text-mine-shaft/50">
                    <Clip delay={i * 80 + 160}>{desc}</Clip>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          03. PERSPECTIVE — Decision Maker (Dark)
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s03Ref as any}
        className="anim-wrap bg-mine-shaft text-white border-b border-alto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — image */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <div className="anim-move-up-img w-full h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=960&h=960&fit=crop&auto=format&q=80"
                alt="Decision Maker"
                fill
                className="object-cover opacity-50"
              />
            </div>
          </div>

          {/* Right — text */}
          <div className="px-[80px] py-[100px] flex flex-col justify-center gap-12 min-h-[560px]">
            <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-white/30">
              <Clip>( Perspective )</Clip>
            </p>

            <blockquote className="font-inter font-bold leading-[0.9] tracking-[-0.04em] text-[clamp(32px,3.5vw,52px)] text-white">
              <Clip delay={60}>우리는 요구사항을</Clip>
              <Clip delay={110}>수집하지 않습니다.</Clip>
              <span className="block h-6" />
              <Clip delay={160}>비즈니스의</Clip>
              <Clip delay={200}>우선순위를</Clip>
              <Clip delay={240}>
                <span className="text-white/20">&apos;결정&apos;합니다.</span>
              </Clip>
            </blockquote>

            <div className="pt-10 border-t border-white/10">
              <p className="text-[15px] font-medium leading-[1.8] text-white/50 max-w-[520px]">
                <Clip delay={300}>
                  고객의 모든 요청을 수용하는 것이 최고의 결과는 아닙니다. 우리는
                  &apos;필요한 것&apos;과 &apos;버릴 것&apos;을 선별하고, 클라이언트의 고객이 가장 만족할 수 있는
                  최고의 방향성을 제시합니다.
                </Clip>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          04. EXPERTISE — Proven Product History
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s04Ref as any}
        className="anim-wrap pt-[160px] pb-[140px] px-page-padding border-b border-alto"
      >
        {/* Heading + sub */}
        <div className="mb-[80px]">
          <h2 className="font-inter font-bold leading-[0.9] tracking-[-0.04em] text-[clamp(52px,7.5vw,112px)] mb-6">
            <Clip delay={60}>결국은 사람이 합니다.</Clip>
          </h2>
          <p className="text-[17px] font-medium leading-[1.8] text-mine-shaft/50 max-w-[540px]">
            <Clip delay={140}>15년간 증명해 온 프로덕트 리드 역량.</Clip>
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-0 border-t border-alto mb-[80px]">
          {stats.map(({ n, l }, i) => (
            <div
              key={l}
              className={`py-12 pr-16${i > 0 ? " pl-16 border-l border-alto" : ""}`}
            >
              <p className="font-inter font-bold leading-none tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
                <Clip delay={i * 70}>{n}</Clip>
              </p>
              <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30 mt-3">
                <Clip delay={i * 70 + 50}>{l}</Clip>
              </p>
            </div>
          ))}
        </div>

        {/* Wide image */}
        <div className="w-full aspect-[16/6] relative overflow-hidden mb-[80px]">
          <div className="anim-move-up-img w-full h-full relative">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=720&fit=crop&auto=format&q=80"
              alt="Team at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Timeline — 6 items, 3 columns × 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-alto">
          {milestones.map(({ year, projects }, i) => (
            <div
              key={year}
              className={[
                "px-8 py-10 border-b border-alto",
                i % 3 < 2 ? " md:border-r border-alto" : "",
              ].join("")}
            >
              <p className="font-inter font-bold tracking-[-0.04em] text-[48px] leading-none mb-6">
                <Clip delay={i * 40}>{year}</Clip>
              </p>
              <ul className="flex flex-col gap-3">
                {projects.map((proj, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-mine-shaft/20 shrink-0" />
                    <p className="text-[13px] font-medium leading-[1.7] text-mine-shaft/50">
                      <Clip delay={i * 40 + 60 + j * 12}>{proj}</Clip>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          05. COMPANY INFORMATION
      ══════════════════════════════════════════════════════ */}
      <section
        ref={s05Ref as any}
        className="anim-wrap pt-[160px] pb-[140px] px-page-padding"
      >
        {/* Section label + heading */}
        <div className="mb-[80px]">
          <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30 mb-8">
            <Clip>( Company )</Clip>
          </p>
          <h2 className="font-inter font-bold leading-[0.9] tracking-[-0.04em] text-[clamp(52px,7.5vw,112px)]">
            <Clip delay={60}>신뢰의 지표</Clip>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-x-column">
          {/* Left — image + CTA */}
          <div className="md:col-span-3 flex flex-col gap-8 mb-16 md:mb-0">
            <div className="aspect-[3/4] relative overflow-hidden">
              <div className="anim-move-up-img w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&auto=format&q=80"
                  alt="Vinuspread office"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <div>
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay={200}>
                  <ArrowLink href="/contact">프로젝트 문의하기</ArrowLink>
                </span>
              </span>
            </div>
          </div>

          {/* Right — info table */}
          <div className="md:col-span-4 flex flex-col divide-y divide-alto border-t border-alto self-start">
            {companyInfo.map(({ label, value }, i) => (
              <div key={label} className="grid grid-cols-5 py-6 gap-x-6">
                <div className="col-span-2">
                  <p className="text-[11px] font-inter font-bold uppercase tracking-widest text-mine-shaft/30">
                    <Clip delay={i * 50}>{label}</Clip>
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-[15px] font-medium leading-[1.6] text-mine-shaft">
                    <Clip delay={i * 50 + 40}>{value}</Clip>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
