import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Detect if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible])

  // Don't render on touch devices or if mouse hasn't entered yet
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: isVisible ? 1 : 0,
      backgroundColor: 'rgba(99, 102, 241, 0.1)', // indigo-500 with low opacity
      border: '1px solid rgba(99, 102, 241, 0.5)',
    },
    clicking: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.8,
      opacity: isVisible ? 1 : 0,
    }
  }

  const dotVariants = {
    default: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      opacity: 0, // hide dot when hovering
    },
    clicking: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      scale: 0.5,
      opacity: isVisible ? 1 : 0,
    }
  }

  const activeVariant = isClicking ? 'clicking' : isHovering ? 'hover' : 'default'

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-indigo-400/50 pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={activeVariant}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        style={{
          width: isHovering ? 48 : 16,
          height: isHovering ? 48 : 16,
        }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-400 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        variants={dotVariants}
        animate={activeVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.01,
        }}
      />
    </>
  )
}
