import { Html } from '@react-three/drei'
import { getHotspotPosition, hotspots, type HotspotId } from '@/data/hotspots'

type HotspotsProps = {
  onSelectHotspot: (id: HotspotId) => void
  selectedHotspot: HotspotId
  useModelPosition: boolean
}

function Hotspots({ onSelectHotspot, selectedHotspot, useModelPosition }: HotspotsProps) {
  return (
    <>
      {hotspots.map((hotspot) => {
        const isSelected = hotspot.id === selectedHotspot

        return (
          <group key={hotspot.id} position={getHotspotPosition(hotspot, useModelPosition)}>
            <mesh>
              <sphereGeometry args={[0.055, 24, 24]} />
              <meshBasicMaterial color={isSelected ? '#c6ff3e' : '#f2f2ea'} />
            </mesh>
            <Html center distanceFactor={10} occlude>
              <button
                className={`hotspot-chip inline-flex h-7 min-w-7 items-center justify-center rounded-sm border font-mono text-[10px] uppercase tracking-[0.16em] ${
                  isSelected
                    ? 'border-lime-300/30 bg-lime-300/14 px-2.5 text-lunar'
                    : 'border-white/14 bg-black/55 px-0 text-lunar/72'
                }`}
                onClick={() => onSelectHotspot(hotspot.id)}
                type="button"
              >
                {isSelected ? hotspot.label : '+'}
              </button>
            </Html>
          </group>
        )
      })}
    </>
  )
}

export default Hotspots
