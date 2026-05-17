import { RoundedBox, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { getHotspotDetailTarget, hotspots, type HotspotId } from '@/data/hotspots'
import type { ViewerFocusMode, ViewerMode } from '@/stores/viewerStore'

export type ModelBounds = {
  center: [number, number, number]
  max: [number, number, number]
  min: [number, number, number]
  radius: number
  size: [number, number, number]
}

type RoverModelProps = {
  focusMode: ViewerFocusMode
  modelPath: string
  mode: ViewerMode
  onBoundsChange?: (bounds: ModelBounds) => void
  onReady?: () => void
  presentationProgress?: number
  selectedHotspot: HotspotId
}

type PreparedMeshEntry = {
  baseMaterials: THREE.Material[]
  center: THREE.Vector3
  focusRadius: number
  mesh: THREE.Mesh
  workMaterials: THREE.Material[]
}

const MODEL_TARGET_LENGTH = 4.75
const MODEL_ROTATION_Y = -Math.PI / 2
const MODEL_GROUND_Y = -1.02

const focusGhostColor = new THREE.Color('#4b535d')

const applyMaterialProfile = (
  material: THREE.Material,
  baseMaterial: THREE.Material,
  accentColor: THREE.Color,
  focusMode: ViewerFocusMode,
  influence: number,
) => {
  material.copy(baseMaterial)

  if (focusMode === 'normal') {
    return
  }

  const isolated = focusMode === 'isolate'

  if ('color' in material && material.color instanceof THREE.Color) {
    material.color.lerp(focusGhostColor, isolated ? 0.05 : 0.62 - influence * 0.26)
    material.color.lerp(accentColor, isolated ? 0.48 + influence * 0.22 : influence * 0.68)
  }

  if ('emissive' in material && material.emissive instanceof THREE.Color) {
    const nextEmissive = accentColor.clone().multiplyScalar(isolated ? 0.18 + influence * 0.18 : influence * 0.11)
    material.emissive.copy(nextEmissive)
  }

  if ('emissiveIntensity' in material) {
    material.emissiveIntensity = isolated ? 0.28 + influence * 0.3 : 0.06 + influence * 0.16
  }

  if ('opacity' in material) {
    const baseOpacity = 'opacity' in baseMaterial ? baseMaterial.opacity : 1
    const nextOpacity = isolated
      ? Math.max(0.92, baseOpacity)
      : Math.max(0.12, baseOpacity * (0.18 + influence * 0.86))
    material.opacity = nextOpacity
  }

  if ('transparent' in material) {
    material.transparent = true
  }

  if ('depthWrite' in material) {
    material.depthWrite = isolated || influence >= 0.22
  }

  if ('envMapIntensity' in material && typeof material.envMapIntensity === 'number') {
    material.envMapIntensity = isolated ? Math.max(material.envMapIntensity, 0.78) : Math.max(material.envMapIntensity, 0.4 + influence * 0.36)
  }
}

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

const getSurfaceTint = (mode: ViewerMode, heightRatio: number, name: string) => {
  if (/wheel|tyre|tire|rim/i.test(name)) {
    return new THREE.Color(mode === 'chassis' ? '#66707c' : '#565f6b')
  }

  if (mode === 'interior') {
    if (heightRatio > 0.72) {
      return new THREE.Color('#dfe6ed')
    }

    if (heightRatio > 0.42) {
      return new THREE.Color('#aab6c3')
    }

    return new THREE.Color('#73808f')
  }

  if (mode === 'chassis') {
    if (heightRatio > 0.56) {
      return new THREE.Color('#bac4cf')
    }

    if (heightRatio > 0.28) {
      return new THREE.Color('#7d8794')
    }

    return new THREE.Color('#535c68')
  }

  if (heightRatio > 0.72) {
    return new THREE.Color('#edf1f5')
  }

  if (heightRatio > 0.48) {
    return new THREE.Color('#c9d1d9')
  }

  if (heightRatio > 0.26) {
    return new THREE.Color('#8a95a3')
  }

  return new THREE.Color('#59626f')
}

const tuneMaterial = (
  material: THREE.Material,
  mode: ViewerMode,
  tint: THREE.Color,
) => {
  const nextMaterial = material.clone()
  const opacity = getModeOpacity(mode)

  if ('color' in nextMaterial && nextMaterial.color instanceof THREE.Color) {
    nextMaterial.color.lerp(tint, 0.9)
  }

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
      typeof nextMaterial.roughness === 'number' ? nextMaterial.roughness : 0.5
    nextMaterial.roughness = Math.min(Math.max(roughness, 0.24), mode === 'cinematic' ? 0.68 : 0.82)
  }

  if ('metalness' in nextMaterial) {
    const metalness =
      typeof nextMaterial.metalness === 'number' ? nextMaterial.metalness : 0.2
    nextMaterial.metalness = Math.min(Math.max(metalness, 0.12), mode === 'cinematic' ? 0.58 : 0.42)
  }

  if ('emissive' in nextMaterial) {
    nextMaterial.emissive = new THREE.Color(mode === 'cinematic' ? '#142034' : '#0c1016')
  }

  if ('emissiveIntensity' in nextMaterial) {
    nextMaterial.emissiveIntensity = mode === 'cinematic' ? 0.08 : 0.02
  }

  if ('envMapIntensity' in nextMaterial && typeof nextMaterial.envMapIntensity === 'number') {
    nextMaterial.envMapIntensity = mode === 'cinematic' ? 0.9 : 0.45
  }

  return nextMaterial
}

