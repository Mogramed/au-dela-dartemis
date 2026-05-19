import { Eye, FileText, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClassNames } from '@/components/ui/Button'
import { sections } from '@/data/sections'
import { siteContent } from '@/data/siteContent'
import { usePresentationMode } from '@/hooks/usePresentationMode'

type HeaderProps = {
  currentSection: string
}

function Header({ currentSection }: HeaderProps) {
  const activeSection =
    sections.find((section) => section.id === currentSection) ?? sections[0]
  const { isPresentationMode } = usePresentationMode()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-space/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6 sm:py-4 lg:flex-nowrap lg:px-10">
        <a className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none" href="#hero">
          <div className="inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] sm:h-11 sm:w-11">
            <Rocket className="h-4 w-4 text-lime-300" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
              Archive de projet
            </p>
            <p className="truncate text-[15px] uppercase sm:text-[15px]">{siteContent.metadata.title}</p>
          </div>
        </a>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="hud-panel px-4 py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
              Module actif
            </p>
            <p className="mt-1 text-sm uppercase">
              {activeSection?.code} / {activeSection?.label}
            </p>
          </div>

          <a
            className={buttonClassNames({ size: 'sm', variant: 'outline' })}
            href={siteContent.memoire.pdfUrl}
            rel="noreferrer"
            target="_blank"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Ouvrir le mémoire</span>
          </a>

          <Link className={buttonClassNames({ size: 'sm', variant: 'ghost' })} to="/presentation">
            <Eye className="h-3.5 w-3.5" />
            <span>{isPresentationMode ? 'Retour au projet' : 'Voir les planches'}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            className={buttonClassNames({ size: 'sm', variant: 'outline', className: 'px-3' })}
            href={siteContent.memoire.pdfUrl}
            rel="noreferrer"
            target="_blank"
          >
            <FileText className="h-3.5 w-3.5" />
          </a>
          <Link
            className={buttonClassNames({ size: 'sm', variant: 'ghost', className: 'px-3' })}
            to="/presentation"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="w-full lg:hidden">
          <div className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                Module actif
              </p>
              <p className="mt-1 truncate text-sm uppercase text-lunar">
                {activeSection?.code} / {activeSection?.label}
              </p>
            </div>
            <span className="ml-auto shrink-0 rounded-sm border border-white/10 bg-black/24 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
              {isPresentationMode ? 'Planches' : activeSection?.code}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
