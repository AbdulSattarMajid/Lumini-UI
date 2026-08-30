import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean
  glowEffect?: boolean
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = true,
  glowEffect = false,
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl transition-colors',
        hoverEffect && 'hover:border-slate-700/80 hover:bg-slate-900/80',
        glowEffect &&
          'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-indigo-500/20 before:via-purple-500/20 before:to-pink-500/20 before:-z-10 before:blur-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('text-xl font-bold tracking-tight text-white', className)} {...props}>
    {children}
  </h3>
)

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('text-sm text-slate-400 leading-relaxed', className)} {...props}>
    {children}
  </p>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
)

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex items-center pt-4 mt-4 border-t border-slate-800/80', className)} {...props}>
    {children}
  </div>
)
