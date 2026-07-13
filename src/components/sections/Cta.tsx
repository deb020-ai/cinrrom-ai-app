"use client";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section id="contact" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60 z-10"></div>
      
      {/* Cinematic background placeholder */}
      <div className="absolute inset-0 bg-[#050505] z-0 flex items-center justify-center">
         <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#000]"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] mb-16">
          Before they buy the jewelry, <br />
          <span className="italic text-secondary/80">they must desire it.</span>
        </h2>
        
        <motion.a 
          href="https://cal.com/omnivinci/30min"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs font-sans tracking-[0.2em] uppercase border border-white/20 px-12 py-5 hover:bg-white hover:text-background transition-colors duration-500 inline-block"
        >
          Book Strategy Call
        </motion.a>
      </div>
    </section>
  );
}
