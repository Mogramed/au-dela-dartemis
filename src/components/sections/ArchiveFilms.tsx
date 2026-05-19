import AutoVideo from '@/components/ui/AutoVideo'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'
import { useIsMobile } from '@/hooks/useIsMobile'

function ArchiveFilms() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const isMobile = useIsMobile()
  const { featuredClip, secondaryClips, clips, description, title } = siteContent.archiveFilms
  const visibleClips = clips

  return (
    <section className="shell-section section-anchor" id="films" ref={revealRef}>
      <div className="section-inner space-y-8">
        <SectionTitle
          description={description}
          eyebrow="MODULE 11A / Films"
          title={title}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)]">
          <div className="grid gap-4">
            <div className="image-frame min-h-[240px] sm:min-h-[360px] xl:min-h-[420px]">
              <ScanLine />
              <AutoVideo
                className="h-full w-full object-cover"
                poster={featuredClip.poster}
                rootMargin="120px 0px"
                src={featuredClip.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/14 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="mono-copy text-lime-300/90">{featuredClip.tag}</p>
                <h3 className="mt-3 max-w-2xl text-2xl uppercase leading-tight sm:text-3xl">
                  {featuredClip.title}
                </h3>
              </div>
            </div>

            <div className={isMobile ? '-mx-1 flex gap-4 overflow-x-auto px-1 pb-1' : 'grid gap-4 lg:grid-cols-2'}>
              {secondaryClips.map((clip) => (
                <div
                  className={`image-frame min-h-[220px] sm:min-h-[240px] xl:min-h-[260px] ${
                    isMobile ? 'min-w-[286px]' : ''
                  }`}
                  key={clip.src}
                >
                  <ScanLine />
                  <AutoVideo
                    className="h-full w-full object-cover"
                    poster={clip.poster}
                    rootMargin="100px 0px"
                    src={clip.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mono-copy text-lime-300/90">{clip.tag}</p>
                    <h3 className="mt-2 text-lg uppercase leading-tight">{clip.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isMobile ? (
            <HudCard eyebrow="Sélection vidéo" title="Faire lire le projet en mouvement">
              <p className="text-sm leading-7 text-lunar/78">
                Ces vidéos montrent le projet en mouvement : volumes extérieurs, accès, habitacle
                et détails de construction.
              </p>
            </HudCard>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <HudCard eyebrow="Lecture vidéo" title="Des cadrages volontairement lents">
                <p className="text-sm leading-7 text-lunar/78">
                  Les mouvements restent simples pour laisser comprendre les proportions, les
                  appuis et les zones d&apos;usage.
                </p>
              </HudCard>
              <HudCard eyebrow="Sélection vidéo" title="Vues principales du projet">
                <p className="text-sm leading-7 text-lunar/78">
                  Cette sélection rassemble des vues du véhicule, de l&apos;habitacle, des détails
                  et des essais de mise en scène.
                </p>
              </HudCard>
              <HudCard eyebrow="Usage" title="Détails sans perdre l'ensemble">
                <p className="text-sm leading-7 text-lunar/78">
                  Chaque vue isole une partie du véhicule sans la détacher de son usage général.
                </p>
              </HudCard>
            </div>
          )}
        </div>

        <div
          className={
            isMobile
              ? '-mx-1 flex gap-4 overflow-x-auto px-1 pb-1'
              : 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'
          }
        >
          {visibleClips.map((clip) => (
            <div
              className={`image-frame min-h-[220px] sm:min-h-[240px] xl:min-h-[280px] ${
                isMobile ? 'min-w-[286px]' : ''
              }`}
              key={clip.src}
            >
              <ScanLine />
              <AutoVideo
                className="h-full w-full object-cover"
                poster={clip.poster}
                rootMargin="100px 0px"
                src={clip.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mono-copy text-lime-300/90">{clip.tag}</p>
                <h3 className="mt-2 text-lg uppercase leading-tight">{clip.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArchiveFilms
