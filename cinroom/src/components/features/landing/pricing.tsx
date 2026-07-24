"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Aelier Studio",
    price: "$49",
    billing: "per month",
    description: "Designed for boutique jewelry designers and independent creators.",
    features: [
      "15 Video Generations / month",
      "Full HD 1080p 60FPS Exports",
      "Standard Preset Lighting Rigs",
      "Commercial Usage License",
      "Email & Chat Support"
    ],
    popular: false,
    cta: "Start Atelier Plan"
  },
  {
    name: "Maison Professional",
    price: "$149",
    billing: "per month",
    description: "For established jewelry brands executing frequent campaign drops.",
    features: [
      "65 Video Generations / month",
      "Ultra HD 4K 60FPS Render Exports",
      "Custom Brand Watermarks & Motion",
      "All 24+ Cinematic Presets",
      "Priority GPU Render Queue",
      "Pro ProRes MOV Exports"
    ],
    popular: true,
    cta: "Start Maison Plan"
  },
  {
    name: "Enterprise House",
    price: "$399",
    billing: "per month",
    description: "High-volume generation pipeline with API integration.",
    features: [
      "250 Video Generations / month",
      "4K HDR Master Quality",
      "Custom Trained Gem Optics Model",
      "Full API & Webhook Access",
      "Dedicated Account Director",
      "Custom SLA & NDA Security"
    ],
    popular: false,
    cta: "Contact Enterprise Sales"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-[#050505] relative z-20 border-t border-white/[0.06]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-3 block">
            // TRANSPARENT INVESTMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Membership <span className="gold-text-gradient font-normal italic">Plans</span>
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide">
            Scale your digital campaign production seamlessly without expensive 3D animation studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel rounded-2xl p-8 flex flex-col justify-between relative ${
                tier.popular ? 'border-amber-200/40 shadow-[0_0_50px_rgba(197,168,128,0.15)] bg-gradient-to-b from-[#141418] to-[#0a0a0c]' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E5D5C5] to-[#C5A880] text-black font-mono text-[10px] font-semibold tracking-widest uppercase shadow-md">
                    MOST REQUESTED
                  </span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-neutral-400 font-light min-h-[36px]">{tier.description}</p>
                </div>

                <div className="mb-8 pb-6 border-b border-white/[0.06]">
                  <span className="text-4xl font-light text-white font-serif">{tier.price}</span>
                  <span className="text-xs font-mono text-neutral-500 ml-2">{tier.billing}</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs text-neutral-300 font-light">
                      <Check className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/dashboard">
                <Button 
                  className={`w-full h-11 text-xs font-mono tracking-wider uppercase rounded-xl transition-all duration-300 ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_20px_rgba(197,168,128,0.2)]' 
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10'
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
