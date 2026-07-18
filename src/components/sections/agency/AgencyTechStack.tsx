export default function AgencyTechStack() {
  const tools = [
    "ComfyUI", "Flux", "Kling", "Veo", "Midjourney", "DaVinci Resolve", "Cinema 4D", "Blender", "Unreal Engine", "Nuke", "Adobe Creative Cloud"
  ];

  return (
    <section className="py-12 border-b border-white/5 bg-[#02050a] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center text-sm font-sans tracking-widest text-white/40 uppercase mb-8">
          The Production Ecosystem We're Fluent In
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12 opacity-50">
          {tools.map((tool, index) => (
            <span key={index} className="text-xl md:text-2xl font-serif text-white whitespace-nowrap">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
