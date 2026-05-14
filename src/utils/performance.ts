type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number
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
  if (typeof window === 'undefined') {
    return false
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const memory = (navigator as NavigatorWithDeviceMemory).deviceMemory ?? 8

  return coarsePointer || memory <= 4
}
