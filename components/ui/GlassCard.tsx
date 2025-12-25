'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        bg-white/70 backdrop-blur-sm md:backdrop-blur-md border border-white/50 rounded-xl p-6
        shadow-lg hover:shadow-xl transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

