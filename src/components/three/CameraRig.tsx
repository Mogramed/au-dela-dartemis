import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { getHotspotPosition, hotspots, type HotspotId } from '@/data/hotspots'
import type { ViewerMode } from '@/stores/viewerStore'

type CameraRigProps = {
  mode: ViewerMode
  resetNonce: number
  selectedHotspot: HotspotId
  useModelPosition: boolean
}

const presetMap: Record<ViewerMode, { position: [number, number, number]; target: [number, number, number] }> = {
  exterior: { position: [4.8, 1.9, 4.5], target: [0.05, 0.05, 0] },
  interior: { position: [2.3, 1.05, 2.25], target: [-0.55, 0.12, 0] },
  chassis: { position: [4.1, 1.05, 3.4], target: [0.1, -0.62, 0] },
  details: { position: [2.9, 1.2, 2.55], target: [0.4, 0.1, 0] },
  cinematic: { position: [5.8, 2.25, 3.1], target: [0.35, 0.12, 0] },
}

function CameraRig({ mode, resetNonce, selectedHotspot, useModelPosition }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const { camera } = useThree()

  const targetPreset = useMemo(() => {
    const basePreset = presetMap[mode]
    if (mode !== 'details') {
      return basePreset
    }

    const hotspot = hotspots.find((item) => item.id === selectedHotspot)
    return hotspot
      ? {
          position: basePreset.position,
          target: getHotspotPosition(hotspot, useModelPosition),
        }
      : basePreset
  }, [mode, selectedHotspot, useModelPosition])

  useEffect(() => {
    camera.position.set(...targetPreset.position)
    camera.lookAt(...targetPreset.target)
    controlsRef.current?.target.set(...targetPreset.target)
    controlsRef.current?.update()
  }, [camera, resetNonce, targetPreset])

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={mode === 'cinematic'}
      autoRotateSpeed={0.55}
      dampingFactor={0.08}
      enableDamping
      enablePan={false}
      maxDistance={7.8}
      minDistance={1.8}
      maxPolarAngle={Math.PI * 0.62}
      rotateSpeed={0.58}
      zoomSpeed={0.78}
      zoomToCursor
    />
  )
}

export default CameraRig
