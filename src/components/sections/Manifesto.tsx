import HudCard from '@/components/ui/HudCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function Manifesto() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="manifesto" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.manifesto.body[0]}
            eyebrow="MODULE 02 / Memoire"
            title={siteContent.manifesto.title}
          />
          <div className="space-y-4" data-reveal-item>
            {siteContent.manifesto.body.slice(1).map((paragraph) => (
              <p className="section-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <HudCard eyebrow="Question centrale" title="Pourquoi encore des humains ?">
            <p className="section-copy text-sm">{siteContent.metadata.question}</p>
          </HudCard>

          <div className="grid gap-4 md:grid-cols-2">
            {siteContent.manifesto.opposingForces.map((force) => (
              <HudCard eyebrow="Tension de projet" key={force.title} title={force.title}>
                <ul className="space-y-3">
                  {force.points.map((point) => (
                    <li className="flex items-start gap-3 text-sm leading-7 text-lunar/82" key={point}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-lime-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </HudCard>
            ))}
          </div>

          <HudCard eyebrow="Manifesto" title="Statement">
            <p className="text-lg leading-8 text-lunar/90">{siteContent.manifesto.quote}</p>
          </HudCard>
        </div>
      </div>
    </section>
  )
}

export default Manifesto
