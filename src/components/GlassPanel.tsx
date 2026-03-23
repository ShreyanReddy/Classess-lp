import type { ReactNode } from 'react'

interface GlassPanelProps {
  variant?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
}

const variantClasses = {
  sm: 'backdrop-blur-md bg-white/[0.08] border border-white/[0.18] rounded-2xl shadow-glass',
  md: 'backdrop-blur-xl bg-white/[0.08] border border-white/[0.18] rounded-3xl shadow-glass',
  lg: 'backdrop-blur-2xl bg-white/[0.10] border border-white/[0.20] rounded-3xl shadow-glass',
}

export default function GlassPanel({ variant = 'md', className = '', children }: GlassPanelProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
