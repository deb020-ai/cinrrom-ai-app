import { ArrowUpRight } from "lucide-react";

export default function AgencyCta() {
  return (
    <section className="py-32 md:py-48 bg-[#02050a] border-t border-white/10 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_80%)] pointer-events-none" />
      
      <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-serif text-white tracking-tighter leading-[1.1] mb-8">
          Ready to Take More Clients Without Hiring More People?
        </h2>
        
        <p className="text-xl md:text-2xl font-sans text-white/60 mb-16 font-light">
          Let's become your production team.
        </p>
        
        <div className="flex justify-center">
          <a 
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full text-sm font-sans tracking-[0.2em] uppercase font-bold hover:bg-gray-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            Book a Partnership Call <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
