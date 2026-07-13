"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

const processSteps = [
  {
    title: "Discovery",
    desc: "Understanding the maison's heritage, market position, and core ambition.",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty%20jel.png",
    type: "image"
  },
  {
    title: "Strategy",
    desc: "Defining the cinematic world and identifying the precise audience connection.",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/magazine%20cover.png",
    type: "image"
  },
  {
    title: "Creative",
    desc: "Crafting the visual language, narrative arc, and shot architecture.",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/poster.png",
    type: "image"
  },
  {
    title: "Production",
    desc: "Executing the vision with uncompromising Hollywood-grade precision.",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/end%20poster.png",
    type: "image"
  },
  {
    title: "Launch",
    desc: "Delivering the final assets integrated perfectly into the luxury ecosystem.",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty.mp4",
    type: "video"
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="process" className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-24 md:mb-32">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-6">
            Methodology
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
            The System of Luxury
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-48 relative">
          
          {/* Connecting Line */}
          <div className="absolute left-[15px] md:left-[27px] top-0 bottom-0 w-[1px] bg-white/10 hidden sm:block"></div>

          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col sm:flex-row items-center gap-12 md:gap-24 group">
                
                {/* Step Marker */}
                <div className="hidden sm:flex absolute left-0 w-[55px] h-full flex-col items-center">
                  <div className="w-[11px] h-[11px] rounded-full bg-white/30 group-hover:bg-white transition-colors duration-500 z-10 mt-12"></div>
                </div>

                <div className={`w-full sm:w-1/2 flex flex-col sm:pl-24 ${isEven ? 'sm:order-1' : 'sm:order-2'}`}>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-secondary/40 mb-6 block">
                    Phase 0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
                    {step.title}
                  </h3>
                  <p className="text-primary/60 font-serif text-lg leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>

                <div className={`w-full sm:w-1/2 relative ${step.type === 'video' ? 'aspect-[9/16]' : 'aspect-[4/5] sm:aspect-[3/4]'} overflow-hidden ${isEven ? 'sm:order-2' : 'sm:order-1'}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full bg-[#0a0a0a]"
                  >
                    {step.type === "video" ? (
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                      >
                        <source src={step.media} type="video/mp4" />
                      </video>
                    ) : (
                      <Image 
                        src={step.media}
                        alt={step.title}
                        fill
                        className={`object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 ${index === 0 ? 'object-contain p-8' : ''}`}
                        unoptimized
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
