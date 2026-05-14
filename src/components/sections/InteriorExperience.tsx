import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function InteriorExperience() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="interior" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.interior.description}
            eyebrow="MODULE 09 / Experience interieure"
            title="L&apos;habitacle devient un sas de recuperation"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {siteContent.interior.spaces.map((space) => (
              <HudCard eyebrow="Zone" key={space} title={space} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="image-frame min-h-[320px]">
            <ScanLine />
            <img
              alt="Poste de conduite"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/interior/driver-station.jpg"
            />
          </div>
          <div className="image-frame min-h-[320px]">
            <ScanLine />
            <img
              alt="Zone arriere contemplative"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/interior/rear-observatory.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteriorExperience
