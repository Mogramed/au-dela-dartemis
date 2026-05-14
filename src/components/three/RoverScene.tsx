import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { AdaptiveDpr } from '@react-three/drei'
import Hotspots from '@/components/three/Hotspots'
import CameraRig from '@/components/three/CameraRig'
import LunarEnvironment from '@/components/three/LunarEnvironment'
import ModelFallback from '@/components/three/ModelFallback'
import RoverModel from '@/components/three/RoverModel'
import ViewerErrorBoundary from '@/components/three/ViewerErrorBoundary'
import type { HotspotId } from '@/data/hotspots'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { ViewerMode } from '@/stores/viewerStore'
import { assetPaths } from '@/utils/assetPaths'
import { supportsWebGL } from '@/utils/performance'

type RoverSceneProps = {
  mode: ViewerMode
  onSelectHotspot: (id: HotspotId) => void
  performanceMode: boolean
  resetNonce: number
  selectedHotspot: HotspotId
}

function RoverScene({
  mode,
  onSelectHotspot,
  performanceMode,
  resetNonce,
  selectedHotspot,
}: RoverSceneProps) {
  const isMobile = useIsMobile()
  const [modelAvailable, setModelAvailable] = useState(false)
  const [webglAvailable, setWebglAvailable] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const useLiteScene = performanceMode || isMobile || mode === 'interior' || mode === 'chassis'
  const useLowExteriorModel =
    isMobile || (performanceMode && (mode === 'exterior' || mode === 'details' || mode === 'cinematic'))

  const modelPath = useMemo(() => {
    if (mode === 'interior') {
      return assetPaths.models.interior
    }

    if (mode === 'chassis') {
      return assetPaths.models.chassis
    }

    if (useLowExteriorModel) {
      return assetPaths.models.low
    }

    return assetPaths.models.high
  }, [mode, useLowExteriorModel])

  const sceneHotspotsEnabled =
    modelAvailable && !performanceMode && !isMobile && mode !== 'interior' && mode !== 'chassis'
  const activeModelLabel = useMemo(() => {
    if (performanceMode && !isMobile && mode !== 'interior' && mode !== 'chassis') {
      return 'GLB performance actif'
    }

    if (useLowExteriorModel) {
      return 'GLB mobile actif'
    }

    if (mode === 'interior') {
      return 'GLB interieur actif'
    }

    if (mode === 'chassis') {
      return 'GLB chassis actif'
    }

    return 'GLB exterieur actif'
  }, [isMobile, mode, performanceMode, useLowExteriorModel])

  useEffect(() => {
    setWebglAvailable(supportsWebGL())
  }, [])

  useEffect(() => {
    let isMounted = true

    const checkModel = async () => {
      try {
        const response = await fetch(modelPath, { method: 'HEAD' })
        const contentType = response.headers.get('content-type') ?? ''
        if (isMounted) {
          setModelAvailable(response.ok && !contentType.includes('text/html'))
        }
      } catch {
        if (isMounted) {
          setModelAvailable(false)
        }
      }
    }

    void checkModel()

    return () => {
      isMounted = false
    }
  }, [modelPath])

  useEffect(() => {
    const preventViewerWheelScroll = (event: WheelEvent) => {
      const element = containerRef.current

      if (!element || !(event.target instanceof Node) || !element.contains(event.target)) {
        return
      }

      if (event.ctrlKey) {
        return
      }

      event.preventDefault()
    }

    window.addEventListener('wheel', preventViewerWheelScroll, {
      capture: true,
      passive: false,
    })

    return () => {
      window.removeEventListener('wheel', preventViewerWheelScroll, true)
    }
  }, [])

  if (!webglAvailable) {
    return (
      <ModelFallback
        description={
          webglAvailable
            ? 'Le mode media prend le relais sur les machines mobiles ou les appareils plus fragiles.'
            : 'WebGL est indisponible sur cet appareil, le viewer bascule automatiquement vers une vue media.'
        }
        poster={assetPaths.hero.profile}
        title={webglAvailable ? 'Fallback media actif' : 'Fallback media'}
        videoUrl={assetPaths.videos.fallback}
      />
    )
  }

  if (!modelAvailable) {
    return (
      <ModelFallback
        description="Le viewer charge automatiquement le GLB des qu'il est disponible. En attendant, cette vue media garde une lecture propre du projet."
        poster={assetPaths.hero.exterior}
        title="Mode media"
        videoUrl={assetPaths.videos.fallback}
      />
    )
  }

  return (
    <ViewerErrorBoundary
      fallback={
        <ModelFallback
          description="Le GLB existe bien, mais le chargement a echoue dans ce navigateur. Le viewer bascule vers une vue media."
          poster={assetPaths.hero.profile}
          title="Fallback media"
          videoUrl={assetPaths.videos.fallback}
        />
      }
      resetKey={`${modelPath}-${mode}-${performanceMode}`}
    >
      <div
        ref={containerRef}
        className="relative h-[420px] overflow-hidden rounded-sm border border-white/10 bg-space-soft sm:h-[520px] lg:h-[620px]"
        data-lenis-prevent-wheel
        style={{ overscrollBehavior: 'contain', touchAction: 'none' }}
      >
        <Canvas
          camera={{ far: 40, fov: 34, near: 0.1, position: [4.8, 1.9, 4.5] }}
          dpr={isMobile ? [0.8, 0.95] : performanceMode ? [0.85, 1] : [0.95, 1.25]}
          frameloop={mode === 'cinematic' ? 'always' : 'demand'}
          gl={{
            alpha: false,
            antialias: !useLiteScene,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          performance={{ min: 0.7 }}
          shadows={{ type: THREE.PCFShadowMap }}
        >
          <color args={['#050507']} attach="background" />
          <fog args={['#050507', 10, 22]} attach="fog" />
          <AdaptiveDpr pixelated={useLiteScene} />
          <LunarEnvironment lite={useLiteScene} />
          <group position={[0, 0.2, 0]}>
            <Suspense fallback={<RoverModel modelAvailable={false} modelPath={modelPath} mode={mode} />}>
              <RoverModel modelAvailable={modelAvailable} modelPath={modelPath} mode={mode} />
            </Suspense>
            {sceneHotspotsEnabled ? (
              <Hotspots
                onSelectHotspot={onSelectHotspot}
                selectedHotspot={selectedHotspot}
                useModelPosition
              />
            ) : null}
          </group>
          <CameraRig
            mode={mode}
            resetNonce={resetNonce}
            selectedHotspot={selectedHotspot}
            useModelPosition={sceneHotspotsEnabled}
          />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 rounded-sm border border-white/10 bg-black/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
          {modelAvailable ? activeModelLabel : 'Mode proxy en attente du GLB'}
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 rounded-sm border border-white/10 bg-black/38 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
          Drag / Zoom / Tap hotspot
        </div>
      </div>
    </ViewerErrorBoundary>
  )
}

export default RoverScene
