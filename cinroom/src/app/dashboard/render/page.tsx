"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Diamond, Cpu } from "lucide-react";

const stages = [
  "ANALYZING GEM & METAL GEOMETRY...",
  "ESTIMATING REFRACTIVE INDEX & CAUSTICS...",
  "CONSTRUCTING OBSIDIAN STUDIO LIGHTING RIG...",
  "COMPUTING SPECTRAL DISPERSION MAPS...",
  "SYNTHESIZING 4K RAY-TRACED FRAMES...",
  "FINALIZING PRORES & H.264 ENCODING..."
];

export default function RenderPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 8000;
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            router.push("/dashboard/result");
          }, 400);
          return 100;
        }
        
        const stageIndex = Math.floor((next / 100) * stages.length);
        if (stageIndex < stages.length) {
          setCurrentStageIndex(stageIndex);
        }
        
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
      
      {/* High-End Studio Render Preview Container */}
      <div className="relative w-full max-w-lg aspect-[16/9] rounded-2xl glass-panel gold-border-glow p-2 overflow-hidden mb-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex items-center justify-center bg-black">
        {/* Background Image Preview */}
        <img 
          src="/hero-ring.png" 
          alt="Rendering Preview" 
          className="w-full h-full object-cover opacity-40 blur-sm scale-105"
        />

        {/* Ambient Ring FX */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-44 h-44 border border-amber-200/20 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-56 h-56 border border-white/10 rounded-full"
          />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 to-white/10 border border-amber-200/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(197,168,128,0.3)]">
            <Diamond className="w-7 h-7 text-amber-200 animate-pulse" />
          </div>
        </div>

        {/* Laser Scanning Line */}
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent shadow-[0_0_15px_rgba(197,168,128,0.8)]"
        />

        {/* Top HUD */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-amber-200 flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-amber-200" />
          <span>GPU NODE #04 // RENDERING 3840x2160 60FPS</span>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="w-full max-w-xl space-y-6 text-center">
        <h2 className="text-sm font-mono tracking-[0.2em] text-amber-200 font-medium">
          {stages[currentStageIndex]}
        </h2>
        
        {/* Progress Bar Container */}
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] rounded-full relative"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 px-1">
          <span>{Math.round(progress)}% PROCESSED</span>
          <span>ESTIMATED TIME REMAINING: {Math.max(0, Math.ceil((100 - progress) / 12))}s</span>
        </div>
      </div>

      <div className="mt-12">
        <Button 
          variant="outline" 
          className="h-9 px-6 rounded-full text-xs font-mono tracking-wider uppercase border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => router.push("/dashboard/generate")}
        >
          <X className="w-3.5 h-3.5 mr-1.5" />
          Abort Render Pipeline
        </Button>
      </div>

    </div>
  );
}
