"use client";

import { Download, Share2, Sparkles, Settings2, History, Play, CheckCircle2, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResultPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 mb-3">
            <CheckCircle2 className="w-3 h-3" />
            <span>RENDER MASTER COMPLETE — 4K ULTRA HD 60FPS</span>
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">Obsidian 360 Campaign Render</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/history">
            <Button variant="outline" className="h-10 px-4 text-xs font-mono tracking-wider uppercase border-white/10 text-neutral-300 hover:bg-white/5">
              <History className="w-3.5 h-3.5 mr-2" />
              Vault History
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="h-10 px-5 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_20px_rgba(197,168,128,0.25)] rounded-full">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Generate Next Campaign
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Video Player Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl overflow-hidden gold-border-glow shadow-[0_30px_100px_rgba(0,0,0,0.9)] bg-black relative">
            <div className="aspect-[16/9] w-full flex items-center justify-center relative group cursor-pointer">
              {/* Media preview */}
              <img 
                src="/hero-ring.png" 
                alt="Rendered Jewelry Master Video" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Play Overlay */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-amber-200/20 backdrop-blur-md border border-amber-200/40 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              >
                <Play className="w-8 h-8 text-amber-100 ml-1" />
              </motion.div>

              {/* Bottom Scrubber HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono z-10">
                <div className="flex items-center gap-3 flex-1 mr-4">
                  <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full" />
                  </div>
                  <span className="text-neutral-300">0:04 / 0:10</span>
                </div>
                <span className="text-amber-200">3840x2160 • 60FPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export & Actions Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              EXPORT MASTERS
            </span>
            
            <Button size="lg" className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-white text-black hover:bg-neutral-200 justify-start rounded-xl font-semibold">
              <Download className="w-4 h-4 mr-3" />
              Download MP4 (H.264 4K)
            </Button>
            
            <Button size="lg" variant="outline" className="w-full h-12 text-xs font-mono tracking-wider uppercase border-white/10 text-white hover:bg-white/5 justify-start rounded-xl">
              <Download className="w-4 h-4 mr-3" />
              Download MOV (ProRes 422 HQ)
            </Button>

            <div className="h-px w-full bg-white/[0.06] my-2" />

            <Button size="lg" variant="outline" className="w-full h-12 text-xs font-mono tracking-wider uppercase border-white/10 text-white hover:bg-white/5 justify-start rounded-xl">
              <Share2 className="w-4 h-4 mr-3" />
              Copy Secure Share Link
            </Button>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              CAMPAIGN ACTIONS
            </span>
            
            <Link href="/dashboard/generate" className="block">
              <Button size="lg" variant="secondary" className="w-full h-11 text-xs font-mono tracking-wider uppercase bg-white/[0.04] text-neutral-200 hover:bg-white/[0.08] justify-start rounded-xl border border-white/10">
                <Settings2 className="w-4 h-4 mr-3 text-amber-200" />
                Modify Lighting Rigs
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
