// @ts-nocheck
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '@/lib/ThemeContext'

// ─── Particle Field ───────────────────────────────────────────────────────────
function ParticleField({ count = 2500, colorHexA = '#818cf8', colorHexB = '#c084fc' }) {
  const pointsRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })

  // Generate particle positions, colors, and random sizes
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)

    const colorA = new THREE.Color(colorHexA)
    const colorB = new THREE.Color(colorHexB)
    const tempColor = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Distribute particles in a 3D spherical volume with varying radius
      const radius = 2.5 + Math.random() * 8.5
      const theta = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)
      const phi = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180)

      pos[i3]     = radius * Math.sin(theta) * Math.cos(phi)
      pos[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      pos[i3 + 2] = radius * Math.cos(theta)

      // Mix between the two theme colors
      const t = Math.random()
      tempColor.lerpColors(colorA, colorB, t)
      tempColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1)

      cols[i3]     = tempColor.r
      cols[i3 + 1] = tempColor.g
      cols[i3 + 2] = tempColor.b
    }

    return [pos, cols]
  }, [count, colorHexA, colorHexB])

  // Create a circular glow texture dynamically
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0,   'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1,   'rgba(255,255,255,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Animate particles and react to mouse movement
  useFrame((state, delta) => {
    if (!pointsRef.current) return

    // Base continuous gentle rotation
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x += delta * 0.015

    // Smooth mouse parallax interpolation
    const mouseX = state.pointer.x * 0.4
    const mouseY = state.pointer.y * 0.4

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.05)
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.05)

    pointsRef.current.rotation.x += targetRotation.current.x * 0.02
    pointsRef.current.rotation.y += targetRotation.current.y * 0.02

    // Gentle camera breathing movement
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    pointsRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        map={particleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Canvas Wrapper ───────────────────────────────────────────────────────────
export function InteractiveCanvas({ className = '' }) {
  const { theme } = useTheme()
  // Key forces a full canvas remount when theme changes, so particle colors update
  const [canvasKey, setCanvasKey] = useState(theme.id)

  useEffect(() => {
    const tid = setTimeout(() => setCanvasKey(theme.id), 50)
    return () => clearTimeout(tid)
  }, [theme.id])

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.2} />
        <ParticleField
          count={3000}
          colorHexA={theme.particleColors[0]}
          colorHexB={theme.particleColors[1]}
        />
      </Canvas>
    </div>
  )
}

export default InteractiveCanvas
