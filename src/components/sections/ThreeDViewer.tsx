import { RotateCcw, Sparkles, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import RoverScene from '@/components/three/RoverScene'
import { hotspots } from '@/data/hotspots'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useViewerStore, type ViewerMode } from '@/stores/viewerStore'
import { shouldPreferLiteViewer } from '@/utils/performance'

const viewerModes: { label: string; value: ViewerMode }[] = [
  { label: 'Exterior', value: 'exterior' },
  { label: 'Interior', value: 'interior' },
  { label: 'Chassis', value: 'chassis' },
  { label: 'Details', value: 'details' },
  { label: 'Cinematic', value: 'cinematic' },
]

function ThreeDViewer() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const mode = useViewerStore((state) => state.mode)
  const performanceMode = useViewerStore((state) => state.performanceMode)
  const resetNonce = useViewerStore((state) => state.resetNonce)
  const selectedHotspot = useViewerStore((state) => state.selectedHotspot)
  const setMode = useViewerStore((state) => state.setMode)
  const resetView = useViewerStore((state) => state.resetView)
  const setPerformanceMode = useViewerStore((state) => state.setPerformanceMode)
  const setSelectedHotspot = useViewerStore((state) => state.setSelectedHotspot)
  const systemPrefersLiteViewer = shouldPreferLiteViewer()
  const effectivePerformanceMode = performanceMode || systemPrefersLiteViewer

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
            <Button
              icon={<Sparkles className="h-4 w-4" />}
              onClick={() => setPerformanceMode(!performanceMode)}
              variant={performanceMode ? 'solid' : 'ghost'}
            >
              {performanceMode ? 'Mode performance actif' : 'Mode performance'}
            </Button>
            <Button icon={<RotateCcw className="h-4 w-4" />} onClick={resetView} variant="outline">
              Reset camera
            </Button>
          </div>
        </div>

        {systemPrefersLiteViewer && !performanceMode ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
            Profil auto leger active pour garder une navigation fluide sur cet appareil.
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="hud-panel overflow-hidden p-3 sm:p-4">
            <div className="mb-3 flex flex-wrap gap-2">
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
              mode={mode}
              onSelectHotspot={setSelectedHotspot}
              performanceMode={effectivePerformanceMode}
              resetNonce={resetNonce}
              selectedHotspot={selectedHotspot}
            />
          </div>

          <div className="grid gap-4">
            <HudCard eyebrow={activeHotspot.label} title={activeHotspot.title}>
              <p className="text-sm leading-7 text-lunar/78">{activeHotspot.description}</p>
              <ul className="mt-4 space-y-3">
                {activeHotspot.details.map((detail) => (
                  <li className="flex items-start gap-3 text-sm leading-6 text-lunar/76" key={detail}>
                    <Zap className="mt-1 h-3.5 w-3.5 text-lime-300" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </HudCard>

            <HudCard eyebrow="Hotspots" title="Elements cliquables">
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
                    {hotspot.label}
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
