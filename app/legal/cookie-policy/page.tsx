'use client'

import { motion } from 'framer-motion'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-12">
            Cookie Policy
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 font-body text-slate-700">
            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">What are Cookies</h2>
              <p className="leading-relaxed">
                Small text files stored on your device to help the site function.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Essential Cookies</h2>
              <p className="leading-relaxed">
                Required for the 'Request Collection' forms and 'Client Login' to function securely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Analytics Cookies</h2>
              <p className="leading-relaxed">
                We use Google Analytics to understand traffic sources. These are anonymized.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Managing Cookies</h2>
              <p className="leading-relaxed">
                You can disable cookies in your browser settings, though some site features may not function correctly.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

