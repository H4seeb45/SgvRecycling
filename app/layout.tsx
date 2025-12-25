import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SGV Recycle - Sustainable Material Recovery for the UK',
  description: 'Advanced recycling solutions for Rubber, Tyres, and Plastics since 2018.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

