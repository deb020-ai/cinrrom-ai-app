export default function AgencyProblem() {
  return (
    <section className="py-16 md:py-32 bg-[#050914]">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight text-center mb-20">
          Growing Your Agency Gets Expensive.
        </h2>
        
        <div className="grid grid-cols-2 gap-4 md:gap-24">
          <div className="space-y-4 md:space-y-6 bg-white/[0.02] p-4 md:p-8 rounded-2xl border border-white/5">
            <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-4 md:mb-8 border-b border-white/10 pb-4">The Old Way</h3>
            <ul className="space-y-3 md:space-y-4 text-[11px] md:text-base text-white/40 font-sans line-through decoration-white/20">
              <li>Hire Designers</li>
              <li>Hire Editors</li>
              <li>Hire 3D Artists</li>
              <li>Manage Freelancers</li>
              <li className="text-red-400/50 decoration-red-400/30">Miss Deadlines</li>
              <li className="text-red-400/50 decoration-red-400/30">Quality Issues</li>
              <li>Payroll</li>
              <li>Recruitment</li>
            </ul>
          </div>
          
          <div className="space-y-4 md:space-y-6 bg-white/[0.02] p-4 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5" />
            <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-white mb-4 md:mb-8 border-b border-white/20 pb-4 relative z-10">Partner With CINROOM</h3>
            <ul className="space-y-3 md:space-y-4 text-[11px] md:text-base text-white font-sans relative z-10">
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> Fixed pricing</li>
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> Predictable delivery</li>
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> Scale instantly</li>
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> No management</li>
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> No hiring</li>
              <li className="flex items-center gap-2 md:gap-3"><span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/70 flex-shrink-0"/> Premium quality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
