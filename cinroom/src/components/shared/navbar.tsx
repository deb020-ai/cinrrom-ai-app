"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Diamond } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6 rounded-full bg-[#0a0a0c]/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-200/40 to-white/10 flex items-center justify-center border border-amber-200/30 shadow-[0_0_12px_rgba(197,168,128,0.2)] group-hover:border-amber-300/60 transition-colors">
            <Diamond className="w-3.5 h-3.5 text-amber-200" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm tracking-[0.2em] text-white uppercase font-sans">
              CINROOM
            </span>
            <span className="text-[9px] tracking-[0.15em] text-neutral-500 font-mono -mt-0.5">
              PARIS • NEW YORK
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 text-xs tracking-widest font-mono uppercase text-neutral-400">
          <Link href="#templates" className="hover:text-white transition-colors duration-200">
            Showcase
          </Link>
          <Link href="#features" className="hover:text-white transition-colors duration-200">
            Architecture
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors duration-200">
            Atelier Plans
          </Link>
          <Link href="#faq" className="hover:text-white transition-colors duration-200">
            FAQ
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              className="text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white hover:bg-white/5 h-9 px-4 rounded-full"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              className="h-9 px-5 rounded-full text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all duration-300 border border-amber-200/40"
            >
              Open Studio
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-70" />
            </Button>
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
