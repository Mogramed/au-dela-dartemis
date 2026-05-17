import { MonitorPlay, Pause, Play, RotateCcw, Sparkles, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import ModelFallback from '@/components/three/ModelFallback'
import RoverScene from '@/components/three/RoverScene'
import { hotspots } from '@/data/hotspots'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useViewerStore, type ViewerFocusMode, type ViewerMode } from '@/stores/viewerStore'
import { assetPaths } from '@/utils/assetPaths'
import { shouldPreferLiteViewer } from '@/utils/performance'

const viewerModes: { label: string; value: ViewerMode }[] = [
  { label: 'Exterieur', value: 'exterior' },
  { label: 'Interieur', value: 'interior' },
  { label: 'Chassis', value: 'chassis' },
  { label: 'Details', value: 'details' },
  { label: 'Cinematique', value: 'cinematic' },
]

const focusModes: {
  description: string
  label: string
  value: ViewerFocusMode
}[] = [
  {
    label: 'Lecture',
    value: 'normal',
    description: 'Vue complete sans filtrage.',
  },
  {
    label: 'Accent',
    value: 'accent',
    description: 'La zone choisie ressort sans perdre le reste du vehicule.',
  },
  {
    label: 'Isoler',
    value: 'isolate',
    description: 'Garde seulement le module selectionne pour une lecture nette.',
  },
]

function ThreeDViewer() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const focusMode = useViewerStore((state) => state.focusMode)
  const mode = useViewerStore((state) => state.mode)
  const performanceMode = useViewerStore((state) => state.performanceMode)
  const resetNonce = useViewerStore((state) => state.resetNonce)
  const selectedHotspot = useViewerStore((state) => state.selectedHotspot)
  const setFocusMode = useViewerStore((state) => state.setFocusMode)
  const setMode = useViewerStore((state) => state.setMode)
  const resetView = useViewerStore((state) => state.resetView)
  const setPerformanceMode = useViewerStore((state) => state.setPerformanceMode)
  const setSelectedHotspot = useViewerStore((state) => state.setSelectedHotspot)
  const systemPrefersLiteViewer = shouldPreferLiteViewer()
  const effectivePerformanceMode = performanceMode || systemPrefersLiteViewer
  const [interactiveEnabled, setInteractiveEnabled] = useState(!systemPrefersLiteViewer)
  const [cinematicPaused, setCinematicPaused] = useState(false)
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
  const cinematicActive =
    interactiveEnabled && !effectivePerformanceMode && mode === 'cinematic'

  useEffect(() => {
    if (!systemPrefersLiteViewer) {
      setInteractiveEnabled(true)
    }
  }, [systemPrefersLiteViewer])

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
            eyebrow="MODULE 06 / Viewer 3D"
            title={siteContent.viewer.title}
          />
          <div className="flex flex-wrap items-center gap-3">
            {interactiveEnabled ? (
              <>
                <Button
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={() => setPerformanceMode(!performanceMode)}
                  variant={performanceMode ? 'solid' : 'ghost'}
                >
                  {performanceMode ? 'Mode performance actif' : 'Mode performance'}
                </Button>
                {cinematicActive ? (
                  <Button
                    icon={
                      cinematicPaused ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )
                    }
                    onClick={() => setCinematicPaused((value) => !value)}
                    variant="ghost"
                >
                  {cinematicPaused ? 'Relancer la sequence' : 'Mettre en pause'}
                </Button>
                ) : null}
                <Button icon={<RotateCcw className="h-4 w-4" />} onClick={resetView} variant="outline">
                  Recentrer la camera
                </Button>
              </>
            ) : (
              <Button
                icon={<MonitorPlay className="h-4 w-4" />}
                onClick={() => setInteractiveEnabled(true)}
                variant="solid"
              >
                Activer la 3D
              </Button>
            )}
          </div>
        </div>

        {systemPrefersLiteViewer && !performanceMode ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
            Profil mobile leger active pour garder une navigation fluide sur cet appareil.
          </p>
        ) : null}

        {cinematicActive ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-300/78">
            {cinematicPaused
              ? `Sequence en pause. Passage ${cinematicStep + 1} / ${cinematicSequence.length}.`
              : `Sequence cinematique active. Passage ${cinematicStep + 1} / ${cinematicSequence.length}.`}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="hud-panel overflow-hidden p-3 sm:p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {viewerModes.map((viewerMode) => (
                <button
                  className={`rounded-sm border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    mode === viewerMode.value && interactiveEnabled
                      ? 'border-lime-300/25 bg-lime-300/10 text-lunar'
                      : interactiveEnabled
                        ? 'border-white/10 bg-white/[0.03] text-dust hover:bg-white/[0.08] hover:text-lunar'
                        : 'border-white/6 bg-white/[0.02] text-dust/45'
                  }`}
                  disabled={!interactiveEnabled}
                  key={viewerMode.value}
                  onClick={() => setMode(viewerMode.value)}
                  type="button"
                >
                  {viewerMode.label}
                </button>
              ))}
            </div>

            {interactiveEnabled ? (
              <RoverScene
                focusMode={focusMode}
                cinematicActive={cinematicActive}
                cinematicPaused={cinematicPaused}
                mode={mode}
                onSelectHotspot={setSelectedHotspot}
                performanceMode={effectivePerformanceMode}
                resetNonce={resetNonce}
                selectedHotspot={selectedHotspot}
              />
            ) : (
              <div className="space-y-4">
                <ModelFallback
                  description="Sur smartphone, la vue archive reste la plus propre et la plus fluide. La 3D reste disponible a la demande."
                  poster={assetPaths.hero.exterior}
                  title="Vue archive"
                />
                <div className="flex flex-wrap gap-3">
                  <Button
                    icon={<MonitorPlay className="h-4 w-4" />}
                    onClick={() => setInteractiveEnabled(true)}
                    variant="solid"
                  >
                    Activer la vue 3D
                  </Button>
                  <Button href={siteContent.memoire.pdfUrl} variant="outline">
                    Voir le memoire
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            <HudCard eyebrow={activeHotspot.label} title={activeHotspot.title}>
              <p className="text-sm leading-7 text-lunar/78">{activeHotspot.description}</p>
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
