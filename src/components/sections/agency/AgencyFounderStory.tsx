export default function AgencyFounderStory() {
  return (
    <section className="py-16 md:py-24 bg-[#02050a] border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_8px_40px_rgba(255,255,255,0.03)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 md:mb-12 font-medium">
            Why I Built CINROOM
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-lg md:text-xl font-sans font-light text-white/80 leading-relaxed">
            <div className="space-y-6">
              <p>I spent years working in Hollywood VFX, learning exactly how world-class creative teams operate under pressure.</p>
              <p>Later, I built one of the most capable creative teams I could in India.</p>
              <p>But looking at the agency world, we realized something.</p>
            </div>
            
            <div className="space-y-6">
              <p>Great agencies don't struggle because they lack ideas or sales skills. They struggle because every single new client creates an avalanche of production work.</p>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-sm md:text-base space-y-1">
                <p>• Hiring takes time.</p>
                <p>• Managing creatives drains energy.</p>
                <p>• Deadlines never stop.</p>
              </div>
              <p className="font-medium text-white pt-2">
                Your team stays focused on winning clients.<br/>
                <span className="text-blue-400">Mine makes sure the work gets delivered.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
