import { useEffect, useRef, useState } from 'react'

// Adds .is-in when the element scrolls into view. Elements already in view show immediately.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// True when the visitor has not asked their OS/browser for reduced motion.
export function useMotionAllowed() {
  const query = '(prefers-reduced-motion: reduce)'
  const [ok, setOk] = useState(() => !window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setOk(!mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return ok
}
