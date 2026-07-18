export default function AgencySolution() {
    <section className="py-16 md:py-24 bg-black border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-blue-500/10 blur-[100px] pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tighter leading-tight mb-6">
            We Become Your Production Team.
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-lg md:text-xl font-sans font-light text-white/80 mb-12">
            <p>Your client never knows we exist.</p>
            <span className="hidden md:block text-white/20">•</span>
            <p>Everything is delivered under your brand.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-sans text-white/40 mb-12">
            <span className="bg-black/30 px-4 py-2 rounded-full border border-white/5 line-through decoration-white/20">No freelancers</span>
            <span className="bg-black/30 px-4 py-2 rounded-full border border-white/5 line-through decoration-white/20">No recruiting</span>
            <span className="bg-black/30 px-4 py-2 rounded-full border border-white/5 line-through decoration-white/20">No hiring</span>
            <span className="bg-black/30 px-4 py-2 rounded-full border border-white/5 line-through decoration-white/20">No extra payroll</span>
          </div>
          
          <p className="text-xl md:text-3xl font-serif text-white/90">
            Just reliable production whenever you need it.
          </p>
        </div>
      </div>
    </section>
  );
}
