import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { timeline } from '@/data/timeline'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function ContextMoon() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="context" ref={revealRef}>
      <div className="section-inner space-y-10">
        <SectionTitle
          description="Programme Artemis, retour sur la Lune, bases durables, vie sous contrainte: le contexte lunaire impose une autre definition de la mobilite."
          eyebrow="MODULE 03 / Contexte lunaire"
          title="Le paysage lunaire change la nature du vehicule"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {timeline.map((item) => (
              <HudCard eyebrow={item.label} key={item.title} title={item.title}>
                <p className="text-sm leading-7 text-lunar/78">{item.description}</p>
              </HudCard>
            ))}
          </div>

          <div className="image-frame min-h-[460px]">
            <ScanLine />
            <img
              alt="Vue du module et du vehicule"
              className="h-full w-full object-cover"
              loading="lazy"
              src={siteContent.rover.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
              <p className="mono-copy">Terrain de mission</p>
              <p className="max-w-md text-sm leading-7 text-lunar/82">
                Le rover prend place dans une logique d&apos;aller-retour entre habitat,
                travail de surface et besoin de seuil psychologique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContextMoon
