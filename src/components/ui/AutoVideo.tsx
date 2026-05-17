import { clsx } from 'clsx'
import type { VideoHTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type AutoVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'autoPlay'> & {
  eager?: boolean
  pauseWhenHidden?: boolean
  playWhenVisible?: boolean
  rootMargin?: string
}

function AutoVideo({
  className,
  controls = false,
  eager = false,
  loop = true,
  muted = true,
  pauseWhenHidden = true,
  playWhenVisible = true,
  playsInline = true,
  preload = 'metadata',
  rootMargin = '160px 0px',
  src,
  ...videoProps
}: AutoVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(Boolean(eager))
  const [isVisible, setIsVisible] = useState(Boolean(eager))

  useEffect(() => {
    const node = videoRef.current

    if (!node || typeof src !== 'string') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const nextVisible = entry?.isIntersecting ?? false

        if (nextVisible) {
          setShouldLoad(true)
        }

        setIsVisible(nextVisible)
      },
      {
        rootMargin,
        threshold: [0, 0.2, 0.5, 0.85],
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, src])

  useEffect(() => {
    const node = videoRef.current

    if (!node) {
      return
    }

    if (!shouldLoad || prefersReducedMotion || !playWhenVisible) {
      node.pause()
      return
    }

    if (isVisible) {
      const playPromise = node.play()

      if (playPromise?.catch) {
        playPromise.catch(() => undefined)
      }

      return
    }

    if (pauseWhenHidden) {
      node.pause()
    }
  }, [isVisible, pauseWhenHidden, playWhenVisible, prefersReducedMotion, shouldLoad])

  return (
    <video
      {...videoProps}
      className={clsx(className)}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={shouldLoad ? preload : 'none'}
      ref={videoRef}
      src={shouldLoad && typeof src === 'string' ? src : undefined}
    />
  )
}

export default AutoVideo
