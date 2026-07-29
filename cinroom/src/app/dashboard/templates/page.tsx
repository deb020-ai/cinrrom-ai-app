"use client";

import Link from "next/link";
import { Sparkles, UserCheck, Wand2, PawPrint, Clapperboard, ArrowRight, Video, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GENERATION_MODES, GenerationModeId } from "@/lib/modes";

export default function ModesPage() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-200" />;
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-amber-200" />;
      case "Wand2":
        return <Wand2 className="w-6 h-6 text-amber-200" />;
      case "PawPrint":
        return <PawPrint className="w-6 h-6 text-amber-200" />;
      case "Clapperboard":
        return <Clapperboard className="w-6 h-6 text-amber-200" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-200" />;
    }
  };

  const modePreviews: Record<GenerationModeId, string> = {
    product_hero: "/hero-ring.png",
    model_campaign: "/emerald-necklace.png",
    fantasy_world: "/gold-bracelet.png",
    outdoor_campaign: "/gold-bracelet.png",
    animal_campaign: "/hero-ring.png",
    ai_director: "/emerald-necklace.png",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-2 block flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" /> CINROOM STUDIO ENGINE
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">5 Video Generation Modes</h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Choose a mode tailored to your luxury campaign workflow. Each mode presents only its required inputs while using a dedicated master prompt internally.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono shrink-0 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-200" />
          5 Active Commercial Workflows
        </div>
      </div>

      {/* Grid of 5 Generation Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GENERATION_MODES.map((mode) => (
          <div
            key={mode.id}
            className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden hover:border-amber-200/40 transition-all duration-300 group flex flex-col justify-between bg-[#08080a]"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video overflow-hidden bg-neutral-950">
              <img
                src={modePreviews[mode.id]}
                alt={mode.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-90" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-200 font-mono text-[9px] uppercase tracking-wider">
                  {mode.badge}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                  {renderIcon(mode.iconName)}
                </div>
              </div>
            </div>

            {/* Mode Content & Specs */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-light text-white mb-2">{mode.title}</h3>
                <p className="text-xs text-neutral-400 font-light mb-4 leading-relaxed">
                  {mode.description}
                </p>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-[10px] font-mono text-neutral-400">
                  <span className="text-amber-200 font-semibold block mb-0.5">// Tagline</span>
                  {mode.tagline}
                </div>
              </div>

              <Link href={`/dashboard/generate?mode=${mode.id}`}>
                <Button className="w-full h-11 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(197,168,128,0.2)] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] transition-all cursor-pointer">
                  Launch {mode.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
