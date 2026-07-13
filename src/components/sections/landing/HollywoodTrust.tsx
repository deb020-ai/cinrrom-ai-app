"use client";
import { motion } from "framer-motion";

export default function HollywoodTrust() {
  return (
    <section className="py-12 md:py-20 bg-[#050d18] border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-white/40 font-bold">
            Built On Hollywood Craft
          </h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-6 items-start"
        >
          
          <a href="https://www.imdb.com/name/nm6820462/" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 group border-l border-white/10 pl-5 hover:border-white/30 transition-colors">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40 group-hover:text-blue-400 transition-colors">Credential</span>
            <span className="text-base md:text-lg font-serif text-white/90 leading-snug underline decoration-white/20 underline-offset-4 group-hover:decoration-white/60 transition-colors">IMDb Verified</span>
          </a>

          <div className="flex flex-col gap-3 border-l border-white/10 pl-5">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Standard</span>
            <span className="text-base md:text-lg font-serif text-white/90 leading-snug">Hollywood Experience</span>
          </div>
          
          <div className="flex flex-col gap-3 border-l border-white/10 pl-5">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Clients</span>
            <span className="text-base md:text-lg font-serif text-white/90 leading-snug">Samsung, KKR</span>
          </div>

          <div className="flex flex-col gap-3 border-l border-white/10 pl-5">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Scale</span>
            <span className="text-base md:text-lg font-serif text-white/90 leading-snug">IPL Campaigns</span>
          </div>

          <a href="https://www.instagram.com/cinroom.ai/" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 group border-l border-white/10 pl-5 hover:border-white/30 transition-colors">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40 group-hover:text-blue-400 transition-colors">Community</span>
            <span className="text-xl md:text-2xl font-serif text-white/90 leading-none underline decoration-white/20 underline-offset-4 group-hover:decoration-white/60 transition-colors">33K+</span>
          </a>

          <div className="flex flex-col gap-3 border-l border-white/10 pl-5">
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Organic Reach</span>
            <span className="text-xl md:text-2xl font-serif text-white/90 leading-none">600M+</span>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
