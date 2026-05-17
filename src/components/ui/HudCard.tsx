import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from 'react'

type HudCardProps = PropsWithChildren<{
  eyebrow?: string
  title?: string
  footer?: ReactNode
  className?: string
}> &
  Omit<ComponentPropsWithoutRef<'article'>, 'children' | 'className'>

function HudCard({ children, eyebrow, title, footer, className, ...articleProps }: HudCardProps) {
  return (
    <article className={clsx('hud-panel p-5', className)} {...articleProps}>
      {eyebrow ? <p className="mono-copy">{eyebrow}</p> : null}
      {title ? <h3 className="mt-3 text-xl uppercase leading-tight">{title}</h3> : null}
      <div className={clsx(title ? 'mt-4' : eyebrow ? 'mt-3' : undefined)}>
        {children}
      </div>
      {footer ? <div className="mt-5 border-t border-white/10 pt-4">{footer}</div> : null}
    </article>
  )
}

export default HudCard
