import { useEffect, useRef, useState } from 'react'
import { animate, cubicBezier, stagger } from 'animejs'
import { clsx } from 'clsx'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type BootSequenceProps = {
  visible: boolean
}

const bootLines = [
  'CHARGEMENT DE LA MAQUETTE...',
  "AU-DELÀ D'ARTÉMIS",
  'ARCHIVE DU PROJET',
  'BURON MATÉO - STRATE DESIGN',
]

const bootEase = cubicBezier(0.16, 1, 0.3, 1)

function BootSequence({ visible }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) {
      setProgress(100)
      return undefined
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          return 100
        }

        return Math.min(current + (prefersReducedMotion ? 40 : 9), 100)
      })
    }, prefersReducedMotion ? 90 : 180)

    return () => window.clearInterval(interval)
  }, [prefersReducedMotion, visible])

  useEffect(() => {
    if (!visible || prefersReducedMotion || !containerRef.current) {
      return undefined
    }

    const targets = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-boot-line]'),
    )

    animate(targets, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(120),
      duration: 820,
      ease: bootEase,
    })

    return undefined
  }, [prefersReducedMotion, visible])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[80] flex items-center justify-center bg-space px-4 transition-opacity duration-700',
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className="hud-panel grid-surface noise-surface w-full max-w-3xl overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
        ref={containerRef}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-300/60 to-transparent" />
        <div className="space-y-3">
          {bootLines.map((line) => (
            <p
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-lunar/88 sm:text-[13px]"
              data-boot-line
              key={line}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
            <span>Chargement</span>
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="h-2 border border-white/10 bg-white/[0.02]">
            <div
              className="h-full bg-gradient-to-r from-ice via-lime-300 to-lunar transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BootSequence
