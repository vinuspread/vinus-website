// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 GSAP 타임라인 싱글톤.
//
// 타이밍 흐름:
//   click → IN (오버레이 덮음) → push() → 로고 페이드인 → [페이지 로드]
//   → useEffect([pathname]) → onNavigated() → 로고 페이드아웃 → OUT
//
// OUT을 pathname useEffect 기반으로 하는 이유:
//   router.push()는 React concurrent renderer를 통해 비동기 처리됨.
//   실제 새 페이지가 DOM에 커밋되는 시점은 useEffect([pathname]) 실행 후뿐.
//   그 이전에 OUT을 시작하면 구 페이지가 노출되어 깜박임 발생.
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
    // IN 완료 후 로고 등장 — 페이지 로드 시간을 자연스럽게 흡수
    .to(logoEl, { opacity: 1, duration: LOGO_FADE_IN, ease: "power2.out", delay: 0.05 })
}

/**
 * PageTransition의 useEffect([pathname])에서 호출.
 * = 새 페이지가 실제 DOM에 커밋된 후 — OUT 시작의 신뢰할 수 있는 시점.
 */
export function onNavigated() {
  if (!outPending || !overlayEl) return
  outPending = false

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!overlayEl) return

      // 로고 페이드아웃 후 오버레이 OUT
      if (logoEl) {
        gsap.killTweensOf(logoEl)
        gsap.to(logoEl, { opacity: 0, duration: LOGO_FADE_OUT, ease: "power2.in" })
      }

      gsap.to(overlayEl, {
        scaleY: 0,
        transformOrigin: "top",
        duration: OUT_DURATION,
        ease: "power4.in",
        delay: LOGO_FADE_OUT,  // 로고가 완전히 사라진 후 OUT 시작
      })
    })
  })
}
