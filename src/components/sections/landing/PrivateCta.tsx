"use client";
import { motion } from "framer-motion";

export default function PrivateCta() {
  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60 z-10"></div>
      
      {/* Cinematic background placeholder */}
      <div className="absolute inset-0 bg-[#050505] z-0 flex items-center justify-center">
         <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#000]"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl py-24">
        <motion.a 
          href="https://cal.com/omnivinci/30min"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm font-sans tracking-[0.2em] uppercase border border-white px-14 py-6 bg-white text-black hover:bg-black hover:text-white transition-colors duration-500 inline-block shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-full"
        >
          Book Strategy Call
        </motion.a>
      </div>
    </section>
  );
}
