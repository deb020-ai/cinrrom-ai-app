export default function AgencyProcess() {
  const steps = [
    { number: "01", text: "You close the client." },
    { number: "02", text: "You send us the brief." },
    { number: "03", text: "We produce." },
    { number: "04", text: "You review." },
    { number: "05", text: "Your client is happy." }
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-[#02050a] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Process
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col p-5 md:p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl relative overflow-hidden">
              <span className="text-3xl font-serif text-white/10 font-bold mb-4 absolute top-2 right-4">{step.number}</span>
              <span className="text-sm md:text-base font-sans text-white/90 font-medium z-10">{step.text}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <span className="text-xl md:text-3xl font-serif text-blue-400 italic">Repeat.</span>
        </div>
      </div>
    </section>
  );
}
