"use client";
import { useState, useRef, useEffect } from "react";

const workVideos = [
  { title: "KKR", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/WEB%20ASSETS/VIDEO/kkr_ooh.mp4", aspect: "aspect-[5/4]" },
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4", aspect: "aspect-[9/16]" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4", aspect: "aspect-[9/16]" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4", aspect: "aspect-[9/16]" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4", aspect: "aspect-[9/16]" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4", aspect: "aspect-[9/16]" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4", aspect: "aspect-[9/16]" },
  { title: "Royal Radiant", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4", aspect: "aspect-[9/16]" }
];

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

export default function AgencyWorkDemo() {
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
      
      const containerCenter = container.clientWidth / 2;
      const thumbCenter = thumb.offsetLeft + (thumb.clientWidth / 2);
      
      container.scrollTo({
        left: thumbCenter - containerCenter,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Observer to detect which item is centered
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
        threshold: 0.6,
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
    <section className="py-32 bg-[#050914] overflow-hidden border-t border-white/5 flex flex-col items-center">
      <div className="max-w-[1200px] w-full mx-auto px-6 mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Work Demo
          </h2>
          <p className="text-white/50 font-sans max-w-xl font-light mx-auto md:mx-0">
            Premium creative transformations. Delivered fast.
          </p>
        </div>
      </div>
      
      {/* Main Peek-a-boo Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory w-full py-6 px-[10vw] lg:px-[20vw] items-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {workVideos.map((item, idx) => {
          const isActive = idx === currentIndex;
          const shouldRenderVideo = Math.abs(idx - currentIndex) <= 1;
          // Assign width based on aspect ratio to ensure they don't break the layout
          const isWide = item.aspect === "aspect-[5/4]";
          const widthClasses = isWide 
            ? "w-[80vw] md:w-[600px] max-w-[800px]" 
            : "w-[65vw] md:w-[350px] max-w-[450px]";

          return (
            <div 
              key={idx} 
              ref={(el) => { itemRefs.current[idx] = el; }}
              data-index={idx}
              className={`flex-shrink-0 ${widthClasses} snap-center ${item.aspect} px-2 md:px-4 transition-all duration-500 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40 hover:opacity-70 cursor-pointer'}`}
              onClick={() => !isActive && scrollTo(idx)}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050d18] border border-white/10 shadow-2xl relative flex items-center justify-center">
                
                <CarouselVideo 
                  src={item.src} 
                  isActive={isActive} 
                  shouldRender={shouldRenderVideo} 
                />
                
                <div className={`absolute top-6 left-6 right-6 z-20 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full inline-block">
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
        className="flex gap-3 overflow-x-auto max-w-[90%] md:max-w-[800px] mt-8 pb-4 px-4" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacers */}
        <div className="min-w-[40%] flex-shrink-0" aria-hidden="true" />
        {workVideos.map((item, idx) => {
          const isWide = item.aspect === "aspect-[5/4]";
          return (
            <button
              key={idx}
              ref={(el) => { thumbRefs.current[idx] = el; }}
              onClick={() => scrollTo(idx)}
              className={`relative flex-shrink-0 ${isWide ? 'w-24' : 'w-16'} h-24 rounded-md overflow-hidden transition-all duration-300 border-2 ${idx === currentIndex ? 'border-blue-400 scale-110 shadow-[0_0_15px_rgba(96,165,250,0.4)] z-10' : 'border-white/10 opacity-50 hover:opacity-100'}`}
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
          )
        })}
        <div className="min-w-[40%] flex-shrink-0" aria-hidden="true" />
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
