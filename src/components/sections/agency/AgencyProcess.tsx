export default function AgencyProcess() {
  const steps = [
    { number: "01", text: "You close the client." },
    { number: "02", text: "You send us the brief." },
    { number: "03", text: "We produce." },
    { number: "04", text: "You review." },
    { number: "05", text: "Your client is happy." }
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-[#050914] border-t border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Process
          </h2>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-6 md:gap-8 w-full p-6 md:p-10 border border-white/10 rounded-xl md:rounded-2xl bg-[#02050a] shadow-lg">
                <span className="text-2xl md:text-4xl font-serif text-white/30 font-light">{step.number}</span>
                <span className="text-lg md:text-2xl font-sans text-white/90 font-light">{step.text}</span>
              </div>
              {index === steps.length - 1 && (
                <div className="mt-8">
                  <span className="text-xl md:text-3xl font-serif text-blue-400 italic">Repeat.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
