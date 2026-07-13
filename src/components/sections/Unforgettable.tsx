"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useRef } from "react";

export default function Unforgettable() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.8], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-black overflow-hidden">
      
      {/* Sticky container holds the video in place while scrolling through the 150vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Massive cinematic rotating jewelry video */}
        <motion.div style={{ scale }} className="absolute inset-0 w-full h-full opacity-60">
          <LazyVideo 
            src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4"
            posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
            className="w-full h-full"
          />
          {/* Vignette to blend edges into pure black */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_80%)]"></div>
        </motion.div>

        {/* Fading Headline */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-wide leading-tight text-glow">
            Every masterpiece deserves <br className="hidden md:block" />
            <span className="italic font-light opacity-90">its own world.</span>
          </h2>
        </motion.div>

      </div>
    </section>
  );
}
