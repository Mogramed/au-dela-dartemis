import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function MissionScenario() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="scenario" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.scenario.description}
            eyebrow="MODULE 11 / Scenario"
            title={siteContent.scenario.title}
          />
          <div className="grid gap-3">
            {siteContent.scenario.steps.map((step) => (
              <HudCard eyebrow="Usage flow" key={step} title={step} />
            ))}
          </div>
        </div>

        <div className="hud-panel grid-surface p-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-sm border border-white/10 bg-space-soft">
            <div className="absolute left-[16%] top-[12%] h-3 w-3 rounded-full bg-lime-300" />
            <div className="absolute left-[34%] top-[28%] h-3 w-3 rounded-full bg-lime-300" />
            <div className="absolute left-[56%] top-[48%] h-3 w-3 rounded-full bg-lime-300" />
            <div className="absolute left-[74%] top-[70%] h-3 w-3 rounded-full bg-lime-300" />
            <div className="absolute left-[87%] top-[84%] h-3 w-3 rounded-full bg-lime-300" />

            <svg
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M16 12 C24 20, 28 22, 34 28 S48 42, 56 48 68 59, 74 70 81 80, 87 84"
                pathLength="1"
                stroke="rgba(242, 242, 234, 0.45)"
                strokeDasharray="3 2"
                strokeWidth="0.6"
              />
            </svg>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="mono-copy">Trajectoire de mission</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-lunar/78">
                Une progression simple entre base, traversee, pause contemplative et retour,
                pour raconter le rover comme lieu de transition plutot que simple outil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionScenario
