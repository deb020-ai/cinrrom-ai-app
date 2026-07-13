"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { LazyVideo } from "@/components/ui/LazyVideo";

const exhibitionVideos = [
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Sunset%20Elegance.mp4" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Island%20Vows.mp4" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Golden%20Serpent.mp4" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Emerald%20Precision.mp4" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Alpine%20Sapphire.mp4" },
  { title: "Royal Radiance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Royal%20Radiance%20.mp4" },
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/The%20Blue%20Dynasty.mp4" },
];

export default function Archive() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Desktop horizontal translation.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  // Tracks which video currently has audio unmuted
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);

  const toggleAudio = (index: number) => {
    setActiveAudioIndex(current => current === index ? null : index);
  };

  return (
    <>
      {/* MOBILE LAYOUT: Standard horizontal swipe gallery (no 400vh endless scroll) */}
      <section className="md:hidden relative py-24 bg-background border-t border-white/5">
        <div className="px-6 mb-12">
          <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-2">
             02 &mdash; Archive
          </span>
          <h2 className="text-3xl font-serif text-white tracking-wide">
             The Exhibition.
          </h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 pb-12">
          {exhibitionVideos.map((video, index) => {
            const isMuted = activeAudioIndex !== index;
            return (
              <div key={index} className="flex flex-col gap-4 shrink-0 w-[80vw] snap-center">
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#111] rounded-sm">
                  <LazyVideo 
                    src={video.src}
                    posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp" 
                    muted={isMuted}
                    className="w-full h-full opacity-90"
                  />
                  
                  <button 
                    onClick={() => toggleAudio(index)}
                    className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={14} strokeWidth={1.5} /> : <Volume2 size={14} strokeWidth={1.5} />}
                  </button>
                </div>
                <div className="flex flex-col pl-1">
                  <span className="text-[8px] font-sans tracking-[0.3em] uppercase text-secondary/50 mb-1">
                     Exhibit 0{index + 1}
                  </span>
                  <h3 className="text-lg font-serif text-white/90">
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
          {/* Spacer for final item snap */}
          <div className="w-[10vw] shrink-0"></div>
        </div>
      </section>

      {/* DESKTOP LAYOUT: Cinematic 400vh horizontal scroll tied to vertical scroll */}
      <section ref={targetRef} className="hidden md:block relative h-[400vh] bg-background">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-white/5">
          
          <div className="absolute top-24 left-12 lg:left-24 z-20 flex flex-col md:flex-row md:items-end justify-between w-[calc(100%-6rem)] lg:w-[calc(100%-12rem)]">
             <div>
               <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-2">
                  02 &mdash; Archive
               </span>
               <h2 className="text-5xl font-serif text-white tracking-wide">
                  The Exhibition.
               </h2>
             </div>
          </div>

          <motion.div style={{ x }} className="flex items-center gap-32 pl-12 lg:pl-24">
            {exhibitionVideos.map((video, index) => {
              const isMuted = activeAudioIndex !== index;
              return (
                <div key={index} className="flex flex-col gap-6 shrink-0 group">
                  <div className="relative aspect-[9/16] h-[65vh] overflow-hidden bg-[#111]">
                    <LazyVideo 
                      src={video.src}
                      posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
                      muted={isMuted} 
                      className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    />
                    
                    <button 
                      onClick={() => toggleAudio(index)}
                      className="absolute bottom-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-secondary/50 mb-1">
                       Exhibit 0{index + 1}
                    </span>
                    <h3 className="text-2xl font-serif text-white/90 group-hover:italic transition-all duration-500">
                      {video.title}
                    </h3>
                  </div>
                </div>
              );
            })}
            <div className="w-[20vw] shrink-0"></div>
          </motion.div>
          
        </div>
      </section>
    </>
  );
}
