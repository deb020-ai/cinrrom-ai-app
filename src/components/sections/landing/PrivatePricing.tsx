"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

export default function PrivatePricing() {
  return (
    <section className="px-4 py-12 md:py-24 bg-[#02050a] border-y border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[60vw] aspect-square bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Start Your Campaign
          </h2>
          <p className="text-lg md:text-xl font-serif text-white/50">
            Transparent pricing for premium lab-grown diamond brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          
          {/* Tier 1: Campaign Launch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md flex flex-col h-full hover:bg-white/[0.04] transition-colors"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
              Campaign Launch
            </h3>
            <div className="text-xl md:text-2xl font-sans font-light text-white/80 mb-6 pb-6 border-b border-white/10">
              <span className="italic text-white/50 text-base md:text-lg">Starting at</span> $500
            </div>

            <p className="text-sm font-sans text-white/70 leading-relaxed mb-8">
              Perfect for product launches, Meta ads, and website hero films. A low-risk way to experience CINROOM.
            </p>

            <div className="flex-1 mb-8">
              <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/40 mb-4">
                What's Included
              </div>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>One premium campaign film</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Delivered in days</span>
                </li>
              </ul>
            </div>

            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all w-full group"
            >
              Book Strategy Call <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </a>
          </motion.div>

          {/* Tier 2: Creative Partner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/[0.05] border border-blue-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.1)] backdrop-blur-md flex flex-col h-full relative overflow-hidden group"
          >
            {/* Subtle highlight gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

            <div className="absolute top-0 right-8 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[9px] font-sans tracking-[0.2em] uppercase px-4 py-1.5 rounded-b-lg">
              Most Popular
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 relative z-10 mt-4 md:mt-0">
              Creative Partner
            </h3>
            <div className="text-xl md:text-2xl font-sans font-light text-white/80 mb-6 pb-6 border-b border-white/10 relative z-10">
              <span className="italic text-white/50 text-base md:text-lg">Starting at</span> $6,000/month
            </div>

            <p className="text-sm font-sans text-white/90 leading-relaxed mb-2 font-medium relative z-10">
              Your outsourced luxury campaign team.
            </p>
            <p className="text-sm font-sans text-white/60 leading-relaxed mb-8 relative z-10">
              Built for brands launching consistently who need an ongoing creative engine.
            </p>

            <div className="flex-1 mb-8 relative z-10">
              <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/40 mb-4">
                What's Included
              </div>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>12 Premium Campaign Films</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>10 Premium Static Creatives</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Creative Direction</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Campaign Planning</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-sans text-white/80">
                  <Check size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Monthly Creative Support</span>
                </li>
              </ul>
            </div>

            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full relative z-10"
            >
              Book Strategy Call <ArrowUpRight size={14} />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
