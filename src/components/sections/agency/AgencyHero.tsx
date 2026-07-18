import { ArrowUpRight } from "lucide-react";

export default function AgencyHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#02050a] border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-[1000px] w-full mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] uppercase tracking-widest font-sans mb-12">
          Hollywood VFX Experience • White Label • Built for Agencies
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-white tracking-tighter leading-[1.05] mb-12 max-w-4xl mx-auto">
          Scale Your Agency to $1M. We'll Handle the Production.
        </h1>
        
        <div className="text-lg md:text-xl font-sans text-white/60 leading-relaxed max-w-2xl mx-auto mb-16 font-light space-y-4">
          <p className="text-white font-medium">You close the clients.</p>
          <p>We'll handle the creative production behind the scenes.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16 text-sm font-sans text-white/50">
          <span>Videos.</span>
          <span>CGI.</span>
          <span>AI campaigns.</span>
          <span>Motion graphics.</span>
          <span>Ad creatives.</span>
          <span>Video editing.</span>
          <span>AI UGC with natural US English accents.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-sans text-white mb-16">
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
