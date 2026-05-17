import { clsx } from 'clsx'
import type { MissionSection } from '@/data/sections'

type MissionNavProps = {
  currentSection: string
  sections: MissionSection[]
}

function MissionNav({ currentSection, sections }: MissionNavProps) {
  const activeSection =
    sections.find((section) => section.id === currentSection) ?? sections[0]

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
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[112px] group-hover:opacity-100">
                {section.label}
              </span>
            </a>
          )
        })}
      </nav>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-space/92 px-3 pt-3 backdrop-blur-md xl:hidden"
        style={{ paddingBottom: 'max(0.85rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
              Navigation
            </p>
            <p className="mt-1 truncate text-sm uppercase text-lunar">
              {activeSection.code} / {activeSection.label}
            </p>
          </div>
          <span className="rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
            {sections.length} modules
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section) => {
            const isActive = currentSection === section.id
            return (
              <a
                className={clsx(
                  'mobile-nav-chip',
                )}
                data-active={isActive ? 'true' : 'false'}
                href={`#${section.id}`}
                key={section.id}
              >
                <span>{section.code}</span>
                <span>{section.label}</span>
              </a>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default MissionNav
