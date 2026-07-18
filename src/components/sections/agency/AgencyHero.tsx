import { ArrowUpRight } from "lucide-react";

export default function AgencyHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-[1000px] w-full mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] uppercase tracking-widest font-sans mb-12">
          Hollywood VFX Experience • White Label • Built for Agencies
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tighter leading-tight mb-8 max-w-4xl mx-auto drop-shadow-2xl">
          Scale Your Agency to $1M. We'll Handle the Production.
        </h1>
        
        <div className="text-base md:text-xl font-sans text-white/80 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
          <p className="inline-block mr-2 font-medium text-white">You close the clients.</p>
          <p className="inline-block">We deliver the videos, ads, CGI, AI content and campaigns—under your brand.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full p-6 md:px-10 md:py-4 mb-12 shadow-[0_8px_32px_rgba(255,255,255,0.02)]">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm font-sans text-white/70">
            <span>Videos</span> <span className="text-white/20">•</span>
            <span>CGI</span> <span className="text-white/20">•</span>
            <span>AI campaigns</span> <span className="text-white/20">•</span>
            <span>Motion graphics</span> <span className="text-white/20">•</span>
            <span>Ad creatives</span> <span className="text-white/20">•</span>
            <span>Video editing</span> <span className="text-white/20">•</span>
            <span>AI UGC with US accents</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-sans text-white mb-12">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" /> Fast.</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> White-label.</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Delivered under your brand.</span>
        </div>
        
        <div className="flex justify-center">
          <a
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-sm font-sans tracking-[0.2em] uppercase font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Book a Partnership Call <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
