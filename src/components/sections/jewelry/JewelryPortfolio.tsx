"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const jewelryVideos = [
  { title: "The Blue Dynasty", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4" },
  { title: "Sunset Elegance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4" },
  { title: "Emerald Precision", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4" },
  { title: "Royal Radiance", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Royal%20Radiance%20%20reduce%20size.mp4" },
  { title: "Golden Serpent", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4" },
  { title: "Alpine Sapphire", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4" },
  { title: "Island Vows", src: "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4" },
];

function MasonryVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay when visible for mobile or just use hover on desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth < 768) {
            videoRef.current?.play().catch(() => {});
          } else if (window.innerWidth < 768) {
            videoRef.current?.pause();
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
      className="relative w-full rounded-2xl overflow-hidden bg-[#050d18] group cursor-pointer"
      onMouseEnter={() => { if (window.innerWidth >= 768) videoRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { if (window.innerWidth >= 768) videoRef.current?.pause() }}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
        <h4 className="text-white font-serif text-xl md:text-2xl">{title}</h4>
      </div>
    </div>
  );
}

export default function JewelryPortfolio() {
  return (
    <section className="py-24 bg-[#02050a] px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-white/40 mb-4 font-bold">
            The Exhibition
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Designed to feel premium.
          </h3>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {jewelryVideos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <MasonryVideo src={video.src} title={video.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
