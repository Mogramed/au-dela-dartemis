import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function RoverReveal() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="reveal" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.rover.description}
            eyebrow="MODULE 05 / Reponse design"
            title={siteContent.rover.title}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {siteContent.rover.specs.map((spec) => (
              <HudCard eyebrow={spec.label} key={spec.label} title={spec.value} />
            ))}
          </div>
        </div>

        <div className="image-frame min-h-[460px]">
          <ScanLine />
          <img
            alt="Vue en coupe du module lunaire"
            className="h-full w-full object-cover"
            loading="lazy"
            src={siteContent.rover.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="mono-copy">Refuge mobile / Pressurized capsule</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoverReveal
