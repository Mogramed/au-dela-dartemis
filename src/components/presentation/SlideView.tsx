import { animate, cubicBezier, remove } from 'animejs'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { shouldReduceEffects } from '@/utils/performance'

export type PresentationDeckSlide = {
  image: string
  index: number
  label: string
}

type SlideViewProps = {
  currentSlide: PresentationDeckSlide
  direction: -1 | 1
  onNext: () => void
  onPrevious: () => void
  previousSlide: PresentationDeckSlide | null
}

const slideEase = cubicBezier(0.16, 1, 0.3, 1)

function SlideView({
  currentSlide,
  direction,
  onNext,
  onPrevious,
  previousSlide,
}: SlideViewProps) {
  const currentFrameRef = useRef<HTMLDivElement | null>(null)
  const previousFrameRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const reduceEffects = shouldReduceEffects()

  useEffect(() => {
    const currentFrame = currentFrameRef.current
    const previousFrame = previousFrameRef.current

    if (!currentFrame || prefersReducedMotion || reduceEffects) {
      if (currentFrame) {
        currentFrame.style.opacity = '1'
        currentFrame.style.transform = 'translate3d(0, 0, 0) scale(1)'
      }

      if (previousFrame) {
        previousFrame.style.opacity = '0'
        previousFrame.style.transform = 'translate3d(0, 0, 0) scale(1)'
      }

      return undefined
    }

    const travel = direction > 0 ? 72 : -72
    animate(currentFrame, {
      opacity: [0, 1],
      scale: [0.992, 1],
      translateX: [travel * 0.38, 0],
      duration: 420,
      ease: slideEase,
    })

    if (previousFrame) {
      animate(previousFrame, {
        opacity: [0.22, 0],
        scale: [1, 1.004],
        translateX: [0, direction > 0 ? -18 : 18],
        duration: 320,
        ease: slideEase,
      })
    }

    return () => {
      remove([currentFrame, previousFrame].filter(Boolean))
    }
  }, [currentSlide.image, direction, prefersReducedMotion, reduceEffects])

  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      {previousSlide ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          ref={previousFrameRef}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              alt={previousSlide.label}
              className="max-h-full max-w-full object-contain"
              src={previousSlide.image}
            />
          </div>
        </div>
      ) : null}

      <div className="relative z-10 flex h-full min-h-0 items-center justify-center">
        <button
          aria-label="Slide precedente"
          className="absolute inset-y-0 left-0 z-20 hidden w-[10vw] min-w-[84px] lg:block"
          onClick={onPrevious}
          type="button"
        />
        <button
          aria-label="Slide suivante"
          className="absolute inset-y-0 right-0 z-20 hidden w-[10vw] min-w-[84px] lg:block"
          onClick={onNext}
          type="button"
        />

        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-black px-2 py-2 shadow-[0_44px_140px_rgba(0,0,0,0.38)] sm:px-4 sm:py-4 lg:px-5 lg:py-5"
          ref={currentFrameRef}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-0 border border-white/5" />
          <img
            alt={currentSlide.label}
            className="relative z-10 max-h-full max-w-full object-contain"
            src={currentSlide.image}
          />
        </div>
      </div>
    </div>
  )
}

export default SlideView
