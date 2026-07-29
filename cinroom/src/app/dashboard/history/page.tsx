"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Film, Image as ImageIcon, Download, RotateCcw, ShieldCheck, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface GenerationItem {
  id: string;
  asset_type: string;
  credits_consumed: number;
  prompt: string;
  aspect_ratio: string;
  status: string;
  output_url: string | null;
  error_message?: string | null;
  retry_count?: number | null;
  refunded?: boolean | null;
  refund_transaction_id?: string | null;
  created_at: string;
}

export default function HistoryPage() {
  const [items, setItems] = useState<GenerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDiagnostics, setExpandedDiagnostics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchHistory() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data } = await supabase
            .from("generation_history")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

          if (data) {
            setItems(data as GenerationItem[]);
          }
        }
      } catch (err) {
        console.error("Error fetching generation history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const handleDownload = (url: string, id: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Cinroom_Commercial_${id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading Full HD Commercial...");
  };

  const toggleDiagnostics = (id: string) => {
    setExpandedDiagnostics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between border-b border-red-500/20 pb-6">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-red-400 font-semibold mb-1 block">
            CINROOM ASSET VAULT
          </span>
          <h1 className="text-3xl font-serif text-white tracking-tight">Generation History</h1>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            View, retry, and download your commercial renders stored permanently on your account.
          </p>
        </div>

        <Link href="/dashboard/generate">
          <Button className="h-10 px-5 text-xs font-sans tracking-wider uppercase bg-gradient-to-r from-red-600 to-rose-700 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:from-red-500 hover:to-rose-600 cursor-pointer border border-red-400/40">
            <Sparkles className="w-3.5 h-3.5 mr-2" /> New Render
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center font-sans text-xs text-neutral-400">
          Loading production asset vault...
        </div>
      ) : items.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-red-500/20 p-16 text-center bg-[#0d0d10] glass-panel max-w-xl mx-auto space-y-4 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif text-white">No Commercial Assets Generated Yet</h3>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            Your studio asset vault is empty. Select a video or image generation mode to render your first campaign asset.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/generate">
              <Button className="h-11 px-6 text-xs font-sans uppercase tracking-widest bg-gradient-to-r from-red-600 to-rose-700 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] cursor-pointer border border-red-400/40">
                Create First Commercial Asset
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="group bg-[#0a0a0d] border-white/10 glass-panel overflow-hidden hover:border-red-500/40 transition-all rounded-2xl flex flex-col justify-between"
            >
              <CardContent className="p-0 flex flex-col h-full justify-between">
                <div>
                  <div className="relative aspect-video bg-black border-b border-white/10 flex items-center justify-center overflow-hidden">
                    {item.output_url ? (
                      item.asset_type === "COMMERCIAL_VIDEO" ? (
                        <video src={item.output_url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img src={item.output_url} alt="Generated Creative" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="text-center p-4">
                        {item.status === "FAILED" ? (
                          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        ) : (
                          <Film className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                        )}
                        <span className="text-[10px] font-mono text-neutral-400 block">
                          {item.status === "FAILED" ? "Generation Failed" : "Rendering Asset..."}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                      {item.refunded && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[9px]">
                          REFUNDED
                        </Badge>
                      )}
                      <Badge
                        className={
                          item.status === "COMPLETED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : item.status === "RENDERING"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-red-950/60 text-red-400 border border-red-500/30"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="text-red-400 flex items-center gap-1.5 font-semibold">
                        {item.asset_type === "COMMERCIAL_VIDEO" ? <Film className="w-3.5 h-3.5 text-red-400" /> : <ImageIcon className="w-3.5 h-3.5 text-red-400" />}
                        {item.asset_type === "COMMERCIAL_VIDEO" ? "Video Commercial" : "Editorial Image"}
                      </span>
                      <span className="text-neutral-400 font-mono">{item.credits_consumed} Credits</span>
                    </div>

                    <p className="text-xs text-neutral-200 line-clamp-2 font-sans font-light leading-relaxed">
                      "{item.prompt}"
                    </p>

                    {item.status === "FAILED" && (
                      <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-[11px] font-sans text-neutral-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>CREDITS REFUNDED TO WALLET</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-light">
                          Temporary provider issue or safety filter. Your credits were credited back.
                        </p>

                        {/* Collapsible Admin Diagnostics */}
                        <button
                          type="button"
                          onClick={() => toggleDiagnostics(item.id)}
                          className="text-[9px] text-neutral-400 hover:text-red-300 flex items-center gap-1 pt-1 underline cursor-pointer"
                        >
                          <span>{expandedDiagnostics[item.id] ? "Hide Admin Diagnostics" : "Admin Diagnostics"}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {expandedDiagnostics[item.id] && (
                          <div className="pt-2 border-t border-white/10 text-[9px] font-mono space-y-1 text-neutral-300 bg-black/80 p-2 rounded">
                            <div><span className="text-neutral-500">Retries:</span> {item.retry_count || 0}</div>
                            <div><span className="text-slate-500">Refund Tx:</span> {item.refund_transaction_id || "Completed"}</div>
                            <div><span className="text-slate-500">Raw Error:</span> {item.error_message || "Provider Error"}</div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                      <span>Format: {item.aspect_ratio}</span>
                      <span>{new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  {item.output_url && item.status === "COMPLETED" && (
                    <Button
                      onClick={() => handleDownload(item.output_url!, item.id)}
                      variant="outline"
                      className="w-full h-9 text-[11px] font-sans tracking-wider uppercase border-red-500/30 hover:border-red-400/60 text-white bg-red-600/10 hover:bg-red-600/20 rounded-xl cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-2 text-red-400" />
                      Download Master Asset
                    </Button>
                  )}

                  {item.status === "FAILED" && (
                    <Link href="/dashboard/generate" className="block w-full">
                      <Button
                        variant="outline"
                        className="w-full h-9 text-[11px] font-sans tracking-wider uppercase border-red-400/40 text-red-300 hover:bg-red-600/20 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Try Again (Retry)
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
