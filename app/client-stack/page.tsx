"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const BANKS = [
  {
    id: 1,
    name: "RAND MERCHANT BANK",
    themeClasses: "from-[#4edea3] via-[#3dc991] to-[#2fb37e]",
    shadow: "rgba(0,108,73,0.35)",
  },
  {
    id: 2,
    name: "UNICREDIT BANK",
    themeClasses: "from-[#38bdf8] via-[#0ea5e9] to-[#0284c7]",
    shadow: "rgba(2,132,199,0.35)",
  },
  {
    id: 3,
    name: "DBS BANK",
    themeClasses: "from-[#fb923c] via-[#f97316] to-[#ea580c]",
    shadow: "rgba(234,88,12,0.35)",
  },
  {
    id: 4,
    name: "ABSA BANK",
    themeClasses: "from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed]",
    shadow: "rgba(124,58,237,0.35)",
  },
  {
    id: 5,
    name: "STATE BANK OF INDIA",
    themeClasses: "from-[#2dd4bf] via-[#14b8a6] to-[#0d9488]",
    shadow: "rgba(13,148,136,0.35)",
  },
  {
    id: 6,
    name: "HSBC BANK",
    themeClasses: "from-[#facc15] via-[#eab308] to-[#ca8a04]",
    shadow: "rgba(202,138,4,0.35)",
  }
];

export default function ClientStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % BANKS.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + BANKS.length) % BANKS.length);
  };

  const activeBank = BANKS[activeIndex];
  
  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  };

  // Compute the currently visible banks so that index 0 is the front card.
  // We take 4 cards to show the front + 3 behind.
  const visibleBanks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(BANKS[(activeIndex + i) % BANKS.length]);
    }
    return arr;
  }, [activeIndex]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-8 flex flex-col items-center select-none overflow-hidden">
      
      {/* Ambient Warm Peach Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mt-20">
        <div className="w-[500px] h-[400px] rounded-full bg-gradient-to-tr from-[#ffdad2]/40 via-[#eef4fe]/60 to-[#6ffbbe]/20 blur-3xl opacity-70"></div>
      </div>
      
      {/* Top Status / Micro Headline */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mb-8">
        <h1 className="text-[28px] md:text-[32px] font-headline-xl text-on-surface tracking-tight font-bold">
          Select Target Client Stack
        </h1>
      </div>
      
      {/* Centered Stacked Deck Carousel Arena */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center pt-6 pb-2">
        
        <button 
          aria-label="Previous client stack" 
          onClick={handlePrev}
          className="group mr-6 md:mr-10 w-10 h-10 rounded-full bg-white text-on-surface shadow-sm hover:shadow-md border border-black/5 flex items-center justify-center transition-all duration-300 active:scale-95 z-30" 
        >
          <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[20px]">chevron_left</span>
        </button>
        
        <div className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            {visibleBanks.map((bank, idx) => {
              // idx represents the depth (0 is front, 1 is behind, etc.)
              const isFront = idx === 0;
              
              // Calculate specific styling for each depth layer based on design
              const getTransform = () => {
                if (idx === 0) return { y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 10 };
                if (idx === 1) return { y: -20, scale: 0.95, rotate: -2, opacity: 0.95, zIndex: 9 };
                if (idx === 2) return { y: -36, scale: 0.9, rotate: 4, opacity: 0.9, zIndex: 8 };
                if (idx === 3) return { y: -50, scale: 0.85, rotate: -6, opacity: 0.8, zIndex: 7 };
                return { y: -50, scale: 0.8, rotate: 0, opacity: 0, zIndex: 0 };
              };

              const styles = getTransform();

              return (
                <motion.div
                  key={bank.id}
                  layout
                  custom={direction}
                  initial={{ 
                    opacity: 0, 
                    y: direction > 0 ? 80 : -80, 
                    scale: 0.85,
                    rotate: direction > 0 ? -8 : 8
                  }}
                  animate={{ 
                    opacity: styles.opacity,
                    y: styles.y,
                    scale: styles.scale,
                    rotate: styles.rotate,
                    zIndex: styles.zIndex,
                    boxShadow: isFront ? `0 20px 40px -10px ${bank.shadow}` : `0 6px 16px -4px rgba(0,0,0,0.12)`
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: direction > 0 ? -120 : 120, 
                    scale: 0.85,
                    rotate: direction > 0 ? 12 : -12,
                    zIndex: 20 // Ensure it flies over the top when exiting
                  }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring",
                    bounce: 0, // Removes the bouncy choppiness for a smoother sweep
                    mass: 0.8
                  }}
                  className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${bank.themeClasses} text-white p-6 flex flex-col justify-between overflow-hidden ring-1 ring-white/30 border border-white/20 origin-bottom`}
                >
                  {/* Subtle blur highlights */}
                  <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
                  <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-black/15 blur-2xl pointer-events-none"></div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="font-headline-sm text-[11px] tracking-widest font-bold uppercase text-white">CLIENT STACK</span>
                    </div>
                    <span className="font-code-sm text-[10px] font-bold tracking-wider bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20 shadow-inner">
                      0{bank.id}/0{BANKS.length}
                    </span>
                  </div>
                  
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute w-16 h-6 rounded-full bg-[#1e293b] shadow-xl transform -rotate-45 border border-white/10"></div>
                      <div className="absolute w-16 h-6 rounded-full bg-white shadow-2xl transform rotate-45 border border-white/40"></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-end justify-between pt-2">
                    <span className="font-headline-md text-[20px] font-bold tracking-tight text-white leading-tight">
                      {bank.name}
                    </span>
                  </div>
                </motion.div>
              );
            }).reverse() // Reverse so that the front card renders last (on top in DOM before z-index)
            }
          </AnimatePresence>
        </div>
        
        <button 
          aria-label="Next client stack" 
          onClick={handleNext}
          className="group ml-6 md:ml-10 w-10 h-10 rounded-full bg-white text-on-surface shadow-sm hover:shadow-md border border-black/5 flex items-center justify-center transition-all duration-300 active:scale-95 z-30" 
        >
          <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[20px]">chevron_right</span>
        </button>
      </div>
      
      {/* Dots / Indicator Tracker */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-6 mb-6">
        <div className="flex items-center gap-1.5 py-1">
          {BANKS.map((_, idx) => (
            <button 
              key={idx}
              type="button" 
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              aria-label={`Go to card ${idx + 1}`} 
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? "h-1.5 w-6 bg-[#b52705]" 
                  : "h-1.5 w-1.5 bg-gray-200 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Actions Area: Primary Button */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <button 
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5A36] text-white font-label-md text-[13px] tracking-wide shadow-[0_10px_24px_-6px_rgba(255,90,54,0.6)] hover:shadow-[0_14px_28px_-6px_rgba(255,90,54,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200" 
          type="button"
        >
          <span className="font-bold">Continue with {toTitleCase(activeBank.name)}</span>
          <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>

    </div>
  );
}
