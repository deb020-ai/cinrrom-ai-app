"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const workVideos = [
  { title: "KKR", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/WEB%20ASSETS/VIDEO/kkr_ooh.mp4", aspect: "5/4" },
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4", aspect: "9/16" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4", aspect: "9/16" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4", aspect: "9/16" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4", aspect: "9/16" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4", aspect: "9/16" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4", aspect: "9/16" },
  { title: "Royal Radiant", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4", aspect: "9/16" }
];

export default function AgencyWorkDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <section className="py-24 md:py-32 bg-[#050914] overflow-hidden border-t border-white/5 flex flex-col items-center min-h-screen">
      <div className="max-w-[1200px] w-full mx-auto px-6 mb-10 md:mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4 md:mb-6">
            Work Demo
          </h2>
          <p className="text-white/50 font-sans max-w-xl mx-auto font-light text-lg">
            Premium creative transformations. Delivered fast.
          </p>
        </div>
      </div>
      
      {/* 
        Main Video Player
        Fixed height container prevents layout shift ("bouncing"). 
        object-contain ensures the 5:4 and 9:16 videos both fit perfectly without cropping.
      */}
      <div className="w-full max-w-[1200px] px-4 md:px-6">
        <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#02050a] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <video
                ref={videoRef}
                src={workVideos[activeIndex].src}
                loop
                muted
                playsInline
                autoPlay
                className="w-full h-full object-contain"
              />
              
              {/* Title Overlay */}
              <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-xl">
                  <p className="text-white font-serif text-lg md:text-xl tracking-wide">
                    {workVideos[activeIndex].title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* 
        Thumbnails Grid
        Flex-wrap prevents clipping ("thumbnail getting cut off").
      */}
      <div className="w-full max-w-[1200px] px-4 md:px-6 mt-8 md:mt-12">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {workVideos.map((item, idx) => {
            const isActive = idx === activeIndex;
            const isWide = item.aspect === "5/4";
            
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 ${isWide ? 'w-20 md:w-28' : 'w-14 md:w-20'} h-20 md:h-28 rounded-xl overflow-hidden transition-all duration-300 border-2 bg-[#02050a] ${
                  isActive 
                    ? 'border-blue-400 scale-105 shadow-[0_0_20px_rgba(96,165,250,0.3)] z-10' 
                    : 'border-white/10 opacity-50 hover:opacity-100 hover:scale-95'
                }`}
                aria-label={`View ${item.title}`}
              >
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </button>
            )
          })}
        </div>
      </div>
      
    </section>
  );
}
