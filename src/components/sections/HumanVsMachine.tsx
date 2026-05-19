import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function HumanVsMachine() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="human" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.humanProblem.title}
            eyebrow="MODULE 04 / Problème humain"
            title="Corps, fatigue et isolement"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.humanProblem.categories.map((item) => (
              <HudCard eyebrow="Observation" key={item.title} title={item.title}>
                <p className="text-sm leading-7 text-lunar/78">{item.description}</p>
              </HudCard>
            ))}
          </div>
        </div>

        <div className="image-frame min-h-[420px]">
          <ScanLine />
          <img
            alt="Vue intérieure du projet"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            src={siteContent.hero.secondaryImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space via-space/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
            <p className="mono-copy">Homme et machine</p>
            <p className="max-w-md text-sm leading-7 text-lunar/80">
              La machine peut cartographier, prélever, mesurer et travailler plus longtemps que
              l&apos;humain. Le projet se place dans cet écart.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HumanVsMachine
