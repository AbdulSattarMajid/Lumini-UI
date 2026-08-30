import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface FeaturesCanvasProps {
  className?: string
}

export const FeaturesCanvas: React.FC<FeaturesCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    // Add very subtle fog so distant particles fade smoothly into the background
    scene.fog = new THREE.FogExp2(0x030712, 0.0015)

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 2000)
    camera.position.z = 800

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 1. Create Ambient Dust Particles
    const particleCount = 1500
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Spread particles widely across a massive 3D space
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000

      // Randomize particle sizes for depth of field effect
      sizes[i] = Math.random() * 2.5
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // 2. Elegant, Subtle Material
    const material = new THREE.PointsMaterial({
      color: 0x818cf8, // Subtle Indigo 
      size: 3,
      transparent: true,
      opacity: 0.4, // Keep it dim enough to never block text
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 3. Ultra-Smooth, Slow Rotation
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // The entire field slowly drifts
      particleSystem.rotation.y += 0.0005
      particleSystem.rotation.x += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      // Removed the CSS mask, simply setting standard opacity and z-index
      className={`absolute inset-0 pointer-events-none opacity-40 ${className}`}
      style={{ overflow: 'hidden' }}
    />
  )
}