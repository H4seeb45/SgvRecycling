"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Loader2, Truck } from "lucide-react";
import { sendCollectionRequest } from "@/app/actions/sendCollectionRequest";

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollectionDrawer({
  isOpen,
  onClose,
}: CollectionDrawerProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phoneNumber: "",
    materialType: "",
    postcode: "",
    estimatedWeight: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMaterialSelect = (type: string) => {
    setFormData({
      ...formData,
      materialType: formData.materialType === type ? "" : type,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const formDataObj = new FormData();
    formDataObj.append("companyName", formData.companyName);
    formDataObj.append("contactName", formData.contactName);
    formDataObj.append("phoneNumber", formData.phoneNumber);
    formDataObj.append("materialType", formData.materialType);
    formDataObj.append("postcode", formData.postcode);
    formDataObj.append("estimatedWeight", formData.estimatedWeight);

    const result = await sendCollectionRequest(formDataObj);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("idle");
      alert(result.error || "Failed to send request. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      companyName: "",
      contactName: "",
      phoneNumber: "",
      materialType: "",
      postcode: "",
      estimatedWeight: "",
    });
  };

  const materialTypes = [
    { id: "tyres", label: "Tyres" },
    { id: "rubber", label: "Rubber" },
    { id: "plastic", label: "Plastic" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm md:backdrop-blur-md z-50"
          />

          {/* Slide-Over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header - Fixed at top */}
            <div className="flex-none flex items-start justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-1">
                  Schedule a Collection
                </h2>
                <p className="text-sm text-slate-600 font-body">
                  Get a quote and pickup slot within 24 hours.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-4 hover:bg-slate-100 rounded-lg transition-colors touch-target"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Form Content - Scrollable middle section */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col items-center justify-center min-h-full p-6 text-center"
                  >
                    <div className="bg-green-50 text-[#7CC444] rounded-full p-6 w-24 h-24 mb-6 flex items-center justify-center">
                      <Truck className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                      Collection Request Received.
                    </h3>
                    <p className="text-slate-600 font-body mb-8 max-w-sm">
                      Our logistics team is reviewing your location. You will
                      receive a slot confirmation via email/SMS within 2 hours.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors font-body"
                      >
                        Book Another
                      </button>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-[#7CC444] hover:bg-[#3A7D33] text-white font-semibold rounded-lg transition-colors font-body"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    id="collection-form"
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    action={async (formData: FormData) => {
                      setStatus("submitting");
                      const result = await sendCollectionRequest(formData);
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
                    className="flex flex-col h-full"
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

                    {/* Hidden input for materialType (selected via buttons) */}
                    <input
                      type="hidden"
                      name="materialType"
                      value={formData.materialType}
                    />

                    {/* Scrollable form body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* Section 1: Contact */}
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm font-semibold text-slate-700 mb-2 font-body"
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
                            disabled={status === "submitting"}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter your company name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="contactName"
                              className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                            >
                              Contact Name
                            </label>
                            <input
                              type="text"
                              id="contactName"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleChange}
                              required
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Your name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                              disabled={status === "submitting"}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Material Details */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 font-body">
                          What are we collecting?
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {materialTypes.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleMaterialSelect(type.id)}
                              disabled={status === "submitting"}
                              className={`px-6 py-3 rounded-lg font-semibold text-sm font-body transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                formData.materialType === type.id
                                  ? "bg-green-50 border-2 border-green-500 text-green-700"
                                  : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Logistics */}
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="postcode"
                            className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                          >
                            Postcode / Collection Address
                          </label>
                          <textarea
                            id="postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                postcode: e.target.value,
                              });
                            }}
                            required
                            rows={3}
                            disabled={status === "submitting"}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                            placeholder="Enter postcode or full address"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="estimatedWeight"
                            className="block text-sm font-semibold text-slate-700 mb-2 font-body"
                          >
                            Est. Weight/Volume
                          </label>
                          <input
                            type="text"
                            id="estimatedWeight"
                            name="estimatedWeight"
                            value={formData.estimatedWeight}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-body disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="e.g., 150 Tyres or 2 Tonnes"
                          />
                        </div>
                      </div>

                      {/* Section 4: Visual Evidence (File Upload UI) */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 font-body">
                          Visual Evidence (Optional)
                        </label>
                        <div className="border-dashed border-2 border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition-colors">
                          <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                          <p className="text-sm text-slate-600 font-body">
                            Click to upload photos of waste
                          </p>
                          <p className="text-xs text-slate-400 mt-1 font-body">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer - Fixed at bottom inside form */}
                    <div className="flex-none p-6 border-t border-slate-200 bg-white">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full h-12 bg-[#7CC444] hover:bg-[#3A7D33] text-white font-bold rounded-lg transition-all duration-300 font-body disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
