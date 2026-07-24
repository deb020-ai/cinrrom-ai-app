"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    q: "How does Cinroom generate videos from a single jewelry photo?",
    a: "Our proprietary neural rendering engine estimates 3D depth, surface curvature, refractive properties, and metal reflectivity from your input photo. It then simulates physically accurate camera trajectories and light sources."
  },
  {
    q: "Will my gemstone refractions and diamond brilliance look authentic?",
    a: "Yes. Unlike generic video AI tools, Cinroom is specifically trained on optical physics for high-jewelry, capturing spectral dispersion, fire, and diamond brilliance."
  },
  {
    q: "Are my uploaded product designs protected?",
    a: "Absolutely. All uploads are encrypted with enterprise-grade security and processed on private rendering instances. Your designs are never used for public training."
  },
  {
    q: "What export formats are supported?",
    a: "You can export MP4 (H.264) for web and social distribution, as well as uncompressed ProRes MOV files for high-end digital billboards and broadcast campaigns."
  }
];

export function FaqCta() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#050505] relative z-20 border-t border-white/[0.06]">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* FAQ Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-3 block">
            // FREQUENTLY ASKED
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Curated <span className="gold-text-gradient font-normal italic">Answers</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-28">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm font-medium text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-amber-200 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-6 pt-0 text-xs text-neutral-400 font-light leading-relaxed border-t border-white/[0.04]">
                  <p className="mt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Luxury Call To Action Banner */}
        <div className="glass-panel p-12 sm:p-16 rounded-3xl text-center relative overflow-hidden gold-border-glow">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-4 block">
            ELEVATE YOUR VISUAL IDENTITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 leading-tight">
            Ready to Transform Your <br />
            <span className="gold-text-gradient font-normal italic">High-Jewelry Campaigns?</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto font-light mb-10 leading-relaxed">
            Join forward-thinking ateliers and luxury houses generating ad-quality campaign films in under two minutes.
          </p>

          <Link href="/dashboard">
            <Button 
              size="lg"
              className="h-14 px-10 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_30px_rgba(197,168,128,0.3)] hover:shadow-[0_0_40px_rgba(197,168,128,0.5)] transition-all duration-300 rounded-full"
            >
              Launch Synroom Studio
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
