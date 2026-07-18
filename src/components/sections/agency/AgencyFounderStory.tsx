import { Play, Film } from "lucide-react";
import Image from "next/image";

export default function AgencyFounderStory() {
  return (
    <section className="py-16 md:py-32 bg-[#02050a] border-b border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Video / Photo Area */}
          <div className="relative group cursor-pointer">
            <div className="w-full aspect-[4/5] bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative shadow-[0_8px_40px_rgba(255,255,255,0.03)] flex items-center justify-center">
              
              {/* Founder photo */}
              <Image 
                src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/founder%20image/image000222.webp"
                alt="Debabrata Founder"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
              
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-serif text-2xl">Debabrata</p>
                <p className="text-white/60 font-sans text-sm tracking-widest mt-1 hidden md:block">
                  25+ Hollywood Film Credits • 33K+ Creative Community • Experience Across Global Brands
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('/noise.png')] opacity-10 rounded-2xl pointer-events-none hidden md:block" />
          </div>
          
          {/* Story Text */}
          <div className="text-xl md:text-2xl font-serif text-white/90 leading-tight space-y-6 font-light">
            <p>Hey, I'm Debabrata.</p>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              I spent years working in Hollywood VFX, contributing to internationally released films and streaming productions. After collaborating with leading brands in India and globally, I built CINROOM to become the production backend for ambitious creative agencies.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <a href="https://www.instagram.com/7ctdiamond/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-5 py-2.5 rounded-full text-sm font-sans tracking-wide w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg> 
                Instagram
              </a>
              <a href="https://www.imdb.com/name/nm13973251/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#f5c518]/20 text-[#f5c518] border border-[#f5c518]/30 hover:bg-[#f5c518]/30 transition-colors px-5 py-2.5 rounded-full text-sm font-sans tracking-wide font-medium w-fit">
                <Film size={16} /> IMDb
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
