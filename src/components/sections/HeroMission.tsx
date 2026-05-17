import { ArrowDownRight, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import AutoVideo from '@/components/ui/AutoVideo'
import ScanLine from '@/components/ui/ScanLine'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useIsMobile } from '@/hooks/useIsMobile'

function HeroMission() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const isMobile = useIsMobile()

  const handleExploreProject = () => {
    document.getElementById('motion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="shell-section section-anchor" id="hero" ref={revealRef}>
      <div className="section-inner pt-24 lg:pt-30">
        <div className="grid gap-8 xl:grid-cols-[minmax(360px,0.72fr)_minmax(0,1.28fr)] xl:items-start xl:gap-10">
          <div className="section-stack xl:max-w-[38rem] xl:pt-8">
            <p className="mission-kicker" data-reveal-item>
              {siteContent.hero.label}
            </p>
            <h1
              className="max-w-4xl text-[3.2rem] uppercase leading-[0.95] sm:text-[4.2rem] lg:text-[4.75rem] xl:text-[5.1rem]"
              data-reveal-item
            >
              {siteContent.hero.title}
            </h1>
            <div className="space-y-5" data-reveal-item>
              <p className="max-w-2xl text-xl leading-8 text-lunar/88 sm:text-2xl">
                {siteContent.hero.subtitle}
              </p>
              <div className="hud-panel max-w-2xl p-4 sm:p-5">
                <p className="mono-copy text-lime-300/90">Question du memoire</p>
                <p className="mt-3 text-base leading-8 text-lunar/88 sm:text-lg">
                  {siteContent.hero.question}
                </p>
              </div>
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

          <div
            className="hero-stage image-frame grid-surface noise-surface min-h-[400px] p-3 sm:min-h-[460px] sm:p-5 lg:min-h-[580px] xl:p-6"
            data-reveal-item
          >
            <ScanLine />
            <div className="grid h-full gap-4">
              <div className="relative min-h-[300px] overflow-hidden rounded-sm border border-white/10 bg-black sm:min-h-[460px] lg:min-h-[520px]">
                <img
                  alt="Vue hero du vehicule lunaire"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="eager"
                  src={siteContent.hero.image}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-space/18 via-transparent to-lime-300/8" />
                <div className="absolute inset-0 bg-gradient-to-t from-space via-space/8 to-transparent" />
                <div className="absolute left-4 top-4 z-[3] rounded-sm border border-white/12 bg-space/72 px-3 py-2 backdrop-blur-sm">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-lime-300">
                    Archive projet
                  </p>
                </div>
                <div className="absolute right-4 top-4 z-[3] hidden rounded-sm border border-white/12 bg-space/68 px-3 py-2 backdrop-blur-sm sm:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    Active module
                  </p>
                  <p className="mt-1 text-sm uppercase text-lunar">01 / Mission</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-[3] p-4 sm:p-6">
                  <div className="hero-summary-card max-w-[35rem]">
                    <p className="mono-copy text-lime-300/90">Vue generale</p>
                    <h3 className="mt-3 text-xl uppercase leading-tight text-lunar sm:text-[1.75rem]">
                      Question, contexte et forme generale du projet.
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-lunar/78">
                      La page d&apos;ouverture pose la question du memoire, montre le volume du
                      vehicule et introduit les principaux axes de lecture du site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(250px,0.58fr)]">
                <div className="hud-panel p-4 sm:p-5">
                  <p className="mono-copy text-lime-300/90">{siteContent.hero.callout.eyebrow}</p>
                  <h3 className="mt-3 max-w-[30rem] text-lg uppercase leading-tight sm:text-xl">
                    {siteContent.hero.callout.title}
                  </h3>
                  <p className="mt-3 max-w-[34rem] text-sm leading-7 text-lunar/76">
                    {siteContent.hero.callout.body}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    {siteContent.hero.signals.map((signal) => (
                      <div className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-3" key={signal.label}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                          {signal.label}
                        </p>
                        <p className="mt-2 text-sm uppercase text-lunar">{signal.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="image-frame min-h-[168px] sm:min-h-[200px]">
                    <AutoVideo
                      className="h-full w-full object-cover"
                      poster={siteContent.hero.video.poster}
                      rootMargin="80px 0px"
                      src={siteContent.hero.video.src}
                      style={{ objectPosition: siteContent.hero.video.objectPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="mono-copy text-lime-300/90">{siteContent.hero.video.label}</p>
                    </div>
                  </div>

                  {!isMobile ? (
                    <div className="overflow-hidden rounded-sm border border-white/[0.12] bg-space/[0.62] backdrop-blur-sm">
                      <img
                        alt="Lecture secondaire de l'habitacle"
                        className="h-36 w-full object-cover object-center"
                        loading="lazy"
                        src={siteContent.hero.secondaryImage}
                      />
                      <div className="border-t border-white/10 px-3 py-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                          Habitacle / observation
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                {(isMobile ? siteContent.hero.archiveStrip.slice(0, 2) : siteContent.hero.archiveStrip).map((frame) => (
                  <div
                    className="min-w-[220px] overflow-hidden rounded-sm border border-white/[0.12] bg-space/[0.62] backdrop-blur-sm sm:min-w-0"
                    key={frame.label}
                  >
                    <img
                      alt={frame.alt}
                      className="h-28 w-full object-cover"
                      loading="lazy"
                      src={frame.src}
                    />
                    <div className="border-t border-white/10 px-3 py-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                        {frame.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3" data-reveal-item>
          {siteContent.hero.stats.map((stat) => (
            <div className="hero-metric" key={stat.label}>
              <p className="metric-label">{stat.label}</p>
              <p className="metric-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroMission
