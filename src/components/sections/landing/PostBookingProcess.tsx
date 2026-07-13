"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";

// For the U-shape desktop/mobile logic, we define the exact 4 steps.
// Mobile flow:
// 1(Strategy) -> 2(Creative)
//                  |
// 4(Delivery) <- 3(Production)

const steps = [
  {
    id: 1,
    title: "Strategy Call",
    desc: "We understand your collection, audience and campaign goals."
  },
  {
    id: 2,
    title: "Creative Direction",
    desc: "Concept development, references and campaign planning."
  },
  {
    id: 4,
    title: "Delivery",
    desc: "Receive premium campaign videos ready for Meta Ads, Instagram and your website."
  },
  {
    id: 3,
    title: "Production",
    desc: "Hollywood-inspired creative direction powered by next-generation AI production."
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
    <section className="px-4 py-12 md:px-6 md:py-20 bg-[#071220] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
            What Happens After You Book?
          </h2>
        </div>

        {/* Desktop View: Horizontal 1 -> 2 -> 3 -> 4 */}
        <div className="hidden md:block relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex items-stretch justify-between gap-6"
          >
            {[1, 2, 3, 4].map((stepNum, idx) => {
              const step = steps.find(s => s.id === stepNum)!;
              return (
                <motion.div 
                  key={stepNum}
                  variants={cardVariants}
                  className="relative z-10 p-10 rounded-2xl bg-[#0a1829] border border-white/10 shadow-2xl flex flex-col gap-4 flex-1 min-h-[220px]"
                >
                  <span className="text-[10px] font-sans tracking-[0.2em] text-blue-400 uppercase font-bold">
                    Step 0{stepNum}
                  </span>
                  <h3 className="text-2xl font-serif text-white/90 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-base font-sans text-white/50 leading-relaxed font-light mt-auto">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile View: 2x2 Grid with U-Shape arrows */}
        <div className="md:hidden">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-3 relative"
          >
            
            {/* Arrows overlaid on top of the grid */}
            <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none w-full h-full">
              {/* 1 -> 2 Arrow (Top center) */}
              <div className="absolute top-1/4 -mt-2 text-blue-500 bg-[#071220] p-1 rounded-full">
                <ArrowRight size={16} />
              </div>
              {/* 2 -> 3 Arrow (Right center) */}
              <div className="absolute right-0 top-1/2 -mt-4 mr-2 text-blue-500 bg-[#071220] p-1 rounded-full">
                <ArrowDown size={16} />
              </div>
              {/* 3 -> 4 Arrow (Bottom center) */}
              <div className="absolute bottom-1/4 -mb-2 text-blue-500 bg-[#071220] p-1 rounded-full">
                <ArrowLeft size={16} />
              </div>
            </div>

            {steps.map((step) => (
              <motion.div 
                key={step.id}
                variants={cardVariants}
                className="relative z-10 p-5 rounded-2xl bg-[#0a1829] border border-white/10 shadow-lg flex flex-col gap-2 min-h-[160px]"
              >
                <span className="text-[9px] font-sans tracking-[0.2em] text-blue-400 uppercase font-bold">
                  Step 0{step.id}
                </span>
                <h3 className="text-sm font-serif text-white/90 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[10px] font-sans text-white/50 leading-relaxed font-light mt-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}

          </motion.div>
        </div>

      </div>
    </section>
  );
}
