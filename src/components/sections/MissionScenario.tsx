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
            eyebrow="MODULE 11 / Scénario"
            title={siteContent.scenario.title}
          />

          <HudCard eyebrow="Parcours" title="Une sortie hors de la base">
            <p className="text-sm leading-7 text-lunar/78">
              Le but n&apos;est pas de produire, de réparer ou d&apos;extraire. Il s&apos;agit de
              sortir, de voir la surface autrement, puis de revenir vers la base.
            </p>
          </HudCard>

          <div className="grid gap-3">
            {siteContent.scenario.steps.map((step) => (
              <div
                className="rounded-sm border border-white/10 bg-white/[0.03] px-4 py-4"
                key={step.code}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                  {step.code}
                </p>
                <p className="mt-2 text-sm uppercase text-lunar">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {siteContent.scenario.steps.map((step, index) => (
            <article
              className={`overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] ${
                index === siteContent.scenario.steps.length - 1 ? 'lg:col-span-2' : ''
              }`}
              key={step.code}
            >
              <div className="image-frame min-h-[240px] sm:min-h-[280px]">
                <ScanLine />
                <AutoVideo
                  className="h-full w-full object-cover"
                  poster={step.media.poster}
                  rootMargin="40px 0px"
                  src={step.media.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
                <div className="absolute left-4 top-4 rounded-sm border border-white/10 bg-black/42 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                  {step.code}
                </div>
              </div>

              <div className="space-y-3 p-4 sm:p-5">
                <h3 className="text-xl uppercase leading-tight text-lunar">{step.title}</h3>
                <p className="text-sm leading-7 text-lunar/78">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionScenario
