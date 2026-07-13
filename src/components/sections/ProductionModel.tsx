"use client";
import { motion } from "framer-motion";

export default function ProductionModel() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#020202] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-32 mb-24 md:mb-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-6">
                Compare outcomes, not tools
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide leading-tight mb-8">
                The Next Generation of <br className="hidden md:block" />Luxury Production
              </h2>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 flex items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-lg md:text-xl text-primary/70 leading-relaxed"
            >
              Luxury shouldn&apos;t be limited by traditional production models.
              <br /><br />
              CINROOM blends cinematic direction, CGI, and AI-assisted production into a modern workflow that allows ambitious jewelry brands to launch premium campaigns faster and more frequently&mdash;without compromising visual standards.
            </motion.p>
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full border border-white/10 rounded-sm overflow-hidden bg-black/20"
        >
          <div className="grid grid-cols-2 border-b border-white/10 bg-white/5">
            <div className="p-6 md:p-8 border-r border-white/10">
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-secondary/40">Traditional Studio</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white">CINROOM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">Large production crew</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">Lean creative team</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">Overseas shoots</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">Remote-first production</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">6&ndash;10 week timeline</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">Days instead of weeks</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">One hero campaign</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">Multiple campaign assets</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">High production budgets</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">More efficient investment</span>
            </div>
          </div>

          <div className="grid grid-cols-2 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 md:p-8 border-r border-white/5">
              <span className="font-serif text-lg md:text-xl text-primary/60">Limited content output</span>
            </div>
            <div className="p-6 md:p-8">
              <span className="font-serif text-lg md:text-xl text-white">High-volume launch content</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
