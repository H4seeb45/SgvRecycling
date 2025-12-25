'use client'

import GlassCard from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <GlassCard>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 font-body">
                Privacy policy content will be added here. This is a placeholder page.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

