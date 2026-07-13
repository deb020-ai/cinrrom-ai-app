"use client";
import { motion } from "framer-motion";

export default function TrustStrip() {
  return (
    <section className="w-full bg-background border-b border-white/5 py-12 flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="flex flex-col items-center justify-center gap-8 px-6"
      >
        <p className="text-[10px] md:text-[11px] font-sans tracking-[0.2em] uppercase text-primary/30 text-center max-w-lg">
          Built on experience across Hollywood productions and enterprise brands.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-24 gap-y-6">
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/40">
          Hollywood
        </span>
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/40">
          Samsung
        </span>
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/40">
          KKR
        </span>
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/40 text-center">
          Lucknow Super Giants
        </span>
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/40">
          Style Bazaar
        </span>
        <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/20 flex items-center gap-4 md:gap-6 ml-2 md:ml-4">
          <span className="w-4 md:w-8 h-[1px] bg-primary/20 block"></span>
          & 50+ Global Brands
        </span>
        </div>
      </motion.div>
    </section>
  );
}
