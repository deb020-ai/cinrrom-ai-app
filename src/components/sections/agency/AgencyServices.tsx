export default function AgencyServices() {
  const services = [
    "Luxury Campaign Films",
    "AI Model Campaigns",
    "CGI Product Films",
    "Meta Ad Creatives",
    "Instagram Reels",
    "Product Launch Videos",
    "Seasonal Campaigns",
    "Luxury Lifestyle Images",
    "Campaign Photography",
    "Creative Direction"
  ];

  return (
    <section className="py-32 bg-[#02050a] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
            Everything Your Agency Needs.
          </h2>
          <p className="text-white/50 font-sans max-w-xl mx-auto font-light">
            A complete in-house production studio, available on-demand.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <div key={i} className="p-6 border border-white/10 rounded-xl bg-white/[0.02] flex items-center justify-center text-center hover:bg-white/[0.05] transition-colors h-32">
              <span className="text-sm font-sans text-white/80">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
