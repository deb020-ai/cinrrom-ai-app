"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LazyVideo } from "@/components/ui/LazyVideo";

const services = [
  {
    title: "Luxury Campaign Films",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4",
    type: "video"
  },
  {
    title: "Luxury Photography",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp",
    type: "image"
  },
  {
    title: "VFX & Compositing",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/poster.webp",
    type: "image"
  },
  {
    title: "CGI Production",
    media: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4",
    type: "video"
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-32 w-full overflow-hidden bg-background border-t border-white/5 transition-colors duration-1000">
      
      {/* Dynamic Background Media */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {services[hoveredIndex].type === "video" ? (
                <LazyVideo 
                  src={services[hoveredIndex].media}
                  className="w-full h-full"
                />
              ) : (
                <Image 
                  src={services[hoveredIndex].media}
                  alt={services[hoveredIndex].title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 mb-8 sticky top-32">
            Expertise
          </h2>
        </div>
        
        <div className="md:w-2/3 flex flex-col">
          {services.map((service, index) => (
            <div 
              key={index} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer border-b border-white/10 py-12 md:py-16 transition-colors hover:border-white/40"
            >
              <span className="text-[10px] font-sans tracking-[0.2em] text-secondary/40 mb-4 block group-hover:text-white transition-colors duration-500">
                0{index + 1}
              </span>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white/50 group-hover:text-white group-hover:italic transition-all duration-500 transform group-hover:translate-x-4">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
