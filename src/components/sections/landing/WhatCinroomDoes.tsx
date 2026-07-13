"use client";
import { motion, Variants } from "framer-motion";

const services = [
  {
    title: "AI Campaign Films",
    desc: "15-second cinematic hero films designed for product launches, Meta Ads, Instagram and premium websites."
  },
  {
    title: "AI Product Photography",
    desc: "Luxury campaign imagery without traditional photoshoots."
  },
  {
    title: "CGI Product Films",
    desc: "Impossible camera movements, macro product storytelling and premium visual experiences."
  },
  {
    title: "Launch Campaign Systems",
    desc: "A complete creative package for launching new collections across Instagram, Meta Ads, websites and ecommerce."
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
    <section className="px-6 py-12 md:py-24 bg-[#071220]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <h2 className="text-3xl md:text-6xl font-serif text-white tracking-tight">
            What CINROOM Does
          </h2>
          <p className="text-xl md:text-2xl font-serif text-white/60 leading-relaxed">
            Luxury campaign production for modern lab-grown diamond brands.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative p-10 md:p-14 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm overflow-hidden flex flex-col gap-4 justify-center min-h-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <h3 className="text-2xl md:text-3xl font-serif text-white/90 leading-tight">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg font-sans text-white/50 leading-relaxed font-light">
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
