import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function DesignProcess() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const [featureVisual, ...supportVisuals] = siteContent.process.visuals

  return (
    <section className="shell-section section-anchor" id="process" ref={revealRef}>
      <div className="section-inner space-y-10">
        <SectionTitle
          description={siteContent.process.description}
          eyebrow="MODULE 07 / Processus"
          title={siteContent.process.title}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.process.steps.map((step, index) => (
            <HudCard
              eyebrow={`Étape ${String(index + 1).padStart(2, '0')}`}
              key={step.title}
              title={step.title}
            >
              <p className="text-sm leading-7 text-lunar/78">{step.description}</p>
            </HudCard>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="image-frame min-h-[300px] sm:min-h-[360px] xl:min-h-[420px]">
            <ScanLine />
            <img
              alt={featureVisual.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              src={featureVisual.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mono-copy text-lime-300/90">{featureVisual.label}</p>
              </div>
            </div>

          <div className="grid gap-4 md:grid-cols-2">
            {supportVisuals.map((visual) => (
              <div className="image-frame min-h-[200px] sm:min-h-[220px] xl:min-h-[240px]" key={visual.label}>
                <ScanLine />
                <img
                  alt={visual.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={visual.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="mono-copy text-lunar/90">{visual.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesignProcess
