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

    <section className="py-16 md:py-24 bg-black border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-12">
          Why Agencies Work With Us
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-3 p-4 md:p-5 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-all">
              <CheckCircle2 size={16} className="text-[#25D366] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base font-sans text-white/80 font-light leading-snug">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
