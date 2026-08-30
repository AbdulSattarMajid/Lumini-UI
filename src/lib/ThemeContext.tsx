import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { type ThemeId, type ThemeDefinition, THEMES, DEFAULT_THEME_ID, getTheme } from '@/lib/themes'

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: ThemeDefinition
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
  themes: ThemeDefinition[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('lumina-color-scheme') as ThemeId | null
      if (saved && THEMES.find(t => t.id === saved)) return saved
    } catch {
      // localStorage unavailable
    }
    return DEFAULT_THEME_ID
  })

  const theme = getTheme(themeId)

  /** Apply CSS variables and animation class to document root */
  const applyTheme = useCallback((def: ThemeDefinition) => {
    const root = document.documentElement

    // Remove all previous animation classes
    THEMES.forEach(t => root.classList.remove(`anim-${t.animation}`))

    // Apply CSS vars
    Object.entries(def.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Apply bg colour
    document.body.style.backgroundColor = def.vars['--theme-bg']

    // Add animation class
    root.classList.add(`anim-${def.animation}`)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id)
    try {
      localStorage.setItem('lumina-color-scheme', id)
    } catch {
      // localStorage unavailable
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
