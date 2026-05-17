import AutoVideo from '@/components/ui/AutoVideo'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function ArchiveFilms() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const { featuredClip, secondaryClips, clips, description, title } = siteContent.archiveFilms

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
            <div className="image-frame min-h-[280px] sm:min-h-[360px] xl:min-h-[420px]">
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

            <div className="grid gap-4 lg:grid-cols-2">
              {secondaryClips.map((clip) => (
                <div className="image-frame min-h-[220px] sm:min-h-[240px] xl:min-h-[260px]" key={clip.src}>
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
                    <p className="mt-2 text-sm leading-6 text-lunar/78">{clip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <HudCard eyebrow="Mode de lecture" title="Autoplay dans le viewport">
              <p className="text-sm leading-7 text-lunar/78">
                Les videos ne telechargent pas tout d&apos;un coup. Elles se reveillent a
                l&apos;approche du viewport, puis se coupent quand la section s&apos;eloigne.
              </p>
            </HudCard>
            <HudCard eyebrow="Selection" title={`${clips.length + secondaryClips.length + 1} clips actives`}>
              <p className="text-sm leading-7 text-lunar/78">
                La banque video rassemble des vues du rover, de l&apos;habitacle, des modules et
                des recherches.
              </p>
            </HudCard>
            <HudCard eyebrow="Usage" title="Lecture continue pendant la soutenance">
              <p className="text-sm leading-7 text-lunar/78">
                Pendant la soutenance, cette section peut tourner seule pour montrer la variete
                des vues sans quitter le projet.
              </p>
            </HudCard>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clips.map((clip) => (
            <div className="image-frame min-h-[220px] sm:min-h-[240px] xl:min-h-[280px]" key={clip.src}>
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
                <p className="mt-2 text-sm leading-6 text-lunar/78">{clip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArchiveFilms
