"use client";

import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />

      <div className="relative w-full max-w-lg glass-panel p-8 md:p-10 rounded-3xl bg-[#09090c] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-8 text-center animate-in zoom-in-95 duration-500">
        
        {/* Cancelled Icon Header */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
            <XCircle className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
            CHECKOUT CANCELLED
          </span>
          <h1 className="text-3xl font-light tracking-tight text-white font-serif">Checkout Was Cancelled</h1>
          <p className="text-xs font-mono text-neutral-400 max-w-md mx-auto leading-relaxed">
            Your account has not been charged. You can return to pricing whenever you are ready to select a plan or credit pack.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href="/#pricing" className="w-full block">
            <Button className="w-full h-12 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.2)] hover:shadow-[0_0_30px_rgba(197,168,128,0.35)] cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Pricing
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
