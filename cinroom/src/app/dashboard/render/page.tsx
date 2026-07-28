"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Diamond, Cpu, AlertTriangle, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const renderPhases = [
  { step: "01", title: "GEOMETRIC ANALYSIS", desc: "Locking Gemstone & Metal Facet Coordinates..." },
  { step: "02", title: "OPTIC RAY-TRACING", desc: "Calculating Gem Refractive Index & Caustics..." },
  { step: "03", title: "ATELIER LIGHTING RIG", desc: "Synthesizing Obsidian Studio Reflection Maps..." },
  { step: "04", title: "DISPERSION SIMULATION", desc: "Rendering Spectral Diamond Fire & Shimmer..." },
  { step: "05", title: "FRAME SYNTHESIS", desc: "Compiling 1080p Full HD Commercial Video..." },
  { step: "06", title: "MASTER ENCODING", desc: "Finalizing Cloudflare R2 Studio Vault Delivery..." },
];

export default function RenderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genId = searchParams.get("id");
  const mode = searchParams.get("mode");

  const [progress, setProgress] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [status, setStatus] = useState<"PROCESSING" | "COMPLETED" | "FAILED">("PROCESSING");
  const [friendlyErrorMessage, setFriendlyErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!genId) return;

    let isSubscribed = true;

    // 1. Start progress animation UI
    const totalDuration = 8000;
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (status === "FAILED") {
          clearInterval(timer);
          return prev;
        }
        const next = prev + increment;
        if (next >= 95) {
          return 95; // Hold at 95% until API confirms COMPLETED
        }

        const phaseIdx = Math.floor((next / 100) * renderPhases.length);
        if (phaseIdx < renderPhases.length) {
          setCurrentPhaseIndex(phaseIdx);
        }

        return next;
      });
    }, intervalTime);

    // 2. Call backend process API to execute generation & failure/refund handling
    async function processGeneration() {
      try {
        const res = await fetch("/api/render/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ genId }),
        });

        const data = await res.json();

        if (!isSubscribed) return;

        if (data.success && data.status === "COMPLETED") {
          setProgress(100);
          setStatus("COMPLETED");
          toast.success("Full HD Commercial Rendered Successfully!");
          setTimeout(() => {
            router.push(`/dashboard/result?id=${genId}`);
          }, 500);
        } else {
          setStatus("FAILED");
          setFriendlyErrorMessage(
            data.message ||
              "Video generation failed. Your credits have been refunded automatically. This can occasionally happen due to temporary AI provider issues or safety filters. Please try again."
          );
          toast.error("Generation failed. Credits refunded automatically.");
        }
      } catch (err) {
        if (!isSubscribed) return;
        setStatus("FAILED");
        setFriendlyErrorMessage(
          "Video generation failed. Your credits have been refunded automatically. This can occasionally happen due to temporary AI provider issues or safety filters. Please try again."
        );
      }
    }

    processGeneration();

    // 3. Supabase Realtime Subscription for instant real-time status updates
    const supabase = createClient();
    const channel = supabase
      .channel(`generation-${genId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "generation_history",
          filter: `id=eq.${genId}`,
        },
        (payload) => {
          const newStatus = payload.new?.status;
          if (newStatus === "COMPLETED") {
            setProgress(100);
            setStatus("COMPLETED");
            setTimeout(() => {
              router.push(`/dashboard/result?id=${genId}`);
            }, 500);
          } else if (newStatus === "FAILED") {
            setStatus("FAILED");
            setFriendlyErrorMessage(
              "Video generation failed. Your credits have been refunded automatically. This can occasionally happen due to temporary AI provider issues or safety filters. Please try again."
            );
          }
        }
      )
      .subscribe();

    return () => {
      isSubscribed = false;
      clearInterval(timer);
      supabase.removeChannel(channel);
    };
  }, [genId, router, status]);

  const currentPhase = renderPhases[currentPhaseIndex] || renderPhases[0];

  return (
    <div className="max-w-4xl mx-auto min-h-[75vh] flex flex-col items-center justify-center animate-in fade-in duration-700 pb-16">
      {status === "FAILED" ? (
        /* FAILURE & REFUND STATE UI */
        <div className="w-full max-w-lg space-y-6 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-sans text-red-400 uppercase tracking-[0.25em] block">
              STATUS: GENERATION FAILED
            </span>
            <h1 className="text-3xl font-serif text-white">Video Generation Unsuccessful</h1>
          </div>

          <div className="p-6 rounded-2xl glass-panel bg-red-950/20 border border-red-500/30 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-sans text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CREDITS REFUNDED AUTOMATICALLY</span>
            </div>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {friendlyErrorMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => router.push(`/dashboard/generate${mode ? `?mode=${mode}` : ""}`)}
              className="w-full h-12 text-xs font-sans tracking-widest uppercase bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 cursor-pointer flex items-center justify-center gap-2 border border-amber-200/30"
            >
              <RotateCcw className="w-4 h-4" /> Try Again (Retry Generation)
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full sm:w-auto h-12 px-6 text-xs font-sans tracking-wider uppercase border-white/10 text-neutral-300 hover:bg-white/5 rounded-xl cursor-pointer"
            >
              Back to Studio
            </Button>
          </div>
        </div>
      ) : (
        /* DYNAMIC REVEAL MECHANISM RENDER UI */
        <>
          <div className="relative w-full max-w-lg aspect-[16/9] rounded-2xl glass-panel gold-border-glow p-2 overflow-hidden mb-10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex items-center justify-center bg-[#060608]">
            <img
              src="/hero-ring.png"
              alt="Rendering Preview"
              className="w-full h-full object-cover opacity-30 blur-sm scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-44 h-44 border border-amber-200/20 rounded-full border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-56 h-56 border border-white/5 rounded-full"
              />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 to-white/10 border border-amber-200/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(197,168,128,0.2)]">
                <Diamond className="w-7 h-7 text-amber-200 animate-pulse" />
              </div>
            </div>

            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent shadow-[0_0_15px_rgba(197,168,128,0.8)]"
            />

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-[9px] font-mono text-amber-200 flex items-center gap-1.5 border border-amber-200/20">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>ATELIER GPU ENGINE // FULL HD 1080p SYNTHESIS</span>
            </div>
          </div>

          <div className="w-full max-w-xl space-y-6 text-center">
            {/* DYNAMIC REVEAL PHASE TEXT */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-200 uppercase tracking-[0.2em] block">
                PHASE {currentPhase.step} // {currentPhase.title}
              </span>
              <h2 className="text-lg font-serif text-white">
                {currentPhase.desc}
              </h2>
            </div>

            {/* PROGRESS BAR */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400/80 via-amber-200 to-amber-100 rounded-full relative"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 px-1">
              <span>{Math.round(progress)}% PROCESSED</span>
              <span>ESTIMATED TIME: {Math.max(0, Math.ceil((100 - progress) / 12))}s</span>
            </div>
          </div>

          <div className="mt-10">
            <Button
              variant="outline"
              className="h-9 px-6 rounded-full text-xs font-sans tracking-wider uppercase border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => router.push("/dashboard/generate")}
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Cancel Render Pipeline
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
