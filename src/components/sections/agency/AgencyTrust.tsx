export default function AgencyTrust() {
  const cards = [
    {
      title: "Former Hollywood VFX Artists",
      description: "Worked on global productions and premium commercial campaigns."
    },
    {
      title: "Luxury Visual Specialists",
      description: "Built exclusively for jewelry and luxury brands."
    },
    {
      title: "Fast Delivery",
      description: "Campaign-ready creatives in as little as 48 hours."
    },
    {
      title: "White Label",
      description: "Your client never knows we exist."
    },
    {
      title: "Reliable Capacity",
      description: "Handle 5 clients or 50 clients without hiring."
    },
    {
      title: "Premium Quality",
      description: "Every project goes through human creative direction."
    }
  ];

  return (
    <section className="py-24 bg-[#02050a] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-white/50 font-sans">Why Agencies Choose CINROOM</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <h3 className="text-lg font-serif text-white mb-3">{card.title}</h3>
              <p className="text-sm font-sans text-white/50 leading-relaxed font-light">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
