import { animate, cubicBezier, remove } from 'animejs'
import { Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { shouldReduceEffects } from '@/utils/performance'

export type PresentationDeckVideo = {
  filename: string
  label: string
  size: number
  src: string
}

export type PresentationDeckSlide = {
  image: string
  index: number
  label: string
  videos?: PresentationDeckVideo[]
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
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const reduceEffects = shouldReduceEffects()
  const videos = currentSlide.videos ?? []
  const activeVideo = videos[activeVideoIndex] ?? null

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

  useEffect(() => {
    setIsVideoOpen(false)
    setActiveVideoIndex(0)
  }, [currentSlide.index])

  useEffect(() => {
    if (!isVideoOpen) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isVideoOpen])

  const formatVideoSize = (size: number) => {
    if (size >= 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024 * 1024)).toFixed(1)} Go`
    }
    return `${Math.round(size / (1024 * 1024))} Mo`
  }

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
          aria-label="Planche précédente"
          className="absolute bottom-24 left-0 top-0 z-20 hidden w-[10vw] min-w-[84px] lg:block"
          onClick={onPrevious}
          type="button"
        />
        <button
          aria-label="Planche suivante"
          className="absolute bottom-24 right-0 top-0 z-20 hidden w-[10vw] min-w-[84px] lg:block"
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

          {videos.length > 0 ? (
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
              {videos.length > 1 ? (
                <div className="hidden rounded-sm border border-white/10 bg-space/72 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust sm:block">
                  {videos.length} médias
                </div>
              ) : null}
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-lime-300/24 bg-lime-300/10 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-lunar transition-colors hover:bg-lime-300/18"
                onClick={(event) => {
                  event.stopPropagation()
                  setIsVideoOpen(true)
                }}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                type="button"
              >
                <Play className="h-4 w-4" />
                <span>Lire la vidéo</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {isVideoOpen && activeVideo ? (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/88 px-3 py-3 backdrop-blur-sm sm:px-6"
          onClick={() => setIsVideoOpen(false)}
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
        >
          <div
            className="relative w-full max-w-6xl rounded-sm border border-white/10 bg-space/96 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Fermer la vidéo"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 bg-black/72 text-lunar transition-colors hover:bg-white/10"
              onClick={() => setIsVideoOpen(false)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-5">
              <div className="overflow-hidden rounded-sm border border-white/10 bg-black">
                <video
                  autoPlay
                  className="aspect-video w-full bg-black"
                  controls
                  preload="metadata"
                  src={activeVideo.src}
                />
              </div>

              <div className="flex flex-col gap-3 rounded-sm border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-lime-300">
                  Vidéo intégrée
                </p>
                <h3 className="text-xl uppercase leading-tight text-lunar">{currentSlide.label}</h3>
                <p className="text-sm leading-7 text-lunar/76">{activeVideo.filename}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                  {formatVideoSize(activeVideo.size)}
                </p>

                {videos.length > 1 ? (
                  <div className="grid gap-2 pt-2">
                    {videos.map((video, index) => {
                      const isActive = index === activeVideoIndex
                      return (
                        <button
                          className={`rounded-sm border px-3 py-2 text-left transition-colors ${
                            isActive
                              ? 'border-lime-300/28 bg-lime-300/10 text-lunar'
                              : 'border-white/10 bg-white/[0.03] text-lunar/78 hover:bg-white/[0.06]'
                          }`}
                          key={video.src}
                          onClick={() => setActiveVideoIndex(index)}
                          type="button"
                        >
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
                            {video.label}
                          </p>
                          <p className="mt-1 text-sm">{video.filename}</p>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SlideView
