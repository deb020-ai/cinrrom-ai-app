"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 md:py-64 px-6 md:px-12 min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.2] tracking-tight">
          <span className="block mb-4 text-secondary/50 italic">Luxury is not loud.</span>
          <span className="block mb-12 text-secondary/80 italic">Luxury is remembered.</span>
          <span className="block font-medium">We create cinematic worlds that make jewelry impossible to ignore.</span>
        </h2>
      </motion.div>
    </section>
  );
}
