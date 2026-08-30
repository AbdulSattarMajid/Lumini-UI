import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Code2, Zap, ShieldCheck, Copy, Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const Hero: React.FC = () => {
  const [copied, setCopied] = React.useState(false)
  const arrowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1.5,
      })
    }
  }, { scope: arrowRef })

  const copyInstall = () => {
    navigator.clipboard.writeText('npm install framer-motion lucide-react clsx tailwind-merge')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 theme-hero-glow pointer-events-none transition-all duration-700" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none transition-all duration-700"
        style={{ backgroundColor: 'var(--theme-glow-soft)' }} />

      {/* Added w-full here to fix the mobile overflow issue */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 mx-auto"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-3xl bg-slate-900/90 border border-indigo-500/30 text-[10px] sm:text-xs font-medium text-indigo-300 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-400 animate-ping shrink-0" />
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
            <span className="text-center">Modern React + Vite + Tailwind</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-indigo-200">Framer Motion Powered</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] sm:leading-[1.1] w-full"
        >
          Craft Stunning Interfaces with{' '}
          <span className="glow-cyan-text block sm:inline">Precision</span> &{' '}
          <span className="glow-purple-text block sm:inline">Fluid Motion</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed w-full"
        >
          A carefully designed frontend template engineered for developer velocity, accessible interactive components, and responsive aesthetics.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0 sm:w-auto"
        >
          <div className="w-full sm:w-auto">
            <Button
              variant="glow"
              size="lg"
              className="w-full sm:w-auto justify-center"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                const playground = document.getElementById('playground')
                playground?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Components
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto justify-center"
              leftIcon={<Code2 className="w-4 h-4 text-indigo-400" />}
              onClick={() => {
                const features = document.getElementById('features')
                features?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Template Features
            </Button>
          </div>
        </motion.div>

        {/* Quick Install Snippet Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 max-w-lg mx-auto w-full px-2 sm:px-0"
        >
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl text-left w-full overflow-hidden">
            <div className="flex items-center gap-2.5 overflow-hidden w-full min-w-0">
              <span className="text-indigo-400 font-mono text-[10px] sm:text-xs select-none shrink-0">$</span>
              <code className="text-[10px] sm:text-sm font-mono text-slate-300 truncate min-w-0 block">
                npm i framer-motion lucide-react clsx tailwind-merge
              </code>
            </div>
            <button
              onClick={copyInstall}
              className="ml-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Copy to clipboard"
              aria-label="Copy install command"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Floating Feature Badges / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant Vite 6 HMR</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Tailwind CSS v4 Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Strict TypeScript</span>
          </div>
        </motion.div>
      </div>

      {/* GSAP Animated Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const nextSection = document.getElementById('testimonials')
          nextSection?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <div ref={arrowRef}>
          <ChevronDown className="w-8 h-8" />
        </div>
      </motion.div>
    </section>
  )
}