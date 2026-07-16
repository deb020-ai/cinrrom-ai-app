"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const portfolio = [
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4" }
];

function HeroVideo({ src, autoPlay = false, className = "" }: { src: string, autoPlay?: boolean, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  return (
    <div 
      className={`relative rounded-xl overflow-hidden bg-[#050d18] border border-white/10 group cursor-pointer ${className}`}
      onMouseEnter={() => { if (!autoPlay && window.innerWidth >= 768) videoRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { if (!autoPlay && window.innerWidth >= 768) videoRef.current?.pause() }}
    >
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        preload={autoPlay ? "auto" : "metadata"}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      >
        <source src={src} type="video/mp4" />
      </video>
      {!autoPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Play size={16} className="text-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function JewelryLaunchHero() {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-16 lg:py-0 flex items-center bg-[#02050a] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: The Story & Offer */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-10"
        >
          {/* The Trust Hook */}
          <div className="space-y-4 border-l-2 border-white/20 pl-6">
            <h2 className="text-sm font-sans tracking-[0.2em] uppercase text-white/50 font-semibold">
              The Creative Director
            </h2>
            <div className="text-lg md:text-xl font-serif text-white/80 leading-relaxed">
              <p>Former Hollywood VFX Artist.</p>
              <p>Worked on <span className="text-white">Spider-Man</span> & <span className="text-white">House of the Dragon</span>.</p>
              <p>Now helping jewelry brands launch premium campaigns.</p>
            </div>
          </div>

          {/* The Core Offer */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-6">
              Premium Jewelry Campaign Films.
            </h1>
            
            <ul className="space-y-3 mb-10">
              {["1 Premium Campaign Film", "4 Meta Ad Creatives", "Delivered in 48 Hours"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 font-sans text-sm md:text-base">
                  <Check size={18} className="text-blue-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="https://cal.com/omnivinci/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/90 transition-all w-full sm:w-auto min-w-[240px]"
              >
                Book Strategy Call <ArrowUpRight size={16} />
              </a>
              
              <a
                href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%2015k%20jewelry%20campaign."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/20 transition-all w-full sm:w-auto min-w-[240px]"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="opacity-80" unoptimized />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Portfolio Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 h-[600px] lg:h-[700px] w-full"
        >
          {/* Main featured video - autoplays */}
          <HeroVideo 
            src={portfolio[0].src} 
            autoPlay={true} 
            className="col-span-2 h-full min-h-[300px]" 
          />
          {/* Secondary videos - play on hover */}
          <HeroVideo 
            src={portfolio[1].src} 
            className="col-span-1 h-full min-h-[200px]" 
          />
          <HeroVideo 
            src={portfolio[2].src} 
            className="col-span-1 h-full min-h-[200px]" 
          />
        </motion.div>

      </div>
    </section>
  );
}
