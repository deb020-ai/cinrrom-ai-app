"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Instagram, ArrowUpRight } from "lucide-react";

type WorkItem = {
  type: "video" | "instagram";
  title: "CGI Commercial" | "Performance Ad" | "Luxury Jewelry" | "AI UGC" | "Motion Graphics" | "More on Instagram";
  src?: string;
  aspect: "5/4" | "9/16";
};

const workItems: WorkItem[] = [
  { type: "video", title: "CGI Commercial", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/WEB%20ASSETS/VIDEO/kkr_ooh.mp4", aspect: "5/4" },
  { type: "video", title: "Performance Ad", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4", aspect: "9/16" },
  { type: "video", title: "Luxury Jewelry", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4", aspect: "9/16" },
  { type: "video", title: "AI UGC", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4", aspect: "9/16" },
  { type: "video", title: "Motion Graphics", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4", aspect: "9/16" },
  { type: "video", title: "Performance Ad", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4", aspect: "9/16" },
  { type: "video", title: "Luxury Jewelry", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4", aspect: "9/16" },
  { type: "video", title: "CGI Commercial", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4", aspect: "9/16" },
  { type: "instagram", title: "More on Instagram", aspect: "5/4" }
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
              {workItems[activeIndex].type === "video" ? (
                <>
                  <video
                    ref={videoRef}
                    src={workItems[activeIndex].src}
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
                        {workItems[activeIndex].title}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <a 
                  href="https://www.instagram.com/7ctdiamond/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/40 to-blue-900/40 group text-center px-6 cursor-pointer hover:from-purple-800/50 hover:to-blue-800/50 transition-colors"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 border-4 border-white/20 shadow-2xl relative">
                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                      <span className="text-white/50 text-xs">Photo Placeholder</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Instagram size={28} className="text-pink-400" />
                    <span className="text-xl md:text-3xl font-serif text-white">Follow @7ctdiamond</span>
                  </div>
                  <p className="text-white/70 font-sans max-w-sm mx-auto text-lg flex items-center justify-center gap-2">
                    To see more work, visit our Instagram account <ArrowUpRight size={18} />
                  </p>
                </a>
              )}
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
          {workItems.map((item, idx) => {
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
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                    <Instagram size={24} className="text-white/80" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
      
    </section>
  );
}
