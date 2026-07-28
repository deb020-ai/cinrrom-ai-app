"use client";

import { Download, Share2, Sparkles, Settings2, History, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const genId = searchParams.get("id");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecord() {
      if (!genId) {
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("generation_history")
          .select("output_url")
          .eq("id", genId)
          .single();

        if (data?.output_url) {
          setVideoUrl(data.output_url);
        }
      } catch (err) {
        console.error("Error fetching render record:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecord();
  }, [genId]);

  const handleDownload = () => {
    const targetUrl = videoUrl || "/hero-ring.png";
    const link = document.createElement("a");
    link.href = targetUrl;
    link.download = `Cinroom_Commercial_${genId || Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading Full HD Commercial MP4...");
  };

  const handleCopyLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied secure share link to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 mb-3">
            <CheckCircle2 className="w-3 h-3" />
            <span>RENDER MASTER COMPLETE — FULL HD</span>
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">Luxury Jewelry Commercial Render</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/history">
            <Button variant="outline" className="h-10 px-4 text-xs font-mono tracking-wider uppercase border-white/10 text-neutral-300 hover:bg-white/5">
              <History className="w-3.5 h-3.5 mr-2" />
              Vault History
            </Button>
          </Link>
          <Link href="/dashboard/generate">
            <Button className="h-10 px-5 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_20px_rgba(197,168,128,0.25)] rounded-full">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Generate Next Commercial
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl overflow-hidden gold-border-glow shadow-[0_30px_100px_rgba(0,0,0,0.9)] bg-black relative">
            <div className="aspect-[16/9] w-full flex items-center justify-center relative group">
              {/* Media preview / Video element */}
              {videoUrl && videoUrl.endsWith(".mp4") ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={videoUrl || "/hero-ring.png"}
                  alt="Rendered Jewelry Commercial Master"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Bottom Scrubber HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono z-10">
                <div className="flex items-center gap-3 flex-1 mr-4">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> FULL HD READY
                  </span>
                </div>
                <span className="text-amber-200 font-semibold">1920x1080 • FULL HD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export & Actions Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              EXPORT COMMERCIAL MASTER
            </span>

            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full h-12 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black hover:opacity-95 justify-start rounded-xl font-semibold shadow-[0_0_20px_rgba(197,168,128,0.2)] cursor-pointer"
            >
              <Download className="w-4 h-4 mr-3" />
              Download MP4 (Full HD)
            </Button>

            <div className="h-px w-full bg-white/[0.06] my-2" />

            <Button
              onClick={handleCopyLink}
              size="lg"
              variant="outline"
              className="w-full h-12 text-xs font-mono tracking-wider uppercase border-white/10 text-white hover:bg-white/5 justify-start rounded-xl cursor-pointer"
            >
              <Share2 className="w-4 h-4 mr-3" />
              Copy Secure Share Link
            </Button>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              CAMPAIGN ACTIONS
            </span>

            <Link href="/dashboard/generate" className="block">
              <Button size="lg" variant="secondary" className="w-full h-11 text-xs font-mono tracking-wider uppercase bg-white/[0.04] text-neutral-200 hover:bg-white/[0.08] justify-start rounded-xl border border-white/10">
                <Settings2 className="w-4 h-4 mr-3 text-amber-200" />
                Configure New Workflow
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
