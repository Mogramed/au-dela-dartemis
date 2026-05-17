import { Billboard, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getHotspotPosition, hotspots, type HotspotId } from '@/data/hotspots'
import type { ViewerMode } from '@/stores/viewerStore'

type HotspotsProps = {
  mode: ViewerMode
  onSelectHotspot: (id: HotspotId) => void
  selectedHotspot: HotspotId
  useModelPosition: boolean
}

function Hotspots({ mode, onSelectHotspot, selectedHotspot, useModelPosition }: HotspotsProps) {
  const activeHotspot = hotspots.find((hotspot) => hotspot.id === selectedHotspot) ?? hotspots[0]
  const ringRef = useRef<THREE.Mesh | null>(null)
  const outerRingRef = useRef<THREE.Mesh | null>(null)
  const beamRef = useRef<THREE.Mesh | null>(null)

  if (!activeHotspot) {
    return null
  }

  const accentColor = useMemo(
    () => new THREE.Color(activeHotspot.accentColor ?? '#d8ff79'),
    [activeHotspot.accentColor],
  )
  const position = getHotspotPosition(activeHotspot, useModelPosition)

  useFrame((state) => {
    const pulse = (Math.sin(state.clock.elapsedTime * 2.2) + 1) * 0.5
    const baseScale = 1 + pulse * 0.12
    const outerScale = 1.08 + pulse * 0.18

    if (ringRef.current) {
      ringRef.current.scale.setScalar(baseScale)
    }

    if (outerRingRef.current) {
      outerRingRef.current.scale.setScalar(outerScale)
      const outerMaterial = outerRingRef.current.material
      if (outerMaterial instanceof THREE.MeshBasicMaterial) {
        outerMaterial.opacity = 0.18 + pulse * 0.16
      }
    }

    if (beamRef.current) {
      const beamMaterial = beamRef.current.material
      if (beamMaterial instanceof THREE.MeshBasicMaterial) {
        beamMaterial.opacity = 0.16 + pulse * 0.08
      }
    }
  })

  return (
    <group position={position}>
      <Billboard>
        <group>
          <mesh onClick={() => onSelectHotspot(activeHotspot.id)}>
            <sphereGeometry args={[0.05, 18, 18]} />
            <meshBasicMaterial color={accentColor} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.006, 0.014, 0.26, 12]} />
            <meshBasicMaterial color={accentColor} opacity={0.2} toneMapped={false} transparent />
          </mesh>
          <mesh ref={beamRef} position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.012, 0.022, 0.26, 12]} />
            <meshBasicMaterial color={accentColor} opacity={0.16} toneMapped={false} transparent />
          </mesh>
          <mesh ref={ringRef} rotation={[0, 0, Math.PI / 8]}>
            <ringGeometry args={[0.08, 0.11, 32]} />
            <meshBasicMaterial color="#f2f2ea" opacity={0.94} toneMapped={false} transparent />
          </mesh>
          <mesh ref={outerRingRef} rotation={[0, 0, Math.PI / 5]}>
            <ringGeometry args={[0.13, 0.155, 40]} />
            <meshBasicMaterial color={accentColor} opacity={0.24} toneMapped={false} transparent />
          </mesh>
        </group>
      </Billboard>
      {mode !== 'details' ? (
        <Html center distanceFactor={11} occlude position={[0, 0.22, 0]}>
          <div
            className="pointer-events-none rounded-sm border bg-black/62 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lunar"
            style={{
              borderColor: `${activeHotspot.accentColor ?? '#c6ff3e'}55`,
              boxShadow: `0 0 24px ${activeHotspot.accentColor ?? '#c6ff3e'}20`,
            }}
          >
            {activeHotspot.label}
          </div>
        </Html>
      ) : null}
    </group>
  )
}

export default Hotspots
