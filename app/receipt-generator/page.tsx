"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowDownToLine } from "lucide-react";

export default function ReceiptGenerator() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 pb-12 relative z-10">
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 text-[#2ECA6A] bg-[#2ECA6A]/10 px-4 py-1.5 rounded-full font-bold text-xs"
      >
        <CheckCircle2 size={14} strokeWidth={3} />
        Generated
      </motion.div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="w-[420px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative drop-shadow-sm pb-8"
      >
        <div className="receipt-edge absolute top-[-10px] left-0 drop-shadow-sm"></div>
        
        <div className="px-10 pt-12 pb-6 flex flex-col items-center">
          
          <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
            <div className="absolute top-1 right-2 w-5 h-5 bg-[#FF5A36]/20 rounded border border-[#FF5A36]"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-[#FF5A36] rounded shadow-sm flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <h2 className="font-extrabold text-gray-800 text-[15px] tracking-widest text-center uppercase">DEPLOYMENT RECEIPT</h2>
          <div className="text-[10px] text-gray-500 font-bold tracking-wider mt-1 mb-8">
            Task ID: DEP-2026-10-08-992
          </div>
          
          <div className="w-full border-b-[1.5px] border-dashed border-gray-200 mb-6"></div>
          
          <div className="w-full space-y-4 px-2">
            {[
              { name: "Target Client", val: "Rand Merchant Bank", color: "text-[#FF5A36]" },
              { name: "Environment", val: "PROD-VAULT", color: "text-[#2ECA6A]" }
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FF5A36] rounded-full"></div>
                  <span className="text-gray-500 uppercase">{row.name}</span>
                </div>
                <span className={row.color}>{row.val}</span>
              </div>
            ))}
            
            <div className="w-full border-b border-gray-100 my-4"></div>
            
            <div className="space-y-3 pt-2">
              {[
                "Tables (DDL/DML)",
                "Procedures",
                "Views & Mat Views",
                "Functions"
              ].map((name, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-700">{name}</span>
                  </div>
                  <div className="text-[#2ECA6A]">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full border-b-[1.5px] border-dashed border-gray-200 mt-8 mb-6"></div>
          
          <button className="bg-white border border-gray-200 text-[#2ECA6A] px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center gap-2 text-xs shadow-sm">
            <ArrowDownToLine size={14} strokeWidth={2.5} />
            Download
          </button>
        </div>

        <div className="receipt-edge-bottom absolute bottom-[-10px] left-0 drop-shadow-sm"></div>
      </motion.div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#FF5A36] text-white px-12 py-3 rounded-full font-bold hover:bg-[#E54D2B] shadow-xl shadow-[#FF5A36]/30 transition-all mt-4 text-xs tracking-wide"
      >
        Back to Home
      </motion.button>
    </div>
  );
}
