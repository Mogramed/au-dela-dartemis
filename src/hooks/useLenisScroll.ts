import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export const useLenisScroll = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent-wheel]')),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
    })

    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }

    frame = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [prefersReducedMotion])
}
