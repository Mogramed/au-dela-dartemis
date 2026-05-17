import { ArrowLeft, ArrowRight, LayoutGrid, MonitorPlay } from 'lucide-react'
import type { PresentationDeckSlide } from '@/components/presentation/SlideView'

type KeyboardControlsProps = {
  currentLabel: string
  index: number
  onJump: (index: number) => void
  onNext: () => void
  onToggleThumbnails: () => void
  onPrevious: () => void
  showThumbnails: boolean
  slides: PresentationDeckSlide[]
  total: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function KeyboardControls({
  currentLabel,
  index,
  onJump,
  onNext,
  onToggleThumbnails,
  onPrevious,
  showThumbnails,
  slides,
  total,
}: KeyboardControlsProps) {
  const previewCount = Math.min(5, total)
  const previewStart = clamp(index - Math.floor(previewCount / 2), 0, Math.max(total - previewCount, 0))
  const previewSlides = slides.slice(previewStart, previewStart + previewCount)

  return (
    <div className="px-3 pb-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1720px] rounded-sm border border-white/10 bg-space/92 p-2.5 shadow-hud backdrop-blur-xl sm:p-3">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <div className="min-w-0 rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                  Deck
                </p>
                <p className="mt-1.5 truncate text-sm uppercase text-lunar">{currentLabel}</p>
              </div>

              <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-dust sm:block">
                Fleches / espace / swipe
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.03] text-lunar transition-colors hover:bg-white/[0.08]"
                onClick={onPrevious}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.03] text-lunar transition-colors hover:bg-white/[0.08]"
                onClick={onNext}
                type="button"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                aria-pressed={showThumbnails}
                className={`inline-flex min-h-9 items-center gap-2 border px-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  showThumbnails
                    ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                    : 'border-white/10 bg-white/[0.03] text-lunar hover:bg-white/[0.08]'
                }`}
                onClick={onToggleThumbnails}
                type="button"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Planches</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MonitorPlay className="h-4 w-4 text-lime-300" />
            <div className="h-1 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
              <div
                className="h-full bg-gradient-to-r from-ice via-lime-300 to-lunar transition-[width] duration-500"
                style={{ width: `${total === 0 ? 0 : ((index + 1) / total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {showThumbnails ? (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {previewSlides.map((slide) => {
                const isActive = slide.index === index

                return (
                  <button
                    className={`group relative min-w-[118px] overflow-hidden rounded-sm border text-left transition-colors ${
                      isActive
                        ? 'border-lime-300/28 bg-lime-300/[0.07]'
                        : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                    key={slide.image}
                    onClick={() => onJump(slide.index)}
                    type="button"
                  >
                    <img
                      alt={slide.label}
                      className="h-12 w-full object-cover sm:h-14"
                      loading="lazy"
                      src={slide.image}
                    />
                    <div className="border-t border-white/10 px-3 py-1.5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                        {slide.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default KeyboardControls
