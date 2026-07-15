"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const deliverables = [
  "15-second premium campaign film",
  "Ready for Meta Ads",
  "Instagram Reels",
  "Website Hero Video",
  "Product Launch Campaign",
  "AI-powered premium production",
  "Delivered in 48 hours"
];

export default function JewelryDeliverables() {
  return (
    <section className="py-16 md:py-24 bg-[#050d18] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-4 font-bold">
            What You Get
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            What's Included
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {deliverables.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Check size={16} className="text-blue-400" />
              </div>
              <span className="text-base font-sans text-white/90">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center flex flex-wrap justify-center gap-6 text-[11px] font-sans tracking-[0.2em] uppercase text-white/40"
        >
          <span>One concept.</span>
          <span className="hidden md:inline">•</span>
          <span>One delivery.</span>
          <span className="hidden md:inline">•</span>
          <span>No revisions included in this package.</span>
        </motion.div>
      </div>
    </section>
  );
}
