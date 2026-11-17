"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowDownToLine, Landmark, Home } from "lucide-react";

export default function ReceiptGenerator() {
  return (
    <div className="relative overflow-hidden py-4 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] w-full">
      {/* Warm Organic Peach Glow Background Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-24 w-[32rem] h-[32rem] bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-surface-container-low/60 rounded-full blur-2xl pointer-events-none"></div>

      {/* Central Presentation Stage */}
      <div className="relative w-full max-w-xl flex flex-col items-center z-10 px-4">
        {/* Top Pill: Generated Status Indicator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary shadow-sm mb-6 transition-transform hover:scale-105 duration-200 text-on-primary"
          style={{ backgroundColor: "rgb(16, 185, 129)", color: "rgb(255, 255, 255)" }}
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          <span className="font-label-md text-label-md tracking-wide">Generated</span>
        </motion.div>

        {/* Tactile Paper Receipt Container */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl shadow-[0_20px_48px_-8px_rgba(220,170,150,0.22),0_8px_20px_-4px_rgba(0,0,0,0.04)] relative transition-all duration-300 hover:shadow-[0_24px_56px_-6px_rgba(220,170,150,0.3)] pb-2"
          id="receipt-card"
        >
          {/* Top Subtle Emboss Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary-fixed/40 via-primary-container/20 to-primary-fixed/40 rounded-t-2xl"></div>

          {/* Receipt Content Area */}
          <div className="px-8 sm:px-10 pt-8 pb-9 flex flex-col font-body-sm text-on-surface">
            {/* Receipt Header */}
            <div className="text-center space-y-1 mb-6">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-primary-container">
                  <Landmark size={20} strokeWidth={2} />
                </span>
                <span className="font-headline-sm text-headline-sm tracking-wider uppercase text-on-surface font-bold">
                  Rand Merchant Bank
                </span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-[11px]">
                SQL Artefact Delivery
              </p>
            </div>

            {/* Metadata Section (Monospaced Receipt Look) */}
            <div className="font-code-sm text-code-sm space-y-1.5 text-on-surface-variant bg-surface-container-low/40 p-3.5 rounded-lg mb-5">
              <div className="flex justify-between items-center">
                <span>DATE</span>
                <span className="text-on-surface font-semibold">08 OCT 2025, 14:32</span>
              </div>
            </div>

            {/* Dotted Separator */}
            <div className="w-full border-b border-dashed border-outline-variant/60 my-2"></div>

            {/* Itemized SQL Delivery Lines */}
            <div className="py-3.5 space-y-2.5 font-code-sm text-code-sm">
              {[
                "BO_DDLs (Tables)",
                "Stored Procedures",
                "Custom Types",
                "Functions & Views",
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span>{item}</span>
                  </div>
                  <span
                    className="font-label-sm text-label-sm bg-secondary px-2 py-0.5 rounded text-on-primary font-bold"
                    style={{ backgroundColor: "rgb(16, 185, 129)", color: "rgb(255, 255, 255)" }}
                  >
                    OK
                  </span>
                </div>
              ))}
            </div>

            {/* Dotted Separator */}
            <div className="w-full border-b border-dashed border-outline-variant/60 my-2"></div>
          </div>

          {/* Real Paper Jagged / Perforated Torn Bottom */}
          <div className="w-full h-4 overflow-hidden relative -mb-3.5">
            <svg
              className="w-full h-full text-surface-container-lowest fill-current drop-shadow-[0_3px_2px_rgba(0,0,0,0.03)]"
              preserveAspectRatio="none"
              viewBox="0 0 400 12"
            >
              <polygon
                points="
                  0,0 10,12 20,0 30,12 40,0 50,12 60,0 70,12 80,0 90,12 100,0 
                  110,12 120,0 130,12 140,0 150,12 160,0 170,12 180,0 190,12 200,0 
                  210,12 220,0 230,12 240,0 250,12 260,0 270,12 280,0 290,12 300,0 
                  310,12 320,0 330,12 340,0 350,12 360,0 370,12 380,0 390,12 400,0
                "
              />
            </svg>
          </div>
        </motion.div>

        {/* Direct Action Chips Below Receipt */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full mt-8">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary-container hover:bg-surface-container-low shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-label-md text-label-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            type="button"
          >
            <ArrowDownToLine size={16} strokeWidth={2.5} />
            <span>Download</span>
          </button>
        </div>

        {/* Quick Download Bundles Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 px-2">
          {["BO_DDLs.zip", "PROCEDURES.zip", "TYPES.zip", "VIEWS.zip"].map((file, idx) => (
            <button
              key={idx}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low text-code-sm font-code-sm shadow-xs transition-colors cursor-pointer"
              type="button"
            >
              <svg className="w-[14px] h-[14px] text-[#FF5A36] group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span>{file}</span>
            </button>
          ))}
        </div>

        {/* Major Primary Coral Call-to-Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 w-full max-w-lg">
          <Link
            href="/client-stack"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-[0_8px_24px_-4px_rgba(255,92,56,0.45)] hover:shadow-[0_12px_28px_-4px_rgba(255,92,56,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Home size={20} strokeWidth={2.5} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
