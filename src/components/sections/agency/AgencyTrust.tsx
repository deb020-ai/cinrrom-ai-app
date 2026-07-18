import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function AgencyTrust() {
  const cards = [
    {
      title: "33,000+ Instagram Followers",
      description: "Explore our portfolio of luxury campaigns, CGI work, behind-the-scenes content, and creative process.",
      linkText: "View Instagram",
      linkUrl: "https://www.instagram.com/7ctdiamond/",
    },
    {
      title: "25+ IMDb Film Credits",
      description: "View verified Hollywood production credits, professional profile, and filmography.",
      linkText: "View IMDb",
      linkUrl: "https://www.imdb.com/name/nm13973251/",
    },
    {
      title: "Hollywood Production Experience",
      description: "Worked on blockbuster productions including Spider-Man and House of the Dragon.",
      linkText: null,
      linkUrl: null,
    },
    {
      title: "Built for Agencies",
      description: "White-label production. 48-hour turnaround. Dedicated production partner. Agency-first workflow.",
      linkText: null,
      linkUrl: null,
    }
  ];

  const stats = [
    { value: "25+", label: "Hollywood Film Credits" },
    { value: "33K+", label: "Creative Community" },
    { value: "48 Hrs", label: "Average Delivery" },
    { value: "100%", label: "White-Label Workflow" }
  ];

  return (
    <section className="py-16 md:py-32 bg-[#02050a] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center md:text-left mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
            Trusted by Agencies That Can't Afford to Miss Deadlines.
          </h2>
          <p className="text-lg font-sans text-white/60 leading-relaxed font-light">
            Former Hollywood VFX Artist with years of experience delivering premium visual work for global productions and major brands.
          </p>
        </div>
        
        {/* Trust Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-20 md:mb-32">
          {cards.map((card, index) => (
            <div key={index} className="p-4 md:p-10 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-2xl font-serif text-white mb-2 md:mb-4 leading-snug">{card.title}</h3>
                <p className="text-xs md:text-base font-sans text-white/50 leading-relaxed font-light mb-4 md:mb-8">{card.description}</p>
              </div>
              
              {card.linkText && card.linkUrl && (
                <a 
                  href={card.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
                >
                  {card.linkText} <ArrowRight size={14} className="scale-75 md:scale-100" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Premium Statistics */}
        <div className="border-t border-white/10 pt-12 md:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1 md:gap-2">
                <span className="text-3xl md:text-6xl font-serif text-white tracking-tighter">{stat.value}</span>
                <span className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-white/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
