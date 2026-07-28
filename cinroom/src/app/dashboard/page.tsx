import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Video, Camera, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/80 mb-2 block">
            // CINROOM STUDIO ATELIER
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Jewelry AI Studio Launchpad</h1>
        </div>
        <p className="text-xs text-neutral-400 font-mono">
          GPU ENGINE: ONLINE • STRICT PRODUCT INTEGRITY GUARANTEED
        </p>
      </div>

      {/* STUDIO LAUNCHPAD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Studio Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-amber-200/40 bg-white/[0.02] transition-all flex flex-col justify-between group space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-200/30 flex items-center justify-center text-amber-200 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest block mb-1">
                SEADANCE 2 ENGINE • 3 CREDITS
              </span>
              <h2 className="text-2xl font-light text-white font-serif mb-2">Jewelry Video Generator</h2>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Create luxury cinematic 4K commercial videos featuring 5 dedicated workflow modes (Product Hero, Model Campaign, Fantasy World, Animal Campaign, AI Director).
              </p>
            </div>
          </div>

          <Link href="/dashboard/generate" className="block">
            <Button className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.2)] group-hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] cursor-pointer">
              Launch Video Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Image Studio Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-amber-200/40 bg-white/[0.02] transition-all flex flex-col justify-between group space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-200/30 flex items-center justify-center text-amber-200 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest block mb-1">
                GPT IMAGE 2 ENGINE • 1 CREDIT
              </span>
              <h2 className="text-2xl font-light text-white font-serif mb-2">Jewelry Image Generator</h2>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Render high-fashion Vogue editorial photography campaigns. 5 dedicated modes using GPT Image 2 API while preserving your jewelry 100% exactly.
              </p>
            </div>
          </div>

          <Link href="/dashboard/generate-image" className="block">
            <Button className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-white text-black hover:bg-neutral-200 font-semibold rounded-xl cursor-pointer">
              Launch Image Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Global Preservation Assurance */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.01] flex items-center gap-4 text-xs font-mono text-neutral-300">
        <ShieldCheck className="w-6 h-6 text-amber-200 shrink-0" />
        <div>
          <span className="text-amber-200 font-bold block mb-0.5">Strict Single Source of Truth Guarantee</span>
          <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
            All Video & Image campaigns preserve your uploaded jewelry exactly with 0 redesigns, 0 extra stones, and 0 structural alterations.
          </p>
        </div>
      </div>
    </div>
  );
}
