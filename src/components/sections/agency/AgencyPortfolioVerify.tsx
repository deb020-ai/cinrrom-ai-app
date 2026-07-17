import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function AgencyPortfolioVerify() {
  const actions = [
    {
      title: "View Instagram Portfolio",
      description: "See our latest campaigns, CGI work, and creative direction.",
      link: "https://instagram.com/cinroom",
      icon: <ArrowRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
    },
    {
      title: "View IMDb Profile",
      description: "Explore verified Hollywood production credits.",
      link: "https://www.imdb.com/name/nm10603889/",
      icon: <ArrowRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
    },
    {
      title: "Book Partnership Call",
      description: "Let's discuss your agency workflow.",
      link: "https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20a%20white-label%20partnership.",
      icon: <ArrowUpRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
    }
  ];

  return (
    <section className="py-32 bg-[#050914]">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Don't Take Our Word For It.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, i) => (
            <a 
              key={i} 
              href={action.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all hover:-translate-y-1"
            >
              <div className="w-full flex items-center justify-between mb-8">
                <h3 className="text-lg font-serif text-white">{action.title}</h3>
                {action.icon}
              </div>
              <p className="text-sm font-sans text-white/50 leading-relaxed font-light mt-auto">
                {action.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
