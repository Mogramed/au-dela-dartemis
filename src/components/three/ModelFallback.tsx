import { useState } from 'react'
import ScanLine from '@/components/ui/ScanLine'

type ModelFallbackProps = {
  description: string
  poster: string
  title: string
  videoUrl?: string
}

function ModelFallback({
  description,
  poster,
  title,
  videoUrl,
}: ModelFallbackProps) {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <div className="image-frame min-h-[520px]">
      <ScanLine />
      {videoUrl && !videoFailed ? (
        <video
          autoPlay
          className="h-full min-h-[520px] w-full object-cover"
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          src={videoUrl}
        />
      ) : (
        <img
          alt={title}
          className="h-full min-h-[520px] w-full object-cover"
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
