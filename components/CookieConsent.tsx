'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('cookieConsent')
    
    if (!consent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Text Content (Left) */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-heading font-bold text-sm mb-1">
                  We value your privacy.
                </h3>
                <p className="text-slate-400 text-xs md:text-sm font-body leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze site traffic. By clicking 'Accept', you consent to our use of cookies.{' '}
                  <Link 
                    href="/legal/cookie-policy" 
                    className="underline hover:text-[#7CC444] transition-colors"
                  >
                    Read Policy
                  </Link>
                </p>
              </div>

              {/* Buttons (Right) */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors px-4 py-2 font-body"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-[#7CC444] hover:bg-[#6ab335] text-white rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 shadow-lg shadow-green-500/20 font-body"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

