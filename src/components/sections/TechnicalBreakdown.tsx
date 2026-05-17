import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { technicalSpecs } from '@/data/technicalSpecs'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function TechnicalBreakdown() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="technical" ref={revealRef}>
      <div className="section-inner space-y-8">
        <SectionTitle
          description={siteContent.technical.description}
          eyebrow="MODULE 10 / Breakdown technique"
          title={siteContent.technical.title}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="grid gap-4">
            <div className="image-frame min-h-[460px]">
              <ScanLine />
              <img
                alt="Lecture technique du rover lunaire"
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.technical.image}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {siteContent.technical.detailImages.map((image) => (
                <div className="image-frame min-h-[220px]" key={image.src}>
                  <ScanLine />
                  <img
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={image.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mono-copy text-lunar/90">{image.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {technicalSpecs.map((spec) => (
              <HudCard eyebrow={spec.status} key={spec.title} title={spec.title}>
                <p className="text-sm leading-7 text-lunar/78">{spec.description}</p>
              </HudCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnicalBreakdown
