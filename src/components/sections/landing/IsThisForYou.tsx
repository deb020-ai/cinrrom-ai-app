"use client";
import { motion, Variants } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const checks = [
  "Launching a new collection.",
  "Need premium videos for Meta Ads.",
  "Want luxury visuals without traditional production costs.",
  "Need content for Instagram, website and paid campaigns.",
  "Want premium quality delivered faster."
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function IsThisForYou() {
  return (
    <section className="px-6 py-12 md:py-20 bg-[#071220]">
      <div className="max-w-[800px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start">
        
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
            Is CINROOM Right For Your Brand?
          </h2>
        </div>

        <div className="flex-[1.5] w-full flex flex-col gap-10">
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            {checks.map((text, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="mt-1 bg-white/10 p-1.5 rounded-full shrink-0">
                  <Check size={14} className="text-white" />
                </div>
                <span className="text-lg md:text-xl font-serif text-white/90 leading-relaxed">
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-10 border-t border-white/10 w-full flex justify-center md:justify-start"
          >
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 bg-white/5 border border-white/20 text-white px-10 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-500 w-full sm:w-auto"
            >
              Book Strategy Call <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
