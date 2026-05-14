import { RoundedBox, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { ViewerMode } from '@/stores/viewerStore'

type RoverModelProps = {
  modelAvailable: boolean
  modelPath: string
  mode: ViewerMode
}

const MODEL_TARGET_LENGTH = 4.75
const MODEL_ROTATION_Y = -Math.PI / 2
const MODEL_FLOOR_OFFSET = -0.24

const getModeOpacity = (mode: ViewerMode) => {
  switch (mode) {
    case 'interior':
      return 0.22
    case 'chassis':
      return 0.38
    default:
      return 0.98
  }
}

const tuneMaterial = (material: THREE.Material, mode: ViewerMode) => {
  const nextMaterial = material.clone()
  const opacity = getModeOpacity(mode)

  if ('opacity' in nextMaterial) {
    nextMaterial.opacity = opacity
  }

  if ('transparent' in nextMaterial) {
    nextMaterial.transparent = opacity < 0.995
  }

  if ('depthWrite' in nextMaterial) {
    nextMaterial.depthWrite = opacity >= 0.45
  }

  if ('side' in nextMaterial && opacity < 0.45) {
    nextMaterial.side = THREE.DoubleSide
  }

  if ('roughness' in nextMaterial) {
    const roughness =
      typeof nextMaterial.roughness === 'number' ? nextMaterial.roughness : 0.56
    nextMaterial.roughness = Math.min(Math.max(roughness, 0.36), 0.9)
  }

  if ('metalness' in nextMaterial) {
    const metalness =
      typeof nextMaterial.metalness === 'number' ? nextMaterial.metalness : 0.16
    nextMaterial.metalness = Math.min(Math.max(metalness, 0.14), 0.48)
  }

  if ('emissive' in nextMaterial) {
    nextMaterial.emissive = new THREE.Color(mode === 'cinematic' ? '#182330' : '#0f141b')
  }

  if ('emissiveIntensity' in nextMaterial) {
    nextMaterial.emissiveIntensity = mode === 'cinematic' ? 0.09 : 0.04
  }

  return nextMaterial
}

function LoadedModel({ modelPath, mode }: Pick<RoverModelProps, 'modelPath' | 'mode'>) {
  const { scene } = useGLTF(modelPath)

  const preparedScene = useMemo(() => {
    const clonedScene = scene.clone(true)
    const root = new THREE.Group()

    clonedScene.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(clonedScene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const dominantAxis = Math.max(size.x, size.z)
    const scale = dominantAxis > 0 ? MODEL_TARGET_LENGTH / dominantAxis : 1

    clonedScene.position.sub(center)
    clonedScene.rotation.y = MODEL_ROTATION_Y
    clonedScene.scale.setScalar(scale)

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return
      }

      child.castShadow = false
      child.receiveShadow = false

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => tuneMaterial(material, mode))
        return
      }

      child.material = tuneMaterial(child.material, mode)
    })

    root.add(clonedScene)
    root.position.set(0, MODEL_FLOOR_OFFSET, 0)

    return root
  }, [mode, scene])

  return <primitive object={preparedScene} />
}

function ProxyModel({ mode }: Pick<RoverModelProps, 'mode'>) {
  const shellOpacity = mode === 'interior' || mode === 'chassis' ? 0.2 : 0.94
  const showDetails = mode === 'details' || mode === 'chassis'

  return (
    <group position={[0, 0.18, 0]} rotation={[0.04, -0.42, 0]}>
      <RoundedBox args={[4.6, 1.1, 1.85]} position={[0.3, 0.1, 0]} radius={0.22} smoothness={6}>
        <meshStandardMaterial
          color="#d6dbe3"
          emissive="#141a28"
          emissiveIntensity={0.2}
          metalness={0.86}
          opacity={shellOpacity}
          roughness={0.2}
          transparent
        />
      </RoundedBox>

      <RoundedBox args={[2.8, 1.02, 1.45]} position={[-0.15, 0.82, 0]} radius={0.18} smoothness={6}>
        <meshStandardMaterial
          color="#6a738e"
          emissive="#8fb8ff"
          emissiveIntensity={0.18}
          metalness={0.78}
          opacity={mode === 'interior' ? 0.1 : 0.56}
          roughness={0.18}
          transparent
        />
      </RoundedBox>

      <RoundedBox args={[1.7, 0.58, 1.34]} position={[1.82, 0.46, 0]} radius={0.14} smoothness={5}>
        <meshStandardMaterial
          color="#baff42"
          emissive="#c6ff3e"
          emissiveIntensity={0.34}
          metalness={0.32}
          opacity={mode === 'interior' ? 0.72 : 0.44}
          roughness={0.28}
          transparent
        />
      </RoundedBox>

      <RoundedBox args={[0.66, 0.55, 0.58]} position={[-0.9, 0.45, 0.55]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#171a21"
          emissive="#c6ff3e"
          emissiveIntensity={0.06}
          metalness={0.72}
          roughness={0.18}
        />
      </RoundedBox>
      <RoundedBox args={[0.66, 0.55, 0.58]} position={[-0.16, 0.45, -0.55]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#171a21"
          emissive="#c6ff3e"
          emissiveIntensity={0.06}
          metalness={0.72}
          roughness={0.18}
        />
      </RoundedBox>

      {[-1.6, 1.55].map((x) =>
        [-1.05, 1.05].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.78, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 0.42, 36]} />
            <meshStandardMaterial
              color={showDetails ? '#c6ff3e' : '#545b67'}
              metalness={0.42}
              roughness={0.56}
            />
          </mesh>
        )),
      )}

      <mesh position={[1.08, -0.38, -0.76]}>
        <boxGeometry args={[1.18, 0.3, 0.42]} />
        <meshStandardMaterial color="#4f555f" metalness={0.5} roughness={0.46} />
      </mesh>
      <mesh position={[1.88, -0.12, -0.54]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.74, 16]} />
        <meshStandardMaterial color="#a4abb5" metalness={0.62} roughness={0.32} />
      </mesh>

      <mesh position={[1.22, 1.26, 0.06]} rotation={[0.22, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.82, 12]} />
        <meshStandardMaterial color="#d6d9de" metalness={0.68} roughness={0.26} />
      </mesh>
      <mesh position={[1.64, 1.58, 0.18]} rotation={[0.08, 0.1, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.03, 32]} />
        <meshStandardMaterial color="#ebedf0" emissive="#8fb8ff" emissiveIntensity={0.1} />
      </mesh>

      <lineSegments position={[0.3, -0.18, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.8, 1.3, 2)]} />
        <lineBasicMaterial color="#f2f2ea" opacity={0.36} transparent />
      </lineSegments>
    </group>
  )
}

function RoverModel({ modelAvailable, modelPath, mode }: RoverModelProps) {
  if (modelAvailable) {
    return <LoadedModel mode={mode} modelPath={modelPath} />
  }

  return <ProxyModel mode={mode} />
}

export default RoverModel
