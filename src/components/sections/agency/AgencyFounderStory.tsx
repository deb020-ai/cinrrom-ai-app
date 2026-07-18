import { Play } from "lucide-react";

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
              
              {/* Replace with actual founder photo/video */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
              
              <div className="z-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <Play className="text-white ml-1" fill="white" size={24} />
              </div>
              
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-serif text-2xl">Debabrata</p>
                <p className="text-white/60 font-sans text-sm uppercase tracking-widest">Founder, CINROOM</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('/noise.png')] opacity-10 rounded-2xl pointer-events-none hidden md:block" />
          </div>
          
          {/* Story Text */}
          <div className="text-xl md:text-3xl font-serif text-white/90 leading-tight space-y-8 font-light">
            <p>Hey, I'm Debabrata.</p>
            <p className="text-white/60">I spent years working in Hollywood VFX.</p>
            <p className="text-white/60">Then I built a creative team in India.</p>
            <p>I kept seeing agencies struggle with delivery.</p>
            <p className="text-blue-400 font-medium italic">That's why I built CINROOM.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
