import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { GalleryItem } from '@/data/gallery'

type ImageModalProps = {
  item: GalleryItem | null
  onClose: () => void
}

function ImageModal({ item, onClose }: ImageModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!item) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [item, onClose])

  useEffect(() => {
    if (!item) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.body.dataset.modalOpen = 'true'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
      document.body.style.paddingRight = previousPaddingRight
      delete document.body.dataset.modalOpen
    }
  }, [item])

  if (!item || !mounted) {
    return null
  }

  return createPortal(
    <div
      aria-label={item.title}
      aria-modal="true"
      className="fixed inset-0 z-[120] overflow-y-auto bg-black/92 backdrop-blur-md"
      data-lenis-prevent-wheel
      onClick={onClose}
      role="dialog"
    >
      <div className="min-h-full px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-6 md:px-8">
        <div
          className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative w-full rounded-sm border border-white/10 bg-space/96 shadow-[0_38px_120px_rgba(0,0,0,0.55)]">
            <button
              aria-label="Fermer l'image"
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 bg-black/72 text-lunar transition-colors hover:bg-white/10"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-4 p-3 sm:p-4 md:grid-cols-[minmax(0,1fr)_300px] md:p-5">
              <div className="image-frame flex min-h-[240px] items-center justify-center overflow-hidden bg-black sm:min-h-[360px] md:min-h-[70vh] md:max-h-[78vh]">
                <img
                  alt={item.title}
                  className="max-h-[70vh] w-full object-contain sm:max-h-[74vh]"
                  src={item.src}
                />
              </div>

              <div className="flex flex-col gap-3 rounded-sm border border-white/10 bg-white/[0.03] p-4 md:justify-end">
                <p className="mono-copy">{item.category}</p>
                <h3 className="text-2xl uppercase leading-tight">{item.title}</h3>
                <p className="text-sm leading-7 text-lunar/80">{item.description}</p>
                <button
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-sm border border-white/10 bg-white/[0.03] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-lunar transition-colors hover:bg-white/[0.08]"
                  onClick={onClose}
                  type="button"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ImageModal
