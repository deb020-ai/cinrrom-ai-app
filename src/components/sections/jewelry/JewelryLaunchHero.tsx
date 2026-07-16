"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, UIEvent } from "react";

const portfolio = [
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4" },
  { title: "Imran", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Imran%20reduce%20size.mp4" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4" },
  { title: "Royal Radiant", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Royal%20Radiant%20reduce%20size.mp4" }
];

export default function JewelryLaunchHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Debounced scroll handler to detect active center item
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.8; // 80% width items
    const newIndex = Math.round(scrollPosition / itemWidth);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < portfolio.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth * 0.8;
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <section className="relative w-full min-h-screen pt-24 pb-16 lg:py-0 flex items-center bg-[#02050a] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-0 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: The Story & Offer */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-10 px-6 lg:px-0"
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

        {/* Right Column: Expert UX Carousel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-col items-center mt-10 lg:mt-0 overflow-hidden"
        >
          {/* Main Peek-a-boo Carousel */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full py-4 px-[10%]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {portfolio.map((item, idx) => {
              const isActive = idx === currentIndex;
              // Only load videos for the active, previous, and next slides to save bandwidth
              const shouldRenderVideo = Math.abs(idx - currentIndex) <= 1;

              return (
                <div 
                  key={idx} 
                  className={`flex-shrink-0 w-[80%] snap-center aspect-[9/16] px-2 transition-all duration-500 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40 hover:opacity-70 cursor-pointer'}`}
                  onClick={() => !isActive && scrollTo(idx)}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050d18] border border-white/10 shadow-2xl relative">
                    {shouldRenderVideo ? (
                      <video
                        autoPlay={isActive}
                        loop
                        muted
                        playsInline
                        preload={isActive ? "auto" : "metadata"}
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="absolute inset-0 bg-[#050d18] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
                      </div>
                    )}
                    
                    {/* Title Overlay */}
                    <div className={`absolute top-6 left-6 right-6 z-20 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-block">
                        <p className="text-white font-serif text-sm md:text-base">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar max-w-[80%] mt-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {portfolio.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`relative flex-shrink-0 w-14 h-20 rounded-md overflow-hidden transition-all duration-300 border-2 ${idx === currentIndex ? 'border-blue-400 scale-110 shadow-[0_0_15px_rgba(96,165,250,0.4)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                {/* We use preload metadata so the browser fetches the first frame to use as a thumbnail */}
                <video
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </button>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