function LoadedModel({
  focusMode,
  modelPath,
  mode,
  onBoundsChange,
  onReady,
  presentationProgress,
  selectedHotspot,
}: RoverModelProps) {
  const { animations, scene } = useGLTF(modelPath)
  const animationRootRef = useRef<THREE.Group | null>(null)
  const motionRootRef = useRef<THREE.Group | null>(null)
  const { actions } = useAnimations(animations, animationRootRef)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    onReady?.()
  }, [onReady, scene])

  const preparedAsset = useMemo(() => {
    const clonedScene = scene.clone(true)
    const meshEntries: PreparedMeshEntry[] = []

    clonedScene.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(clonedScene)
    const size = box.getSize(new THREE.Vector3())
    const dominantAxis = Math.max(size.x, size.z)
    const scale = dominantAxis > 0 ? MODEL_TARGET_LENGTH / dominantAxis : 1
    clonedScene.rotation.y = MODEL_ROTATION_Y
    clonedScene.scale.setScalar(scale)
    clonedScene.updateMatrixWorld(true)

    const rotatedBox = new THREE.Box3().setFromObject(clonedScene)
    const rotatedCenter = rotatedBox.getCenter(new THREE.Vector3())

    clonedScene.position.x -= rotatedCenter.x
    clonedScene.position.z -= rotatedCenter.z
    clonedScene.updateMatrixWorld(true)

    const centeredBox = new THREE.Box3().setFromObject(clonedScene)
    clonedScene.position.y += MODEL_GROUND_Y - centeredBox.min.y
    clonedScene.updateMatrixWorld(true)

    const finalBox = new THREE.Box3().setFromObject(clonedScene)
    const finalSize = finalBox.getSize(new THREE.Vector3())
    const finalCenter = finalBox.getCenter(new THREE.Vector3())
    const bounds: ModelBounds = {
      center: [finalCenter.x, finalCenter.y, finalCenter.z],
      max: [finalBox.max.x, finalBox.max.y, finalBox.max.z],
      min: [finalBox.min.x, finalBox.min.y, finalBox.min.z],
      radius: finalSize.length() * 0.5,
      size: [finalSize.x, finalSize.y, finalSize.z],
    }

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return
      }

      child.castShadow = false
      child.receiveShadow = false
      child.frustumCulled = true

      const meshBox = new THREE.Box3().setFromObject(child)
      const meshCenter = meshBox.getCenter(new THREE.Vector3())
      const heightRatio = size.y > 0 ? (meshCenter.y - box.min.y) / size.y : 0.5
      const tint = getSurfaceTint(mode, heightRatio, child.name)

      const baseMaterials = Array.isArray(child.material)
        ? child.material.map((material) => tuneMaterial(material, mode, tint))
        : [tuneMaterial(child.material, mode, tint)]
      const workMaterials = baseMaterials.map((material) => material.clone())

      child.material = Array.isArray(child.material) ? workMaterials : workMaterials[0]

      const meshSize = meshBox.getSize(new THREE.Vector3())
      meshEntries.push({
        baseMaterials,
        center: meshCenter.clone(),
        focusRadius: Math.max(meshSize.length() * 0.25, 0.18),
        mesh: child,
        workMaterials,
      })
    })

    return {
      bounds,
      meshEntries,
      scene: clonedScene,
    }
  }, [mode, scene])

  useEffect(() => {
    onBoundsChange?.(preparedAsset.bounds)
  }, [onBoundsChange, preparedAsset.bounds])

  useEffect(() => {
    const hotspot = hotspots.find((item) => item.id === selectedHotspot)
    const accentColor = new THREE.Color(hotspot?.accentColor ?? '#c6ff3e')
    const target = new THREE.Vector3(
      ...(hotspot ? getHotspotDetailTarget(hotspot) : preparedAsset.bounds.center),
    )
    const baseRadius = hotspot?.focusRadius ?? 0.96

    preparedAsset.meshEntries.forEach((entry) => {
      const distance = entry.center.distanceTo(target)
      const influenceDistance = Math.max(distance - entry.focusRadius * 0.34, 0)
      const influence = THREE.MathUtils.clamp(1 - influenceDistance / baseRadius, 0, 1)
      const shouldHide = focusMode === 'isolate' && influence < 0.16

      entry.mesh.visible = !shouldHide

      if (shouldHide) {
        return
      }

      entry.workMaterials.forEach((material, index) => {
        const baseMaterial = entry.baseMaterials[index] ?? entry.baseMaterials[0]
        applyMaterialProfile(material, baseMaterial, accentColor, focusMode, influence)
      })
    })

    invalidate()
  }, [focusMode, invalidate, preparedAsset, selectedHotspot])

  useEffect(() => {
    const clipActions = Object.values(actions).filter(
      (action): action is THREE.AnimationAction => action != null,
    )

    if (clipActions.length === 0) {
      return undefined
    }

    clipActions.forEach((action) => {
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.clampWhenFinished = false
      action.enabled = mode === 'cinematic'
      action.timeScale = 0.78
    })

    if (mode === 'cinematic') {
      clipActions.forEach((action) => action.fadeIn(0.5).play())
    } else {
      clipActions.forEach((action) => {
        action.fadeOut(0.3)
        action.stop()
      })
    }

    return () => {
      clipActions.forEach((action) => action.stop())
    }
  }, [actions, mode, modelPath])

  useFrame((state, delta) => {
    const motionRoot = motionRootRef.current

    if (!motionRoot) {
      return
    }

    const hasAnimatedClips = Object.keys(actions).length > 0
    const cinematicIdle = mode === 'cinematic' && !hasAnimatedClips
    const targetY = cinematicIdle ? Math.sin(state.clock.elapsedTime * 0.55) * 0.035 : 0
    const targetPitch = cinematicIdle ? Math.sin(state.clock.elapsedTime * 0.35) * 0.02 : 0
    const targetRoll = cinematicIdle ? Math.cos(state.clock.elapsedTime * 0.42) * 0.015 : 0
    const targetYaw =
      typeof presentationProgress === 'number'
        ? THREE.MathUtils.lerp(0.34, -0.42, THREE.MathUtils.clamp(presentationProgress, 0, 1))
        : 0

    motionRoot.position.y = THREE.MathUtils.damp(motionRoot.position.y, targetY, 3.8, delta)
    motionRoot.rotation.x = THREE.MathUtils.damp(motionRoot.rotation.x, targetPitch, 3.6, delta)
    motionRoot.rotation.y = THREE.MathUtils.damp(motionRoot.rotation.y, targetYaw, 3.2, delta)
    motionRoot.rotation.z = THREE.MathUtils.damp(motionRoot.rotation.z, targetRoll, 3.4, delta)
  })

  return (
    <group ref={motionRootRef}>
      <group ref={animationRootRef}>
        <primitive object={preparedAsset.scene} />
      </group>
    </group>
  )
}

export function ProxyModel({ mode }: Pick<RoverModelProps, 'mode'>) {
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

function RoverModel({
  focusMode,
  modelPath,
  mode,
  onBoundsChange,
  onReady,
  presentationProgress,
  selectedHotspot,
}: RoverModelProps) {
  return (
    <LoadedModel
      focusMode={focusMode}
      modelPath={modelPath}
      mode={mode}
      onBoundsChange={onBoundsChange}
      onReady={onReady}
      presentationProgress={presentationProgress}
      selectedHotspot={selectedHotspot}
    />
  )
}

export default RoverModel
