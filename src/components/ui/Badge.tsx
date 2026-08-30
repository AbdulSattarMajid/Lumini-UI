import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'glowing'
  size?: 'sm' | 'md'
  dot?: boolean
  dotColor?: string
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  dotColor,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  }

  const variantClasses = {
    default: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    primary: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30',
    success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-300 border border-rose-500/30',
    outline: 'bg-transparent text-slate-300 border border-slate-700',
    glowing: 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-500/20',
  }

  const dotColorClasses: Record<string, string> = {
    default: 'bg-slate-400',
    primary: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]',
    success: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    warning: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    danger: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]',
    outline: 'bg-slate-400',
    glowing: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full transition-all duration-200 backdrop-blur-sm',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            dotColor || dotColorClasses[variant]
          )}
        />
      )}
      {children}
    </span>
  )
}
