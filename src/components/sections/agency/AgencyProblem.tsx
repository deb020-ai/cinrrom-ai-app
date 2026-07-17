export default function AgencyProblem() {
  return (
    <section className="py-32 bg-[#050914]">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight text-center mb-20">
          Growing Your Agency Gets Expensive.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-4">The Old Way</h3>
            <ul className="space-y-4 text-white/40 font-sans line-through decoration-white/20">
              <li>Hire Designers</li>
              <li>Hire Editors</li>
              <li>Hire 3D Artists</li>
              <li>Manage Freelancers</li>
              <li className="text-red-400/50 decoration-red-400/30">Miss Deadlines</li>
              <li className="text-red-400/50 decoration-red-400/30">Quality Issues</li>
              <li>Payroll</li>
              <li>Recruitment</li>
              <li>Training</li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-white mb-8 border-b border-white/20 pb-4">Partner With CINROOM</h3>
            <ul className="space-y-4 text-white font-sans">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> Fixed pricing</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> Predictable delivery</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> Scale instantly</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> No management</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> No hiring</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/70"/> Consistent premium quality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
