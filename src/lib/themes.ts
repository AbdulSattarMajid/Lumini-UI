// ─── Lumina UI – Theme Definitions ────────────────────────────────────────────
// Each theme exports a full set of CSS custom-property values plus animation
// metadata that is applied to the :root element at runtime.

export type ThemeId =
  | 'aurora-indigo'
  | 'cyan-horizon'
  | 'blue-moon'
  | 'rose-gold'
  | 'neon-lime'
  | 'solar-amber'

export interface ThemeDefinition {
  id: ThemeId
  name: string
  description: string
  /** Emoji icon for quick visual recognition in picker */
  icon: string
  /** Primary gradient stop A */
  colorA: string
  /** Primary gradient stop B */
  colorB: string
  /** Accent color */
  colorC: string
  /** CSS custom properties injected onto :root */
  vars: Record<string, string>
  /** Three.js particle colors (hex strings) for the canvas */
  particleColors: [string, string]
  /** Animation personality tag – drives animation CSS class on <body> */
  animation: 'pulse-slow' | 'shimmer' | 'ripple' | 'float' | 'glitch' | 'breathe'
  /** Tailwind / raw class appended to bg gradient elements */
  heroBgClass: string
}

export const THEMES: ThemeDefinition[] = [
  // ─── 1. Aurora Indigo (DEFAULT) ──────────────────────────────────────────
  {
    id: 'aurora-indigo',
    name: 'Aurora Indigo',
    description: 'Deep violet cosmos with indigo shimmer',
    icon: '🌌',
    colorA: '#6366f1',
    colorB: '#a855f7',
    colorC: '#ec4899',
    vars: {
      '--theme-primary':       '#6366f1',
      '--theme-primary-light': '#818cf8',
      '--theme-primary-dark':  '#4338ca',
      '--theme-accent':        '#a855f7',
      '--theme-accent-2':      '#ec4899',
      '--theme-glow':          'rgba(99,102,241,0.35)',
      '--theme-glow-soft':     'rgba(99,102,241,0.12)',
      '--theme-bg':            '#030712',
      '--theme-bg-card':       'rgba(15,23,42,0.70)',
      '--theme-border':        'rgba(99,102,241,0.20)',
      '--theme-border-hover':  'rgba(129,140,248,0.45)',
      '--theme-text-gradient': 'linear-gradient(135deg,#c7d2fe 0%,#818cf8 50%,#a855f7 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,0.25) 0%,rgba(168,85,247,0.10) 60%,transparent 100%)',
      '--theme-scrollbar':     '#3730a3',
      '--theme-ring':          'rgba(99,102,241,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)',
      '--theme-btn-glow-shadow': 'rgba(168,85,247,0.40)',
    },
    particleColors: ['#818cf8', '#c084fc'],
    animation: 'shimmer',
    heroBgClass: 'from-indigo-600/20 via-purple-600/20 to-pink-600/10',
  },

  // ─── 2. Cyan Horizon ─────────────────────────────────────────────────────
  {
    id: 'cyan-horizon',
    name: 'Cyan Horizon',
    description: 'Electric cyan ocean with teal depths',
    icon: '🌊',
    colorA: '#06b6d4',
    colorB: '#0ea5e9',
    colorC: '#6366f1',
    vars: {
      '--theme-primary':       '#06b6d4',
      '--theme-primary-light': '#22d3ee',
      '--theme-primary-dark':  '#0891b2',
      '--theme-accent':        '#0ea5e9',
      '--theme-accent-2':      '#6366f1',
      '--theme-glow':          'rgba(6,182,212,0.35)',
      '--theme-glow-soft':     'rgba(6,182,212,0.12)',
      '--theme-bg':            '#020b12',
      '--theme-bg-card':       'rgba(2,22,36,0.75)',
      '--theme-border':        'rgba(6,182,212,0.18)',
      '--theme-border-hover':  'rgba(34,211,238,0.45)',
      '--theme-text-gradient': 'linear-gradient(135deg,#a5f3fc 0%,#22d3ee 50%,#0ea5e9 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(6,182,212,0.28) 0%,rgba(14,165,233,0.10) 60%,transparent 100%)',
      '--theme-scrollbar':     '#0e7490',
      '--theme-ring':          'rgba(6,182,212,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#06b6d4,#0ea5e9,#6366f1)',
      '--theme-btn-glow-shadow': 'rgba(6,182,212,0.40)',
    },
    particleColors: ['#22d3ee', '#38bdf8'],
    animation: 'ripple',
    heroBgClass: 'from-cyan-500/25 via-sky-500/15 to-indigo-500/10',
  },

  // ─── 3. Blue Moon ────────────────────────────────────────────────────────
  {
    id: 'blue-moon',
    name: 'Blue Moon',
    description: 'Midnight sapphire with silver starlight',
    icon: '🌙',
    colorA: '#3b82f6',
    colorB: '#1d4ed8',
    colorC: '#93c5fd',
    vars: {
      '--theme-primary':       '#3b82f6',
      '--theme-primary-light': '#60a5fa',
      '--theme-primary-dark':  '#1d4ed8',
      '--theme-accent':        '#93c5fd',
      '--theme-accent-2':      '#bfdbfe',
      '--theme-glow':          'rgba(59,130,246,0.35)',
      '--theme-glow-soft':     'rgba(59,130,246,0.12)',
      '--theme-bg':            '#02050f',
      '--theme-bg-card':       'rgba(5,11,30,0.75)',
      '--theme-border':        'rgba(59,130,246,0.18)',
      '--theme-border-hover':  'rgba(96,165,250,0.45)',
      '--theme-text-gradient': 'linear-gradient(135deg,#eff6ff 0%,#93c5fd 50%,#3b82f6 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(59,130,246,0.25) 0%,rgba(29,78,216,0.08) 60%,transparent 100%)',
      '--theme-scrollbar':     '#1e40af',
      '--theme-ring':          'rgba(59,130,246,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#3b82f6,#2563eb,#93c5fd)',
      '--theme-btn-glow-shadow': 'rgba(59,130,246,0.45)',
    },
    particleColors: ['#60a5fa', '#93c5fd'],
    animation: 'float',
    heroBgClass: 'from-blue-600/25 via-blue-700/15 to-blue-400/10',
  },

  // ─── 4. Rose Gold ────────────────────────────────────────────────────────
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Luxurious rose and warm amber warmth',
    icon: '🌹',
    colorA: '#f43f5e',
    colorB: '#fb7185',
    colorC: '#fbbf24',
    vars: {
      '--theme-primary':       '#f43f5e',
      '--theme-primary-light': '#fb7185',
      '--theme-primary-dark':  '#e11d48',
      '--theme-accent':        '#fb923c',
      '--theme-accent-2':      '#fbbf24',
      '--theme-glow':          'rgba(244,63,94,0.35)',
      '--theme-glow-soft':     'rgba(244,63,94,0.12)',
      '--theme-bg':            '#0f0205',
      '--theme-bg-card':       'rgba(24,5,10,0.75)',
      '--theme-border':        'rgba(244,63,94,0.18)',
      '--theme-border-hover':  'rgba(251,113,133,0.45)',
      '--theme-text-gradient': 'linear-gradient(135deg,#fce7f3 0%,#fb7185 50%,#fbbf24 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(244,63,94,0.25) 0%,rgba(251,146,60,0.10) 60%,transparent 100%)',
      '--theme-scrollbar':     '#be123c',
      '--theme-ring':          'rgba(244,63,94,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#f43f5e,#fb923c,#fbbf24)',
      '--theme-btn-glow-shadow': 'rgba(244,63,94,0.40)',
    },
    particleColors: ['#fb7185', '#fbbf24'],
    animation: 'pulse-slow',
    heroBgClass: 'from-rose-600/25 via-pink-600/15 to-amber-500/10',
  },

  // ─── 5. Neon Lime ────────────────────────────────────────────────────────
  {
    id: 'neon-lime',
    name: 'Neon Lime',
    description: 'Cyberpunk acid green on deep black',
    icon: '⚡',
    colorA: '#84cc16',
    colorB: '#22c55e',
    colorC: '#a3e635',
    vars: {
      '--theme-primary':       '#84cc16',
      '--theme-primary-light': '#a3e635',
      '--theme-primary-dark':  '#65a30d',
      '--theme-accent':        '#22c55e',
      '--theme-accent-2':      '#4ade80',
      '--theme-glow':          'rgba(132,204,22,0.35)',
      '--theme-glow-soft':     'rgba(132,204,22,0.12)',
      '--theme-bg':            '#020802',
      '--theme-bg-card':       'rgba(5,18,3,0.75)',
      '--theme-border':        'rgba(132,204,22,0.20)',
      '--theme-border-hover':  'rgba(163,230,53,0.50)',
      '--theme-text-gradient': 'linear-gradient(135deg,#ecfccb 0%,#a3e635 50%,#22c55e 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(132,204,22,0.28) 0%,rgba(34,197,94,0.10) 60%,transparent 100%)',
      '--theme-scrollbar':     '#4d7c0f',
      '--theme-ring':          'rgba(132,204,22,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#84cc16,#22c55e,#4ade80)',
      '--theme-btn-glow-shadow': 'rgba(132,204,22,0.45)',
    },
    particleColors: ['#a3e635', '#4ade80'],
    animation: 'glitch',
    heroBgClass: 'from-lime-500/25 via-green-600/15 to-emerald-500/10',
  },

  // ─── 6. Solar Amber ──────────────────────────────────────────────────────
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    description: 'Warm amber sunburst with fiery orange',
    icon: '☀️',
    colorA: '#f59e0b',
    colorB: '#f97316',
    colorC: '#ef4444',
    vars: {
      '--theme-primary':       '#f59e0b',
      '--theme-primary-light': '#fcd34d',
      '--theme-primary-dark':  '#d97706',
      '--theme-accent':        '#f97316',
      '--theme-accent-2':      '#ef4444',
      '--theme-glow':          'rgba(245,158,11,0.35)',
      '--theme-glow-soft':     'rgba(245,158,11,0.12)',
      '--theme-bg':            '#0a0400',
      '--theme-bg-card':       'rgba(20,10,0,0.75)',
      '--theme-border':        'rgba(245,158,11,0.18)',
      '--theme-border-hover':  'rgba(252,211,77,0.45)',
      '--theme-text-gradient': 'linear-gradient(135deg,#fef3c7 0%,#fcd34d 50%,#f97316 100%)',
      '--theme-hero-glow':     'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(245,158,11,0.28) 0%,rgba(249,115,22,0.10) 60%,transparent 100%)',
      '--theme-scrollbar':     '#b45309',
      '--theme-ring':          'rgba(245,158,11,0.50)',
      '--theme-btn-glow':      'linear-gradient(135deg,#f59e0b,#f97316,#ef4444)',
      '--theme-btn-glow-shadow': 'rgba(249,115,22,0.45)',
    },
    particleColors: ['#fcd34d', '#fb923c'],
    animation: 'breathe',
    heroBgClass: 'from-amber-500/25 via-orange-500/15 to-red-500/10',
  },
]

export const DEFAULT_THEME_ID: ThemeId = 'aurora-indigo'

export function getTheme(id: ThemeId): ThemeDefinition {
  return THEMES.find(t => t.id === id) ?? THEMES[0]
}
