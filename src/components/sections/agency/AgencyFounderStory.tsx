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
              <p>I loved building creative teams.</p>
              <p>But I kept seeing the same problem.</p>
              <p>Great agencies weren't losing clients because they lacked talent.</p>
              <p>They were drowning in delivery.</p>
            </div>
            
            <div className="space-y-6">
              <p>Every new project meant more hiring.</p>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-sm md:text-base space-y-1">
                <p>• More management.</p>
                <p>• More pressure.</p>
              </div>
              <p className="font-medium text-white pt-2">
                That's why I built CINROOM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
