import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function AgencyTrust() {
  const cards = [
    {
      title: "25+ Hollywood Film Credits",
      description: "Worked on internationally released film and streaming productions.",
      linkText: "View IMDb",
      linkUrl: "https://www.imdb.com/name/nm13973251/",
    },
    {
      title: "33,000+ Creative Community",
      description: "Founder has built an audience of 33K+ creatives and marketers on Instagram.",
      linkText: "View Instagram",
      linkUrl: "https://www.instagram.com/7ctdiamond/",
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#02050a] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Credibility
          </h2>
          <p className="mt-4 text-lg font-sans text-white/50">
            Years of high-end VFX and creative production experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="p-8 md:p-12 border border-white/10 rounded-2xl md:rounded-3xl bg-white/[0.02] flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-3xl font-serif text-white mb-4 leading-snug">{card.title}</h3>
                <p className="text-base md:text-lg font-sans text-white/60 leading-relaxed font-light mb-8 md:mb-12">{card.description}</p>
              </div>
              
              <a 
                href={card.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-sans uppercase tracking-[0.1em] font-medium text-white hover:text-white/70 transition-colors w-fit"
              >
                {card.linkText} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
