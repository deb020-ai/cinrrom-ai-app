export default function AgencyCaseStudies() {
  return (
    <section className="py-32 bg-[#050914]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
            Case Studies
          </h2>
          <p className="text-white/50 font-sans max-w-xl mx-auto font-light">
            Premium creative transformations.
          </p>
        </div>
        
        {/* Placeholder for case study components. Utilizing simple gray boxes for luxury minimal feel for now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/30 font-sans tracking-widest text-sm uppercase">Luxury Campaign {i}</span>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h3 className="text-xl font-serif text-white mb-2">Before vs After</h3>
                <p className="text-sm font-sans text-white/70">Meta Ads • Carousel • Video</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
