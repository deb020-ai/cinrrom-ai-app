"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolio.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

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

        {/* Right Column: Swipeable Carousel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <div 
            className="relative w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#050d18] border border-white/10 shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Render ONLY the active video to save massive bandwidth */}
            <AnimatePresence mode="wait">
              <motion.video
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={portfolio[currentIndex].src} type="video/mp4" />
              </motion.video>
            </AnimatePresence>

            {/* Title Overlay */}
            <div className="absolute top-6 left-6 right-6 z-20">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-block">
                <p className="text-white font-serif text-sm md:text-base">
                  {portfolio[currentIndex].title}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                aria-label="Previous video"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                {portfolio.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"}`}
                    aria-label={`Go to video ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                aria-label="Next video"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Swipe Indicator (only shows briefly) */}
            <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-pointer" onClick={handlePrev} />
            <div className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-pointer" onClick={handleNext} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
