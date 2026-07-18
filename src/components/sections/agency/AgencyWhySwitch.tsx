export default function AgencyWhySwitch() {
  const cards = [
    { title: "Hiring", description: "Takes weeks." },
    { title: "Freelancers", description: "Unreliable." },
    { title: "In-house team", description: "Expensive." },
    { title: "CINROOM", description: "Ready this week.", highlight: true },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#050914] border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-12">
          Why Agencies Switch To Us
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`p-6 md:p-8 rounded-3xl border transition-all ${
                card.highlight 
                  ? "bg-white/[0.05] border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" 
                  : "bg-white/[0.02] backdrop-blur-md border-white/10"
              }`}
            >
              <h3 className={`text-base md:text-lg font-sans font-medium mb-2 ${card.highlight ? "text-blue-400" : "text-white"}`}>
                {card.title}
              </h3>
              <p className="text-lg md:text-2xl font-serif text-white/80 font-light">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
