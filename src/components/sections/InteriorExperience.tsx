import AutoVideo from '@/components/ui/AutoVideo'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function InteriorExperience() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const [heroVisual, ...detailVisuals] = siteContent.interior.visuals

  return (
    <section className="shell-section section-anchor" id="interior" ref={revealRef}>
      <div className="section-inner section-grid">
        <div className="section-stack">
          <SectionTitle
            description={siteContent.interior.description}
            eyebrow="MODULE 09 / Experience interieure"
            title={siteContent.interior.title}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {siteContent.interior.spaces.map((space) => (
              <HudCard eyebrow="Zone" key={space} title={space} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="image-frame min-h-[360px] lg:min-h-[420px]">
            <ScanLine />
            <AutoVideo className="h-full w-full object-cover" poster={heroVisual.poster} src={heroVisual.src} />
            <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="mono-copy text-lunar/90">{heroVisual.label}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {detailVisuals.map((visual, index) => (
              <div
                className={`image-frame min-h-[240px] ${index === detailVisuals.length - 1 ? 'sm:col-span-2' : ''}`}
                key={`${visual.type}-${visual.src}`}
              >
                <ScanLine />
                {visual.type === 'video' ? (
                  <AutoVideo className="h-full w-full object-cover" poster={visual.poster} src={visual.src} />
                ) : (
                  <img
                    alt={visual.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={visual.src}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
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

export default InteriorExperience
