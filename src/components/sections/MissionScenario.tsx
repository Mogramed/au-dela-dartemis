import AutoVideo from '@/components/ui/AutoVideo'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
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
              <HudCard eyebrow="Parcours" key={step} title={step} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="image-frame min-h-[260px]">
            <ScanLine />
            <AutoVideo
              className="h-full w-full object-cover"
              eager
              poster={siteContent.scenario.media.clip.poster}
              src={siteContent.scenario.media.clip.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="mono-copy text-lunar/90">{siteContent.scenario.media.clip.label}</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-lunar/78">
                Le passage de la base au rover ouvre un seuil entre temps de travail, retour au
                calme et reprise du regard sur le paysage.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
            <div className="hud-panel grid-surface p-6">
              <div className="relative min-h-[340px] overflow-hidden rounded-sm border border-white/10 bg-space-soft">
                <img
                  alt={siteContent.scenario.media.image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={siteContent.scenario.media.image.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/24 to-transparent" />
                <div className="absolute left-[16%] top-[18%] h-3 w-3 rounded-full bg-lime-300" />
                <div className="absolute left-[34%] top-[34%] h-3 w-3 rounded-full bg-lime-300" />
                <div className="absolute left-[56%] top-[54%] h-3 w-3 rounded-full bg-lime-300" />
                <div className="absolute left-[74%] top-[68%] h-3 w-3 rounded-full bg-lime-300" />
                <div className="absolute left-[87%] top-[82%] h-3 w-3 rounded-full bg-lime-300" />

                <svg
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M16 18 C24 24, 28 28, 34 34 S48 48, 56 54 68 62, 74 68 81 78, 87 82"
                    pathLength="1"
                    stroke="rgba(242, 242, 234, 0.52)"
                    strokeDasharray="3 2"
                    strokeWidth="0.6"
                  />
                </svg>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mono-copy text-lunar/90">{siteContent.scenario.media.image.label}</p>
                  <p className="mt-3 max-w-md text-sm leading-7 text-lunar/78">
                    La fin du trajet n&apos;est pas un simple arret technique. Le rover ouvre un
                    temps d&apos;observation et de recuperation avant le retour.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {siteContent.scenario.supportFrames.map((frame) => (
                <div className="image-frame min-h-[240px]" key={frame.title}>
                  <ScanLine />
                  <img
                    alt={frame.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={frame.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mono-copy text-lime-300/90">{frame.title}</p>
                    <p className="mt-2 text-sm leading-6 text-lunar/78">{frame.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionScenario
