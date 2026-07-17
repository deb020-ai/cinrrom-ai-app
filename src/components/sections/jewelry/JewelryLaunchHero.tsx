"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, UIEvent } from "react";

const portfolio = [
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4" },
  { title: "Royal Radiant", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4" }
];

// Dedicated component to handle precise play/pause based on active state
function CarouselVideo({ src, isActive, shouldRender }: { src: string, isActive: boolean, shouldRender: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (!shouldRender) {
    return (
      <div className="absolute inset-0 bg-[#050d18] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload={isActive ? "auto" : "metadata"}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function JewelryLaunchHero({ country = 'in' }: { country?: 'in' | 'us' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Automatically scroll thumbnails to center the active one
  useEffect(() => {
    if (thumbContainerRef.current && thumbRefs.current[currentIndex]) {
      const container = thumbContainerRef.current;
      const thumb = thumbRefs.current[currentIndex];
      
      // Calculate the scroll position needed to center the thumbnail
      const containerCenter = container.clientWidth / 2;
      const thumbCenter = thumb.offsetLeft + (thumb.clientWidth / 2);
      
      container.scrollTo({
        left: thumbCenter - containerCenter,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Use IntersectionObserver to accurately detect which item is in the center
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible (closest to center)
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index) && index !== currentIndex) {
              setCurrentIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6, // Trigger when 60% of the item is visible
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [currentIndex]);

  const scrollTo = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
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

      <div className="max-w-[1400px] w-full mx-auto px-0 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 min-w-0">
        
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
              {["1 Premium Campaign Film", "4 Meta Ad Creatives", "Delivered in 48 Hours", `All for a flat ${country === 'us' ? '$300' : '₹15,000'}`].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 font-sans text-sm md:text-base">
                  <Check size={18} className="text-blue-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="hidden md:flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="https://cal.com/omnivinci/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/90 transition-all w-full sm:w-auto min-w-[240px]"
              >
                Book Strategy Call <ArrowUpRight size={16} />
              </a>
              
              <a
                href={`https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%20${country === 'us' ? '%24300' : '15k'}%20jewelry%20campaign.`}
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
          className="w-full flex flex-col items-center mt-10 lg:mt-0 overflow-hidden min-w-0"
        >
          {/* Main Peek-a-boo Carousel */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full py-6 px-[10vw] lg:px-[5vw]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {portfolio.map((item, idx) => {
              const isActive = idx === currentIndex;
              const shouldRenderVideo = Math.abs(idx - currentIndex) <= 1;

              return (
                <div 
                  key={idx} 
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  data-index={idx}
                  className={`flex-shrink-0 w-[65vw] md:w-[80vw] max-w-[320px] lg:max-w-[360px] snap-center aspect-[9/16] px-2 transition-all duration-500 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40 hover:opacity-70 cursor-pointer'}`}
                  onClick={() => !isActive && scrollTo(idx)}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050d18] border border-white/10 shadow-2xl relative flex items-center justify-center">
                    
                    <CarouselVideo 
                      src={item.src} 
                      isActive={isActive} 
                      shouldRender={shouldRenderVideo} 
                    />
                    
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
          <div 
            ref={thumbContainerRef}
            className="flex gap-3 overflow-x-auto no-scrollbar max-w-[90%] lg:max-w-[80%] mt-4 pb-4 px-4 lg:px-0" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Added extra spacer divs to allow first and last items to reach the center */}
            <div className="min-w-[40%] flex-shrink-0" aria-hidden="true" />
            {portfolio.map((item, idx) => (
              <button
                key={idx}
                ref={(el) => { thumbRefs.current[idx] = el; }}
                onClick={() => scrollTo(idx)}
                className={`relative flex-shrink-0 w-16 h-24 rounded-md overflow-hidden transition-all duration-300 border-2 ${idx === currentIndex ? 'border-blue-400 scale-110 shadow-[0_0_15px_rgba(96,165,250,0.4)] z-10' : 'border-white/10 opacity-50 hover:opacity-100'}`}
              >
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
            <div className="min-w-[40%] flex-shrink-0" aria-hidden="true" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
