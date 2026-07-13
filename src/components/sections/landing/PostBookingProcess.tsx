"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    title: "Strategy Call",
    desc: "We understand your collection, audience and campaign goals."
  },
  {
    title: "Creative Direction",
    desc: "Concept development, references and campaign planning."
  },
  {
    title: "Production",
    desc: "Hollywood-inspired creative direction powered by next-generation AI production."
  },
  {
    title: "Delivery",
    desc: "Receive premium campaign videos ready for Meta Ads, Instagram and your website."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PostBookingProcess() {
  return (
    <section className="px-6 py-24 md:py-32 bg-[#071220] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
            What Happens After You Book?
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 md:gap-6 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div 
                variants={cardVariants}
                className="relative z-10 p-8 md:p-10 rounded-2xl bg-[#0a1829] border border-white/10 shadow-2xl flex flex-col gap-4 w-full md:flex-1 min-h-[220px]"
              >
                <span className="text-[10px] font-sans tracking-[0.2em] text-blue-400 uppercase font-bold">
                  Step 0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-white/90 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base font-sans text-white/50 leading-relaxed font-light mt-auto">
                  {step.desc}
                </p>
              </motion.div>

              {/* Mobile connecting arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden py-4 text-white/20">
                  <ArrowDown size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
