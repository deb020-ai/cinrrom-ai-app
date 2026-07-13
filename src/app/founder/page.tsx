"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function FounderPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen selection:bg-white selection:text-obsidian">
      
      {/* Navigation (simplified for article reading) */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 mix-blend-difference text-white flex justify-between">
         <Link href="/" className="text-[10px] font-sans tracking-[0.3em] uppercase hover:opacity-70 transition-opacity">
           CINROOM
         </Link>
         <Link href="/#work" className="text-[10px] font-sans tracking-[0.3em] uppercase hover:opacity-70 transition-opacity">
           Close Article
         </Link>
      </nav>

      {/* Hero Portrait */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/founder%20image/image000222.png"
            alt="Debabrata Bairagy"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </motion.div>
        
        <div className="absolute bottom-16 md:bottom-24 left-6 md:left-12 lg:left-24 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-[9rem] font-serif tracking-tight leading-[0.9]"
          >
            Debabrata <br className="hidden md:block"/>
            <span className="italic font-light">Bairagy.</span>
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-secondary/70 block mt-8 md:mt-12"
          >
            Founder & Creative Director, CINROOM
          </motion.span>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-24 md:py-48 max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Column (Metadata & Timeline) */}
        <div className="lg:col-span-4 flex flex-col gap-16">
          
          <div className="flex flex-col gap-6">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-secondary/50 border-b border-white/10 pb-4">
              Professional Links
            </span>
            <div className="flex flex-col gap-4 text-xs font-sans tracking-[0.1em] uppercase">
              <a href="https://www.imdb.com/name/nm13973251/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-white transition-colors">IMDb Profile</a>
              <a href="https://www.linkedin.com/in/debabrata-bairagy/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/_keyurx_/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-secondary/50 border-b border-white/10 pb-4">
              Timeline
            </span>
            <div className="flex flex-col gap-8 text-sm font-sans tracking-wide text-primary/70">
              <div className="flex flex-col">
                <span className="text-white mb-1">CINROOM</span>
                <span className="text-xs text-secondary/60">Present</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white mb-1">OmniVinci</span>
                <span className="text-xs text-secondary/60">Founder & CEO</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white mb-1">Hollywood Productions</span>
                <span className="text-xs text-secondary/60">VFX & Visual Storytelling</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-secondary/50 border-b border-white/10 pb-4">
              Selected Clients
            </span>
            <div className="flex flex-col gap-3 font-serif text-lg text-primary/70">
              <span>Samsung</span>
              <span>KKR</span>
              <span>Lucknow Super Giants</span>
              <span>Style Bazaar</span>
            </div>
          </div>

        </div>

        {/* Right Column (Article Flow) */}
        <div className="lg:col-span-8 prose prose-invert prose-lg md:prose-xl font-serif text-primary/80">
          
          <p className="lead text-2xl md:text-3xl text-white font-serif leading-relaxed mb-12">
            "Luxury is not just aesthetic. It is precision, clarity, and an absolute commitment to exceptional standards. That is what I learned in Hollywood, and that is what we bring to every brand we partner with."
          </p>

          <h3 className="text-xs font-sans tracking-[0.3em] uppercase text-secondary/50 mt-16 mb-6">The Hollywood Journey</h3>
          <p className="leading-relaxed mb-8">
            The foundation of CINROOM’s cinematic language was built on the world’s most demanding visual stage: Hollywood. Working on top-tier visual effects and international commercial productions taught Debabrata the intricacies of grand-scale storytelling. It was here that he learned to view light, shadow, and movement not just as technical elements, but as emotional triggers that command attention and desire.
          </p>

          <h3 className="text-xs font-sans tracking-[0.3em] uppercase text-secondary/50 mt-16 mb-6">OmniVinci</h3>
          <p className="leading-relaxed mb-8">
            Transitioning from pure film production to commercial branding, Debabrata founded OmniVinci. The agency quickly became a trusted partner for enterprise clients, including Samsung, KKR, and international sports franchises. 
          </p>
          <p className="leading-relaxed mb-8">
            OmniVinci was a masterclass in business operations. It revealed exactly what premium enterprise clients truly value: not just uncompromised creativity, but absolute reliability, structured workflows, and the ability to execute complex visions without friction.
          </p>

          <h3 className="text-xs font-sans tracking-[0.3em] uppercase text-secondary/50 mt-16 mb-6">The CINROOM Philosophy</h3>
          <p className="leading-relaxed mb-8">
            CINROOM is the synthesis of these two worlds. It combines the awe-inspiring visual aesthetics of feature films with the structured, reliable production workflows of an elite agency. 
          </p>
          <p className="leading-relaxed mb-8">
            Created specifically for the world's most ambitious luxury jewelry brands, CINROOM operates on a simple philosophy: Every project must be approached with the discipline of film production and the unyielding precision expected by a 100-year-old luxury maison. We do not just shoot products; we craft heritage.
          </p>

          <div className="mt-32 p-12 border border-white/10 text-center">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-secondary/50 block mb-6">
              Personal Manifesto
            </span>
            <p className="text-2xl md:text-4xl font-serif text-white leading-tight italic">
              "We build visual worlds so powerful, they become monuments of desire."
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
