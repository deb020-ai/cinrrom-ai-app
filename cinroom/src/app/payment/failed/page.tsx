"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.15),rgba(0,0,0,0))]" />

      <div className="relative w-full max-w-lg glass-panel p-8 md:p-10 rounded-3xl bg-[#0d0909] border border-red-500/20 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-8 text-center animate-in zoom-in-95 duration-500">
        
        {/* Warning Icon Header */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-400 block">
            PAYMENT UNSUCCESSFUL
          </span>
          <h1 className="text-3xl font-light tracking-tight text-white font-serif">Payment Couldn't Be Completed</h1>
          <p className="text-xs font-mono text-neutral-400 max-w-md mx-auto leading-relaxed">
            Your transaction was declined or interrupted. No charges were made to your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link href="/#pricing" className="w-full block">
            <Button className="w-full h-12 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.2)] hover:shadow-[0_0_30px_rgba(197,168,128,0.35)] cursor-pointer">
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/#pricing" className="w-full">
              <Button variant="outline" className="w-full h-11 text-xs font-mono border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.05] rounded-xl">
                <CreditCard className="w-3.5 h-3.5 mr-2 text-amber-200" /> Another Method
              </Button>
            </Link>

            <Link href="/#pricing" className="w-full">
              <Button variant="outline" className="w-full h-11 text-xs font-mono border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.05] rounded-xl">
                <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Pricing
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
