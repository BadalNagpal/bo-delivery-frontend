"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowDownToLine, Landmark, Home } from "lucide-react";

export default function ReceiptGenerator() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] gap-4 pb-16 pt-4 relative z-10 max-w-5xl mx-auto">
      
      {/* Top Generated Badge */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-1.5 text-white bg-[#10B981] px-4 py-1.5 rounded-full font-bold text-[13px] shadow-sm mb-2"
      >
        <CheckCircle2 size={16} strokeWidth={2.5} />
        Generated
      </motion.div>

      {/* Receipt Card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="w-[440px] bg-white rounded-t-xl relative drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)] pb-10"
      >
        {/* Soft orange top border */}
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#FFF0EC] rounded-t-xl"></div>
        
        <div className="pt-12 px-10 flex flex-col items-center">
          
          <div className="text-[#FF5A36] mb-3">
             <Landmark size={28} strokeWidth={2} />
          </div>
          
          <h2 className="font-extrabold text-gray-900 text-[18px] tracking-wide text-center uppercase">RAND MERCHANT BANK</h2>
          <div className="text-[12px] text-gray-500 font-semibold tracking-[0.15em] mt-1 mb-8 uppercase">
            SQL ARTEFACT DELIVERY
          </div>
          
          <div className="w-full bg-[#F5F7F9] rounded-lg p-4 flex items-center justify-between mb-8 font-mono text-[12px] font-bold text-gray-700">
             <span>DATE</span>
             <span>08 OCT 2025, 14:32</span>
          </div>
          
          <div className="w-full border-b-[2px] border-dashed border-gray-200 mb-6"></div>
          
          <div className="w-full space-y-3 px-1">
             {[
               "BO_DDLs (Tables)",
               "Stored Procedures",
               "Custom Types",
               "Functions & Views"
             ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#FF5A36]"></div>
                      <span className="font-mono text-[13px] font-semibold text-gray-700">{item}</span>
                   </div>
                   <div className="bg-[#10B981] text-white px-2 py-0.5 rounded text-[11px] font-bold tracking-wider">OK</div>
                </div>
             ))}
          </div>
          
          <div className="w-full border-b-[2px] border-dashed border-gray-200 mt-6 mb-2"></div>
        </div>

        {/* Zig-zag bottom */}
        <div 
          className="absolute bottom-[-8px] left-0 right-0 h-[8px]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,0 8,8 16,0' fill='white'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x'
          }}
        ></div>
      </motion.div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2 mt-6 mb-2">
        <div className="w-[7px] h-[7px] rounded-full bg-[#FF5A36]"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-gray-200"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-gray-200"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-gray-200"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-gray-200"></div>
      </div>

      {/* Download button */}
      <button className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-bold shadow-sm flex items-center gap-2 text-[13.5px] border border-gray-100 hover:bg-gray-50 transition-colors mt-2 mb-2">
        <ArrowDownToLine size={16} strokeWidth={2.5} />
        Download
      </button>

      {/* File tags */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2 max-w-[500px]">
        {['BO_DDLs.zip', 'PROCEDURES.zip', 'TYPES.zip', 'VIEWS.zip'].map((tag, i) => (
          <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
            <svg className="w-[14px] h-[14px] text-[#FF5A36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="font-mono text-[11px] font-bold text-gray-700 tracking-tight">{tag}</span>
          </div>
        ))}
      </div>

      {/* Back to Home Button */}
      <Link href="/" className="w-full max-w-[460px] bg-[#FF5A36] text-white py-3.5 rounded-full font-bold text-[15px] shadow-[0_8px_20px_rgba(255,90,54,0.3)] hover:bg-[#E54D2B] transition-colors flex items-center justify-center gap-2 mt-4">
        <Home size={18} strokeWidth={2.5} />
        Back to Home
      </Link>

    </div>
  );
}
