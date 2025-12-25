"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Car,
  Factory,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const servicesMenuItems = [
    {
      icon: Car,
      title: "Tyre Recovery",
      subtitle: "PAS 108 Compliant",
      href: "/services/tyres",
    },
    {
      icon: Factory,
      title: "Rubber Remediation",
      subtitle: "Conveyor & Hoses",
      href: "/services/rubber",
    },
    {
      icon: Building2,
      title: "Plastic Recycling",
      subtitle: "Polymer Sorting",
      href: "/services/plastics",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent text-white border-transparent"
          : "bg-white/90 backdrop-blur-md md:backdrop-blur-lg text-slate-900 border-b border-slate-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.png"
              alt="SGV Recycle"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span
              className={`text-xl font-heading font-bold transition-colors ${
                isTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              SGV Recycle
            </span>
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center gap-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 font-medium transition-colors relative group ${
                  isTransparent ? "text-white" : "text-slate-900"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7CC444] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-20 left-0 right-0 mx-auto z-50 w-full max-w-4xl px-4"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/5">
                      <div className="grid grid-cols-3 gap-8">
                        {servicesMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={index}
                              href={item.href}
                              className="p-4 rounded-lg hover:bg-slate-50 transition-colors group"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                  <Icon className="w-5 h-5 text-[#7CC444]" />
                                </div>
                                <div>
                                  <h3 className="font-heading font-semibold text-slate-900 mb-1">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-slate-600 font-body">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`font-medium transition-colors relative group ${
                isTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7CC444] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Contact Us Link */}
            <Link
              href="/#contact"
              className={`font-medium transition-colors relative group ${
                isTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7CC444] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Primary Purchasing Button */}
            <Link
              href="/purchasing"
              className="rounded-full bg-[#7CC444] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#6ab335] hover:shadow-green-500/30"
            >
              Purchasing
            </Link>
          </div>

          {/* Mobile Menu Button - Always Visible with Proper Z-Index */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative z-50 p-2 transition-colors rounded-lg ${
              isMobileMenuOpen
                ? "text-slate-900 bg-white" // Dark icon when menu is open (white background)
                : isTransparent
                ? "text-white hover:bg-white/10" // White icon when transparent nav
                : "text-slate-900 hover:bg-slate-100" // Dark icon when scrolled
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Click to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel - Slides in from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-screen w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
                <span className="text-xl font-heading font-bold text-slate-900">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 min-h-0">
                {/* Services Accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full"
                >
                  <button
                    onClick={() =>
                      setIsMobileServicesOpen(!isMobileServicesOpen)
                    }
                    className="flex items-center justify-between w-full text-slate-900 text-xl font-heading font-semibold hover:text-[#7CC444] transition-colors py-2"
                  >
                    <span>Services</span>
                    {isMobileServicesOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600" />
                    )}
                  </button>

                  {/* Nested Services List */}
                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 space-y-2 overflow-hidden"
                      >
                        {servicesMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileServicesOpen(false);
                                }}
                                className="flex items-center space-x-3 pl-6 py-2 text-slate-700 text-base font-body border-l-2 border-slate-200 hover:text-[#7CC444] hover:border-[#7CC444] transition-colors"
                              >
                                <Icon className="w-5 h-5" />
                                <div>
                                  <div className="font-medium">
                                    {item.title}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Divider */}
                <hr className="border-slate-200" />

                {/* About Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-900 text-xl font-heading font-semibold hover:text-[#7CC444] transition-colors py-2"
                  >
                    About Us
                  </Link>
                </motion.div>

                {/* Contact Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-900 text-xl font-heading font-semibold hover:text-[#7CC444] transition-colors py-2"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>

              {/* Footer - Sticky Bottom with CTA Button */}
              <div className="flex-shrink-0 p-6 border-t border-slate-200 bg-white">
                <Link
                  href="/purchasing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center rounded-full bg-[#7CC444] px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#6ab335] hover:shadow-green-500/30"
                >
                  Sell Your Waste
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
