import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { GalleryItem } from '@/data/gallery'

type ImageModalProps = {
  item: GalleryItem | null
  onClose: () => void
}

function ImageModal({ item, onClose }: ImageModalProps) {
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

  if (!item) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/86 p-4 backdrop-blur-md sm:p-8">
      <button
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-black/50 text-lunar transition-colors hover:bg-white/10"
        onClick={onClose}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-6">
        <div className="image-frame max-h-[78vh]">
          <img alt={item.title} className="h-full w-full object-contain" src={item.src} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mono-copy">{item.category}</p>
          <h3 className="text-2xl uppercase">{item.title}</h3>
          <p className="max-w-3xl text-sm leading-7 text-lunar/80">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
