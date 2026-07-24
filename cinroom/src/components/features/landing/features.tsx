"use client";

import { motion } from "framer-motion";
import { Gem, Aperture, Layers, Sparkles, ShieldCheck, Cpu } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Spectral Caustics",
    description: "Physically accurate light refractions through diamonds and colored gemstones based on real refractive indices.",
    icon: Gem,
  },
  {
    number: "02",
    title: "Single Photo Geometry",
    description: "No 3D models or CAD files required. Reconstructs depth and surface curvature directly from a single 2D image.",
    icon: Aperture,
  },
  {
    number: "03",
    title: "Cinematic Lighting Rigs",
    description: "Preset lighting setups tailored specifically for jewelry: Obsidian Dark, Warm Studio, Golden Hour, and High Contrast.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Multi-Format Export",
    description: "Render instantly in 9:16 vertical for TikTok & Reels, 1:1 for Instagram feeds, or 16:9 for YouTube and desktop digital billboards.",
    icon: Layers,
  },
  {
    number: "05",
    title: "Proprietary Model Security",
    description: "Your unreleased high-jewelry designs remain confidential. End-to-end encrypted rendering pipeline.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Sub-2-Minute Rendering",
    description: "High-throughput GPU cluster delivers final 4K video exports in under 120 seconds.",
    icon: Cpu,
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="py-28 relative z-20 bg-[#050505]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-white/[0.06] pb-10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-3 block">
              // ATELIER ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Engineered for <span className="gold-text-gradient font-normal italic">Extreme Precision</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Standard video AI distorts metal surfaces and misses gem refractions. Cinroom is custom-trained strictly on fine jewelry optics.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between min-h-[260px] group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest text-amber-200/50 group-hover:text-amber-200 transition-colors">
                    {feature.number}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-amber-200/30 group-hover:bg-amber-400/10 transition-colors">
                    <feature.icon className="w-4 h-4 text-neutral-300 group-hover:text-amber-200 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-amber-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
