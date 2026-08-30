import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Sparkles, Cpu, ShieldCheck } from 'lucide-react'
import { StatsCanvas } from '@/components/canvas/StatsCanvas'

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      value: '20+',
      label: 'UI Components & Variants',
      detail: 'Buttons, Modals, Tabs, Cards & more',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      value: '60 FPS',
      label: 'Smooth Micro-Interactions',
      detail: 'Hardware accelerated Framer Motion',
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      value: '< 50ms',
      label: 'Vite Lightning Fast HMR',
      detail: 'Optimized instant dev feedback loop',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      value: '0 Backend',
      label: 'Pure Frontend Decoupled',
      detail: 'Drop into any React architecture',
    },
  ]

  return (
    <section className="py-12 border-y border-slate-850 section-theme-gradient relative overflow-hidden">
      <StatsCanvas />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl relative z-20 hover:border-slate-700/80 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
