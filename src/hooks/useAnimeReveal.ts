import { useEffect, useRef } from 'react'
import { animate, cubicBezier, remove, stagger } from 'animejs'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { shouldReduceEffects } from '@/utils/performance'

const revealEase = cubicBezier(0.16, 1, 0.3, 1)

export const useAnimeReveal = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return undefined
    }

    const revealTargets = Array.from(
      element.querySelectorAll<HTMLElement>('[data-reveal-item]'),
    )
    const targets = revealTargets.length > 0 ? revealTargets : [element]

    if (prefersReducedMotion || shouldReduceEffects()) {
      targets.forEach((target) => {
        target.style.opacity = '1'
        target.style.transform = 'translateY(0px)'
      })
      return undefined
    }

    targets.forEach((target) => {
      target.style.opacity = '0'
      target.style.transform = 'translateY(14px)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) {
          return
        }

        animate(targets, {
          opacity: [0, 1],
          translateY: [14, 0],
          delay: revealTargets.length > 0 ? stagger(55) : 0,
          duration: 640,
          ease: revealEase,
        })

        observer.disconnect()
      },
      {
        threshold: 0.12,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      remove(targets)
    }
  }, [prefersReducedMotion])

  return ref
}
