import { ArrowDownRight, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScanLine from '@/components/ui/ScanLine'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function HeroMission() {
  const revealRef = useAnimeReveal<HTMLElement>()

  const handleExploreProject = () => {
    document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="shell-section section-anchor" id="hero" ref={revealRef}>
      <div className="section-inner pt-28 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-end">
          <div className="section-stack">
            <p className="mission-kicker" data-reveal-item>
              {siteContent.hero.label}
            </p>
            <h1 className="display-title max-w-4xl" data-reveal-item>
              {siteContent.hero.title}
            </h1>
            <div className="space-y-4" data-reveal-item>
              <p className="max-w-2xl text-xl leading-8 text-lunar/88 sm:text-2xl">
                {siteContent.hero.subtitle}
              </p>
              <p className="section-copy">{siteContent.hero.question}</p>
              <p className="section-copy text-dust">{siteContent.hero.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row" data-reveal-item>
              <Button
                icon={<ArrowDownRight className="h-4 w-4" />}
                onClick={handleExploreProject}
                variant="solid"
              >
                Explorer le projet
              </Button>
              <Button
                href={siteContent.memoire.pdfUrl}
                icon={<FileText className="h-4 w-4" />}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                Voir le memoire
              </Button>
            </div>
          </div>

          <div className="image-frame grid-surface noise-surface min-h-[420px] p-4 sm:p-5" data-reveal-item>
            <ScanLine />
            <div className="relative h-full overflow-hidden rounded-sm">
              <img
                alt="Vue hero du vehicule lunaire"
                className="h-full min-h-[360px] w-full object-cover object-center"
                src={siteContent.hero.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/24 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-300">
                  Lunar mobility concept
                </p>
                <div className="metric-grid">
                  {siteContent.hero.stats.map((stat) => (
                    <div className="metric-card" key={stat.label}>
                      <p className="metric-label">{stat.label}</p>
                      <p className="metric-value">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroMission
