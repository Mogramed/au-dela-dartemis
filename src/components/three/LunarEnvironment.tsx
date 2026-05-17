import { ContactShadows, Stars } from '@react-three/drei'

type LunarEnvironmentProps = {
  animate?: boolean
  lite?: boolean
}

function LunarEnvironment({ animate = false, lite = false }: LunarEnvironmentProps) {
  return (
    <>
      <ambientLight intensity={lite ? 0.46 : animate ? 0.4 : 0.44} />
      <hemisphereLight args={['#e9edf2', '#050608', lite ? 0.52 : animate ? 0.78 : 0.68]} />
      <directionalLight
        color="#f2f2ea"
        intensity={lite ? 1.08 : animate ? 1.52 : 1.34}
        position={[4.8, 6.8, 5.2]}
      />
      <spotLight
        angle={0.42}
        color="#8fb8ff"
        intensity={lite ? 0.24 : animate ? 0.58 : 0.46}
        penumbra={0.7}
        position={[-5.5, 4.2, -4.8]}
      />
      <pointLight color="#f7efe0" intensity={lite ? 0.18 : animate ? 0.38 : 0.28} position={[0.6, 1.2, 4.4]} />
      <pointLight color="#7ba8ff" intensity={lite ? 0.14 : animate ? 0.34 : 0.22} position={[-3.6, 1.4, -2.8]} />
      <Stars
        count={lite ? 0 : animate ? 260 : 120}
        depth={26}
        factor={animate ? 1.35 : 0.92}
        fade
        radius={36}
        saturation={0}
        speed={animate ? 0.04 : 0}
      />
      <ContactShadows
        blur={animate ? 2.3 : 2.6}
        far={3.1}
        frames={1}
        opacity={lite ? 0.14 : animate ? 0.32 : 0.24}
        position={[0, -1.02, 0]}
        resolution={lite ? 256 : 512}
        scale={animate ? 8.8 : 8.2}
      />
      <mesh position={[0, -1.16, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#07080a" metalness={0.08} roughness={0.98} />
      </mesh>
    </>
  )
}

export default LunarEnvironment
