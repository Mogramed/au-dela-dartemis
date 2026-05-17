import { ArrowUpRight, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScanLine from '@/components/ui/ScanLine'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function FinalStatement() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="final" ref={revealRef}>
      <div className="section-inner">
        <div className="image-frame min-h-[520px] overflow-hidden">
          <ScanLine />
          <img
            alt="Conclusion du projet lunaire"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            src={siteContent.hero.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space via-space/55 to-space/20" />

          <div className="relative z-10 flex min-h-[520px] flex-col justify-end gap-6 p-6 sm:p-8 lg:p-10">
            <p className="mission-kicker">MODULE 13 / Conclusion</p>
            <h2 className="section-title max-w-5xl">{siteContent.finalStatement.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => document.getElementById('viewer')?.scrollIntoView({ behavior: 'smooth' })}
                variant="solid"
              >
                {siteContent.finalStatement.ctaPrimary}
              </Button>
              <Button
                href={siteContent.memoire.pdfUrl}
                icon={<FileText className="h-4 w-4" />}
                rel="noreferrer"
                target="_blank"
                variant="ghost"
              >
                {siteContent.finalStatement.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalStatement
