import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WireframePlane = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.5, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshStandardMaterial 
        color="#818cf8" 
        wireframe={true} 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  )
}

interface PlaygroundCanvasProps {
  className?: string
}

export const PlaygroundCanvas: React.FC<PlaygroundCanvasProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-15 overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <WireframePlane />
      </Canvas>
    </div>
  )
}
