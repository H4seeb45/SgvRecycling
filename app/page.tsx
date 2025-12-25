"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Recycle,
  Truck,
  Package,
  Calculator,
  Settings,
  ArrowRightCircle,
  Wrench,
  Factory,
  Building2,
  CheckCircle2,
  MapPin,
  Calendar,
  CircleDot,
  Shield,
  Car,
  Flame,
  AlertTriangle,
  Phone,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import CollectionDrawer from "@/components/CollectionDrawer";
import ValuationModal from "@/components/ValuationModal";
import { sendEmail } from "@/app/actions/sendEmail";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Animated Counter Component
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-6xl md:text-7xl lg:text-8xl font-heading font-light mb-2 bg-gradient-to-br from-accent-green to-white bg-clip-text text-transparent">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
    </div>
  );
}

// Circuit Node Visualization Component
function CircuitNodeVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Satellite nodes configuration with floating animation timing
  const satellites = [
    {
      icon: Car,
      label: "Automotive",
      x: 50,
      y: 15,
      floatDuration: 3,
      floatDelay: 0,
    },
    {
      icon: Factory,
      label: "Industrial",
      x: 20,
      y: 85,
      floatDuration: 4,
      floatDelay: 1,
    },
    {
      icon: Building2,
      label: "Commercial",
      x: 80,
      y: 85,
      floatDuration: 3.5,
      floatDelay: 0.5,
    },
  ];

  // Variants for orchestrated animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger satellites
        when: "beforeChildren", // Ensure container animates before children
      },
    },
  };

  const centerNodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2, // Appear after container
      },
    },
  };

  const satelliteVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative w-full h-[360px] hidden md:flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="bg-green-500/5 blur-3xl absolute inset-0 rounded-full" />

      {/* Center Node - Experience Core */}
      <motion.div
        variants={centerNodeVariants}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        {/* Main Center Node */}
        <div className="relative w-24 h-24 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center shadow-2xl">
          <span className="text-sm font-heading font-bold">20+ Years</span>
        </div>
      </motion.div>

      {/* Satellite Nodes with Floating Animation */}
      {satellites.map((satellite, index) => {
        const Icon = satellite.icon;
        return (
          <motion.div
            key={index}
            variants={satelliteVariants}
            className="absolute z-10 group"
            style={{
              left: satellite.x + "%",
              top: satellite.y + "%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: satellite.floatDuration,
              delay: satellite.floatDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.15,
              y: 0, // Pause floating on hover
            }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-green-100 shadow-[0_10px_25px_-5px_rgba(124,196,68,0.3)]">
              <Icon className="w-10 h-10 text-[#7CC444]" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-heading font-bold text-slate-600 uppercase tracking-wide">
                {satellite.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Marquee Component for Compliance Ticker
function ComplianceMarquee() {
  const certifications = [
    "Environment Agency",
    "ISO 9001",
    "SafeContractor",
    "WAMITAB",
  ];

  // Duplicate multiple times for seamless loop
  const duplicated = [...certifications, ...certifications, ...certifications];

  return (
    <div className="overflow-hidden py-8 border-y border-white/10 relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicated.map((cert, index) => (
          <div
            key={index}
            className="mx-12 text-2xl font-heading font-light text-white/50 hover:text-white transition-opacity duration-300 flex-shrink-0"
          >
            {cert}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  useEffect(() => {
    const handleOpenDrawer = () => {
      setIsDrawerOpen(true);
    };
    window.addEventListener("openCollectionDrawer", handleOpenDrawer);
    return () =>
      window.removeEventListener("openCollectionDrawer", handleOpenDrawer);
  }, []);
  const services = [
    {
      href: "/services/tyres",
      title: "Tyres",
      description: "Automotive Circular Economy Solutions",
      icon: Truck,
      delay: 0.1,
    },
    {
      href: "/services/rubber",
      title: "Rubber",
      description: "Industrial Rubber Remediation",
      icon: Recycle,
      delay: 0.2,
    },
    {
      href: "/services/plastics",
      title: "Plastics",
      description: "Polymer Sorting & Recovery",
      icon: Package,
      delay: 0.3,
    },
  ];

  const lifecycleSteps = [
    {
      icon: Calculator,
      title: "Valuation",
      description: "Digital assessment of your material value.",
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Fleet dispatch & secure collection.",
    },
    {
      icon: Settings,
      title: "Processing",
      description: "Shredding, granulating, and polymer segregation.",
    },
    {
      icon: ArrowRightCircle,
      title: "Re-entry",
      description: "Supply to manufacturing supply chains.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Industrial Material Recovery.
              <span className="block text-accent-green">Mastered.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 font-body">
              The UK's premier partner for <strong>Tyre</strong>,{" "}
              <strong>Rubber</strong>, and <strong>Plastic</strong> recycling.
              We combine fully licensed collection with competitive purchasing
              to deliver zero-to-landfill solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-accent-green hover:bg-accent-forest text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Book a Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => setIsValuationOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm md:backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Material Valuation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            <div className="text-center">
              <AnimatedCounter end={15} suffix="k+" />
              <p className="text-xl text-white/70 font-body mt-4">
                Tonnes Processed
              </p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={98} suffix="%" />
              <p className="text-xl text-white/70 font-body mt-4">
                Landfill Diversion
              </p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={24} suffix="h" />
              <p className="text-xl text-white/70 font-body mt-4">
                Average Response
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive recycling solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href}>
                  <GlassCard
                    delay={service.delay}
                    className="h-full hover:scale-105 cursor-pointer group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="w-14 h-14 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-green/20 transition-colors">
                          <Icon className="w-7 h-7 text-accent-green" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 font-body">
                          {service.description}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center text-accent-green font-semibold group-hover:text-accent-forest transition-colors">
                        Learn more
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Environmental Imperative */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Why We Do It: The Cost of Inaction.
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto font-body">
              Unregulated tyre waste is not just an eyesore—it is a critical
              environmental hazard. We turn a liability into a sustainable
              resource.
            </p>
          </motion.div>

          {/* Two Column Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Card A: The Risk */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 border border-red-900/30 rounded-xl p-8"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  The Stockpile Hazard
                </h3>
              </div>

              <div className="space-y-4 text-slate-300 font-body">
                <p className="leading-relaxed">
                  <strong className="text-white">Fire Risk:</strong> Tyre fires
                  release pyrolytic oil and toxic smoke, burning for months and
                  contaminating local air quality.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Leaching:</strong> Degrading
                  rubber leaches heavy metals and chemicals into groundwater,
                  posing long-term ecological threats.
                </p>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-sm text-slate-400">
                    <strong className="text-white">Time to Decompose:</strong>{" "}
                    &gt;80 Years.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Arrow Icon (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <ArrowRight className="w-12 h-12 text-slate-600" />
            </div>

            {/* Card B: The Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm md:backdrop-blur border border-green-500/30 rounded-xl p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(124,196,68,0.3)] transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-6 h-6 text-[#7CC444]" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white group-hover:text-accent-green transition-colors">
                  The SGV Recovery Process
                </h3>
              </div>

              <div className="space-y-4 text-slate-300 font-body group-hover:text-slate-200 transition-colors">
                <p className="leading-relaxed">
                  <strong className="text-white group-hover:text-accent-green transition-colors">
                    100% Material Recovery:
                  </strong>{" "}
                  We shred and granulate tyres into high-grade rubber crumb.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white group-hover:text-accent-green transition-colors">
                    Carbon Offset:
                  </strong>{" "}
                  Recycling 1 tonne of tyres saves 2 tonnes of CO2 compared to
                  production from raw materials.
                </p>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <strong className="text-white group-hover:text-accent-green transition-colors">
                      Result:
                    </strong>{" "}
                    Sports surfaces, asphalt additives, and construction
                    aggregates.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Typography & Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="uppercase text-sm font-heading font-semibold tracking-wider text-accent-green mb-4">
                WHO WE ARE
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                Built on Decades of Expertise. Modernized for Tomorrow.
              </h2>
              <p className="text-lg text-slate-700 font-body leading-relaxed mb-8">
                SGV Recycle combines deep-rooted industry knowledge with
                cutting-edge recovery technology. Incorporated in 2018, we have
                rapidly evolved into one of London's premier waste management
                partners, processing thousands of tonnes of rubber, tyre, and
                plastic waste annually.
              </p>

              {/* Key Selling Points */}
              <div className="space-y-4 mb-8">
                {[
                  "Global Export Network",
                  "100% Compliance Record",
                  "Bespoke Logistics Solutions",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
                    <span className="text-slate-700 font-body text-lg">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Ribbon */}
              <div className="space-y-3">
                <p className="text-xs text-slate-400 tracking-widest uppercase font-heading">
                  FULLY ACCREDITED & LICENSED BY:
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  <img
                    src="https://placehold.co/180x60/ffffff/475569?text=Environment+Agency&font=merriweather"
                    alt="Environment Agency"
                    className="h-10 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <img
                    src="https://placehold.co/150x60/ffffff/475569?text=ISO+9001:2015&font=roboto"
                    alt="ISO 9001"
                    className="h-10 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <img
                    src="https://placehold.co/180x60/ffffff/475569?text=SafeContractor&font=oswald"
                    alt="SafeContractor"
                    className="h-10 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <img
                    src="https://placehold.co/150x60/ffffff/475569?text=WAMITAB&font=lato"
                    alt="WAMITAB"
                    className="h-10 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Circuit Node Visualization (Desktop) */}
            <div className="hidden md:block">
              <CircuitNodeVisualization />
            </div>

            {/* Mobile Version - Simple Vertical Stack */}
            <div className="md:hidden w-full">
              <div className="space-y-8">
                {[
                  { icon: Car, label: "Automotive" },
                  { icon: Factory, label: "Industrial" },
                  { icon: Building2, label: "Commercial" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-green-100 shadow-[0_10px_25px_-5px_rgba(124,196,68,0.3)] mb-3">
                        <Icon className="w-10 h-10 text-[#7CC444]" />
                      </div>
                      <span className="text-sm font-heading font-bold text-slate-600 uppercase tracking-wide">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6"
                >
                  <div className="w-24 h-24 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center shadow-2xl mx-auto">
                    <span className="text-sm font-heading font-bold">
                      20+ Years
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Ticker */}
      <section className="bg-slate-950 text-white">
        <ComplianceMarquee />
      </section>

      {/* The Lifecycle */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              The Lifecycle
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our streamlined process from collection to re-entry
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-slate-300" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {lifecycleSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Icon Circle */}
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10 border-4 border-slate-50">
                        <Icon className="w-10 h-10 text-accent-green" />
                      </div>

                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 font-body text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Section */}
      <section id="contact" className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text & Context */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-heading font-bold mb-6">
                Ready to streamline your waste streams?
              </h2>
              <p className="text-lg text-slate-400 mb-8 font-body">
                Join 850+ UK businesses transforming their disposal costs into
                revenue. Speak to our team today.
              </p>

              {/* Direct Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white font-medium">
                  <Phone className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span>020 8123 4567</span>
                </div>
                <div className="flex items-center gap-4 text-white font-medium">
                  <Mail className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span>info@sgvrecycle.co.uk</span>
                </div>
                <div className="flex items-center gap-4 text-white font-medium">
                  <MapPin className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span>110 Plashet Road, London</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl overflow-hidden relative min-h-[450px]">
                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50"
                      >
                        <Check className="h-12 w-12 text-[#7CC444]" />
                      </motion.div>
                      <h3 className="mb-2 text-2xl font-heading font-bold text-slate-900">
                        Message Received
                      </h3>
                      <p className="mb-8 max-w-xs text-slate-500 font-body">
                        Our team will review your inquiry and get back to you
                        shortly.
                      </p>
                      <button
                        onClick={() => setFormStatus("idle")}
                        className="text-sm font-semibold text-[#7CC444] hover:underline font-body"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormStatus("submitting");

                        // Create FormData from the form element
                        const formElement = e.currentTarget;
                        const formData = new FormData(formElement);

                        // Debug: Log form data
                        console.log("FormData received:", {
                          fullName: formData.get("fullName"),
                          email: formData.get("email"),
                          topic: formData.get("topic"),
                          message: formData.get("message"),
                          company: formData.get("company"),
                        });

                        const result = await sendEmail(formData);
                        if (result.success) {
                          setFormStatus("success");
                          // Reset form
                          formElement.reset();
                        } else {
                          setFormStatus("idle");
                          alert(
                            result.error ||
                              "Failed to send message. Please try again."
                          );
                        }
                      }}
                    >
                      {/* Honeypot field - hidden from users */}
                      <input
                        type="text"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                      />
                      <input
                        type="text"
                        name="honeyPot"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                      />

                      {/* Row 1: Name & Company */}
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          required
                          disabled={formStatus === "submitting"}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#7CC444] focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <input
                          type="text"
                          name="company"
                          placeholder="Company (Optional)"
                          disabled={formStatus === "submitting"}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#7CC444] focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Row 2: Email */}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#7CC444] focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                      />

                      {/* Row 3: Topic Dropdown */}
                      <select
                        name="topic"
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#7CC444] focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Topic</option>
                        <option value="collection">Schedule Collection</option>
                        <option value="sell">Sell Material</option>
                        <option value="general">General Inquiry</option>
                      </select>

                      {/* Row 4: Message */}
                      <textarea
                        name="message"
                        placeholder="How can we help?"
                        rows={3}
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#7CC444] focus:border-transparent outline-none transition-all font-body resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7CC444] py-4 font-bold text-white transition-all hover:bg-[#6ab335] shadow-lg shadow-green-900/20 font-body disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus === "submitting" ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Drawer */}
      <CollectionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Valuation Modal */}
      <ValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />
    </div>
  );
}
