"use client";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Luxury Visuals",
    desc: "Without luxury production timelines."
  },
  {
    title: "Hollywood Mindset",
    desc: "Built on a foundation of cinematic production standards."
  },
  {
    title: "Creative Direction First",
    desc: "Expert art direction applied before any AI generation begins."
  },
  {
    title: "Jewelry Exclusive",
    desc: "Built specifically for premium jewelry brands."
  }
];

export default function JewelryWhyUs() {
  return (
    <section className="py-16 md:py-24 bg-[#02050a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-24">
          <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-white/40 mb-4 font-bold">
            Why Brands Choose CINROOM
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight max-w-2xl mx-auto">
            Every campaign is designed to make your brand feel more premium.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-4 items-center text-center p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-serif text-xl mb-2">
                0{idx + 1}
              </div>
              <h4 className="text-xl font-serif text-white/90">
                {reason.title}
              </h4>
              <p className="text-sm font-sans text-white/50 leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
