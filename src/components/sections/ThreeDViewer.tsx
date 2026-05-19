import { Pause, Play, RotateCcw, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import RoverScene from '@/components/three/RoverScene'
import { hotspots } from '@/data/hotspots'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useViewerStore, type ViewerFocusMode, type ViewerMode } from '@/stores/viewerStore'

const viewerModes: { label: string; value: ViewerMode }[] = [
  { label: 'Extérieur', value: 'exterior' },
  { label: 'Intérieur', value: 'interior' },
  { label: 'Châssis', value: 'chassis' },
  { label: 'Détails', value: 'details' },
  { label: 'Cinématique', value: 'cinematic' },
]

const focusModes: {
  description: string
  label: string
  value: ViewerFocusMode
}[] = [
  {
    label: 'Lecture',
    value: 'normal',
    description: "Le véhicule reste visible dans son ensemble.",
  },
  {
    label: 'Accent',
    value: 'accent',
    description: 'La zone sélectionnée reste lisible sans couper le reste du véhicule.',
  },
  {
    label: 'Isoler',
    value: 'isolate',
    description: 'Isole la zone sélectionnée pour une lecture plus claire.',
  },
]

function ThreeDViewer() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const isMobile = useIsMobile()
  const focusMode = useViewerStore((state) => state.focusMode)
  const mode = useViewerStore((state) => state.mode)
  const resetNonce = useViewerStore((state) => state.resetNonce)
  const selectedHotspot = useViewerStore((state) => state.selectedHotspot)
  const setFocusMode = useViewerStore((state) => state.setFocusMode)
  const setMode = useViewerStore((state) => state.setMode)
  const resetView = useViewerStore((state) => state.resetView)
  const setSelectedHotspot = useViewerStore((state) => state.setSelectedHotspot)
  const [cinematicPaused, setCinematicPaused] = useState(false)
  const interactiveEnabled = true
  const cinematicSequence = useMemo(
    () => [
      'pressurized-door',
      'cockpit',
      'dashboard',
      'rear-lounge',
      'oxygen-tanks',
      'batteries',
      'thermal-system',
      'wheels',
      'chassis',
    ] as const,
    [],
  )
  const cinematicStep = Math.max(cinematicSequence.indexOf(selectedHotspot), 0)
  const cinematicActive = interactiveEnabled && mode === 'cinematic'

  useEffect(() => {
    if (!cinematicActive) {
      setCinematicPaused(false)
      return undefined
    }

    if (!cinematicSequence.includes(selectedHotspot)) {
      setSelectedHotspot(cinematicSequence[0])
      return undefined
    }

    if (cinematicPaused) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      const nextIndex = (cinematicStep + 1) % cinematicSequence.length
      setSelectedHotspot(cinematicSequence[nextIndex])
    }, 4800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [
    cinematicActive,
    cinematicPaused,
    cinematicSequence,
    cinematicStep,
    selectedHotspot,
    setSelectedHotspot,
  ])

  const activeHotspot =
    hotspots.find((hotspot) => hotspot.id === selectedHotspot) ?? hotspots[0]

  return (
    <section className="shell-section section-anchor" id="viewer" ref={revealRef}>
      <div className="section-inner space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            description={siteContent.viewer.description}
            eyebrow="MODULE 06 / Maquette 3D"
            title={siteContent.viewer.title}
          />
          <div className="flex flex-wrap items-center gap-3">
            {cinematicActive ? (
              <Button
                icon={
                  cinematicPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />
                }
                onClick={() => setCinematicPaused((value) => !value)}
                variant="ghost"
              >
                {cinematicPaused ? 'Relancer la séquence' : 'Mettre en pause'}
              </Button>
            ) : null}
            <Button icon={<RotateCcw className="h-4 w-4" />} onClick={resetView} variant="outline">
              Recentrer la caméra
            </Button>
          </div>
        </div>

        {cinematicActive ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-300/78">
            {cinematicPaused
              ? `Séquence en pause. Passage ${cinematicStep + 1} / ${cinematicSequence.length}.`
              : `Séquence guidée active. Passage ${cinematicStep + 1} / ${cinematicSequence.length}.`}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="hud-panel overflow-hidden p-3 sm:p-4">
            <div className="mb-3 flex flex-wrap gap-2 overflow-x-auto pb-1">
              {viewerModes.map((viewerMode) => (
                <button
                  className={`rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    mode === viewerMode.value
                      ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                      : 'border-white/10 bg-white/[0.03] text-dust hover:bg-white/[0.08] hover:text-lunar'
                  }`}
                  key={viewerMode.value}
                  onClick={() => setMode(viewerMode.value)}
                  type="button"
                >
                  {viewerMode.label}
                </button>
              ))}
            </div>

            <RoverScene
              focusMode={focusMode}
              cinematicActive={cinematicActive}
              cinematicPaused={cinematicPaused}
              mode={mode}
              onSelectHotspot={setSelectedHotspot}
              performanceMode={false}
              resetNonce={resetNonce}
              selectedHotspot={selectedHotspot}
            />
          </div>

          <div className="grid gap-4">
            <HudCard eyebrow={activeHotspot.label} title={activeHotspot.title}>
              <p className="text-sm leading-7 text-lunar/78">{activeHotspot.description}</p>
              {!isMobile ? (
                <div className="mt-5 space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    Mode de lecture
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusModes.map((item) => (
                      <button
                        className={`rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                          focusMode === item.value
                            ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                            : 'border-white/10 bg-white/[0.03] text-dust hover:bg-white/[0.08] hover:text-lunar'
                        }`}
                        key={item.value}
                        onClick={() => setFocusMode(item.value)}
                        type="button"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs leading-6 text-lunar/58">
                    {focusModes.find((item) => item.value === focusMode)?.description}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-sm border border-white/10 bg-white/[0.03] px-3 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    Mode tactile
                  </p>
                  <p className="mt-2 text-sm leading-6 text-lunar/76">
                    Rotation, zoom et sélection restent disponibles directement dans la vue.
                  </p>
                </div>
              )}
              <ul className="mt-4 space-y-3">
                {activeHotspot.details.map((detail) => (
                  <li className="flex items-start gap-3 text-sm leading-6 text-lunar/76" key={detail}>
                    <Zap className="mt-1 h-3.5 w-3.5 text-lime-300" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </HudCard>

            <HudCard eyebrow="Hotspots" title="Points de lecture">
              <div className="flex flex-wrap gap-2">
                {hotspots.map((hotspot) => (
                  <button
                    className={`rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      selectedHotspot === hotspot.id
                        ? 'border-lime-300/25 bg-lime-300/8 text-lunar'
                        : 'border-white/10 bg-white/[0.03] text-dust hover:text-lunar'
                    }`}
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot.id)}
                    type="button"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: hotspot.accentColor ?? '#c6ff3e' }}
                      />
                      <span>{hotspot.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </HudCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThreeDViewer
