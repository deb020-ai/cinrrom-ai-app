"use client";

import { motion } from "framer-motion";
import { Play, Clock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const showcases = [
  {
    title: "Obsidian 360 Rotation",
    category: "HIGH JEWELRY SHOWCASE",
    image: "/hero-ring.png",
    duration: "10s",
    aspectRatio: "16:9",
    description: "Deep black reflective surface with 360° orbiting spotlight focusing on diamond brilliance."
  },
  {
    title: "Emerald Museum Reveal",
    category: "COLLECTION LAUNCH",
    image: "/emerald-necklace.png",
    duration: "15s",
    aspectRatio: "16:9",
    description: "Soft directional light sweeping across platinum prongs and emerald facets."
  },
  {
    title: "Velvet Gold Macro",
    category: "SOCIAL ADVERTISING",
    image: "/gold-bracelet.png",
    duration: "10s",
    aspectRatio: "9:16",
    description: "Close-up macro pan emphasizing 18K yellow gold texture and diamond accents."
  }
];

export function TemplateShowcase() {
  return (
    <section id="templates" className="py-28 relative z-20 bg-[#070709] border-t border-white/[0.06]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-3 block">
              // CINEMATIC CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Preset <span className="gold-text-gradient font-normal italic">Visual Styles</span>
            </h2>
          </div>
          <Link href="/dashboard/templates" className="inline-flex items-center text-xs font-mono tracking-wider uppercase text-amber-200 hover:text-white transition-colors group">
            <span>Browse All 24 Templates</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                      {item.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-200">
                      {item.aspectRatio}
                    </span>
                  </div>

                  {/* Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-amber-200/20 backdrop-blur-md border border-amber-200/40 flex items-center justify-center">
                      <Play className="w-5 h-5 text-amber-100 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-amber-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link href="/dashboard">
                  <button className="w-full py-2.5 rounded-xl border border-white/10 hover:border-amber-200/40 bg-white/[0.03] hover:bg-amber-400/10 text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-amber-100 transition-all">
                    Use Style Preset
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
