"use client";
import { motion, Variants } from "framer-motion";

const services = [
  {
    title: "AI Campaign Films",
    desc: "15-sec cinematic hero films for launches & ads."
  },
  {
    title: "AI Product Photo",
    desc: "Luxury imagery without traditional shoots."
  },
  {
    title: "CGI Product Films",
    desc: "Impossible movements & macro storytelling."
  },
  {
    title: "Launch Systems",
    desc: "Complete creative package for new collections."
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WhatCinroomDoes() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-24 bg-[#071220]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 md:mb-16 text-center max-w-3xl mx-auto flex flex-col gap-2 md:gap-4">
          <h2 className="text-3xl md:text-6xl font-serif text-white tracking-tight">
            What CINROOM Does
          </h2>
          <p className="text-base md:text-2xl font-serif text-white/60 leading-relaxed px-4 md:px-0">
            Luxury campaign production for modern lab-grown diamond brands.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative p-5 md:p-14 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col gap-3 md:gap-4 justify-center md:min-h-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-2 md:gap-6">
                <h3 className="text-sm md:text-3xl font-serif text-white/90 leading-tight">
                  {service.title}
                </h3>
                <p className="text-[10px] md:text-lg font-sans text-white/50 leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
