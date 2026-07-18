export default function AgencySolution() {
  return (
    <section className="py-24 md:py-40 bg-[#02050a] border-b border-white/5 flex flex-col items-center justify-center text-center">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tighter leading-tight mb-16">
          We Become Your Production Team.
        </h2>
        
        <div className="space-y-6 text-xl md:text-3xl font-sans font-light text-white/80 max-w-3xl mx-auto">
          <p>Your client never knows we exist.</p>
          <p>Everything is delivered under your brand.</p>
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 text-base md:text-xl font-sans text-white/50">
          <span className="line-through decoration-white/30">No freelancers.</span>
          <span className="line-through decoration-white/30">No recruiting.</span>
          <span className="line-through decoration-white/30">No hiring.</span>
          <span className="line-through decoration-white/30">No extra payroll.</span>
        </div>
        
        <div className="mt-20">
          <p className="text-2xl md:text-4xl font-serif text-white">
            Just reliable production whenever you need it.
          </p>
        </div>
      </div>
    </section>
  );
}
