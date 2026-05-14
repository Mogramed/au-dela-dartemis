type PresentationSlide = {
  image: string
  kicker: string
  subtitle: string
  title: string
}

type SlideViewProps = {
  index: number
  slide: PresentationSlide
  total: number
}

function SlideView({ index, slide, total }: SlideViewProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        alt={slide.title}
        className="absolute inset-0 h-full w-full object-cover"
        src={slide.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-space via-space/60 to-space/16" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-between px-6 py-10 lg:px-12">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-dust">
          <span>{slide.kicker}</span>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="max-w-5xl space-y-5 pb-16">
          <p className="mission-kicker">Presentation mode</p>
          <h1 className="display-title">{slide.title}</h1>
          <p className="max-w-3xl text-xl leading-8 text-lunar/86 sm:text-2xl">
            {slide.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export type { PresentationSlide }
export default SlideView
