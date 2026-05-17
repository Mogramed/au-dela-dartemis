import { shouldReduceEffects } from '@/utils/performance'

function ScanLine() {
  if (shouldReduceEffects()) {
    return null
  }

  return <div aria-hidden className="pointer-events-none absolute inset-0 scan-surface opacity-70" />
}

export default ScanLine
