import React from 'react'
import { motion } from 'framer-motion'

interface TokensCanvasProps {
  className?: string
}

export const TokensCanvas: React.FC<TokensCanvasProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-20 overflow-hidden bg-slate-950 ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute bottom-0 left-1/3 w-[45rem] h-[45rem] bg-pink-600/20 rounded-full mix-blend-screen filter blur-[120px]"
      />
    </div>
  )
}
