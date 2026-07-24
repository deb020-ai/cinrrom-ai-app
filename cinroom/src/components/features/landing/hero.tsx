"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Sparkles, SlidersHorizontal, Camera, Aperture, Layers, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"orbit" | "reveal" | "macro">("orbit");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden subtle-grid">
      {/* Background vignette & ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-amber-500/10 via-amber-200/5 to-transparent blur-[140px] rounded-full opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Micro Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-amber-200/20 backdrop-blur-xl mb-8 shadow-[0_0_15px_rgba(197,168,128,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-100/80">
              CINROOM v2.4 — CINEMATIC GEMOLOGY ENGINE
            </span>
          </div>
          
          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-8 leading-[1.08] max-w-5xl">
            Ray-Traced Jewelry Cinema.<br />
            <span className="gold-text-gradient font-normal italic">
              From One Single Photograph.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg text-neutral-400 mb-10 max-w-2xl font-light leading-relaxed tracking-wide">
            Transform static fine jewelry imagery into ad-quality 4K cinematic film campaigns in under 120 seconds. Engineered with physically accurate caustics and spectral dispersion.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="h-13 px-8 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_30px_rgba(197,168,128,0.3)] hover:shadow-[0_0_40px_rgba(197,168,128,0.5)] transition-all duration-300 rounded-full border border-amber-200/50"
              >
                Generate First Video
              </Button>
            </Link>
            <Link href="#templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-13 px-8 text-xs font-mono tracking-[0.15em] uppercase border-white/10 hover:border-amber-200/40 text-neutral-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl rounded-full transition-all duration-300"
              >
                <Play className="w-3.5 h-3.5 mr-2 text-amber-200" />
                View 4K Showcase
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Interactive Studio Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto rounded-2xl glass-panel p-2 shadow-[0_30px_100px_rgba(0,0,0,0.9)] gold-border-glow"
        >
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#08080a]/80 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
              <span className="ml-2 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                STUDIO PREVIEW // 4K 60FPS HDR
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab("orbit")}
                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${activeTab === 'orbit' ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Orbit 360°
              </button>
              <button 
                onClick={() => setActiveTab("reveal")}
                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${activeTab === 'reveal' ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Dramatic Reveal
              </button>
              <button 
                onClick={() => setActiveTab("macro")}
                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${activeTab === 'macro' ? 'bg-amber-400/15 text-amber-200 border border-amber-400/30' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Macro Facets
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-b-xl bg-[#030303] group">
            {/* Generated Image Asset */}
            <img 
              src="/hero-ring.png" 
              alt="Luxury Diamond Ring Render" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

            {/* Real-time HUD Parameters */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                <Camera className="w-3 h-3 text-amber-200" />
                <span>CAMERA: 85MM MACRO LENS</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                <Aperture className="w-3 h-3 text-amber-200" />
                <span>LIGHTING: OBSIDIAN STUDIO</span>
              </div>
            </div>

            {/* Play overlay button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:bg-amber-400/20 group-hover:border-amber-200/40 transition-all duration-300">
                <Play className="w-6 h-6 text-amber-100 ml-1 fill-amber-100/20" />
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono">
              <div className="flex items-center gap-3 text-neutral-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SPECTRAL REFLECTION READY
                </span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="hidden sm:inline text-neutral-400">FPS: 60.0</span>
              </div>
              <span className="text-amber-200 font-semibold tracking-wider">4K ULTRA HD</span>
            </div>
          </div>
        </motion.div>

        {/* Trusted By Atelier Names */}
        <div className="mt-20 border-t border-white/[0.06] pt-10 w-full">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-8">
            TRUSTED BY INDEPENDENT ATELIERS & HIGH-JEWELRY HOUSES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 text-neutral-400 font-serif tracking-[0.15em] text-sm md:text-base opacity-75">
            <span className="hover:text-white transition-colors cursor-default">MAISON VENDÔME</span>
            <span className="hover:text-white transition-colors cursor-default">AURUM ATELIER</span>
            <span className="hover:text-white transition-colors cursor-default">L'ÉTOILE JEWELRY</span>
            <span className="hover:text-white transition-colors cursor-default">ROYAL SOLITAIRE</span>
            <span className="hover:text-white transition-colors cursor-default">VERITA PARIS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
