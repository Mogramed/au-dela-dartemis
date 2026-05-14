import { ArrowLeft, ArrowRight, X } from 'lucide-react'

type KeyboardControlsProps = {
  onExit: () => void
  onNext: () => void
  onPrevious: () => void
}

function KeyboardControls({
  onExit,
  onNext,
  onPrevious,
}: KeyboardControlsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-sm border border-white/10 bg-space/84 px-3 py-2 backdrop-blur-md">
      <button
        className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-lunar transition-colors hover:bg-white/[0.08]"
        onClick={onPrevious}
        type="button"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-lunar transition-colors hover:bg-white/[0.08]"
        onClick={onNext}
        type="button"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      <button
        className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-lunar transition-colors hover:bg-white/[0.08]"
        onClick={onExit}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default KeyboardControls
