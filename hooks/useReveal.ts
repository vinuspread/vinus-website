import { useEffect, useRef } from 'react'

export function useReveal(rootMargin = '-10% 0px') {
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
      { threshold: 0, rootMargin }
    )
    obs.observe(el)

    return () => obs.disconnect()
  }, [rootMargin])

  return ref
}
