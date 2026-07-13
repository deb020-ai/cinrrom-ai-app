"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PrivatePricing() {
  return (
    <section className="px-6 py-24 md:py-32 bg-[#02050a] border-y border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] aspect-square bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl backdrop-blur-md w-full"
        >
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-blue-400 uppercase font-bold block mb-6">
            Launch Offer
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight mb-4">
            Launch Your Next Collection
          </h2>
          <div className="text-2xl md:text-4xl font-serif text-white/80 mb-12">
            Starting from <span className="text-white">₹15,000</span>
          </div>

          <div className="text-sm md:text-base font-sans tracking-[0.1em] text-white/40 uppercase mb-8">
            Perfect For
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {['Product Launch', 'Instagram Campaign', 'Meta Ads', 'Website Hero Video', 'Luxury Product Storytelling'].map((item, idx) => (
              <span key={idx} className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-[11px] md:text-xs font-sans tracking-[0.1em] uppercase">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-6 items-center">
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full sm:w-auto"
            >
              Book Strategy Call <ArrowUpRight size={16} />
            </a>
            <span className="text-xs font-serif italic text-white/40">
              Delivered in days.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
