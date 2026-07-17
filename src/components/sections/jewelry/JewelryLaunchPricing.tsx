"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export default function JewelryLaunchPricing({ country = 'in' }: { country?: 'in' | 'us' }) {
  return (
    <section className="px-4 py-16 md:py-32 bg-[#050d18] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] aspect-square bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.03] border border-blue-500/20 rounded-3xl p-6 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.05)] backdrop-blur-md flex flex-col w-full relative group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none rounded-3xl" />
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-6 font-bold">
              Jewelry Launch Kit
            </h2>
            <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-2">
              {country === 'us' ? '$399' : '₹15,000'}
            </h3>
            <p className="text-sm md:text-base font-sans text-white/50">
              Everything you need for a premium campaign.
            </p>
          </div>

          <div className="flex-1 w-full max-w-sm mx-auto mb-10 relative z-10 border-t border-b border-white/5 py-8">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>1 Luxury Campaign Film</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>4 High-Converting Meta Image Ads</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>No Studio. No Models. No Crew.</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-sans text-white/90">
                <Check size={18} className="text-blue-400 shrink-0" />
                <span>Ready in 48 Hours</span>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex flex-col gap-4 w-full max-w-sm mx-auto relative z-10">
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full"
            >
              Get Your Campaign Plan <ArrowUpRight size={14} />
            </a>
            <a 
              href={`https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%20${country === 'us' ? '%24399' : '15k'}%20jewelry%20launch%20kit.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#20b858] transition-colors duration-300 w-full"
            >
              <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="brightness-0 invert" unoptimized />
              Chat on WhatsApp
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
