import { UploadCard } from "@/components/features/dashboard/upload-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-2 block">
            // CINROOM STUDIO SESSION
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Create Studio Campaign</h1>
        </div>
        <p className="text-xs text-neutral-400 font-mono">
          SESSION ID: #SR-9842 • QUEUE STATUS: ONLINE (4K HIGH GPU)
        </p>
      </div>

      {/* Upload Card */}
      <UploadCard />

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-xs font-mono text-neutral-500">
          * High-resolution image recommended for optimal gem reflectivity estimation.
        </p>
        <Link href="/dashboard/templates">
          <Button 
            size="lg" 
            className="h-12 px-8 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-full"
          >
            Configure Lighting & Presets
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
