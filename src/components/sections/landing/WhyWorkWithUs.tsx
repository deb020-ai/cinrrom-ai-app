"use client";
import { motion, Variants } from "framer-motion";

const points = [
  {
    title: "Hollywood Creative Direction",
    desc: "Cinematic vision built by industry veterans."
  },
  {
    title: "Next-Generation AI Production",
    desc: "High-end visual fidelity without the heavy equipment."
  },
  {
    title: "Luxury Visual Storytelling",
    desc: "Aesthetic mastery designed for premium jewelry."
  },
  {
    title: "Campaigns Delivered In Days",
    desc: "Go from concept to launch faster than ever."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WhyWorkWithUs() {
  return (
    <section className="px-6 py-12 md:py-20 bg-[#050d18] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-6">
            Why Modern Lab-Grown Brands Work With CINROOM
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {points.map((point, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="p-8 md:p-10 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors duration-500 backdrop-blur-sm flex flex-col gap-4"
            >
              <h3 className="text-xl md:text-2xl font-serif text-white/90 leading-snug">
                {point.title}
              </h3>
              <p className="text-sm md:text-base font-sans text-white/50 leading-relaxed font-light mt-auto">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
