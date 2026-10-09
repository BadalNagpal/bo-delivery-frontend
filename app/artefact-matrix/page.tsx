"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Database, Code, Eye, Sigma, Zap, FileText, Terminal, Server, Share2 } from "lucide-react";

export default function ArtefactMatrix() {
  const [selected, setSelected] = useState([true, true, true, true, true, true]);
  const [activeDb, setActiveDb] = useState("PostgreSQL");

  const toggleAll = () => {
    const allSelected = selected.every((v) => v);
    if (allSelected) {
      setSelected(selected.map(() => false));
    } else {
      setSelected(selected.map(() => true));
    }
  };

  const toggleOne = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  const selectedCount = selected.filter(Boolean).length;

  const artefacts = [
    { 
      title: "Database (BO_DDLs)", 
      desc: "Tables, schemas & indexes",
      icon: <Database className="w-5 h-5" strokeWidth={2} />
    },
    { 
      title: "Procedures", 
      desc: "Stored routine wrappers",
      icon: <Code className="w-5 h-5" strokeWidth={2} />
    },
    { 
      title: "Views & Mat-Views", 
      desc: "Materialized query projections",
      icon: <Eye className="w-5 h-5" strokeWidth={2} />
    },
    { 
      title: "Functions", 
      desc: "Deterministic UDFs & math",
      icon: <Sigma className="w-5 h-5" strokeWidth={2} />
    },
    { 
      title: "Triggers & Constraints", 
      desc: "Foreign keys, audit triggers",
      icon: <Zap className="w-5 h-5 fill-current" strokeWidth={1.5} />
    },
    { 
      title: "Metadata Views", 
      desc: "Data dictionary & audit types",
      icon: <FileText className="w-5 h-5" strokeWidth={2} />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto w-full px-4 pt-6 pb-20"
    >
      {/* Banner */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#FFF0EC] via-[#F4F9F9] to-[#FCE8E4] px-12 py-14 mb-8">
        <h1 className="text-[32px] font-extrabold text-gray-900 tracking-tight z-10 relative max-w-lg leading-tight">
          Configure Target & SQL Artefacts
        </h1>
        
        {/* 3D Illustration Mockup */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-full md:w-72 h-44 hidden md:flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Database Disks Visual */}
            <div className="relative flex flex-col items-center">
              {/* Cylinder Layer 1 */}
              <div className="w-24 h-9 rounded-full bg-gradient-to-b from-[#ffdad2] to-[#ff5c38] flex items-center justify-center shadow-md">
                <div className="w-20 h-6 rounded-full bg-[#ff5c38]/80 flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
              </div>
              {/* Cylinder Layer 2 */}
              <div className="-mt-3 w-24 h-9 rounded-full bg-gradient-to-b from-[#ff5c38] to-[#9e422b] flex items-center justify-center shadow-md">
                <div className="w-20 h-6 rounded-full bg-[#ff5c38]/90"></div>
              </div>
              {/* Cylinder Layer 3 */}
              <div className="-mt-3 w-24 h-9 rounded-full bg-gradient-to-b from-[#9e422b] to-[#5b0d00] flex items-center justify-center shadow-lg">
                <div className="w-20 h-6 rounded-full bg-[#9e422b]"></div>
              </div>
            </div>
            {/* Floating Script Card Left */}
            <div className="absolute -left-6 top-2 bg-white rounded-lg p-2.5 shadow-md flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform">
              <FileText className="w-[18px] h-[18px] text-[#ff5c38]" />
              <div className="flex flex-col gap-1 w-12">
                <div className="h-1 bg-[#e3e8f2] rounded-full w-full"></div>
                <div className="h-1 bg-[#ffdad2] rounded-full w-3/4"></div>
              </div>
            </div>
            {/* Floating Code Badge Right */}
            <div className="absolute -right-6 bottom-3 bg-white rounded-lg p-2.5 shadow-md flex items-center gap-1.5 transform rotate-6 hover:rotate-0 transition-transform">
              <Terminal className="w-[20px] h-[20px] text-[#006c49]" />
              <span className="font-mono text-[12px] text-[#161c23] font-bold">.sql</span>
            </div>
            {/* Sparkle accent */}
            <div className="absolute top-0 right-4 text-[#ff5c38] animate-pulse">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Target Database Engine Section */}
      <div className="mb-8 px-2">
        <h2 className="text-[16px] font-bold text-gray-900 mb-4 tracking-tight">Target Database Engine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "PostgreSQL", icon: Database },
            { name: "Oracle Database", icon: Server },
            { name: "IBM Db2", icon: Share2 }
          ].map((db) => {
            const isActive = activeDb === db.name;
            const Icon = db.icon;
            
            return (
              <div 
                key={db.name}
                onClick={() => setActiveDb(db.name)}
                className={`bg-white rounded-[16px] p-5 relative shadow-sm cursor-pointer transition-all h-[110px] flex flex-col justify-between ${
                  isActive 
                    ? 'border border-[#FF5A36] shadow-[0_4px_15px_rgba(255,90,54,0.08)]' 
                    : 'border border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#FFF0ED] text-[#FF5A36]' : 'bg-[#F4F6F8] text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  {isActive && (
                    <div className="bg-[#FF5A36] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide">
                      Active Selection
                    </div>
                  )}
                </div>
                <div className={`text-[14px] ${isActive ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                  {db.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded bg-[#FFF0ED] border border-[#FFE4DE] flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-[#FF5A36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">SQL Artefact Matrix</h2>
            <p className="text-[14px] text-gray-500 font-normal mt-0.5">Manage database definitions, procedures, functions, and metadata bundles</p>
          </div>
        </div>
        
        <button 
          onClick={toggleAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg className="w-[15px] h-[15px] text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
          {selectedCount === 6 ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 px-2">
        {artefacts.map((item, i) => {
          const isChecked = selected[i];
          return (
            <div 
              key={i} 
              onClick={() => toggleOne(i)}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F4F6F8] flex items-center justify-center text-gray-700">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-gray-900 mb-0.5">{item.title}</h3>
                  <p className="text-[13px] text-gray-500 font-normal">{item.desc}</p>
                </div>
              </div>
              
              <div className={`w-[22px] h-[22px] rounded-md border-[1.5px] flex items-center justify-center transition-colors ${
                isChecked ? 'bg-[#FF5A36] border-[#FF5A36]' : 'bg-transparent border-gray-300'
              }`}>
                {isChecked && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] rounded-full bg-[#10B981]"></div>
          <span className="text-[12px] font-bold text-gray-700">{selectedCount} of 6 Artefacts Selected</span>
        </div>
        
        <button className="bg-[#FF5A36] text-white px-6 py-3 rounded-full text-[13.5px] font-bold hover:bg-[#E54D2B] transition-colors shadow-lg shadow-[#FF5A36]/25 flex items-center gap-2">
          Continue to Artefact Matrix
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
