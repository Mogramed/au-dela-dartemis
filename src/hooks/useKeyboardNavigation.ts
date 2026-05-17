import { useEffect } from 'react'

type KeyboardNavigationOptions = {
  onNext?: () => void
  onPrevious?: () => void
  onEscape?: () => void
}

export const useKeyboardNavigation = ({
  onNext,
  onPrevious,
  onEscape,
}: KeyboardNavigationOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        onNext?.()
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        onPrevious?.()
      }

      if (event.key === 'Escape') {
        onEscape?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEscape, onNext, onPrevious])
}
