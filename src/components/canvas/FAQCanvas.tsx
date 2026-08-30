import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

const RotatingTorusKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <TorusKnot ref={meshRef} args={[3, 0.8, 256, 32]} position={[6, 0, -5]}>
      <meshStandardMaterial 
        color="#6366f1" 
        wireframe={true} 
        transparent 
        opacity={0.15} 
      />
    </TorusKnot>
  )
}

export const FAQCanvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RotatingTorusKnot />
      </Canvas>
    </div>
  )
}
