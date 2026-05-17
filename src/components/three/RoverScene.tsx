import { Canvas } from '@react-three/fiber'
import { clsx } from 'clsx'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { AdaptiveDpr } from '@react-three/drei'
import Hotspots from '@/components/three/Hotspots'
import CameraRig from '@/components/three/CameraRig'
import LunarEnvironment from '@/components/three/LunarEnvironment'
import ModelFallback from '@/components/three/ModelFallback'
import RoverModel, { ProxyModel, type ModelBounds } from '@/components/three/RoverModel'
import ViewerErrorBoundary from '@/components/three/ViewerErrorBoundary'
import type { HotspotId } from '@/data/hotspots'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { ViewerFocusMode, ViewerMode } from '@/stores/viewerStore'
import { assetPaths } from '@/utils/assetPaths'
import { supportsWebGL } from '@/utils/performance'

type RoverSceneProps = {
  allowInteraction?: boolean
  cinematicActive: boolean
  cinematicPaused: boolean
  className?: string
  focusMode: ViewerFocusMode
  mode: ViewerMode
  onSelectHotspot: (id: HotspotId) => void
  performanceMode: boolean
  preferHighExterior?: boolean
  presentationProgress?: number
  resetNonce: number
  showInteractionHint?: boolean
  selectedHotspot: HotspotId
}

