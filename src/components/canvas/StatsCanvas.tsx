import React, { useEffect, useRef } from 'react'

interface StatsCanvasProps {
  className?: string
}

export const StatsCanvas: React.FC<StatsCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const drops: number[] = []

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight

      const columns = Math.floor(canvas.width / 20)
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.1)' // Very faint fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#6366f1' // Indigo
      ctx.font = '12px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 128))
        const x = i * 20
        const y = drops[i] * 20

        ctx.globalAlpha = Math.random() * 0.5 + 0.1
        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const handleResize = () => {
      init()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`absolute inset-0 pointer-events-none opacity-15 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
