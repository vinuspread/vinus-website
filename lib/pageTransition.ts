// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 GSAP 타임라인 싱글톤.
//
// 설계 원칙:
//   · IN + navigate: GSAP 타임라인 — IN 완료 시 push() 정확히 호출
//   · OUT 트리거:    React useEffect([pathname]) — 새 페이지 DOM 커밋 후에만 발동
//     → router.push()는 비동기(React concurrent). 실제 DOM 반영 시점을
//       useEffect([pathname]) 없이는 알 수 없으므로 이것만이 신뢰할 수 있는 신호.
//   · outPending 플래그로 spurious OUT 방지 (초기 로드·중복 클릭 등)
//   · tl.kill()로 진행 중 전환을 즉시 취소 후 새 전환 시작
//
// 사용법:
//   PageTransition.tsx  → setOverlay / revealOnLoad / onNavigated
//   TransitionLink.tsx  → transition(() => router.push(href))
// ─────────────────────────────────────────────────────────────────────────────

import { gsap } from "@/lib/gsap"

const IN_DURATION  = 0.50  // expo.out  — 아래서 올라와 화면 덮음
const OUT_DURATION = 0.75  // power4.in — 위로 쓸려나감 (slow start → fast sweep)

let overlayEl: HTMLElement | null = null
let tl: gsap.core.Timeline | null = null
let outPending = false   // navigate 후 pathname useEffect를 기다리는 상태

/** PageTransition 마운트 시 호출 */
export function setOverlay(el: HTMLElement | null) {
  overlayEl = el
}

/** 최초 페이지 진입 시 오버레이 위로 퇴장 */
export function revealOnLoad() {
  if (!overlayEl) return
  outPending = false
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
 * IN 애니메이션 완료 시 push() 호출 → outPending = true
 * 실제 OUT은 onNavigated()가 담당 (React useEffect([pathname]) 후 호출됨)
 */
export function transition(push: () => void) {
  if (!overlayEl) { push(); return }

  tl?.kill()
  outPending = false

  const scaleY = gsap.getProperty(overlayEl, "scaleY") as number

  if (scaleY >= 0.99) {
    // 이미 화면을 덮고 있음: 즉시 이동, pathname 변경 후 OUT
    push()
    outPending = true
    return
  }

  tl = gsap.timeline()
    .set(overlayEl, { transformOrigin: "bottom" })
    .to(overlayEl, { scaleY: 1, duration: IN_DURATION, ease: "expo.out" })
    .call(() => {
      push()          // IN 완료 시점에 정확히 navigate
      outPending = true
    })
}

/**
 * PageTransition의 useEffect([pathname]) 에서 호출.
 * = 새 페이지가 실제 DOM에 커밋된 후 — OUT 시작의 유일한 신뢰할 수 있는 시점.
 */
export function onNavigated() {
  if (!outPending || !overlayEl) return
  outPending = false

  // 브라우저가 새 페이지를 실제로 그릴 때까지 2프레임 대기 후 OUT
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!overlayEl) return
      gsap.to(overlayEl, {
        scaleY: 0,
        transformOrigin: "top",
        duration: OUT_DURATION,
        ease: "power4.in",
      })
    })
  })
}
