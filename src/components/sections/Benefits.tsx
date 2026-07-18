"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const benefits = [
  {
    number: "01",
    title: "Hollywood-Level Quality",
    desc: "Luxury campaigns inspired by feature film production without traditional production costs."
  },
  {
    number: "02",
    title: "Launch Campaigns Faster",
    desc: "Go from product to premium campaign in days instead of weeks."
  },
  {
    number: "03",
    title: "Premium Look, Better Perception",
    desc: "Better presentation builds trust and helps justify premium pricing."
  },
  {
    number: "04",
    title: "Create More. Test More. Grow Faster.",
    desc: "Produce more campaigns, test more ideas, and improve faster."
  },
  {
    number: "05",
    title: "AI Meets Creative Direction",
    desc: "Every campaign is art-directed, refined, composited, and finished to luxury standards."
  },
  {
    number: "06",
    title: "Built for Modern Jewelry Brands",
    desc: "Created specifically for ambitious jewelry brands that want premium creative with next-generation production."
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

export default function Benefits() {
  return (
    <section className="relative py-24 md:py-48 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-6">
            The Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide">
            6 Benefits of Using <span className="italic font-light">CINROOM.</span>
          </h2>
        </div>

        {/* 2x3 Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative p-10 md:p-14 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden"
            >
              {/* Subtle hover gradient behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <span className="text-[11px] font-sans tracking-[0.3em] text-secondary/50">
                  {benefit.number} &mdash;
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif text-white/90 leading-snug">
                  {benefit.title}
                </h3>
                
                <p className="text-sm md:text-base font-sans text-secondary/70 leading-relaxed font-light">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
