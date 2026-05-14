import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function DesignProcess() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="process" ref={revealRef}>
      <div className="section-inner space-y-10">
        <SectionTitle
          description={siteContent.process.description}
          eyebrow="MODULE 07 / Process design"
          title={siteContent.process.title}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.process.steps.map((step, index) => (
            <HudCard
              eyebrow={`Etape ${String(index + 1).padStart(2, '0')}`}
              key={step.title}
              title={step.title}
            >
              <p className="text-sm leading-7 text-lunar/78">{step.description}</p>
            </HudCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="image-frame min-h-[300px]">
            <ScanLine />
            <img
              alt="Wireframe interieur"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/process/interior-linework.jpg"
            />
          </div>
          <div className="image-frame min-h-[300px]">
            <ScanLine />
            <img
              alt="Usage scenario"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/process/usage-scenario.jpg"
            />
          </div>
          <div className="image-frame min-h-[300px]">
            <ScanLine />
            <img
              alt="Dashboard concept"
              className="h-full w-full object-cover"
              loading="lazy"
              src="/images/process/dashboard-concept.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesignProcess
