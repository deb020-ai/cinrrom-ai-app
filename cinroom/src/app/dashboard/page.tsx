import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Camera, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-blue-500/15 pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-300 mb-2 block">
            // CINROOM STUDIO ATELIER
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Jewelry AI Studio Launchpad</h1>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          GPU ENGINE: ONLINE • STRICT PRODUCT INTEGRITY GUARANTEED
        </p>
      </div>

      {/* STUDIO LAUNCHPAD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Studio Card */}
        <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 hover:border-blue-400/50 bg-[#090e24]/70 transition-all flex flex-col justify-between group space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block mb-1">
                SEADANCE 2 ENGINE • 3 CREDITS
              </span>
              <h2 className="text-2xl font-light text-white font-serif mb-2">Jewelry Video Generator</h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Create luxury cinematic Full HD commercial videos featuring 5 dedicated workflow modes (Product Hero, Model Campaign, Fantasy World, Animal Campaign, AI Director).
              </p>
            </div>
          </div>

          <Link href="/dashboard/generate" className="block">
            <Button className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] cursor-pointer">
              Launch Video Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Image Studio Card */}
        <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 hover:border-blue-400/50 bg-[#090e24]/70 transition-all flex flex-col justify-between group space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block mb-1">
                GPT IMAGE 2 ENGINE • 1 CREDIT
              </span>
              <h2 className="text-2xl font-light text-white font-serif mb-2">Jewelry Image Generator</h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Render high-fashion Vogue editorial photography campaigns. 5 dedicated modes using GPT Image 2 API while preserving your jewelry 100% exactly.
              </p>
            </div>
          </div>

          <Link href="/dashboard/generate-image" className="block">
            <Button className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-xl cursor-pointer">
              Launch Image Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Global Preservation Assurance */}
      <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-blue-950/20 flex items-center gap-4 text-xs font-mono text-slate-200">
        <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
        <div>
          <span className="text-blue-300 font-bold block mb-0.5">Strict Single Source of Truth Guarantee</span>
          <p className="text-[11px] text-slate-300 font-light leading-relaxed">
            All Video & Image campaigns preserve your uploaded jewelry exactly with 0 redesigns, 0 extra stones, and 0 structural alterations.
          </p>
        </div>
      </div>
    </div>
  );
}
