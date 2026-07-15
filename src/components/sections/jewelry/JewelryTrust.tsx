"use client";
import { motion } from "framer-motion";

export default function JewelryTrust() {
  return (
    <section className="py-10 bg-[#02050a] border-b border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 text-center md:text-left"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-white/30">Background</span>
            <span className="text-sm md:text-base font-serif text-white/80">Hollywood Production Experience</span>
          </div>
          
          <div className="hidden md:block w-px h-8 bg-white/10" />
          
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-white/30">Scale</span>
            <span className="text-sm md:text-base font-serif text-white/80">Campaign Experience with IPL Franchises</span>
          </div>
          
          <div className="hidden md:block w-px h-8 bg-white/10" />

          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-white/30">Trust</span>
            <span className="text-sm md:text-base font-serif text-white/80">Enterprise Brand Experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
