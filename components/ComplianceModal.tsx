'use client'

import Image from 'next/image'
import { X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ComplianceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ComplianceModal({ isOpen, onClose }: ComplianceModalProps) {
  const complianceItems = [
    {
      id: 1,
      name: 'Environment Agency',
      details: 'Registered Waste Carrier: CBDU12345',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Environment_Agency_logo.svg',
    },
    {
      id: 2,
      name: 'ISO 9001',
      details: 'Quality Management Systems',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/ISO_9001-2015_certified.svg/300px-ISO_9001-2015_certified.svg.png',
    },
    {
      id: 3,
      name: 'ISO 14001',
      details: 'Environmental Management',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/ISO_14001-2015_certified.svg/300px-ISO_14001-2015_certified.svg.png',
    },
    {
      id: 4,
      name: 'SafeContractor',
      details: 'Approved Safety Standards',
      logo: 'https://placehold.co/400x200/ffffff/3A7D33?text=SafeContractor&font=montserrat',
    },
    {
      id: 5,
      name: 'WAMITAB / CIWM',
      details: 'Operator Competence Certificate',
      logo: 'https://placehold.co/400x200/ffffff/3A7D33?text=WAMITAB&font=montserrat',
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
                <h2 className="text-2xl font-heading font-bold text-slate-900">
                  Accreditations & Licenses
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {complianceItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: item.id * 0.05 }}
                      className="group relative border border-slate-100 rounded-xl p-4 hover:border-accent-green/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      {/* Logo */}
                      <div className="w-full h-24 mb-4 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden p-2">
                        <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="space-y-1">
                        <h3 className="font-heading font-bold text-slate-900 text-sm">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-body">
                          {item.details}
                        </p>
                      </div>

                      {/* Download/View Icon (appears on hover) */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-2 bg-accent-green/10 rounded-lg group-hover:bg-accent-green/20 transition-colors">
                          <Download className="w-4 h-4 text-accent-green" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

