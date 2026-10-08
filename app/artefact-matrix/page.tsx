"use client";

import { motion } from "framer-motion";

export default function ArtefactMatrix() {
  const artefacts = [
    { title: "Tables (DDL/DML)", desc: "Manage database tables, schemas and relationships." },
    { title: "Procedures", desc: "Stored actions, programs and execution flows." },
    { title: "Views & Mat Views", desc: "Calculated query projections and cached views." },
    { title: "Functions", desc: "Calculated SQL logic & math implementations." },
    { title: "Triggers & Generators", desc: "DB-level reactive triggers and ID generators." },
    { title: "Pluggable Macros", desc: "Extracted SQL logic blocks and snippets." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto flex flex-col gap-6"
    >
      <div className="flex justify-between items-center bg-transparent py-4">
        <div className="flex gap-4 items-center">
          <div>
            <h1 className="text-2xl font-extrabold mb-1 text-gray-800 tracking-tight">Configure Target & SQL Artefacts</h1>
          </div>
          <div className="relative w-12 h-12 ml-4">
            {/* 3D graphic mockup */}
            <div className="absolute top-0 right-0 w-8 h-6 bg-[#FFEDE9] rounded shadow-sm border border-[#FF5A36]/20 skew-x-12"></div>
            <div className="absolute bottom-1 left-1 w-9 h-7 bg-[#FF5A36] rounded shadow-md border border-[#FF5A36] -skew-x-12"></div>
          </div>
        </div>
      </div>

      <div className="surface p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-3 text-[15px]">
            <span className="w-1.5 h-1.5 bg-[#FF5A36] rounded-sm" />
            SQL Artefact Matrix
          </h3>
          <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2 font-bold tracking-wider">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            2026-10-08 11:42
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {artefacts.map((item, i) => {
            const isChecked = i < 4;
            return (
              <motion.label 
                whileHover={{ scale: 1.01 }}
                key={i} 
                className={`flex items-start gap-4 p-5 rounded-2xl transition-all border cursor-pointer group ${
                  isChecked ? 'bg-white border-transparent shadow-[0_4px_15px_rgba(0,0,0,0.03)]' : 'bg-transparent border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="pt-0.5">
                  <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-[#FF5A36] border-[#FF5A36]' : 'bg-white border-gray-300 group-hover:border-[#FF5A36]'
                  }`}>
                    {isChecked && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-800 text-[13px] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2ECA6A]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2ECA6A] animate-pulse"></div>
          4 Artefact types selected
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#FF5A36] text-white px-8 py-3 rounded-full font-bold hover:bg-[#E54D2B] shadow-lg shadow-[#FF5A36]/20 transition-all flex items-center gap-2 text-[13px]"
        >
          Generate Artefacts Matrix &rarr;
        </motion.button>
      </div>
    </motion.div>
  );
}
