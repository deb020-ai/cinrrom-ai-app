"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen w-full flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Soft cinematic fog */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 5, delay: 1 }}
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/90"
      ></motion.div>
      <div className="absolute inset-0 bg-background/30 z-10"></div>
      
      {/* Background Image with extreme slow motion */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-black">
         <motion.div 
           initial={{ scale: 1.15, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 15, ease: "easeOut" }}
           className="w-full h-full bg-cover bg-center"
           style={{ backgroundImage: "url('https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/BANNER/hero.jpg')" }}
         />
      </div>

      {/* Removed heavy drifting dust particles for performance */}

      <div className="relative z-20 flex flex-col items-start text-left mt-10 md:mt-0 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight leading-[1.05]"
        >
          Before they buy the jewelry, <br className="hidden md:block" />
          <span className="italic font-light opacity-90">they must desire it.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-12 flex flex-col items-start gap-8"
        >
          <div className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-secondary/80 flex flex-wrap gap-6 md:gap-8">
            <span>Films.</span>
            <span>Photography.</span>
            <span>Creative Direction.</span>
            <span>CGI.</span>
          </div>
          
          <div className="mt-8 flex items-center gap-8">
            <button className="text-xs font-sans tracking-[0.2em] uppercase border-b border-white/30 hover:border-white pb-1 transition-colors">
              View Campaigns
            </button>
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-sans tracking-[0.2em] uppercase border border-white/20 px-8 py-3 hover:bg-white hover:text-background transition-colors duration-500"
            >
              Book Strategy Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
