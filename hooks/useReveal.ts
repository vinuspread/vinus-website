import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.querySelectorAll<HTMLElement>('[data-delay]').forEach((child) => {
      const delayMs = child.getAttribute('data-delay') || '0'
      child.style.transitionDelay = `${delayMs}ms`
    })

    const trigger = () => {
      el.classList.add('ready')
      obs.disconnect()
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger() },
      { threshold: 0, rootMargin: '0px' }
    )
    obs.observe(el)

    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) trigger()
    })

    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
