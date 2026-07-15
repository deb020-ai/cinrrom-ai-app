"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export default function JewelryPricing() {
  return (
    <section className="px-4 py-24 md:py-32 bg-[#02050a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] aspect-square bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.03] border border-blue-500/20 rounded-3xl p-8 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.05)] backdrop-blur-md flex flex-col w-full relative group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none rounded-3xl" />
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-6 font-bold">
              Launch Package
            </h2>
            <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-2">
              ₹15,000
            </h3>
            <p className="text-sm md:text-base font-sans text-white/50">
              One premium campaign, built to convert.
            </p>
          </div>

          <div className="flex-1 w-full max-w-sm mx-auto mb-10 relative z-10 border-t border-b border-white/5 py-8">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>15-second campaign film</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>Commercial license</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>Meta-ready export</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>Instagram-ready export</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>Website-ready export</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>48-hour delivery</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto relative z-10">
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full"
            >
              Book Strategy Call <ArrowUpRight size={14} />
            </a>
            <a 
              href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%2015k%20jewelry%20campaign." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-300 w-full"
            >
              <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="opacity-80" />
              Chat on WhatsApp
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
