import { clsx } from 'clsx'
import { useState } from 'react'
import ScanLine from '@/components/ui/ScanLine'

type ModelFallbackProps = {
  className?: string
  description: string
  poster: string
  title: string
  videoUrl?: string
}

function ModelFallback({
  className,
  description,
  poster,
  title,
  videoUrl,
}: ModelFallbackProps) {
  const [videoFailed, setVideoFailed] = useState(false)
  const frameClassName = className
    ? clsx('image-frame', className)
    : 'image-frame min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]'
  const mediaClassName = className
    ? 'h-full w-full object-cover'
    : 'h-full min-h-[360px] w-full object-cover sm:min-h-[420px] lg:min-h-[520px]'

  return (
    <div className={frameClassName}>
      <ScanLine />
      {videoUrl && !videoFailed ? (
        <video
          autoPlay
          className={mediaClassName}
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          src={videoUrl}
        />
      ) : (
        <img
          alt={title}
          className={mediaClassName}
          loading="lazy"
          src={poster}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-space via-space/36 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
        <p className="mono-copy">{title}</p>
        <p className="max-w-md text-sm leading-7 text-lunar/82">{description}</p>
      </div>
    </div>
  )
}

export default ModelFallback
