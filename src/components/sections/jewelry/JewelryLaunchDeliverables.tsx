"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const deliverables = [
  "1 Premium Campaign Film",
  "4 Meta Ad Creatives",
  "Creative Direction",
  "Delivered in 48 Hours"
];

export default function JewelryLaunchDeliverables() {
  return (
    <section className="py-16 md:py-24 bg-[#050d18] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-4 font-bold">
            The Launch Kit
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Everything you need to scale.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#02050a] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Check size={20} className="text-blue-400" />
              </div>
              <p className="text-white/80 font-sans text-sm">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
