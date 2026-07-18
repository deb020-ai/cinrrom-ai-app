export default function AgencyCapacity() {
  return (
    <section className="py-16 md:py-24 bg-[#050914] border-b border-white/5">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-12">
          Capacity
        </h2>
        
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between p-6 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="text-lg md:text-xl font-sans text-white/80">Need 5 videos?</span>
            <span className="text-[#25D366] text-xl font-bold">✓</span>
          </div>
          <div className="flex items-center justify-between p-6 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="text-lg md:text-xl font-sans text-white/80">Need 25?</span>
            <span className="text-[#25D366] text-xl font-bold">✓</span>
          </div>
          <div className="flex items-center justify-between p-6 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <span className="text-lg md:text-xl font-sans text-white font-medium">Need 100?</span>
            <span className="text-blue-400 font-medium italic">Let's build a dedicated workflow.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