function RoverScene({
  allowInteraction = true,
  cinematicActive,
  cinematicPaused,
  className,
  focusMode,
  mode,
  onSelectHotspot,
  performanceMode,
  preferHighExterior = false,
  presentationProgress,
  resetNonce,
  showInteractionHint = true,
  selectedHotspot,
}: RoverSceneProps) {
  const isMobile = useIsMobile()
  const [modelBounds, setModelBounds] = useState<ModelBounds | null>(null)
  const [modelReady, setModelReady] = useState(false)
  const [webglAvailable, setWebglAvailable] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const effectiveFocusMode =
    cinematicActive && focusMode === 'isolate' ? 'accent' : focusMode
  const useLiteScene = performanceMode || isMobile || mode === 'interior' || mode === 'chassis'
  const useHighExteriorModel =
    !useLiteScene && (preferHighExterior || mode === 'cinematic' || mode === 'details')
  const useLowExteriorModel = !useHighExteriorModel && mode !== 'interior' && mode !== 'chassis'

  const modelPath = useMemo(() => {
    if (mode === 'interior') {
      return assetPaths.models.interior
    }

    if (mode === 'chassis') {
      return assetPaths.models.chassis
    }

    return useHighExteriorModel ? assetPaths.models.high : assetPaths.models.low
  }, [mode, useHighExteriorModel])

  const sceneHotspotsEnabled =
    modelReady &&
    !useLowExteriorModel &&
    !performanceMode &&
    !isMobile &&
    mode !== 'interior' &&
    mode !== 'chassis'
  const activeModelLabel = useMemo(() => {
    if (useHighExteriorModel) {
      return 'GLB hero actif'
    }

    if (performanceMode && !isMobile && mode !== 'interior' && mode !== 'chassis') {
      return 'GLB performance actif'
    }

    if (useLowExteriorModel) {
      return 'GLB optimise actif'
    }

    if (mode === 'interior') {
      return 'GLB interieur actif'
    }

    if (mode === 'chassis') {
      return 'GLB chassis actif'
    }

    return 'GLB exterieur actif'
  }, [isMobile, mode, performanceMode, useHighExteriorModel, useLowExteriorModel])

  useEffect(() => {
    setWebglAvailable(supportsWebGL())
  }, [])

  useEffect(() => {
    setModelReady(false)
    setModelBounds(null)
  }, [modelPath])

  useEffect(() => {
    if (!allowInteraction) {
      return undefined
    }

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
  }, [allowInteraction])

  useEffect(() => {
    const element = containerRef.current

    if (!allowInteraction || !element || isMobile) {
      return undefined
    }

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    const lockPageScroll = () => {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }

    const unlockPageScroll = () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }

    element.addEventListener('pointerenter', lockPageScroll)
    element.addEventListener('pointerleave', unlockPageScroll)
    window.addEventListener('blur', unlockPageScroll)

    return () => {
      unlockPageScroll()
      element.removeEventListener('pointerenter', lockPageScroll)
      element.removeEventListener('pointerleave', unlockPageScroll)
      window.removeEventListener('blur', unlockPageScroll)
    }
  }, [allowInteraction, isMobile])

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

  const frameClassName = className
    ? clsx('relative overflow-hidden rounded-sm border border-white/10 bg-space-soft', className)
    : 'relative h-[420px] overflow-hidden rounded-sm border border-white/10 bg-space-soft sm:h-[520px] lg:h-[620px]'

  return (
    <ViewerErrorBoundary
      fallback={
        <ModelFallback
          description="Le navigateur n'a pas pu charger le GLB proprement. Le viewer bascule vers une vue archive plus stable."
          poster={assetPaths.hero.profile}
          title="Fallback media"
          videoUrl={assetPaths.videos.fallback}
        />
      }
      resetKey={`${modelPath}-${mode}-${performanceMode}`}
    >
      <div
        ref={containerRef}
        className={frameClassName}
        data-lenis-prevent-wheel={allowInteraction ? true : undefined}
        style={{ overscrollBehavior: 'contain', touchAction: allowInteraction ? 'none' : 'pan-y' }}
      >
        <Canvas
          camera={{ far: 40, fov: 31, near: 0.05, position: [4.6, 1.4, 3.9] }}
          dpr={isMobile ? [0.74, 0.9] : useHighExteriorModel ? [0.9, 1.05] : [0.8, 1]}
          frameloop={mode === 'cinematic' ? 'always' : 'demand'}
          gl={{
            alpha: false,
            antialias: useHighExteriorModel,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          performance={{ min: 0.7 }}
          shadows={{ type: THREE.PCFShadowMap }}
        >
          <color args={['#050507']} attach="background" />
          <fog args={['#050507', 10, 22]} attach="fog" />
          <AdaptiveDpr pixelated={useLiteScene} />
          <LunarEnvironment animate={mode === 'cinematic' && !useLiteScene} lite={useLiteScene} />
          <group position={[0, 0, 0]}>
            <Suspense fallback={<ProxyModel mode={mode} />}>
              <RoverModel
                focusMode={effectiveFocusMode}
                modelPath={modelPath}
                mode={mode}
                onBoundsChange={setModelBounds}
                onReady={() => setModelReady(true)}
                presentationProgress={presentationProgress}
                selectedHotspot={selectedHotspot}
              />
            </Suspense>
            {sceneHotspotsEnabled ? (
              <Hotspots
                mode={mode}
                onSelectHotspot={onSelectHotspot}
                selectedHotspot={selectedHotspot}
                useModelPosition
              />
            ) : null}
          </group>
          <CameraRig
            allowInteraction={allowInteraction}
            cinematicActive={cinematicActive}
            cinematicPaused={cinematicPaused}
            focusMode={effectiveFocusMode}
            modelBounds={modelBounds}
            mode={mode}
            presentationProgress={presentationProgress}
            resetNonce={resetNonce}
            selectedHotspot={selectedHotspot}
            useModelPosition={sceneHotspotsEnabled}
          />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 rounded-sm border border-white/10 bg-black/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
          {modelReady ? activeModelLabel : 'Mode attente'}
        </div>

        {showInteractionHint ? (
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-sm border border-white/10 bg-black/38 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
            {allowInteraction ? 'Tourner / zoomer / choisir un point' : 'Sequence guidee'}
          </div>
        ) : null}
      </div>
    </ViewerErrorBoundary>
  )
}

export default RoverScene
