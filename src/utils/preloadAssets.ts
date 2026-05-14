export const preloadAssets = (assets: string[]) => {
  if (typeof window === 'undefined') {
    return
  }

  assets.forEach((asset) => {
    if (asset.endsWith('.mp4') || asset.endsWith('.webm')) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = asset
      document.head.append(link)
      return
    }

    const image = new Image()
    image.decoding = 'async'
    image.src = asset
  })
}
