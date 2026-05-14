import { clsx } from 'clsx'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

type SectionTitleProps = {
  eyebrow: string
  title: string
  description: string
  className?: string
}

function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  const revealRef = useAnimeReveal<HTMLDivElement>()

  return (
    <div className={clsx('section-stack', className)} ref={revealRef}>
      <p className="mission-kicker" data-reveal-item>
        {eyebrow}
      </p>
      <h2 className="section-title max-w-4xl" data-reveal-item>
        {title}
      </h2>
      <p className="section-copy" data-reveal-item>
        {description}
      </p>
    </div>
  )
}

export default SectionTitle
