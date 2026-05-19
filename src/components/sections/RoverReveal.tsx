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
            eyebrow="MODULE 05 / Réponse design"
            title={siteContent.rover.title}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {siteContent.rover.specs.map((spec) => (
              <HudCard eyebrow={spec.label} key={spec.label} title={spec.value} />
            ))}
          </div>
          <div className="grid gap-4">
            {siteContent.rover.arguments.map((argument) => (
              <HudCard eyebrow={argument.label} key={argument.title} title={argument.title}>
                <p className="text-sm leading-7 text-lunar/78">{argument.description}</p>
              </HudCard>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="image-frame min-h-[300px] sm:min-h-[420px] xl:min-h-[500px]">
            <ScanLine />
            <img
              alt="Coupe du véhicule et de sa zone arrière"
              className="h-full w-full object-cover"
              loading="lazy"
              src={siteContent.rover.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/16 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="mono-copy text-lime-300/90">{siteContent.rover.imageLabel}</p>
              <h3 className="mt-3 max-w-xl text-2xl uppercase leading-tight">
                Le véhicule est pensé comme une extension de la base.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-lunar/78">
                {siteContent.rover.imageCaption}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.rover.mediaCards.map((media) => (
              <div className="image-frame min-h-[220px] sm:min-h-[240px]" key={media.label}>
                {'poster' in media ? (
                  <AutoVideo
                    className="h-full w-full object-cover"
                    poster={media.poster}
                    rootMargin="100px 0px"
                    src={media.src}
                  />
                ) : (
                  <>
                    <ScanLine />
                    <img
                      alt={media.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      src={media.src}
                      style={{
                        objectPosition:
                          'objectPosition' in media ? media.objectPosition : 'center center',
                      }}
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/14 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="mono-copy text-lime-300/90">{media.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoverReveal
