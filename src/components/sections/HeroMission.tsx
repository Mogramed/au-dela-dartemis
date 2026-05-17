import { ArrowDownRight, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import AutoVideo from '@/components/ui/AutoVideo'
import ScanLine from '@/components/ui/ScanLine'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function HeroMission() {
  const revealRef = useAnimeReveal<HTMLElement>()

  const handleExploreProject = () => {
    document.getElementById('motion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="shell-section section-anchor" id="hero" ref={revealRef}>
      <div className="section-inner pt-28 lg:pt-36">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(460px,1.12fr)] xl:items-end xl:gap-10">
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

          <div
            className="hero-stage image-frame grid-surface noise-surface min-h-[500px] p-3 sm:p-5 lg:min-h-[620px] xl:p-6"
            data-reveal-item
          >
            <ScanLine />
            <div className="flex h-full flex-col gap-3 sm:gap-4">
              <div className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(240px,0.92fr)]">
                <div className="relative min-h-[340px] overflow-hidden rounded-sm border border-white/10 bg-black sm:min-h-[420px] lg:min-h-[520px]">
                  <img
                    alt="Vue hero du vehicule lunaire"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.08] blur-2xl"
                    src={siteContent.hero.image}
                  />
                  <AutoVideo
                    className="h-full w-full object-cover object-center"
                    eager
                    poster={siteContent.hero.video.poster}
                    src={siteContent.hero.video.src}
                    style={{ objectPosition: siteContent.hero.video.objectPosition }}
                  />
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
                  <div className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6">
                    <div className="max-w-xl rounded-sm border border-white/12 bg-space/72 p-4 backdrop-blur-sm sm:p-5">
                      <p className="mono-copy text-lime-300/90">Question du memoire</p>
                      <h3 className="mt-3 text-2xl uppercase leading-tight text-lunar sm:text-[2rem]">
                        Donner a l&apos;experience spatiale une forme, mais aussi un sens.
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-lunar/78">
                        Le projet croise la place de l&apos;humain face a la machine, la vie
                        sur la Lune et la question d&apos;un vehicule habitable.
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />
                </div>

                <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="hud-panel grid gap-2 p-4">
                    <p className="mono-copy text-lime-300/90">Repere de lecture</p>
                    <div className="grid gap-2">
                      {siteContent.hero.signals.map((signal) => (
                        <div className="hero-chip" key={signal.label}>
                          <span>{signal.label}</span>
                          <strong>{signal.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hud-panel p-4 sm:p-5">
                    <p className="mono-copy text-lime-300/90">{siteContent.hero.callout.eyebrow}</p>
                    <h3 className="mt-3 text-lg uppercase leading-tight sm:text-xl">
                      {siteContent.hero.callout.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-lunar/76">
                      {siteContent.hero.callout.body}
                    </p>
                  </div>

                  <div className="hidden gap-3 sm:col-span-2 sm:grid sm:grid-cols-3 lg:col-span-1 lg:grid-cols-1">
                    {siteContent.hero.archiveStrip.map((frame) => (
                      <div
                        className="overflow-hidden rounded-sm border border-white/[0.12] bg-space/[0.62] backdrop-blur-sm"
                        key={frame.label}
                      >
                        <img
                          alt={frame.alt}
                          className="h-24 w-full object-cover"
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

              <div className="grid gap-3 sm:grid-cols-3">
                {siteContent.hero.stats.map((stat) => (
                  <div className="hero-metric" key={stat.label}>
                    <p className="metric-label">{stat.label}</p>
                    <p className="metric-value">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroMission
