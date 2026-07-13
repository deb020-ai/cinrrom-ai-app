"use client";
import { motion } from "framer-motion";

const valueProps = [
  "Launch campaigns in days instead of months.",
  "Premium visuals without large production crews.",
  "No expensive overseas photoshoots required.",
  "Museum-quality creative at a fraction of traditional costs.",
  "Scalable content for every collection launch."
];

export default function Why() {
  return (
    <section className="py-24 md:py-48 bg-background border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-6">
              The Advantage
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide leading-tight">
              Why Luxury Brands <br />
              Choose CINROOM
            </h2>
            <p className="mt-8 text-primary/60 font-serif text-lg max-w-sm leading-relaxed">
              We do not just create art. We engineer high-converting visual assets designed to scale premium sales.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <ul className="flex flex-col gap-10 md:gap-12">
            {valueProps.map((prop, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex gap-8 items-start group"
              >
                <span className="text-xs font-sans tracking-[0.2em] text-secondary/40 mt-2">
                  0{index + 1}
                </span>
                <span className="text-2xl md:text-4xl font-serif text-primary/80 group-hover:text-white transition-colors duration-500 leading-tight">
                  {prop}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
