import { CheckCircle2 } from "lucide-react";

export default function AgencyWhyUs() {
  const reasons = [
    "Hollywood production experience.",
    "Fast turnaround.",
    "100% White-label.",
    "Flexible capacity.",
    "No long-term hiring.",
    "Built specifically for agencies.",
    "Simple communication.",
    "Reliable quality."
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050914] border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-16">
          Why Agencies Work With Us
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2 size={20} className="text-[#25D366] flex-shrink-0 mt-1" />
              <span className="text-base md:text-lg font-sans text-white/80 font-light leading-snug">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
