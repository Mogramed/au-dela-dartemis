import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { getHotspotDetailTarget, hotspots, type HotspotId } from '@/data/hotspots'
import type { ViewerFocusMode, ViewerMode } from '@/stores/viewerStore'
import type { ModelBounds } from '@/components/three/RoverModel'

type CameraRigProps = {
  allowInteraction?: boolean
  cinematicActive: boolean
  cinematicPaused: boolean
  focusMode: ViewerFocusMode
  modelBounds: ModelBounds | null
  mode: ViewerMode
  presentationProgress?: number
  resetNonce: number
  selectedHotspot: HotspotId
  useModelPosition: boolean
}

type CameraPreset = {
  fov: number
  maxDistance: number
  minDistance: number
  position: THREE.Vector3
  target: THREE.Vector3
}

const fallbackBounds: ModelBounds = {
  center: [0, -0.18, 0],
  max: [2.3, 0.96, 1.15],
  min: [-2.3, -1.02, -1.15],
  radius: 2.75,
  size: [4.6, 1.98, 2.3],
}

const dampVector3 = (
  current: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  delta: number,
) => {
  current.x = THREE.MathUtils.damp(current.x, target.x, lambda, delta)
  current.y = THREE.MathUtils.damp(current.y, target.y, lambda, delta)
  current.z = THREE.MathUtils.damp(current.z, target.z, lambda, delta)
}

const makeTarget = (bounds: ModelBounds, yOffset = 0) =>
  new THREE.Vector3(bounds.center[0], bounds.center[1] + yOffset, bounds.center[2])

const makeOffsetPosition = (
  target: THREE.Vector3,
  unit: number,
  offset: [number, number, number],
  directionX = 1,
  directionZ = 1,
) =>
  new THREE.Vector3(
    target.x + offset[0] * unit * directionX,
    target.y + offset[1] * unit,
    target.z + offset[2] * unit * directionZ,
  )

const applyHotspotBias = (
  preset: CameraPreset,
  focusMode: ViewerFocusMode,
  hotspotId: HotspotId,
  mode: ViewerMode,
) => {
  if (focusMode === 'normal') {
    return preset
  }

  const hotspot = hotspots.find((item) => item.id === hotspotId)

  if (!hotspot) {
    return preset
  }

  const hotspotTarget = new THREE.Vector3(...getHotspotDetailTarget(hotspot))
  const modeFactor = mode === 'cinematic' ? 0.68 : mode === 'interior' || mode === 'chassis' ? 0.58 : 1
  const bias = (focusMode === 'isolate' ? 0.28 : 0.16) * modeFactor
  const target = preset.target.clone().lerp(hotspotTarget, bias)
  const delta = hotspotTarget.clone().sub(preset.target).multiplyScalar(bias * 0.46)
  const position = preset.position.clone().add(delta)

  return {
    ...preset,
    fov: preset.fov - (focusMode === 'isolate' ? 1.2 : 0.6),
    minDistance: Math.max(0.18, preset.minDistance - (focusMode === 'isolate' ? 0.08 : 0.03)),
    position,
    target,
  }
}

const getCinematicPreset = (hotspotId: HotspotId, bounds: ModelBounds) => {
  const hotspot = hotspots.find((item) => item.id === hotspotId)
  const fallbackTarget = makeTarget(bounds, bounds.size[1] * 0.1)

  if (!hotspot) {
    return {
      fov: 28.6,
      maxDistance: Math.max(bounds.radius * 3.8, 4.8),
      minDistance: 0.4,
      position: makeOffsetPosition(fallbackTarget, Math.max(bounds.radius * 0.92, 1.7), [1.48, 0.44, 1.02]),
      target: fallbackTarget,
    }
  }

  const target = new THREE.Vector3(
    ...(hotspot.cinematicTarget ?? hotspot.detailTarget ?? hotspot.modelPosition ?? hotspot.position),
  )
  const offset = hotspot.cinematicOffset ?? hotspot.detailOffset ?? [1.42, 0.42, 0.96]
  const directionX = target.x >= 0 ? 1 : -1
  const directionZ = Math.abs(target.z) >= 0.18 ? (target.z >= 0 ? 1 : -1) : 1

  return {
    fov: hotspot.cinematicFov ?? 27.4,
    maxDistance: Math.max(bounds.radius * 4, 4.8),
    minDistance: 0.34,
    position: makeOffsetPosition(target, 1, offset, directionX, directionZ),
    target,
  }
}

