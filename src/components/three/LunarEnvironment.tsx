import { ContactShadows, Stars } from '@react-three/drei'

type LunarEnvironmentProps = {
  lite?: boolean
}

function LunarEnvironment({ lite = false }: LunarEnvironmentProps) {
  return (
    <>
      <ambientLight intensity={lite ? 0.62 : 0.55} />
      <hemisphereLight args={['#eef1f5', '#060708', lite ? 0.68 : 0.8]} />
      <directionalLight
        color="#f2f2ea"
        intensity={lite ? 1.25 : 1.48}
        position={[5.5, 7.5, 5.8]}
      />
      <spotLight
        angle={0.42}
        color="#8fb8ff"
        intensity={lite ? 0.45 : 0.62}
        penumbra={0.7}
        position={[-5.5, 4.2, -4.8]}
      />
      <Stars
        count={lite ? 640 : 960}
        depth={26}
        factor={lite ? 1.8 : 2.2}
        fade
        radius={36}
        saturation={0}
        speed={0.08}
      />
      <ContactShadows
        blur={2.4}
        far={3.1}
        frames={1}
        opacity={lite ? 0.28 : 0.36}
        position={[0, -1.02, 0]}
        resolution={lite ? 512 : 1024}
        scale={9.5}
      />
      <mesh position={[0, -1.16, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#09090b" metalness={0.12} roughness={0.97} />
      </mesh>
    </>
  )
}

export default LunarEnvironment
