// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 GSAP 타임라인 싱글톤.
//
// 타이밍 흐름:
//   click → IN → push() + outPending=true + 로고 페이드인 → [페이지 로드]
//   → useEffect([pathname]) fires → onNavigated() → tl.kill() → 로고 페이드아웃 → OUT
//
// OUT을 pathname useEffect 기반으로 하는 이유:
//   router.push()는 React concurrent renderer를 통해 비동기 처리됨.
//   useEffect([pathname])는 React가 새 페이지를 DOM에 커밋한 후 실행되므로
//   이것만이 "새 페이지 렌더 완료"를 신뢰할 수 있는 시점.
//
// 사용:
//   PageTransition.tsx → setOverlay / setLogo / revealOnLoad / onNavigated
//   TransitionLink.tsx → transition(() => router.push(href))
// ─────────────────────────────────────────────────────────────────────────────

import { gsap } from "@/lib/gsap"

const IN_DURATION   = 0.50  // expo.out  — 아래서 올라와 화면 덮음
const OUT_DURATION  = 0.75  // power4.in — 위로 쓸려나감
const LOGO_FADE_IN  = 0.35  // 로고 등장
const LOGO_FADE_OUT = 0.25  // 로고 퇴장

let overlayEl: HTMLElement | null = null
let logoEl: HTMLElement | null = null
let tl: gsap.core.Timeline | null = null
let outPending = false

export function setOverlay(el: HTMLElement | null) { overlayEl = el }
export function setLogo(el: HTMLElement | null)    { logoEl = el }

/** 최초 페이지 진입 시 오버레이 위로 퇴장 (로고 없음) */
export function revealOnLoad() {
  if (!overlayEl) return
  outPending = false
  if (logoEl) gsap.set(logoEl, { opacity: 0 })
  gsap.killTweensOf(overlayEl)
  gsap.to(overlayEl, {
    scaleY: 0,
    transformOrigin: "top",
    duration: OUT_DURATION,
    ease: "power4.in",
    delay: 0.10,
  })
}

/**
 * 페이지 전환 실행
 * · IN 완료 → push() + outPending=true + 로고 페이드인
 * · OUT는 onNavigated()가 담당 (pathname useEffect 후 호출)
 */
export function transition(push: () => void) {
  if (!overlayEl) { push(); return }

  tl?.kill()
  outPending = false

  const scaleY = gsap.getProperty(overlayEl, "scaleY") as number

  if (scaleY >= 0.99) {
    // 이미 화면을 덮고 있음: 즉시 이동
    push()
    outPending = true
    if (logoEl) gsap.to(logoEl, { opacity: 1, duration: LOGO_FADE_IN, ease: "power2.out" })
    return
  }

  tl = gsap.timeline()
    .set(overlayEl, { transformOrigin: "bottom" })
    .to(overlayEl, { scaleY: 1, duration: IN_DURATION, ease: "expo.out" })
    .call(() => {
      push()
      outPending = true
    })
    .to(logoEl, { opacity: 1, duration: LOGO_FADE_IN, ease: "power2.out", delay: 0.05 })
}

/**
 * PageTransition의 useEffect([pathname])에서 호출.
 * = 새 페이지가 실제 DOM에 커밋된 후 — OUT 시작의 신뢰할 수 있는 시점.
 */
export function onNavigated() {
  if (!outPending || !overlayEl) return
  outPending = false

  // refs를 지금 즉시 로컬 변수에 캡처.
  // rAF 등 비동기 콜백 실행 전 모듈 변수가 null로 바뀔 수 있으므로 반드시 필요.
  const overlay = overlayEl
  const logo = logoEl

  // 타임라인(로고 페이드인 포함) 종료 → GSAP 충돌 방지
  tl?.kill()
  tl = null

  // 로고 페이드아웃 + overlay OUT (동시 시작, OUT은 LOGO_FADE_OUT 후 시작)
  if (logo) {
    gsap.killTweensOf(logo)
    gsap.to(logo, { opacity: 0, duration: LOGO_FADE_OUT, ease: "power2.in" })
  }
  gsap.to(overlay, {
    scaleY: 0,
    transformOrigin: "top",
    duration: OUT_DURATION,
    ease: "power4.in",
    delay: LOGO_FADE_OUT,   // 로고가 완전히 사라진 후 overlay OUT 시작
  })
}
