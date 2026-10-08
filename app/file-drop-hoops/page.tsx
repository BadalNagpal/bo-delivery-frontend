"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FolderOpen, X } from "lucide-react";
import { useState, useRef } from "react";

export default function FileDropHoops() {
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  
  const [animatingBall, setAnimatingBall] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = [".pdf", ".sql", ".accdb", ".xlsx", ".xlsm"];

  const isValidFile = (name: string) => {
    return allowedExtensions.some(ext => name.toLowerCase().endsWith(ext));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
        .filter(f => isValidFile(f.name))
        .map(f => ({
          name: f.name,
          size: (f.size / (1024 * 1024)).toFixed(1) + " MB"
        }));
      
      if (newFiles.length > 0) {
        triggerDropAnimation(newFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
        .filter(f => isValidFile(f.name))
        .map(f => ({
          name: f.name,
          size: (f.size / (1024 * 1024)).toFixed(1) + " MB"
        }));
      
      if (newFiles.length > 0) {
        triggerDropAnimation(newFiles);
      }
    }
  };

  const triggerDropAnimation = (newFiles: any[]) => {
    setAnimatingBall(true);
    setTimeout(() => {
      setFiles(prev => [...prev, ...newFiles]);
      setAnimatingBall(false);
    }, 1500); // Animation duration
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col pt-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-br from-surface-container-lowest/50 to-surface-container-lowest/0 z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-[32px] font-headline-xl text-on-surface mb-8 font-bold">Upload files</h1>

          <div 
            className="w-full py-8 px-8 border-[1.5px] border-dashed border-primary-container/40 rounded-2xl flex flex-col items-center justify-center relative bg-surface-bright group hover:border-primary-container transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf,.sql,.accdb,.xlsx,.xlsm"
              multiple 
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            
            {/* Basketball Hoop container */}
            <div className="relative mb-6 w-56 h-56 flex items-center justify-center pointer-events-none">
              
              {/* Back part of hoop (z-10) */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary-container drop-shadow-sm">
                  {/* Top Mount */}
                  <path d="M 30 20 L 50 16 L 70 20" stroke="#D5DAE4" strokeWidth="1.5" />
                  <rect x="48" y="14" width="4" height="6" fill="#D5DAE4" />

                  {/* Backboard */}
                  <rect x="15" y="20" width="70" height="42" rx="4" stroke="currentColor" strokeWidth="3.5" fill="white" />
                  
                  {/* Inner Dashed Rect */}
                  <rect x="33" y="33" width="34" height="19" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="3 3.5" strokeLinecap="round" />
                  
                  {/* Center Dot */}
                  <circle cx="50" cy="42.5" r="2.5" fill="#FFB4A3" />
                  
                  {/* Rim Base (Neck) */}
                  <path d="M 45 52 L 55 52 L 52 58 L 48 58 Z" fill="currentColor" />

                  {/* Back Hoop Ring */}
                  <path d="M 28 58 A 22 4 0 0 1 72 58" stroke="currentColor" strokeWidth="3.5" fill="none" />
                </svg>
              </div>

              {/* Animated Basketball (z-20) */}
              <AnimatePresence>
                {animatingBall && (
                  <motion.div
                    initial={{ x: 0, y: -200, scale: 0, rotate: 0 }}
                    animate={{ 
                      x: [0, 0, 0], 
                      y: [-200, -70, 90], 
                      scale: [0, 1.4, 0.9],
                      rotate: [0, 360, 720]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      times: [0, 0.4, 1],
                      ease: ["easeOut", "easeIn"]
                    }}
                    className="absolute z-20 w-12 h-12 bg-primary-container rounded-full shadow-lg flex items-center justify-center border-2 border-white/30"
                  >
                    <svg className="w-8 h-8 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2V22" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.92822 4.92896C7.74102 7.74175 11.1643 9.4038 15 9.4038" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.0718 19.071C16.259 16.2582 12.8357 14.5962 9 14.5962" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Front part of hoop (z-30) */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary-container">
                  
                  {/* Net - solid grid lines with lighter opacity, open at bottom */}
                  <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round">
                    {/* Verticals */}
                    <path d="M 28 58 Q 35 75 42 85" />
                    <path d="M 39 58 Q 42.5 75 46 85" />
                    <path d="M 50 58 L 50 85" />
                    <path d="M 61 58 Q 57.5 75 54 85" />
                    <path d="M 72 58 Q 65 75 58 85" />
                    
                    {/* Horizontals */}
                    <path d="M 32 67 Q 50 71 68 67" />
                    <path d="M 37 76 Q 50 80 63 76" />
                    {/* Bottom arc omitted intentionally to leave it "cutted out" */}
                  </g>
                  
                  {/* Front Hoop Ring */}
                  <path d="M 72 58 A 22 4 0 0 1 28 58" stroke="currentColor" strokeWidth="3.5" fill="none" />
                </svg>
              </div>

            </div>
            
            <h3 className="text-[20px] font-headline-md mb-2 text-on-surface font-bold tracking-tight">Drop files here or shoot through the hoop</h3>
            <p className="text-on-surface-variant text-[13px] mb-6 text-center">
              Drag direct from desktop or browse local files to score ingestion
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-container text-on-primary px-8 py-3 rounded-lg font-label-md shadow-sm transition-all hover:bg-primary-container/90 text-[13px] relative z-10 flex items-center gap-2 mb-4 font-bold"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <FolderOpen size={16} strokeWidth={2.5} />
              Browse Files
            </motion.button>
            
            <div className="flex items-center gap-2 mt-2 relative z-10">
              <span className="bg-surface-container-high text-on-surface-variant text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">.xlsx / .xlsm</span>
              <span className="bg-surface-container-high text-on-surface-variant text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">.accdb</span>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between mb-4 border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-3">
                <span className="font-label-md text-on-surface font-bold">Uploaded Files</span>
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                  {files.length} ready
                </span>
              </div>
              <span className="text-[12px] text-on-surface-variant font-medium">Ready for artefact matrix</span>
            </div>
            
            <div className="flex flex-col gap-3 min-h-[100px]">
              <AnimatePresence>
                {files.map((file, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.05 }}
                    key={file.name + i} 
                    className="flex items-center justify-between bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 group shadow-sm hover:border-surface-container-highest transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center text-on-primary-fixed-variant">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-label-md text-on-surface mb-0.5">{file.name}</div>
                        <div className="text-[11px] text-on-surface-variant font-medium">{file.size} • Hooped successfully</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-secondary bg-secondary-container px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-secondary/10">
                        <CheckCircle2 size={12} strokeWidth={3} />
                        Ready
                      </span>
                      <button 
                        className="text-on-surface-variant hover:text-error transition-colors"
                        onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                      >
                        <X size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full h-[1px] bg-surface-container-high my-10"></div>

          <div className="flex justify-between items-center pb-8">
            <button 
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-on-surface transition-colors bg-surface-container-low px-5 py-2.5 rounded-full text-[13px] font-bold"
              onClick={() => setFiles([])}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Ingest Deck
            </button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-container text-on-primary px-8 py-3 rounded-full font-label-md shadow-lg shadow-primary-container/20 hover:bg-[#E54D2B] transition-all flex items-center gap-2 text-[13px] font-bold tracking-wide"
            >
              Proceed to Artefact Matrix &rarr;
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
