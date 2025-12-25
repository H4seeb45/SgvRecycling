'use client'

import { motion } from 'framer-motion'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-12">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 font-body text-slate-700">
            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">1. Service Agreement</h2>
              <p className="leading-relaxed">
                By booking a collection, you agree that you are the legal owner of the waste and that it matches the description provided during the booking process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">2. Waste Acceptance</h2>
              <p className="leading-relaxed">
                SGV Recycle reserves the right to reject loads that contain undeclared hazardous materials, excessive contamination, or non-conforming items. Rejected loads may incur a wasted journey fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">3. Transfer of Title</h2>
              <p className="leading-relaxed">
                Title to the waste passes to SGV Recycle only once the material has been accepted at our facility and a Waste Transfer Note has been countersigned.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">4. Payment Terms</h2>
              <p className="leading-relaxed">
                For non-account customers, payment is due prior to collection. Account customers are subject to standard 30-day terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">5. Liability</h2>
              <p className="leading-relaxed">
                Our liability is limited to the cost of the specific collection service booked.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

