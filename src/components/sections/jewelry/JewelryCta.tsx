"use client";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function JewelryCta({ country = 'in' }: { country?: 'in' | 'us' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section ref={ref} className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {isInView && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 scale-105 grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <source src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-[#02050a]/40 to-[#02050a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-10"
        >
          Your jewelry deserves campaigns that feel as premium as your craftsmanship.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/90 transition-all w-full sm:w-auto min-w-[240px]"
          >
            Get Your Campaign Plan <ArrowUpRight size={16} />
          </a>
          
          <a
            href={`https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%20${country === 'us' ? '%24399' : '20k'}%20jewelry%20campaign.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/20 transition-all w-full sm:w-auto min-w-[240px]"
          >
            <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="opacity-80" unoptimized />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
