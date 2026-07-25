import Link from "next/link";
import { Sparkles, Video, ArrowRight, Play, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ReferenceRig {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  aspectRatio: string;
  previewImage: string;
  cameraMotion: string;
  lightingStyle: string;
}

const referenceRigs: ReferenceRig[] = [
  {
    id: "obsidian-360-orbit",
    title: "Obsidian 360 Orbit",
    category: "HIGH JEWELRY",
    description: "Slow 360-degree orbital camera turn on polished obsidian mirror glass with diamond caustics.",
    duration: "10s",
    aspectRatio: "16:9",
    previewImage: "/hero-ring.png",
    cameraMotion: "360 Smooth Orbit",
    lightingStyle: "Direct Diamond Spotlight",
  },
  {
    id: "museum-emerald-reveal",
    title: "Museum Emerald Reveal",
    category: "COLLECTION LAUNCH",
    description: "Directional spotlight sweeping across platinum prongs and rich green emerald facets.",
    duration: "15s",
    aspectRatio: "16:9",
    previewImage: "/emerald-necklace.png",
    cameraMotion: "Linear Slow Push-In",
    lightingStyle: "Ray-Traced Volumetric Sweep",
  },
  {
    id: "18k-gold-velvet-macro",
    title: "18K Gold Velvet Macro",
    category: "SOCIAL REELS",
    description: "Ultra close-up macro tracking shot traversing textured gold surfaces with diamond highlights.",
    duration: "10s",
    aspectRatio: "9:16",
    previewImage: "/gold-bracelet.png",
    cameraMotion: "Macro Surface Tracking",
    lightingStyle: "Warm Champagne Diffused Studio",
  },
  {
    id: "floating-solitaire-caustics",
    title: "Floating Solitaire Caustics",
    category: "EDITORIAL AD",
    description: "Floating diamond in weightless mid-air with abstract ray-traced bokeh light reflections.",
    duration: "10s",
    aspectRatio: "1:1",
    previewImage: "/hero-ring.png",
    cameraMotion: "Weightless 3D Float",
    lightingStyle: "Prism Refraction Flares",
  },
  {
    id: "warm-champagne-atelier",
    title: "Warm Champagne Atelier",
    category: "WARM STUDIO",
    description: "Soft warm golden studio lighting highlighting rich warm tones and yellow diamonds.",
    duration: "15s",
    aspectRatio: "16:9",
    previewImage: "/gold-bracelet.png",
    cameraMotion: "Gentle Crane Arc",
    lightingStyle: "Soft Softbox Glow",
  },
  {
    id: "midnight-monochrome-minimal",
    title: "Midnight Monochrome Minimal",
    category: "LUXURY AD",
    description: "Stark, high-contrast monochrome lighting emphasizing extreme metal purity and reflections.",
    duration: "5s",
    aspectRatio: "9:16",
    previewImage: "/emerald-necklace.png",
    cameraMotion: "Snap Zoom Reveal",
    lightingStyle: "High-ContrastRim Light",
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-2 block flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" /> CINROOM REFERENCE VAULT
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Curated Commercial References</h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Explore high-converting reference camera movements and studio lighting rigs curated by Cinroom directors.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono shrink-0">
          6 Active Commercial Rigs
        </div>
      </div>

      {/* Grid of Reference Commercial Rigs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {referenceRigs.map((rig) => (
          <div
            key={rig.id}
            className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden hover:border-amber-200/40 transition-all duration-300 group flex flex-col justify-between bg-[#08080a]"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video overflow-hidden bg-neutral-950">
              <img
                src={rig.previewImage}
                alt={rig.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-200 font-mono text-[9px] uppercase tracking-wider">
                  {rig.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[10px] text-neutral-300 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                <Video className="w-3 h-3 text-amber-200" />
                <span>{rig.duration} • {rig.aspectRatio}</span>
              </div>
            </div>

            {/* Rig Specs & Copy */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-light text-white mb-2">{rig.title}</h3>
                <p className="text-xs text-neutral-400 font-light mb-4 line-clamp-2 leading-relaxed">{rig.description}</p>
                
                <div className="space-y-2 mb-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Camera Motion:</span>
                    <span className="text-white">{rig.cameraMotion}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Lighting Setup:</span>
                    <span className="text-amber-200">{rig.lightingStyle}</span>
                  </div>
                </div>
              </div>

              <Link href={`/dashboard/generate?preset=${rig.id}`}>
                <Button className="w-full h-11 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(197,168,128,0.2)] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] transition-all cursor-pointer">
                  Use as Reference Rig
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
