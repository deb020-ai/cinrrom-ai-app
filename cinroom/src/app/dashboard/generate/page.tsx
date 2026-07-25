"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, Smartphone, Square, Wand2, Settings2, Video, Image as ImageIcon, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function GenerateSettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preset = searchParams.get("preset");

  const [assetType, setAssetType] = useState<"COMMERCIAL_VIDEO" | "PERFORMANCE_CREATIVE">("COMMERCIAL_VIDEO");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("10s");
  const [resolution, setResolution] = useState("4K");
  const [motionSpeed, setMotionSpeed] = useState("Slow & Elegant");
  const [background, setBackground] = useState("Obsidian Studio Mirror");

  const creditCost = assetType === "COMMERCIAL_VIDEO" ? 3 : 0.2;

  const handleGenerate = () => {
    toast.success(`Initializing Atelier Rendering Engine (${creditCost} Credits)...`);
    setTimeout(() => {
      router.push(`/dashboard/render?type=${assetType}&cost=${creditCost}`);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/80 mb-1 block">
            // CINROOM STUDIO ENGINE
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Configure Commercial Asset</h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Fine-tune camera motion, lighting, and output parameters for your luxury campaign.
          </p>
        </div>

        {preset && (
          <div className="px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono">
            Preset Loaded: <span className="font-semibold">{preset}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Asset Type & Credit Summary */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Asset Type Selector */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Asset Format</label>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setAssetType("COMMERCIAL_VIDEO")}
                className={`p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                  assetType === "COMMERCIAL_VIDEO"
                    ? "bg-amber-400/10 border-amber-200/50 text-white shadow-[0_0_20px_rgba(197,168,128,0.15)]"
                    : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-amber-200" />
                  <div>
                    <div className="text-xs font-mono font-medium">Commercial Video</div>
                    <div className="text-[10px] font-mono text-neutral-500">4K Motion Rig</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-200 font-bold">3 Credits</span>
              </button>

              <button
                onClick={() => setAssetType("PERFORMANCE_CREATIVE")}
                className={`p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                  assetType === "PERFORMANCE_CREATIVE"
                    ? "bg-amber-400/10 border-amber-200/50 text-white shadow-[0_0_20px_rgba(197,168,128,0.15)]"
                    : "bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-amber-200" />
                  <div>
                    <div className="text-xs font-mono font-medium">Performance Creative</div>
                    <div className="text-[10px] font-mono text-neutral-500">High-Res Meta Ad Image</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-200 font-bold">0.2 Credits</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Container */}
          <div className="aspect-[16/9] bg-neutral-950 rounded-xl overflow-hidden relative border border-white/10 flex items-center justify-center">
            <img
              src="/hero-ring.png"
              alt="Asset Preview"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-[10px] font-mono text-amber-200 bg-black/70 px-3 py-1 rounded-full border border-white/10">
                Preview Frame • {aspectRatio} • {resolution}
              </span>
            </div>
          </div>
          
          {/* Credit Cost Summary Card */}
          <div className="glass-panel p-5 rounded-xl border border-amber-200/20 bg-amber-500/[0.02]">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-neutral-400">Production Cost:</span>
              <span className="text-amber-200 font-bold text-sm">{creditCost} Credits</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-500">
              Deducted automatically from your Atelier Credit Wallet upon rendering.
            </p>
          </div>

        </div>

        {/* Right Column: Settings */}
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-panel border-white/10 bg-[#08080a] p-6 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-white/[0.06]">
              <CardTitle className="text-xl font-light text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-amber-200" />
                Render Configuration
              </CardTitle>
              <CardDescription className="text-xs text-neutral-400 font-light">
                Select aspect ratios, duration, and camera lighting setups.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 pt-6 space-y-6">
              
              {/* Aspect Ratio */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "16:9", icon: Monitor, label: "Landscape (16:9)" },
                    { id: "9:16", icon: Smartphone, label: "Reels / TikTok (9:16)" },
                    { id: "1:1", icon: Square, label: "Square (1:1)" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setAspectRatio(option.id)}
                      className={`flex flex-col items-center justify-center py-3.5 rounded-xl border font-mono transition-all ${
                        aspectRatio === option.id 
                          ? "border-amber-200/60 bg-amber-400/10 text-amber-200 shadow-[0_0_15px_rgba(197,168,128,0.15)]" 
                          : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <option.icon className="w-4 h-4 mb-1.5" />
                      <span className="text-xs font-semibold">{option.id}</span>
                      <span className="text-[9px] opacity-70 mt-0.5">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration (Only for Commercial Video) */}
              {assetType === "COMMERCIAL_VIDEO" && (
                <div className="space-y-3">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Duration</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["5s", "10s", "15s"].map((val) => (
                      <button
                        key={val}
                        onClick={() => setDuration(val)}
                        className={`py-2.5 rounded-xl text-xs font-mono transition-all border ${
                          duration === val 
                            ? "border-amber-200/60 bg-amber-400/10 text-amber-200" 
                            : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resolution */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Quality Resolution</label>
                <div className="grid grid-cols-2 gap-3">
                  {["1080p Full HD", "4K Ultra HD"].map((val) => (
                    <button
                      key={val}
                      onClick={() => setResolution(val)}
                      className={`py-2.5 rounded-xl text-xs font-mono transition-all border ${
                        resolution === val 
                          ? "border-amber-200/60 bg-amber-400/10 text-amber-200" 
                          : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion & Background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Camera Motion Speed</label>
                  <select 
                    value={motionSpeed}
                    onChange={(e) => setMotionSpeed(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-200/50 transition-colors"
                  >
                    <option value="Slow & Elegant">Slow & Elegant (Orbital)</option>
                    <option value="Medium">Medium Cinematic Pan</option>
                    <option value="Fast & Dynamic">Fast & Dynamic Reveal</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Studio Background Rig</label>
                  <select 
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-200/50 transition-colors"
                  >
                    <option value="Obsidian Studio Mirror">Obsidian Studio Mirror</option>
                    <option value="Velvet Dark Texture">Velvet Dark Texture</option>
                    <option value="Champagne Warm Gold">Champagne Warm Gold</option>
                    <option value="Minimal Pure White">Minimal Pure White</option>
                  </select>
                </div>
              </div>

            </CardContent>
          </Card>

          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleGenerate}
              className="w-full h-12 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] cursor-pointer"
            >
              Generate Commercial Asset ({creditCost} Credits)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
