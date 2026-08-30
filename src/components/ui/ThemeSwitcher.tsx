import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, ChevronDown } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'
import { type ThemeId } from '@/lib/themes'

// ─── Theme Switcher Dropdown ──────────────────────────────────────────────────
export const ThemeSwitcher: React.FC = () => {
  const { theme, themeId, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (id: ThemeId) => {
    setTheme(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative" id="theme-switcher">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(0,0,0,0.35)',
          borderColor: `var(--theme-border)`,
          color: `var(--theme-primary-light)`,
          boxShadow: open ? `0 0 0 2px var(--theme-glow)` : 'none',
        }}
        aria-label="Change colour scheme"
        aria-expanded={open}
      >
        {/* Live colour dot */}
        <span
          className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/20"
          style={{
            background: `linear-gradient(135deg, ${theme.colorA}, ${theme.colorB})`,
          }}
        />
        <Palette className="w-3.5 h-3.5 opacity-80" />
        <span className="hidden sm:inline">{theme.name}</span>
        <ChevronDown
          className="w-3 h-3 opacity-60 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }}
            className="absolute right-0 mt-2 w-64 z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5,7,20,0.92)',
              border: `1px solid var(--theme-border)`,
              backdropFilter: 'blur(24px)',
              boxShadow: `0 24px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px var(--theme-border), 0 4px 30px -5px var(--theme-glow)`,
            }}
          >
            {/* Header */}
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--theme-primary-light)', opacity: 0.7 }}>
                Colour Scheme
              </p>
            </div>

            {/* Theme List */}
            <div className="p-2 space-y-0.5">
              {themes.map((t, i) => {
                const isActive = t.id === themeId
                return (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 30 }}
                    onClick={() => handleSelect(t.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group"
                    style={{
                      backgroundColor: isActive ? 'var(--theme-glow-soft)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--theme-border-hover)' : 'transparent'}`,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                    }}
                  >
                    {/* Gradient swatch */}
                    <span
                      className="w-7 h-7 rounded-lg shrink-0 ring-1 ring-white/10 shadow-lg flex items-center justify-center text-base"
                      style={{
                        background: `linear-gradient(135deg, ${t.colorA} 0%, ${t.colorB} 60%, ${t.colorC} 100%)`,
                      }}
                    >
                      <span className="text-xs">{t.icon}</span>
                    </span>

                    {/* Labels */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white leading-tight">{t.name}</p>
                      <p className="text-[10px] text-slate-400 leading-tight truncate">{t.description}</p>
                    </div>

                    {/* Active check */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--theme-primary)' }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Footer hint */}
            <div className="px-4 pb-3 pt-1">
              <p className="text-[10px] text-slate-500 text-center">
                Each scheme has its own animation ✦
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
