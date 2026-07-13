"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function FounderCredibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 lg:gap-32 items-start">
          
          {/* Left Column - Massive Imposing Portrait */}
          <div className="w-full lg:w-[45%] relative">
            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden group">
              <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[115%] -top-[5%]">
                <Image 
                  src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/founder%20image/image000222.png"
                  alt="Debabrata Bairagy - Founder of CINROOM"
                  fill
                  className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 grayscale-[40%] contrast-[1.1] brightness-[0.9]"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  quality={90}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Massive Metrics & Logos */}
          <div className="w-full lg:w-[55%] flex flex-col pt-12 md:pt-0">
            
            {/* Massive Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-12 mb-24 md:mb-32"
            >
              <div className="flex flex-col gap-4">
                <span className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">33K+</span>
                <span className="text-xs font-sans tracking-[0.3em] text-primary/50 uppercase">Creative Community</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">600M+</span>
                <span className="text-xs font-sans tracking-[0.3em] text-primary/50 uppercase">Organic Views</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Hollywood</span>
                <span className="text-xs font-sans tracking-[0.3em] text-primary/50 uppercase">Production Experience</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">IMDb</span>
                <span className="text-xs font-sans tracking-[0.3em] text-primary/50 uppercase">Officially Recognized</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">OmniVinci</span>
                <span className="text-xs font-sans tracking-[0.3em] text-primary/50 uppercase">Founder</span>
              </div>
            </motion.div>

            {/* Selected Experience Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-24 md:mb-32"
            >
              <div className="flex flex-wrap items-center gap-x-12 gap-y-8 font-serif text-xl md:text-2xl text-primary/40">
                <span className="hover:text-white transition-colors cursor-default">Hollywood Productions</span>
                <span className="hover:text-white transition-colors cursor-default">Samsung</span>
                <span className="hover:text-white transition-colors cursor-default">KKR</span>
                <span className="hover:text-white transition-colors cursor-default">Lucknow Super Giants</span>
                <span className="hover:text-white transition-colors cursor-default">Style Bazaar</span>
                <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-primary/20 flex items-center gap-4 ml-2">
                  <span className="w-4 md:w-8 h-[1px] bg-primary/20 block"></span>
                  & 50+ Global Brands
                </span>
              </div>
            </motion.div>

            {/* Profile Links & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-wrap gap-4 text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase">
                <a href="https://www.imdb.com/name/nm13973251/" target="_blank" rel="noopener noreferrer" className="text-white border border-white/20 hover:bg-white hover:text-background transition-all duration-300 px-6 py-3 flex items-center gap-2 group">
                  IMDb <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
                <a href="https://www.instagram.com/_keyurx_/" target="_blank" rel="noopener noreferrer" className="text-white border border-white/20 hover:bg-white hover:text-background transition-all duration-300 px-6 py-3 flex items-center gap-2 group">
                  Instagram <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
                <a href="https://www.linkedin.com/in/debabrata-bairagy/" target="_blank" rel="noopener noreferrer" className="text-white border border-white/20 hover:bg-white hover:text-background transition-all duration-300 px-6 py-3 flex items-center gap-2 group">
                  LinkedIn <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
                <a href="/founder" className="text-white border border-white/20 hover:bg-white hover:text-background transition-all duration-300 px-6 py-3 flex items-center gap-2 group bg-white/5">
                  Full Profile <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
