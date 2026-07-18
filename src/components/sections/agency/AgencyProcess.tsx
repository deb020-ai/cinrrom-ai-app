export default function AgencyProcess() {
  const steps = [
    { number: "01", text: "Agency receives client brief." },
    { number: "02", text: "Send us assets." },
    { number: "03", text: "We create premium campaign creatives." },
    { number: "04", text: "You review." },
    { number: "05", text: "Your client thinks your agency built everything." }
  ];

  return (
    <section id="process" className="py-16 md:py-32 bg-[#02050a] border-t border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            The White-Label Process.
          </h2>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-8 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-4 md:gap-8 w-full p-4 md:p-8 border border-white/10 rounded-xl md:rounded-2xl bg-white/[0.02]">
                <span className="text-2xl md:text-4xl font-serif text-white/20">{step.number}</span>
                <span className="text-sm md:text-lg font-sans text-white/90">{step.text}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-[1px] h-6 md:h-12 bg-white/20 my-2 md:my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
