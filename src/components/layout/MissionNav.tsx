import { clsx } from 'clsx'
import type { MissionSection } from '@/data/sections'

type MissionNavProps = {
  currentSection: string
  sections: MissionSection[]
}

function MissionNav({ currentSection, sections }: MissionNavProps) {
  return (
    <>
      <nav className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
        {sections.map((section) => {
          const isActive = currentSection === section.id
          return (
            <a
              className={clsx(
                'group flex items-center gap-3 rounded-sm border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300',
                isActive
                  ? 'mission-nav-chip border-lime-300/25 bg-lime-300/8 text-lunar'
                  : 'border-white/10 bg-black/35 text-dust hover:bg-white/[0.06] hover:text-lunar',
              )}
              href={`#${section.id}`}
              key={section.id}
            >
              <span>{section.code}</span>
              <span className="hidden min-w-20 group-hover:block">{section.label}</span>
            </a>
          )
        })}
      </nav>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-space/88 px-3 py-3 backdrop-blur-md xl:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {sections.map((section) => {
            const isActive = currentSection === section.id
            return (
              <a
                className={clsx(
                  'shrink-0 rounded-sm border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300',
                  isActive
                    ? 'border-lime-300/25 bg-lime-300/8 text-lunar'
                    : 'border-white/10 bg-white/[0.03] text-dust',
                )}
                href={`#${section.id}`}
                key={section.id}
              >
                {section.code}
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default MissionNav
