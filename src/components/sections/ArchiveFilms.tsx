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
  const visibleClips = isMobile ? clips.slice(0, 4) : clips

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
                <p className="mt-3 max-w-2xl text-sm leading-7 text-lunar/78">
                  {featuredClip.description}
                </p>
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
                    playWhenVisible={!isMobile}
                    rootMargin="100px 0px"
                    src={clip.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space via-space/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="mono-copy text-lime-300/90">{clip.tag}</p>
                    <h3 className="mt-2 text-lg uppercase leading-tight">{clip.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-lunar/78">{clip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isMobile ? (
            <HudCard eyebrow="Selection video" title="Vues principales du projet">
              <p className="text-sm leading-7 text-lunar/78">
                La section rassemble une selection courte de vues video: structure, modules,
                mise en mouvement et recherches.
              </p>
            </HudCard>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <HudCard eyebrow="Lecture video" title="Mouvements lents et cadrages lisibles">
                <p className="text-sm leading-7 text-lunar/78">
                  Les videos gardent des mouvements simples pour laisser lire le volume, les
                  modules et les relations d&apos;usage.
                </p>
              </HudCard>
              <HudCard eyebrow="Selection" title={`${clips.length + secondaryClips.length + 1} vues retenues`}>
                <p className="text-sm leading-7 text-lunar/78">
                  La banque video rassemble des vues du rover, de l&apos;habitacle, des modules et
                  des recherches.
                </p>
              </HudCard>
              <HudCard eyebrow="Usage" title="Lecture du volume et des sous-ensembles">
                <p className="text-sm leading-7 text-lunar/78">
                  La section alterne vues d&apos;ensemble, sous-ensembles et recherches sans sortir
                  du projet.
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
              {isMobile ? (
                <img
                  alt={clip.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={clip.poster}
                />
              ) : (
                <>
                  <ScanLine />
                  <AutoVideo
                    className="h-full w-full object-cover"
                    poster={clip.poster}
                    rootMargin="100px 0px"
                    src={clip.src}
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="mono-copy text-lime-300/90">
                  {isMobile ? `${clip.tag} / affiche` : clip.tag}
                </p>
                <h3 className="mt-2 text-lg uppercase leading-tight">{clip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-lunar/78">{clip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {isMobile && clips.length > visibleClips.length ? (
          <HudCard eyebrow="Mobile" title="Selection mobile">
            <p className="text-sm leading-7 text-lunar/78">
              Sur telephone, la section garde les vues video principales et resserre la banque
              d&apos;archive pour conserver une lecture plus fluide.
            </p>
          </HudCard>
        ) : null}
      </div>
    </section>
  )
}

export default ArchiveFilms
