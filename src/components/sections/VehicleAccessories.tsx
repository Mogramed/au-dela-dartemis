import AutoVideo from '@/components/ui/AutoVideo'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function VehicleAccessories() {
  const revealRef = useAnimeReveal<HTMLElement>()
  const { accessories } = siteContent

  return (
    <section className="shell-section section-anchor" id="accessories" ref={revealRef}>
      <div className="section-inner space-y-8">
        <SectionTitle
          description={accessories.description}
          eyebrow="MODULE 09A / Accessoires"
          title={accessories.title}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <div className="section-stack">
            <div className="grid gap-4 sm:grid-cols-2">
              {accessories.leadCards.map((card) => (
                <HudCard eyebrow={card.label} key={card.title} title={card.title}>
                  <p className="text-sm leading-7 text-lunar/78">{card.description}</p>
                </HudCard>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {accessories.items.map((item) => (
                <HudCard eyebrow={item.label} key={item.title} title={item.title}>
                  <p className="text-sm leading-7 text-lunar/78">{item.description}</p>
                </HudCard>
              ))}
            </div>
          </div>

          <div className="section-stack">
            <div className="image-frame min-h-[320px] overflow-hidden bg-black sm:min-h-[420px]">
              <ScanLine />
              <img
                alt={accessories.spotlight.alt}
                className="h-full w-full object-contain"
                loading="lazy"
                src={accessories.spotlight.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space via-space/8 to-transparent" />
              <div className="absolute left-4 top-4 rounded-sm border border-white/10 bg-black/42 px-3 py-2">
                <p className="mono-copy text-lime-300/90">{accessories.spotlight.label}</p>
              </div>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="mono-copy text-lime-300/90">{accessories.spotlight.label}</p>
              <h3 className="mt-3 text-2xl uppercase leading-tight text-lunar">
                {accessories.spotlight.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-lunar/78">
                {accessories.spotlight.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {accessories.items.map((item) => (
                <article
                  className="overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]"
                  key={item.title}
                >
                  <div className="image-frame min-h-[220px] bg-black sm:min-h-[240px]">
                    <AutoVideo
                      className="h-full w-full object-contain p-5"
                      poster={item.media.poster}
                      rootMargin="80px 0px"
                      src={item.media.src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 rounded-sm border border-white/10 bg-black/42 px-3 py-2">
                      <p className="mono-copy text-lime-300/90">{item.label}</p>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 sm:p-5">
                    <h3 className="text-base uppercase leading-tight text-lunar sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-lunar/78">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VehicleAccessories
