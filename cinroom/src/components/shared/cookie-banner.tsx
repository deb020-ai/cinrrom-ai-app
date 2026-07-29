"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cinroom_cookie_consent");
    if (!consent) {
      // Show banner after 1s delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cinroom_cookie_consent", "all");
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("cinroom_cookie_consent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
      <div className="p-5 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] space-y-4">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-mono font-bold text-white flex items-center gap-1.5">
              <span>Cookie & Data Privacy Notice</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-neutral-400 leading-relaxed">
              We use essential cookies and data analytics to optimize rendering speed, secure your session, and process payments. Read our{" "}
              <Link href="/privacy" className="text-red-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-red-400 hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.08]">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={handleEssentialOnly}
            className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white font-mono text-xs font-medium transition-all cursor-pointer"
          >
            Essential Only
          </button>
        </div>

      </div>
    </div>
  );
}
