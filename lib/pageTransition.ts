// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 GSAP 타임라인 싱글톤.
// async/await·setTimeout 없이 GSAP 타임라인이 타이밍 전체를 책임집니다.
//
// 설계 원칙:
//   · 오버레이 DOM 참조를 모듈 변수로 보유 → React 리렌더와 무관하게 동작
//   · tl.kill() 으로 진행 중인 전환을 즉시 취소하고 새 전환 시작
//   · .call(push) 로 IN 완료 시점에 navigate 정확히 실행
//   · GSAP delay(0.2s) 로 새 페이지 렌더 대기 → pathname 변경 이벤트 불필요
//
// 사용법:
//   PageTransition  → setOverlay(el) / revealOnLoad()
//   TransitionLink  → transition(() => router.push(href))
// ─────────────────────────────────────────────────────────────────────────────

import { gsap } from "@/lib/gsap"

const IN_DURATION  = 0.50  // expo.out  — 아래서 올라와 화면 덮음
const OUT_DURATION = 0.75  // power4.in — 위로 쓸려나감 (slow start → fast sweep)
const OUT_DELAY    = 0.20  // navigate 후 새 페이지 렌더 대기

let overlayEl: HTMLElement | null = null
let tl: gsap.core.Timeline | null = null

/** PageTransition 마운트 시 오버레이 DOM 요소 등록 */
export function setOverlay(el: HTMLElement | null) {
  overlayEl = el
}

/** 최초 페이지 진입 시 오버레이를 위로 퇴장 */
export function revealOnLoad() {
  if (!overlayEl) return
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
 * - IN(아래→전체) → push() → OUT(전체→위)
 * - 이미 오버레이가 화면을 덮고 있으면 IN 생략하고 즉시 이동
 */
export function transition(push: () => void) {
  if (!overlayEl) { push(); return }

  // 진행 중인 전환 취소
  tl?.kill()

  const currentScaleY = gsap.getProperty(overlayEl, "scaleY") as number
  tl = gsap.timeline()

  if (currentScaleY >= 0.99) {
    // 이미 전체 화면 덮음: 즉시 이동 후 OUT
    push()
    tl.set(overlayEl, { transformOrigin: "top" })
      .to(overlayEl, { scaleY: 0, duration: OUT_DURATION, ease: "power4.in", delay: OUT_DELAY })
  } else {
    // 정상 흐름: IN → push → OUT
    tl.set(overlayEl, { transformOrigin: "bottom" })
      .to(overlayEl, { scaleY: 1, duration: IN_DURATION, ease: "expo.out" })
      .call(push)                                              // IN 완료 시점에 정확히 navigate
      .set(overlayEl, { transformOrigin: "top" })              // scaleY:1 상태 → 시각 변화 없음
      .to(overlayEl, { scaleY: 0, duration: OUT_DURATION, ease: "power4.in", delay: OUT_DELAY })
  }
}
