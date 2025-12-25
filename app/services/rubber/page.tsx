'use client'

import { CheckCircle, Filter, Truck, Target } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'

export default function RubberPage() {
  const features = [
    {
      icon: Filter,
      title: 'Complex Sorting',
      description: 'Metal and textile separation from rubber materials using advanced technology.',
    },
    {
      icon: Truck,
      title: 'Custom Logistics',
      description: 'Roll-on/roll-off skips and tailored collection schedules.',
    },
    {
      icon: Target,
      title: 'Zero-Waste Focus',
      description: 'Comprehensive remediation ensuring maximum material recovery.',
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 mb-6">
            Industrial Rubber Remediation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-body">
            Specialized recovery of post-industrial and post-consumer rubber waste.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed font-body">
                Rubber waste is a valuable resource often mishandled in general waste streams. 
                SGV Recycle specializes in the sorting and remediation of complex rubber materials, 
                including conveyor belts, seals, hoses, and production offcuts. Our facility utilizes 
                advanced shredding and separation technologies to recover pure rubber feedstock.
              </p>
            </div>
          </GlassCard>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <GlassCard key={index} delay={0.3 + index * 0.1}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-green" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 font-body">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              )
            })}
          </div>

          {/* Key Benefits */}
          <GlassCard>
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">
              Our Rubber Processing Capabilities
            </h2>
            <ul className="space-y-4">
              {[
                'Conveyor belt recovery and processing',
                'Seal and gasket material sorting',
                'Hose and tubing remediation',
                'Production offcut recovery',
                'Pure rubber feedstock production',
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-body text-lg">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

