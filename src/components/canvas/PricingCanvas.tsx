import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingShapes = ({ count = 15 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const shapesData = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      speed: 0.1 + Math.random() * 0.3,
    }))
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    shapesData.forEach((data, i) => {
      dummy.position.set(
        data.position[0],
        data.position[1] + Math.sin(time * data.speed + i) * 2,
        data.position[2]
      )
      dummy.rotation.set(
        data.rotation[0] + time * data.speed * 0.5,
        data.rotation[1] + time * data.speed * 0.5,
        data.rotation[2]
      )
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#a855f7" // Purple
        wireframe={false}
        transparent
        opacity={0.15}
        roughness={0.2}
        metalness={0.8}
      />
    </instancedMesh>
  )
}

interface PricingCanvasProps {
  className?: string
}

export const PricingCanvas: React.FC<PricingCanvasProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-15 overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <FloatingShapes count={20} />
      </Canvas>
    </div>
  )
}
