"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { LazyVideo } from "@/components/ui/LazyVideo";

export default function Campaigns() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMuted, setIsMuted] = useState(true);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="work" ref={containerRef} className="py-24 md:py-48 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-32 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tight"
          >
            The Blue <br />
            <span className="italic font-light text-white/80">Dynasty.</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-sm"
          >
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-4">
              Selected Work &mdash; 01
            </span>
            <p className="text-sm md:text-base font-serif text-primary/80 leading-relaxed">
              A cinematic exploration of heritage and rarity. Reimagining the majesty of royal sapphires through a modern, hyperreal lens.
            </p>
          </motion.div>
        </div>

        {/* Massive Immersive Flow */}
        <div className="flex flex-col gap-24 md:gap-48 items-center">
          
          {/* Hero Video - 9:16 Screen Filling */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5 }}
            className="relative w-full max-w-[600px] aspect-[9/16] overflow-hidden group rounded-sm shadow-2xl"
          >
            <LazyVideo 
              src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty.mp4" 
              posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
              muted={isMuted}
              className="w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-6 right-6 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300"
            >
              {isMuted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
            </button>
          </motion.div>

          {/* Staggered Massive Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">
            
            <motion.div 
              style={{ y: y1 }}
              className="relative aspect-[3/4] w-full max-w-[700px] mx-auto overflow-hidden bg-[#0a0a0a]"
            >
              <Image 
                src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
                alt="Magazine Cover"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="flex flex-col gap-16 md:gap-32 md:pt-48">
              <motion.div 
                style={{ y: y2 }}
                className="relative aspect-square w-full max-w-[600px] mx-auto bg-[#111] flex items-center justify-center overflow-hidden"
              >
                <Image 
                  src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/post.webp"
                  alt="The Blue Dynasty Jewelry"
                  fill
                  className="object-contain p-8 md:p-16"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[3/4] w-full max-w-[700px] mx-auto overflow-hidden"
              >
                <Image 
                  src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/poster.webp"
                  alt="Campaign Poster"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
