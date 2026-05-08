import { useEffect, useRef } from 'react'

// rootMargin '0px 0px -12% 0px':
// 뷰포트 하단을 12% 축소 → 카드 상단이 하단에서 12% 안으로 들어왔을 때 트리거
export function useReveal(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.querySelectorAll<HTMLElement>('[data-delay]').forEach((child) => {
      const delayMs = child.getAttribute('data-delay') || '0'
      child.style.transitionDelay = `${delayMs}ms`
    })

    // double RAF: 브라우저가 초기 상태(translateY(110%))를 먼저 페인트한 뒤
    // observer를 등록해야 transition이 정상 재생됨
    let raf1: number
    let raf2: number

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add('ready')
              obs.disconnect()
            }
          },
          { threshold: 0, rootMargin }
        )
        obs.observe(el)
      })
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [rootMargin])

  return ref
}
