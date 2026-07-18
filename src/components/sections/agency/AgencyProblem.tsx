export default function AgencyProblem() {
  return (
    <section className="py-16 md:py-24 bg-black border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(255,255,255,0.03)] relative overflow-hidden">
          {/* Subtle glass gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-8">
            The More You Sell,<br className="hidden md:block" /> The Harder Delivery Gets.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-4 text-base md:text-xl font-sans font-light text-white/80 leading-relaxed">
              <p>Closing clients is hard. Keeping them is even harder.</p>
              <p>Every new client means...</p>
              
              <div className="bg-black/20 rounded-xl p-4 md:p-6 border border-white/5 backdrop-blur-sm space-y-2 text-white/50 text-sm md:text-base">
                <p>• More deliverables</p>
                <p>• More deadlines</p>
                <p>• More revisions</p>
                <p>• More people to manage</p>
                <p>• More stress</p>
              </div>
            </div>
            
            <div className="space-y-4 text-base md:text-xl font-sans font-light text-white/80 leading-relaxed flex flex-col justify-center">
              <p>Eventually your agency stops growing...</p>
              <p>Not because sales slow down. <span className="text-white">Because production can't keep up.</span></p>
              <p className="pt-6 text-xl md:text-2xl text-blue-400 font-medium tracking-tight">That's where we come in.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
