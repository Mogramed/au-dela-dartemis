import { useEffect, useState } from 'react'
import { shouldReduceEffects } from '@/utils/performance'

function ProgressBar() {
  const [progress, setProgress] = useState(0)

  if (shouldReduceEffects()) {
    return null
  }

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const nextProgress =
        scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100
      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-ice via-lime-300 to-lunar transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
