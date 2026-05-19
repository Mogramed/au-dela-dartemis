import { Download, FileText, Presentation } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button, { buttonClassNames } from '@/components/ui/Button'
import HudCard from '@/components/ui/HudCard'
import ScanLine from '@/components/ui/ScanLine'
import SectionTitle from '@/components/ui/SectionTitle'
import { siteContent } from '@/data/siteContent'
import { useAnimeReveal } from '@/hooks/useAnimeReveal'

function MemoireReader() {
  const revealRef = useAnimeReveal<HTMLElement>()

  return (
    <section className="shell-section section-anchor" id="memoire" ref={revealRef}>
      <div className="section-inner space-y-8">
        <SectionTitle
          description={siteContent.memoire.description}
          eyebrow="MODULE 12 / Archives"
          title={siteContent.memoire.title}
        />

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="grid gap-4">
            <HudCard eyebrow="PDF" title="Mémoire complet">
              <p className="text-sm leading-7 text-lunar/78">
                Le PDF complet reste accessible directement depuis le site.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  href={siteContent.memoire.pdfUrl}
                  icon={<FileText className="h-4 w-4" />}
                  rel="noreferrer"
                  target="_blank"
                  variant="solid"
                >
                  Ouvrir le mémoire
                </Button>
                <Button
                  href={siteContent.memoire.pdfUrl}
                  icon={<Download className="h-4 w-4" />}
                  rel="noreferrer"
                  target="_blank"
                  variant="outline"
                >
                  Télécharger le PDF
                </Button>
                <Link className={buttonClassNames({ variant: 'ghost' })} to="/presentation">
                  <Presentation className="h-4 w-4" />
                  <span>Voir les planches</span>
                </Link>
              </div>
            </HudCard>

            <HudCard eyebrow="Planches" title="Lecture intégrée">
              <p className="text-sm leading-7 text-lunar/78">
                Les planches sont accessibles dans un mode de lecture intégré au site.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link className={buttonClassNames({ variant: 'solid' })} to="/presentation">
                  <Presentation className="h-4 w-4" />
                  <span>Voir les planches</span>
                </Link>
              </div>
            </HudCard>

            <div className="image-frame min-h-[240px]">
              <ScanLine />
              <img
                alt="Preview du projet"
                className="h-full w-full object-cover"
                loading="lazy"
                src={siteContent.memoire.previewImage}
              />
            </div>
          </div>

          <div className="hud-panel hidden min-h-[620px] overflow-hidden xl:block">
            <iframe
              className="h-full min-h-[620px] w-full bg-white"
              src={`${siteContent.memoire.pdfUrl}#view=FitH`}
              title="Mémoire Au-delà d'Artémis"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemoireReader
