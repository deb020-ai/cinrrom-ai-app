"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Archive from "@/components/sections/Archive";
import Cta from "@/components/sections/Cta";

const shifts = [
  {
    number: "01",
    title: "First Impression",
    desc: "Customers don't buy diamonds. They buy confidence. Your presentation decides your value before they ever compare specs."
  },
  {
    number: "02",
    title: "Buyer Psychology",
    desc: "You're selling to more than one person. Your brand needs to impress their partner, family, and friends simultaneously."
  },
  {
    number: "03",
    title: "The Real Competition",
    desc: "Your biggest competitor isn't natural diamonds. It's the other lab-grown brands fighting for trust and attention."
  },
  {
    number: "04",
    title: "Content Engine",
    desc: "One campaign. Twenty assets. Launching one campaign isn't enough; you need a continuous flow of premium creative everywhere."
  },
  {
    number: "05",
    title: "Premium Perception",
    desc: "People buy brands they trust. Luxury pricing is justified by a brand that feels established, consistent, and desirable."
  },
  {
    number: "06",
    title: "Next-Gen Production",
    desc: "Marketing can't wait 45 days. Capture market demand faster with high-end campaigns delivered in days, not weeks."
  },
  {
    number: "07",
    title: "Brand Memory",
    desc: "Products get copied. Brands don't. Customers remember how your brand made them feel long after they forget the specs."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function EditorialPage() {
  return (
    <main className="min-h-screen bg-[#071220] text-white font-sans selection:bg-white/20 selection:text-white pt-32 pb-0">
      
      {/* Hero Section */}
      <section className="px-6 max-w-4xl mx-auto flex flex-col justify-center text-left mb-24">
        <div className="mb-8">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
            3 Min Read
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
          The 7 Shifts That Separate Premium Brands From Everyone Else
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-white/60 leading-relaxed max-w-2xl mb-12">
          The next decade won't be won by the brands with the best diamonds. It will be won by the brands that create the strongest perception.
        </p>
      </section>

      {/* Glass Grid Section */}
      <section className="px-6 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {shifts.map((shift, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative p-10 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col gap-6"
              >
                {/* Subtle hover gradient behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-6 flex-1">
                  <span className="text-[11px] font-sans tracking-[0.3em] text-blue-400/80 uppercase font-bold">
                    {shift.number} &mdash;
                  </span>
                  
                  <h3 className="text-2xl font-serif text-white/90 leading-snug">
                    {shift.title}
                  </h3>
                  
                  <p className="text-sm md:text-base font-sans text-white/50 leading-relaxed font-light">
                    {shift.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Launch Offer Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 bg-blue-950/20 border border-blue-500/20 rounded-2xl p-10 md:p-14 shadow-[0_0_40px_rgba(59,130,246,0.05)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-blue-400 font-bold">
                  Launch Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-white">
                  Your First Luxury Campaign
                </h2>
                <p className="text-lg font-serif text-white/70">
                  A cinematic 15-second hero film for your next collection. Designed for modern jewelry brands.
                </p>
              </div>
              <div className="flex flex-col gap-4 md:items-end shrink-0">
                <a 
                  href="https://cal.com/omnivinci/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  Book Strategy Call <ArrowUpRight size={14} />
                </a>
                <span className="text-[10px] font-sans tracking-[0.1em] uppercase text-white/40">
                  Starting from <strong className="text-white">₹15,000</strong>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Portfolio */}
      <Archive />

      {/* Final CTA */}
      <Cta />

    </main>
  );
}
