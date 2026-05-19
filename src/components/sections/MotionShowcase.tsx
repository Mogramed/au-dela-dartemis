import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useIsMobile } from '@/hooks/useIsMobile'
import { shouldPreferLiteViewer } from '@/utils/performance'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const motionDriftX = [-22, 16, -14, 18, -10]
const motionDriftY = [8, -10, 12, -8, 6]
const accentOverlay = {
  ice: 'from-ice/20 via-transparent to-space/10',
  lime: 'from-lime-300/24 via-transparent to-space/12',
  sand: 'from-[#d9c8a6]/24 via-transparent to-space/12',
  lunar: 'from-lunar/16 via-transparent to-space/14',
} as const

function MotionShowcase() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [progress, setProgress] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const isMobile = useIsMobile()
  const systemPrefersLiteViewer = shouldPreferLiteViewer()
  const steps = siteContent.motion.steps

  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLElement => card instanceof HTMLElement,
    )

    if (cards.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length === 0) {
          return
        }

        const viewportAnchor = window.innerHeight * 0.48
        const nextActive = visibleEntries
          .slice()
          .sort((entryA, entryB) => {
            const centerA = entryA.boundingClientRect.top + entryA.boundingClientRect.height * 0.5
            const centerB = entryB.boundingClientRect.top + entryB.boundingClientRect.height * 0.5
            return Math.abs(centerA - viewportAnchor) - Math.abs(centerB - viewportAnchor)
          })[0]

        const rawIndex = Number((nextActive.target as HTMLElement).dataset.stepIndex ?? '0')
        setActiveStepIndex(Number.isNaN(rawIndex) ? 0 : rawIndex)
      },
      {
        rootMargin: '-30% 0px -38% 0px',
        threshold: [0.1, 0.24, 0.5, 0.74],
      },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [steps.length])

  useEffect(() => {
    const updateProgress = () => {
      const activeCard = cardRefs.current[activeStepIndex]

      if (!activeCard) {
        return
      }

      const rect = activeCard.getBoundingClientRect()
      const anchor = window.innerHeight * 0.58
      const localProgress = clamp(
        (anchor - rect.top) / Math.max(rect.height + window.innerHeight * 0.18, 1),
        0,
        1,
      )
      const denominator = Math.max(steps.length - 1, 1)
      const stepStart = activeStepIndex / denominator
      const stepSpan = 1 / denominator

      setStepProgress(localProgress)
      setProgress(clamp(stepStart + localProgress * stepSpan, 0, 1))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [activeStepIndex, steps.length])

  const activeStep = steps[activeStepIndex] ?? steps[0]
  const usePosterOnly = isMobile || systemPrefersLiteViewer
  const useCompactLayout = isMobile || systemPrefersLiteViewer
  const progressPercent = `${Math.round(progress * 100)}%`
  const activeMedia = activeStep.media
  const mediaTransform = useMemo(() => {
    const driftX = (motionDriftX[activeStepIndex] ?? 0) * (stepProgress - 0.5)
    const driftY = (motionDriftY[activeStepIndex] ?? 0) * (stepProgress - 0.5)
    const scale = usePosterOnly ? 1.015 + stepProgress * 0.028 : 1.02 + stepProgress * 0.035

    return `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`
  }, [activeStepIndex, stepProgress, usePosterOnly])

  const handleJumpToViewer = () => {
    document.getElementById('viewer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="shell-section section-anchor"
      id="motion"
      ref={(element) => {
        revealRef.current = element
      }}
    >
      <div className="section-inner space-y-10">
        <SectionTitle
          description={siteContent.motion.description}
          eyebrow="MODULE 01A / Lecture du projet"
          title={siteContent.motion.title}
        />

        {useCompactLayout ? (
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <article
                className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]"
                data-reveal-item
                key={step.title}
              >
                <div className="relative min-h-[220px] overflow-hidden bg-black sm:min-h-[320px]">
                  <img
                    alt={step.media.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={step.media.src}
                    style={{ objectPosition: step.media.objectPosition ?? 'center center' }}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
                      accentOverlay[step.accent]
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space via-space/14 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-sm border border-white/10 bg-space/68 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    {String(index + 1).padStart(2, '0')} / {steps.length}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                      {step.eyebrow}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-lunar/82">{step.media.caption}</p>
                  </div>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <h3 className="text-xl uppercase leading-tight text-lunar">{step.title}</h3>
                  <p className="text-sm leading-7 text-lunar/78">{step.description}</p>
                  <div className="rounded-sm border border-white/10 bg-black/18 px-3 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                      {step.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div className="hud-panel p-4 sm:p-5" data-reveal-item>
              <p className="mono-copy text-lime-300/90">Vue suivante</p>
              <p className="mt-3 text-sm leading-7 text-lunar/78">
                La maquette 3D permet ensuite d&apos;observer plus librement les volumes et les
                zones d&apos;usage du véhicule.
              </p>
              <div className="mt-4">
                <Button
                  icon={<ArrowDownRight className="h-4 w-4" />}
                  onClick={handleJumpToViewer}
                  variant="solid"
                >
                  Explorer la 3D
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[minmax(320px,0.74fr)_minmax(0,1.26fr)] xl:items-start">
            <div className="order-2 xl:order-1">
              <div className="grid gap-6">
                {steps.map((step, index) => {
                  const isActive = index === activeStepIndex

                  return (
                    <article
                      className={`flex min-h-[44vh] items-center sm:min-h-[56vh] lg:min-h-[72vh] xl:min-h-[92vh] ${index === steps.length - 1 ? 'pb-8' : ''}`}
                      data-step-index={index}
                      key={step.title}
                      ref={(element) => {
                        cardRefs.current[index] = element
                      }}
                    >
                      <HudCard
                        data-reveal-item
                        className={`w-full transition-colors duration-500 ${
                          isActive
                            ? 'border-lime-300/20 bg-lime-300/[0.06]'
                            : 'border-white/10 bg-white/[0.03]'
                        }`}
                        eyebrow={step.eyebrow}
                        footer={
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                              {step.note}
                            </p>
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        }
                        title={step.title}
                      >
                        <p className="max-w-xl text-sm leading-7 text-lunar/78">
                          {step.description}
                        </p>
                      </HudCard>
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="order-1 xl:order-2 xl:sticky xl:top-24 xl:h-[calc(100vh-7.5rem)]">
              <div className="hud-panel flex h-full flex-col p-4 sm:p-5" data-reveal-item>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mono-copy text-lime-300/90">Lecture du projet</p>
                    <p className="mt-2 text-lg uppercase leading-tight text-lunar">
                      {activeStep.title}
                    </p>
                  </div>
                  <div className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    {String(activeStepIndex + 1).padStart(2, '0')} /{' '}
                    {String(steps.length).padStart(2, '0')}
                  </div>
                </div>

                <div className="relative min-h-0 flex-1">
                  <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3">
                    <span className="rounded-sm border border-white/10 bg-black/38 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                      {activeStep.note}
                    </span>
                    <span className="rounded-sm border border-white/10 bg-black/38 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                      Avancement {progressPercent}
                    </span>
                  </div>

                  <div className="relative h-full min-h-[340px] overflow-hidden rounded-sm border border-white/10 bg-black sm:min-h-[420px] xl:min-h-0">
                    <img
                      alt={activeMedia.alt}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out"
                      loading="lazy"
                      src={activeMedia.src}
                      style={{
                        objectPosition: activeMedia.objectPosition ?? 'center center',
                        transform: mediaTransform,
                      }}
                    />

                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
                        accentOverlay[activeStep.accent]
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space via-space/10 to-black/12" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="max-w-md">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                          {activeStep.eyebrow}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-lunar/82">
                          {activeMedia.caption}
                        </p>
                      </div>
                      <div className="rounded-sm border border-white/10 bg-black/38 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                        Vue en cours
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
                    <div
                      className="h-full bg-gradient-to-r from-ice via-lime-300 to-lunar transition-[width] duration-300"
                      style={{ width: progressPercent }}
                    />
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {steps.map((step, index) => (
                      <button
                        className={`shrink-0 rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                          index === activeStepIndex
                            ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                            : 'border-white/10 bg-white/[0.03] text-dust hover:text-lunar'
                        }`}
                        key={step.title}
                        onClick={() =>
                          cardRefs.current[index]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          })
                        }
                        type="button"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      icon={<ArrowDownRight className="h-4 w-4" />}
                      onClick={handleJumpToViewer}
                      variant="solid"
                    >
                      Explorer la 3D
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MotionShowcase
