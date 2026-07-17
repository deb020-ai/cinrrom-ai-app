"use client";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const workVideos = [
  { title: "KKR", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/WEB%20ASSETS/VIDEO/kkr_ooh.mp4", aspect: "aspect-[5/4]", width: "w-[85vw] sm:w-[500px] md:w-[600px]" },
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" },
  { title: "Royal Radiant", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4", aspect: "aspect-[9/16]", width: "w-[75vw] sm:w-[320px] md:w-[350px]" }
];

function DemoVideo({ src, title, aspect, width }: { src: string; title: string; aspect: string; width: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative flex-none ${width} ${aspect} rounded-2xl overflow-hidden bg-[#050d18] group cursor-pointer snap-center border border-white/10`}
      onMouseEnter={() => { if (window.innerWidth >= 768) videoRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { if (window.innerWidth >= 768) videoRef.current?.pause() }}
    >
      {isInView && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay={window.innerWidth < 768} // Autoplay on mobile since there is no hover
          preload="metadata"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex items-end p-6 md:p-8">
        <h4 className="text-white font-serif text-xl md:text-2xl">{title}</h4>
      </div>
    </div>
  );
}

export default function AgencyWorkDemo() {
  return (
    <section className="py-32 bg-[#050914] overflow-hidden border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
              Work Demo
            </h2>
            <p className="text-white/50 font-sans max-w-xl font-light">
              Premium creative transformations. Delivered fast.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-widest text-white/30 font-sans">Scroll to view →</span>
          </div>
        </div>
      </div>
      
      {/* Horizontal Mobile-Optimized Scroll Container */}
      <div className="w-full px-6">
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 items-center">
          {workVideos.map((video, idx) => (
            <DemoVideo key={idx} src={video.src} title={video.title} aspect={video.aspect} width={video.width} />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