function CameraRig({
  allowInteraction = true,
  cinematicActive,
  cinematicPaused,
  focusMode,
  modelBounds,
  mode,
  presentationProgress,
  resetNonce,
  selectedHotspot,
  useModelPosition,
}: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const isAnimatingRef = useRef(true)
  const smoothedTargetRef = useRef(new THREE.Vector3())
  const desiredPositionRef = useRef(new THREE.Vector3())
  const desiredTargetRef = useRef(new THREE.Vector3())
  const desiredFovRef = useRef(31)
  const { camera, invalidate } = useThree()

  const targetPreset = useMemo<CameraPreset>(() => {
    const bounds = modelBounds ?? fallbackBounds
    const baseUnit = Math.max(bounds.radius * 0.9, 1.55)

    if (mode === 'details' && useModelPosition) {
      const hotspot = hotspots.find((item) => item.id === selectedHotspot)

      if (hotspot) {
        const rawTarget = getHotspotDetailTarget(hotspot)
        const target = new THREE.Vector3(...rawTarget)
        const directionX = rawTarget[0] >= 0 ? 1 : -1
        const directionZ = Math.abs(rawTarget[2]) >= 0.24 ? (rawTarget[2] >= 0 ? 1 : -1) : 1
        const fallbackOffset: [number, number, number] = [0.56, 0.16, 0.46]
        const rawOffset = hotspot.detailOffset ?? [1.12, 0.34, 0.78]
        const offset: [number, number, number] = [
          Math.max(rawOffset[0], fallbackOffset[0]),
          Math.max(rawOffset[1], fallbackOffset[1]),
          Math.max(rawOffset[2], fallbackOffset[2]),
        ]

        return {
          fov: 24,
          maxDistance: baseUnit * 3.2,
          minDistance: 0.18,
          position: makeOffsetPosition(target, 0.82, offset, directionX, directionZ),
          target,
        }
      }
    }

    let basePreset: CameraPreset

    switch (mode) {
      case 'interior': {
        const target = makeTarget(bounds, bounds.size[1] * 0.02)

        basePreset = {
          fov: 32,
          maxDistance: baseUnit * 3.8,
          minDistance: 0.2,
          position: makeOffsetPosition(target, baseUnit, [1.26, 0.2, 0.88]),
          target,
        }
        break
      }
      case 'chassis': {
        const target = new THREE.Vector3(
          bounds.center[0],
          bounds.min[1] + bounds.size[1] * 0.24,
          bounds.center[2],
        )

        basePreset = {
          fov: 31,
          maxDistance: baseUnit * 3.8,
          minDistance: 0.24,
          position: makeOffsetPosition(target, baseUnit, [1.18, 0.14, 0.96]),
          target,
        }
        break
      }
      case 'cinematic': {
        basePreset = getCinematicPreset(selectedHotspot, bounds)
        break
      }
      case 'details': {
        const target = makeTarget(bounds, bounds.size[1] * 0.08)

        basePreset = {
          fov: 28,
          maxDistance: baseUnit * 3.4,
          minDistance: 0.24,
          position: makeOffsetPosition(target, baseUnit, [0.88, 0.26, 0.62]),
          target,
        }
        break
      }
      case 'exterior':
      default: {
        const target = makeTarget(bounds, bounds.size[1] * 0.08)

        basePreset = {
          fov: 31,
          maxDistance: baseUnit * 4.4,
          minDistance: 0.42,
          position: makeOffsetPosition(target, baseUnit, [1.34, 0.36, 1.04]),
          target,
        }
        break
      }
    }

    if (mode !== 'cinematic' && useModelPosition) {
      return applyHotspotBias(basePreset, focusMode, selectedHotspot, mode)
    }

    return basePreset
  }, [focusMode, mode, modelBounds, selectedHotspot, useModelPosition])

  useEffect(() => {
    desiredPositionRef.current.copy(targetPreset.position)
    desiredTargetRef.current.copy(targetPreset.target)
    desiredFovRef.current = targetPreset.fov
    isAnimatingRef.current = true
    invalidate()
  }, [invalidate, resetNonce, targetPreset])

  useEffect(() => {
    smoothedTargetRef.current.copy(targetPreset.target)
  }, [])

  useFrame((state, delta) => {
    const controls = controlsRef.current

    if (!controls || !(camera instanceof THREE.PerspectiveCamera)) {
      return
    }

    if (!isAnimatingRef.current && mode !== 'cinematic') {
      return
    }

    const lambda = mode === 'cinematic' ? 3.1 : 6.2
    const cinematicMotion =
      mode === 'cinematic' && !cinematicPaused
        ? new THREE.Vector3(
            Math.sin(state.clock.elapsedTime * 0.62) * 0.08,
            Math.sin(state.clock.elapsedTime * 0.28) * 0.05,
            Math.cos(state.clock.elapsedTime * 0.48) * 0.06,
          )
        : new THREE.Vector3()
    const presentationMotion =
      typeof presentationProgress === 'number'
        ? new THREE.Vector3(
            THREE.MathUtils.lerp(-0.22, 0.22, presentationProgress),
            Math.sin(presentationProgress * Math.PI) * 0.08,
            THREE.MathUtils.lerp(0.12, -0.12, presentationProgress),
          )
        : new THREE.Vector3()
    const desiredPosition =
      mode === 'cinematic'
        ? desiredPositionRef.current.clone().add(cinematicMotion)
        : desiredPositionRef.current.clone().add(presentationMotion)
    const desiredTarget =
      mode === 'cinematic'
        ? desiredTargetRef.current
            .clone()
            .add(new THREE.Vector3(0, cinematicPaused ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.02, 0))
        : desiredTargetRef.current
            .clone()
            .add(
              typeof presentationProgress === 'number'
                ? new THREE.Vector3(
                    THREE.MathUtils.lerp(-0.08, 0.08, presentationProgress),
                    0,
                    0,
                  )
                : new THREE.Vector3(),
            )

    dampVector3(camera.position, desiredPosition, lambda, delta)
    dampVector3(smoothedTargetRef.current, desiredTarget, lambda, delta)
    camera.fov = THREE.MathUtils.damp(camera.fov, desiredFovRef.current, lambda, delta)
    camera.updateProjectionMatrix()

    controls.target.copy(smoothedTargetRef.current)
    controls.update()

    const stillAnimating =
      camera.position.distanceTo(desiredPosition) > 0.012 ||
      smoothedTargetRef.current.distanceTo(desiredTarget) > 0.012 ||
      Math.abs(camera.fov - desiredFovRef.current) > 0.05 ||
      mode === 'cinematic'

    if (stillAnimating) {
      invalidate()
      return
    }

    isAnimatingRef.current = false
  })

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={false}
      dampingFactor={0.09}
      enabled={allowInteraction && (!cinematicActive || cinematicPaused)}
      enableDamping
      enablePan={false}
      enableZoom={allowInteraction && (!cinematicActive || cinematicPaused)}
      maxDistance={targetPreset.maxDistance}
      minDistance={targetPreset.minDistance}
      maxPolarAngle={Math.PI * 0.62}
      rotateSpeed={0.46}
      zoomSpeed={0.88}
      zoomToCursor
    />
  )
}

export default CameraRig
