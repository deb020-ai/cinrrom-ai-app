export default function AgencyWhySwitch() {
  const cards = [
    { 
      title: "Hiring", 
      points: ["Takes weeks.", "Fixed payroll.", "Long onboarding."] 
    },
    { 
      title: "Freelancers", 
      points: ["Hard to manage.", "Quality varies.", "Often unavailable."] 
    },
    { 
      title: "In-house team", 
      points: ["Expensive.", "Limited capacity.", "Hard to scale quickly."] 
    },
    { 
      title: "CINROOM", 
      points: ["Ready this week.", "100% White-label.", "Scales with your workload."], 
      highlight: true 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#050914] border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-12">
          Why Agencies Switch To Us
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`p-6 md:p-8 rounded-3xl border transition-all h-full ${
                card.highlight 
                  ? "bg-white/[0.05] border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" 
                  : "bg-white/[0.02] backdrop-blur-md border-white/10"
              }`}
            >
              <h3 className={`text-xl font-sans font-medium mb-6 ${card.highlight ? "text-blue-400" : "text-white"}`}>
                {card.title}
              </h3>
              
              <ul className="space-y-4">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm md:text-base font-sans text-white/70">
                    <span className={`mt-1 flex-shrink-0 ${card.highlight ? "text-blue-400" : "text-white/30"}`}>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
