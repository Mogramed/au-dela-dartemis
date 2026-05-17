import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Download, LayoutGrid, X } from 'lucide-react'
import KeyboardControls from '@/components/presentation/KeyboardControls'
import SlideView, { type PresentationDeckSlide } from '@/components/presentation/SlideView'
import { siteContent } from '@/data/siteContent'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { usePresentationMode } from '@/hooks/usePresentationMode'
import { usePresentationStore } from '@/stores/presentationStore'

type PresentationManifest = {
  count: number
  slides: PresentationDeckSlide[]
}

function PresentationMode() {
  const [slides, setSlides] = useState<PresentationDeckSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [previousSlideIndex, setPreviousSlideIndex] = useState<number | null>(null)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const activeSlide = usePresentationStore((state) => state.activeSlide)
  const direction = usePresentationStore((state) => state.direction)
  const jumpToSlide = usePresentationStore((state) => state.jumpToSlide)
  const nextSlide = usePresentationStore((state) => state.nextSlide)
  const previousSlide = usePresentationStore((state) => state.previousSlide)
  const setSlideCount = usePresentationStore((state) => state.setSlideCount)
  const { openArchive } = usePresentationMode()
  const pointerStartXRef = useRef<number | null>(null)
  const lastSlideIndexRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    const loadManifest = async () => {
      try {
        const response = await fetch(siteContent.memoire.presentationManifestUrl, {
          cache: 'force-cache',
        })

        if (!response.ok) {
          throw new Error(`Manifest request failed with ${response.status}`)
        }

        const manifest = (await response.json()) as PresentationManifest

        if (cancelled) {
          return
        }

        setSlides(manifest.slides ?? [])
        setSlideCount(manifest.count ?? manifest.slides?.length ?? 0)
        setLoadError(null)
      } catch (error) {
        if (!cancelled) {
          setLoadError('Impossible de charger la presentation integree.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadManifest()

    return () => {
      cancelled = true
    }
  }, [setSlideCount])

  useEffect(() => {
    if (slides.length === 0) {
      return
    }

    const previousIndex = lastSlideIndexRef.current

    if (previousIndex !== activeSlide) {
      setPreviousSlideIndex(previousIndex)
      lastSlideIndexRef.current = activeSlide

      const timeout = window.setTimeout(() => setPreviousSlideIndex(null), 720)
      return () => window.clearTimeout(timeout)
    }

    return undefined
  }, [activeSlide, slides.length])

  useEffect(() => {
    if (slides.length === 0) {
      return
    }

    ;[activeSlide - 1, activeSlide, activeSlide + 1, activeSlide + 2].forEach((index) => {
      const slide = slides[index]

      if (!slide) {
        return
      }

      const image = new Image()
      image.src = slide.image
    })
  }, [activeSlide, slides])

  useKeyboardNavigation({
    onEscape: openArchive,
    onNext: nextSlide,
    onPrevious: previousSlide,
  })

  const currentSlide = slides[activeSlide] ?? null
  const previousSlideAsset =
    previousSlideIndex == null ? null : slides[previousSlideIndex] ?? null

  const presentationLabel = useMemo(() => {
    return currentSlide?.label ?? 'Presentation'
  }, [currentSlide?.label])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartXRef.current = event.clientX
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const startX = pointerStartXRef.current

    if (startX == null) {
      return
    }

    const deltaX = event.clientX - startX
    pointerStartXRef.current = null

    if (Math.abs(deltaX) < 56) {
      return
    }

    if (deltaX < 0) {
      nextSlide()
      return
    }

    previousSlide()
  }

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-space text-lunar">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="hud-panel max-w-xl p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-300">
              Planches du projet
            </p>
            <p className="mt-4 text-2xl uppercase leading-tight">Chargement des planches</p>
            <p className="mt-4 text-sm leading-7 text-lunar/74">
              Les planches du projet sont chargees dans un mode de lecture web.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentSlide || loadError) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-space text-lunar">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="hud-panel max-w-xl p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-300">
              Planches du projet
            </p>
            <p className="mt-4 text-2xl uppercase leading-tight">Lecture indisponible</p>
            <p className="mt-4 text-sm leading-7 text-lunar/74">
              {loadError ??
                "Les planches n'ont pas pu etre chargees dans le site. Le fichier source reste toutefois telechargeable depuis l'archive."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#040404] text-lunar"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="relative z-10 grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto]">
        <header className="px-3 pt-3 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="min-w-0 rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                Mode de lecture
              </p>
              <p className="mt-1.5 truncate text-sm uppercase text-lunar sm:text-base">
                {presentationLabel}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
              <button
                aria-pressed={showThumbnails}
                className={`inline-flex min-h-9 items-center gap-2 border px-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  showThumbnails
                    ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                    : 'border-white/10 bg-white/[0.03] text-lunar hover:bg-white/[0.08]'
                }`}
                onClick={() => setShowThumbnails((current) => !current)}
                type="button"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Planches</span>
              </button>
              <a
                className="inline-flex min-h-9 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-lunar transition-colors hover:bg-white/[0.08]"
                href={siteContent.memoire.presentationUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Download className="h-4 w-4" />
                <span>Fichier source</span>
              </a>
              <button
                className="inline-flex min-h-9 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-lunar transition-colors hover:bg-white/[0.08]"
                onClick={openArchive}
                type="button"
              >
                <X className="h-4 w-4" />
                <span>Retour au projet</span>
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-0 px-3 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto h-full max-w-[1720px]">
            <SlideView
              currentSlide={currentSlide}
              direction={direction}
              onNext={nextSlide}
              onPrevious={previousSlide}
              previousSlide={previousSlideAsset}
            />
          </div>
        </div>

        <KeyboardControls
          currentLabel={presentationLabel}
          index={activeSlide}
          onJump={jumpToSlide}
          onNext={nextSlide}
          onToggleThumbnails={() => setShowThumbnails((current) => !current)}
          onPrevious={previousSlide}
          showThumbnails={showThumbnails}
          slides={slides}
          total={slides.length}
        />
      </div>
    </div>
  )
}

export default PresentationMode
