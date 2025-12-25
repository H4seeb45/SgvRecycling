'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Recycle, Zap } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-accent-green text-sm font-heading font-semibold uppercase tracking-wider mb-4">
              OUR MISSION
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Redefining Resource Recovery.
            </h1>
            <p className="text-xl text-white/80 font-body leading-relaxed">
              SGV Recycle was established in 2018 with a singular vision: to bridge the gap between industrial waste production and circular manufacturing supply chains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                Built on a Foundation of Expertise.
              </h2>
              <p className="text-lg text-slate-700 font-body leading-relaxed">
                While SGV Recycle was formally incorporated in November 2018, our roots in the waste management sector run much deeper. We were founded to bring a new level of professionalism, transparency, and digital tracking to an industry often criticized for its opacity. From our headquarters in Plaistow, London, we have grown from a local collection service into a premier material recovery partner for the UK's automotive and industrial sectors.
              </p>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/facilityView.png"
                  alt="SGV Recycle Facility View"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Bento Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 font-body max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {/* Card 1 - Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-accent-green" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                  Beyond the Paperwork.
                </h3>
                <p className="text-slate-700 font-body leading-relaxed">
                  We don't just meet regulations; we set the standard. Fully licensed by the Environment Agency with real-time duty of care tracking.
                </p>
              </GlassCard>
            </motion.div>

            {/* Card 2 - Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="h-full">
                <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <Recycle className="w-7 h-7 text-accent-green" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                  Zero to Landfill.
                </h3>
                <p className="text-slate-700 font-body leading-relaxed">
                  Our primary KPI is diversion. We constantly refine our sorting processes to ensure 99% of incoming material finds a second life.
                </p>
              </GlassCard>
            </motion.div>

            {/* Card 3 - Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="h-full">
                <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-accent-green" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                  Tech-Led Logistics.
                </h3>
                <p className="text-slate-700 font-body leading-relaxed">
                  We utilize advanced fleet tracking and digital valuation tools to give our clients precision data on their waste streams.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Facility - Visual Strip */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-slate-600 font-body">
              Operating from our licensed facility in London, E13.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src="/Sorting.png"
                  alt="Sorting Line Operations"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-heading font-semibold text-lg">Sorting Line</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src="/fleet.png"
                  alt="Fleet Operations"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-heading font-semibold text-lg">Fleet Operations</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src="/storage.png"
                  alt="Material Storage"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-heading font-semibold text-lg">Material Storage</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

