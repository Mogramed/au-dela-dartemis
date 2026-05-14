import { useEffect } from 'react'
import KeyboardControls from '@/components/presentation/KeyboardControls'
import SlideView from '@/components/presentation/SlideView'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import { siteContent } from '@/data/siteContent'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { usePresentationMode } from '@/hooks/usePresentationMode'
import { usePresentationStore } from '@/stores/presentationStore'

function PresentationMode() {
  const slides = siteContent.presentationSlides
  const activeSlide = usePresentationStore((state) => state.activeSlide)
  const nextSlide = usePresentationStore((state) => state.nextSlide)
  const previousSlide = usePresentationStore((state) => state.previousSlide)
  const setSlideCount = usePresentationStore((state) => state.setSlideCount)
  const { openArchive } = usePresentationMode()

  useEffect(() => {
    setSlideCount(slides.length)
  }, [setSlideCount, slides.length])

  useKeyboardNavigation({
    onEscape: openArchive,
    onNext: nextSlide,
    onPrevious: previousSlide,
  })

  const slide = slides[activeSlide] ?? slides[0]

  return (
    <div className="relative min-h-screen overflow-hidden bg-space text-lunar">
      <NoiseOverlay />
      <SlideView index={activeSlide} slide={slide} total={slides.length} />
      <KeyboardControls
        onExit={openArchive}
        onNext={nextSlide}
        onPrevious={previousSlide}
      />
    </div>
  )
}

export default PresentationMode
