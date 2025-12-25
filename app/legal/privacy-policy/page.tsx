'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-body mb-12">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8 font-body text-slate-700">
            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="leading-relaxed">
                SGV Recycle ('we', 'us') is committed to protecting your privacy. This policy details how we collect, use, and store your personal data in compliance with the UK GDPR and Data Protection Act 2018.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Data We Collect</h2>
              <p className="leading-relaxed">
                We collect business contact details (Name, Email, Phone, Company) and operational data (Waste Transfer Note information) necessary to fulfill our service contracts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">How We Use Data</h2>
              <p className="leading-relaxed">
                To provide quotes, schedule collections, issue Waste Transfer Notes, and process payments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Data Sharing</h2>
              <p className="leading-relaxed">
                We do not sell your data. We may share data with the Environment Agency for statutory reporting or with verified logistics partners to fulfill your collection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Your Rights</h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or delete your data. Contact: <a href="mailto:salim@sgvrecyclingltd.co.uk" className="text-[#7CC444] hover:underline">salim@sgvrecyclingltd.co.uk</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

