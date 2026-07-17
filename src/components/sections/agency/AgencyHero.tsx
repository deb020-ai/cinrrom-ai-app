"use client";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function AgencyHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#02050a] border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] uppercase tracking-widest font-sans mb-8">
          WHITE-LABEL PRODUCTION PARTNER
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white tracking-tighter leading-[1.05] mb-8 max-w-4xl mx-auto">
          Scale Your Agency Without Hiring More Creatives.
        </h1>
        
        <p className="text-lg md:text-xl font-sans text-white/60 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          Deliver luxury jewelry campaign films, CGI commercials, AI model campaigns and premium Meta ad creatives for your clients—under your brand, with 48-hour turnaround.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 text-sm font-sans text-white/70">
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" /> No freelancers.</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" /> No hiring.</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30" /> No production headaches.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20a%20white-label%20partnership."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/90 transition-all w-full sm:w-auto min-w-[240px] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Book Partnership Call <ArrowUpRight size={16} />
          </a>
          
          <a
            href="#process"
            className="flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/5 transition-all w-full sm:w-auto min-w-[240px]"
          >
            See White-Label Process <ArrowRight size={16} />
          </a>
        </div>

        {/* Workflow Animation Concept */}
        <div className="mt-24 max-w-3xl mx-auto border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-left space-y-4">
              <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Before</div>
              <div className="flex items-center gap-3 text-white/50 font-sans text-sm">
                <span>Client</span> <ArrowRight size={14} className="text-white/20"/> <span className="text-red-400/70">Agency</span> <ArrowRight size={14} className="text-white/20"/> <span className="text-red-400/50">Production Chaos</span>
              </div>
            </div>
            <div className="text-left space-y-4">
              <div className="text-xs uppercase tracking-widest text-white/80 mb-2">After</div>
              <div className="flex flex-wrap items-center gap-3 text-white font-sans text-sm">
                <span>Client</span> <ArrowRight size={14} className="text-white/40"/> 
                <span className="font-bold">Your Agency</span> <ArrowRight size={14} className="text-white/40"/> 
                <span className="text-white/70">CINROOM</span> <ArrowRight size={14} className="text-white/40"/> 
                <span className="text-[#25D366]">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
