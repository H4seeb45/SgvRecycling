"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, TrendingUp, Loader2 } from "lucide-react";
import { sendValuationRequest } from "@/app/actions/sendValuationRequest";

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValuationModal({
  isOpen,
  onClose,
}: ValuationModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    materialCategory: "",
    estimatedWeight: "",
    saleType: "",
    materialGrade: "",
    name: "",
    company: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMaterialSelect = (category: string) => {
    setFormData({
      ...formData,
      materialCategory: formData.materialCategory === category ? "" : category,
    });
  };

  // Removed handleSubmit - using server action directly

  const materialCategories = [
    { id: "baled-plastic", label: "Baled Plastic" },
    { id: "sorted-rubber", label: "Sorted Rubber" },
    { id: "scrap-tyres", label: "Scrap Tyres" },
  ];

  const materialGrades = [
    { value: "grade-a", label: "Grade A: Clean / Segregated" },
    { value: "grade-b", label: "Grade B: Mixed / Some Contamination" },
    { value: "grade-c", label: "Grade C: Unsorted / Raw" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm md:backdrop-blur-md"
          />

          {/* Modal Container - Handles positioning & scroll */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg my-8 max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5"
            >
              {/* Green Header Strip */}
              <div className="h-2 w-full bg-gradient-to-r from-green-400 to-green-600" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-2rem)] min-h-[400px]">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="flex flex-col items-center justify-center text-center py-8"
                    >
                      <div className="bg-green-100 text-[#7CC444] rounded-full p-5 w-20 h-20 mb-6 flex items-center justify-center">
                        <TrendingUp className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                        Valuation In Progress.
                      </h3>
                      <p className="text-slate-600 font-body mb-8 max-w-sm">
                        We are comparing your material against current S&P
                        Global Platts indices. Your custom quote will arrive at{" "}
                        <strong>{formData.email}</strong> shortly.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-8 py-3 bg-[#7CC444] hover:bg-[#3A7D33] text-white font-semibold rounded-lg transition-colors font-body"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      {/* Header */}
                      <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-heading font-bold text-slate-900">
                            Material Valuation Request
                          </h2>
                          <p className="text-sm text-slate-500 font-body">
                            Get a competitive market offer for your sorted waste
                            streams.
                          </p>
                        </div>
                      </div>

                      {/* Form */}
                      <form
                        action={async (formDataObj: FormData) => {
                          setStatus("submitting");
                          const result = await sendValuationRequest(
                            formDataObj
                          );
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

                        {/* Hidden inputs for button-selected values */}
                        <input
                          type="hidden"
                          name="materialCategory"
                          value={formData.materialCategory}
                        />
                        <input
                          type="hidden"
                          name="saleType"
                          value={formData.saleType}
                        />

                        {/* Field 1: Material Category */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3 font-body">
                            Material Category
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {materialCategories.map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                onClick={() =>
                                  handleMaterialSelect(category.id)
                                }
                                disabled={status === "submitting"}
                                className={`relative p-4 rounded-lg border-2 transition-all font-body text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                                  formData.materialCategory === category.id
                                    ? "border-[#7CC444] bg-green-50 text-green-700"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {formData.materialCategory === category.id && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-5 h-5 bg-[#7CC444] rounded-full flex items-center justify-center">
                                      <Check className="w-3 h-3 text-white" />
                                    </div>
                                  </div>
                                )}
                                {category.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Field 2: Quantity & Frequency */}
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="estimatedWeight"
                              className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                            >
                              Estimated Weight (Tonnes)
                            </label>
                            <input
                              type="number"
                              id="estimatedWeight"
                              name="estimatedWeight"
                              value={formData.estimatedWeight}
                              onChange={handleChange}
                              required
                              min="0"
                              step="0.1"
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter weight in tonnes"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3 font-body">
                              Sale Type
                            </label>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    saleType: "one-off",
                                  })
                                }
                                disabled={status === "submitting"}
                                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-body text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                                  formData.saleType === "one-off"
                                    ? "border-[#7CC444] bg-green-50 text-green-700"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                One-off Sale
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    saleType: "regular",
                                  })
                                }
                                disabled={status === "submitting"}
                                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-body text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                                  formData.saleType === "regular"
                                    ? "border-[#7CC444] bg-green-50 text-green-700"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                Regular Contract
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Field 3: Material Condition */}
                        <div>
                          <label
                            htmlFor="materialGrade"
                            className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                          >
                            Material Grade / Condition
                          </label>
                          <select
                            id="materialGrade"
                            name="materialGrade"
                            value={formData.materialGrade}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select material grade</option>
                            {materialGrades.map((grade) => (
                              <option key={grade.value} value={grade.value}>
                                {grade.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Field 4: Contact Details */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3 font-body">
                            Contact Details
                          </label>
                          <div className="grid grid-cols-1 gap-4">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Your Name"
                            />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Company Name"
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Email Address"
                            />
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-[#7CC444] hover:bg-[#3A7D33] text-white font-bold py-4 rounded-lg transition-all duration-300 font-body shadow-lg shadow-green-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {status === "submitting" ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Market Rates...
                              </>
                            ) : (
                              "Get Price Quote"
                            )}
                          </button>
                          <p className="text-xs text-slate-500 text-center mt-3 font-body">
                            Quotes based on current S&P Global Platts commodity
                            indices.
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
