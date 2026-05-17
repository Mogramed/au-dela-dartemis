type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number
}

const getDeviceFlags = () => {
  if (typeof window === 'undefined') {
    return {
      coarsePointer: false,
      lowMemory: false,
      prefersReducedMotion: false,
    }
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const memory = (navigator as NavigatorWithDeviceMemory).deviceMemory ?? 8

  return {
    coarsePointer,
    lowMemory: memory <= 4,
    prefersReducedMotion,
  }
}

export const supportsWebGL = () => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

export const shouldPreferLiteViewer = () => {
  const { coarsePointer, lowMemory } = getDeviceFlags()

  return coarsePointer || lowMemory
}

export const shouldReduceEffects = () => {
  const { coarsePointer, lowMemory, prefersReducedMotion } = getDeviceFlags()

  return prefersReducedMotion || coarsePointer || lowMemory
}

export const shouldPreloadHeavyAssets = () => !shouldReduceEffects()
