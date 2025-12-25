"use client";

import { useState } from "react";
import {
  CheckCircle,
  DollarSign,
  TrendingUp,
  FileText,
  Loader2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { sendPurchasingRequest } from "@/app/actions/sendPurchasingRequest";

export default function PurchasingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    materialType: "",
    estimatedQuantity: "",
    additionalDetails: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Market-Leading Rates",
      description:
        "Competitive purchasing rates based on current index prices.",
    },
    {
      icon: TrendingUp,
      title: "Transparent Valuations",
      description: "Clear pricing structure with no hidden fees.",
    },
    {
      icon: FileText,
      title: "High-Volume Focus",
      description: "Designed for producers and waste brokers.",
    },
  ];

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
            Competitive Material Purchasing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-body">
            Turn your waste streams into revenue. We buy sorted scrap at
            market-leading rates.
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
                SGV Recycle actively trades in secondary raw materials. We offer
                competitive purchasing rates for segregated waste streams,
                including baled plastics, sorted rubber, and scrap metals.
                Designed for high-volume producers and waste brokers, our
                purchasing arm offers transparent valuations based on current
                index prices.
              </p>
            </div>
          </GlassCard>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <GlassCard key={index} delay={0.3 + index * 0.1}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-green" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 font-body">
                      {benefit.description}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Valuation Form */}
          <div className="mx-auto max-w-2xl rounded-2xl bg-white border border-slate-100 p-10 shadow-xl">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 rounded-full bg-green-50 p-6">
                    <FileText className="h-12 w-12 text-[#7CC444]" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                    Valuation Request Sent
                  </h3>
                  <p className="mt-2 text-slate-500 font-body">
                    We have received your details. Expect a commercial offer at{" "}
                    <strong>{formData.businessEmail}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        fullName: "",
                        businessEmail: "",
                        companyName: "",
                        materialType: "",
                        estimatedQuantity: "",
                        additionalDetails: "",
                      });
                    }}
                    className="mt-8 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors font-body"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  action={async (formData: FormData) => {
                    setStatus("loading");
                    const result = await sendPurchasingRequest(formData);
                    if (result.success) {
                      setStatus("success");
                    } else {
                      setStatus("idle");
                      alert(
                        result.error ||
                          "Failed to send request. Please try again."
                      );
                    }
                  }}
                  className="space-y-6"
                >
                  {/* Honeypot fields */}
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
                  <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">
                    Request a Valuation
                  </h2>

                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                        className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        disabled={status === "loading"}
                        className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Company Ltd"
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div>
                    <label
                      htmlFor="businessEmail"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                    >
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="name@company.com"
                    />
                  </div>

                  {/* Material Type */}
                  <div>
                    <label
                      htmlFor="materialType"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                    >
                      Material Type
                    </label>
                    <select
                      id="materialType"
                      name="materialType"
                      value={formData.materialType}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select material type</option>
                      <option value="tyres">Tyres</option>
                      <option value="rubber">Rubber</option>
                      <option value="plastics">Plastics</option>
                      <option value="metals">Metals</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

                  {/* Estimated Quantity */}
                  <div>
                    <label
                      htmlFor="estimatedQuantity"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                    >
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      id="estimatedQuantity"
                      name="estimatedQuantity"
                      value={formData.estimatedQuantity}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="e.g., 5 Tonnes"
                    />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label
                      htmlFor="additionalDetails"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 font-body"
                    >
                      Additional Details
                    </label>
                    <textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={4}
                      disabled={status === "loading"}
                      className="w-full rounded-lg bg-slate-50 border-transparent px-4 py-3 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#7CC444] transition-all font-body resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Any additional information about your materials..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-slate-900 hover:bg-[#7CC444] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 font-body disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Request Purchase Offer"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <GlassCard>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                Materials We Purchase
              </h3>
              <ul className="space-y-3">
                {[
                  "Baled plastics (PET, HDPE, LDPE, PP)",
                  "Sorted rubber materials",
                  "Scrap metals",
                  "High-grade crumb rubber",
                  "Clean, segregated waste streams",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0 mt-1" />
                    <span className="text-slate-700 font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
