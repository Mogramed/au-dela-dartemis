import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { timeline } from '@/data/timeline'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useIsMobile } from '@/hooks/useIsMobile'

function ContextMoon() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const isMobile = useIsMobile()

  return (
    <section className="shell-section section-anchor" id="context" ref={revealRef}>
      <div className="section-inner space-y-10">
        <SectionTitle
          description="Le retour vers la Lune ne parle plus seulement d'exploit. Il ouvre l'hypothèse d'une présence plus longue, avec des bases, des trajets et des usages quotidiens."
          eyebrow="MODULE 03 / Contexte lunaire"
          title="De la découverte à Artémis III"
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(340px,0.94fr)] xl:items-start">
          <div className="grid gap-4 xl:sticky xl:top-24">
            <div className="image-frame min-h-[320px] sm:min-h-[520px] xl:min-h-[620px]">
              <ScanLine />
              <img
                alt="Rover en contexte lunaire"
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.context.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />

              <div className="absolute left-5 right-5 top-5 z-[2] hidden gap-3 md:grid md:grid-cols-3">
                {siteContent.context.metrics.map((metric) => (
                  <div
                    className="rounded-sm border border-white/12 bg-space/68 px-3 py-3 backdrop-blur-sm"
                    key={metric.label}
                  >
                    <p className="metric-label">{metric.label}</p>
                    <p className="mt-2 text-sm font-medium text-lunar">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 z-[2] p-5 sm:p-6">
                <div className="max-w-2xl rounded-sm border border-white/12 bg-space/56 p-4 backdrop-blur-sm sm:p-5">
                  <p className="mono-copy text-lime-300/90">Terrain de mission</p>
                  <h3 className="mt-3 max-w-xl text-2xl uppercase leading-tight">
                    La Lune n&apos;est plus seulement un objectif à atteindre, mais un milieu à pratiquer.
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-lunar/80">
                    Habitat, maintenance, circulation et récupération deviennent des sujets de projet.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 right-5 hidden w-44 overflow-hidden rounded-sm border border-white/12 bg-space/70 shadow-hud backdrop-blur-sm lg:block">
                <img
                  alt="Profil secondaire du rover"
                  className="h-32 w-full object-cover"
                  loading="lazy"
                  src={siteContent.context.insetImage}
                />
                <div className="border-t border-white/10 px-3 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                    Profil de lecture
                  </p>
                </div>
              </div>
            </div>

            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 md:hidden">
              {siteContent.context.metrics.map((metric) => (
                <div
                  className="min-w-[170px] rounded-sm border border-white/12 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
                  key={metric.label}
                >
                  <p className="metric-label">{metric.label}</p>
                  <p className="mt-2 text-sm font-medium text-lunar">{metric.value}</p>
                </div>
              ))}
            </div>

            <HudCard eyebrow="Contexte" title="Se déplacer devient un besoin quotidien">
              <p className="text-sm leading-7 text-lunar/80">
                Dans une présence prolongée, le véhicule ne sert pas uniquement à travailler. Il
                permet aussi de sortir de la base, de changer de rythme et de retrouver un rapport
                au paysage.
              </p>
            </HudCard>

            <div className="image-frame min-h-[220px] overflow-hidden">
              <img
                alt={siteContent.context.village.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.context.village.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/24 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mono-copy text-lime-300/90">{siteContent.context.village.title}</p>
                <p className="mt-2 max-w-lg text-sm leading-7 text-lunar/78">
                  {siteContent.context.village.description}
                </p>
              </div>
            </div>

            <div className="image-frame min-h-[220px] overflow-hidden lg:hidden">
              <img
                alt="Profil secondaire du rover"
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.context.insetImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mono-copy text-lime-300/90">Appuis et terrain</p>
                <p className="mt-2 text-sm leading-7 text-lunar/78">
                  Cette vue rappelle que le véhicule reste lié à la surface lunaire, à ses appuis
                  et à ses contraintes de déplacement.
                </p>
              </div>
            </div>
          </div>

          {isMobile ? (
            <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1">
              {timeline.map((item, index) => (
                <article
                  className="hud-panel min-w-[280px] px-4 py-4"
                  key={item.title}
                >
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/12 bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.18em] text-lime-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                      {item.label}
                    </p>
                    <h3 className="text-base uppercase leading-tight text-lunar">{item.title}</h3>
                    <p className="text-sm leading-6 text-lunar/78">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {timeline.map((item, index) => (
                <article className="hud-panel px-4 py-4 sm:px-5 sm:py-5" key={item.title}>
                  <div className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/12 bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.18em] text-lime-300 sm:h-14 sm:w-14 sm:text-[12px]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="space-y-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                        {item.label}
                      </p>
                      <h3 className="text-base uppercase leading-tight text-lunar sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-lunar/78">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContextMoon
