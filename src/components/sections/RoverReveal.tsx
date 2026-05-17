import AutoVideo from '@/components/ui/AutoVideo'
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

        <div className="grid gap-4">
          <div className="image-frame min-h-[300px] sm:min-h-[380px] xl:min-h-[460px]">
            <ScanLine />
            <AutoVideo
              className="h-full w-full object-cover"
              poster={siteContent.rover.media.poster}
              rootMargin="120px 0px"
              src={siteContent.rover.media.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mono-copy">{siteContent.rover.media.label}</p>
                <h3 className="mt-3 max-w-xl text-2xl uppercase leading-tight">
                  Le vehicule se lit comme un espace pressurise de mission.
                </h3>
              </div>
            </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_280px]">
            <div className="image-frame min-h-[220px] sm:min-h-[240px] xl:col-span-2">
              <ScanLine />
              <img
                alt="Vue exterieure du rover en contexte lunaire"
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.rover.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mono-copy">Vue exterieure / projet</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
              {siteContent.rover.supportingMedia.map((media) => (
                <div className="image-frame min-h-[180px] sm:min-h-[220px] xl:min-h-[180px]" key={media.label}>
                  <ScanLine />
                  <AutoVideo
                    className="h-full w-full object-cover"
                    poster={media.poster}
                    rootMargin="100px 0px"
                    src={media.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/14 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mono-copy text-lunar/90">{media.label}</p>
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

export default RoverReveal
