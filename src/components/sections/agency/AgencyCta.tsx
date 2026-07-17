import { ArrowUpRight } from "lucide-react";

export default function AgencyCta() {
  return (
    <section className="py-32 bg-[#050914] border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-8">
          Become The Agency That Always Delivers.
        </h2>
        
        <p className="text-lg font-sans text-white/60 mb-12">
          Win larger retainers. Deliver faster. Never hire another production team again.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20a%20white-label%20partnership."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/90 transition-all w-full sm:w-auto min-w-[240px]"
          >
            Book Partnership Call <ArrowUpRight size={16} />
          </a>
          
          <a
            href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20a%20white-label%20partnership."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white/5 transition-all w-full sm:w-auto min-w-[240px]"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
