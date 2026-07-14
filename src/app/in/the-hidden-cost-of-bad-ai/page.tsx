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

const costs = [
  {
    number: "01",
    title: "Loss of Trust",
    desc: "Customers instantly spot cheap AI. If your creative looks artificial, they assume your jewelry is too."
  },
  {
    number: "02",
    title: "Brand Dilution",
    desc: "Generic AI makes you look like everyone else. True luxury requires distinct, Hollywood-level art direction."
  },
  {
    number: "03",
    title: "Lower Conversions",
    desc: "Beautiful, cinematic video converts higher than static, low-effort AI images."
  },
  {
    number: "04",
    title: "Inconsistent Lighting",
    desc: "Bad AI hallucinates shadows and diamond reflections. Professional compositing ensures your product is always the hero."
  },
  {
    number: "05",
    title: "Hidden Revisions",
    desc: "Cheap AI tools require hours of prompt-engineering and fixing mistakes, costing you time you don't have."
  },
  {
    number: "06",
    title: "Ruined Perception",
    desc: "You can't charge premium prices if your marketing looks like it was generated for free."
  },
  {
    number: "07",
    title: "The Hollywood Solution",
    desc: "Real creative direction combined with next-gen AI production gives you the best of both worlds."
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

export default function HiddenCostPage() {
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
          Bad AI Doesn't Save Money.<br />
          <span className="text-white/60">It Costs Sales.</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-serif text-white/60 leading-relaxed max-w-3xl">
          The 7 Hidden Costs of Average AI Creative (And Why Premium Brands Are Switching to Next-Generation Production.)
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
            {costs.map((cost, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col gap-4 md:gap-6"
              >
                {/* Subtle hover gradient behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-4 md:gap-6 flex-1">
                  <span className="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-blue-400/80 uppercase font-bold">
                    {cost.number} &mdash;
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-serif text-white/90 leading-snug">
                    {cost.title}
                  </h3>
                  
                  <p className="text-xs md:text-base font-sans text-white/50 leading-relaxed font-light">
                    {cost.desc}
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
