import { clsx } from 'clsx'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type ButtonVariant = 'solid' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md'

type CommonButtonProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

type AnchorButtonProps = CommonButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type NativeButtonProps = CommonButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'border-lime-300/30 bg-lime-300/10 text-lunar hover:bg-lime-300/16',
  ghost:
    'border-white/12 bg-white/[0.03] text-lunar hover:bg-white/[0.08]',
  outline:
    'border-white/16 bg-transparent text-lunar hover:bg-white/[0.05]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-[11px]',
  md: 'min-h-11 px-5 text-[11px]',
}

export const buttonClassNames = ({
  className,
  size = 'md',
  variant = 'ghost',
}: Pick<CommonButtonProps, 'className' | 'size' | 'variant'>) =>
  clsx(
    'inline-flex items-center justify-center gap-2 rounded-sm border font-mono uppercase tracking-[0.16em] transition-colors duration-300',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

function Button(props: AnchorButtonProps | NativeButtonProps) {
  const { children, className, icon, size, variant } = props
  const classes = buttonClassNames({ className, size, variant })

  if ('href' in props && props.href) {
    const { href, target, rel, ...anchorProps } = props

    return (
      <a
        className={classes}
        href={href}
        rel={rel ?? (target === '_blank' ? 'noreferrer' : undefined)}
        target={target}
        {...anchorProps}
      >
        {icon}
        <span>{children}</span>
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props as NativeButtonProps

  return (
    <button className={classes} type={type} {...buttonProps}>
      {icon}
      <span>{children}</span>
    </button>
  )
}

export default Button
