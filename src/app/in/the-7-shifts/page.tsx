"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Archive from "@/components/sections/Archive";
import WhatCinroomDoes from "@/components/sections/landing/WhatCinroomDoes";
import WhyWorkWithUs from "@/components/sections/landing/WhyWorkWithUs";
import PostBookingProcess from "@/components/sections/landing/PostBookingProcess";
import PrivatePricingIN from "@/components/sections/landing/PrivatePricingIN";
import IsThisForYou from "@/components/sections/landing/IsThisForYou";
import HollywoodTrust from "@/components/sections/landing/HollywoodTrust";
import PrivateCta from "@/components/sections/landing/PrivateCta";

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
      <section className="px-6 max-w-4xl mx-auto flex flex-col justify-center text-left mb-16 md:mb-24">
        <div className="mb-6 md:mb-8">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
            3 Min Read
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-6 md:mb-8">
          The 7 Shifts That Separate Premium Lab-Grown Diamond Brands From Everyone Else
        </h1>
        
        <p className="text-lg md:text-2xl font-serif text-white/60 leading-relaxed max-w-2xl">
          The next decade won't be won by the brands with the best diamonds. It will be won by the brands that create the strongest perception.
        </p>
      </section>

      {/* Educational Glass Grid Section */}
      <section className="px-6 pb-12 md:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {shifts.map((shift, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col gap-4 md:gap-6"
              >
                {/* Subtle hover gradient behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-4 md:gap-6 flex-1">
                  <span className="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-blue-400/80 uppercase font-bold">
                    {shift.number} &mdash;
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-serif text-white/90 leading-snug">
                    {shift.title}
                  </h3>
                  
                  <p className="text-xs md:text-base font-sans text-white/50 leading-relaxed font-light">
                    {shift.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Portfolio */}
      <Archive />

      {/* Sales Conversion Funnel */}
      <WhatCinroomDoes />
      <WhyWorkWithUs />
      <PostBookingProcess />
      <PrivatePricingIN />
      <IsThisForYou />
      <HollywoodTrust />
      <PrivateCta />

    </main>
  );
}
