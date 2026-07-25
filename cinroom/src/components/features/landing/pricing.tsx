"use client";

import { useState } from "react";
import { Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Zap, Layers, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: string;
  priceRaw: number;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  valueHighlights: string[];
  features: string[];
}

const creditPacks: CreditPack[] = [
  {
    id: "starter_credit_pack",
    name: "Starter",
    credits: 10,
    price: "₹19,990",
    priceRaw: 19990,
    subtitle: "Perfect for testing product launches.",
    valueHighlights: [
      "10 Commercial Videos OR 50 Campaign Images",
      "Standard studio rendering queue",
      "Full commercial usage rights",
    ],
    features: [
      "Studio-quality commercial assets",
      "Luxury product visuals",
      "Meta-ready ad creatives",
      "Commercial usage rights",
      "Fast cloud rendering",
      "Secure asset storage",
    ],
  },
  {
    id: "growth_credit_pack",
    name: "Growth",
    credits: 50,
    price: "₹94,950",
    priceRaw: 94950,
    badge: "MOST POPULAR",
    popular: true,
    subtitle: "Best value for growing jewelry brands.",
    valueHighlights: [
      "50 Commercial Videos OR 250 Campaign Images",
      "Lower effective cost per asset",
      "Scale without hiring production teams",
    ],
    features: [
      "Studio-quality commercial assets",
      "Luxury product visuals",
      "Meta-ready ad creatives",
      "Commercial usage rights",
      "Fast cloud rendering",
      "Secure asset storage",
      "Priority rendering",
      "Faster production queue",
      "Batch commercial generation",
    ],
  },
  {
    id: "scale_credit_pack",
    name: "Scale",
    credits: 100,
    price: "₹179,900",
    priceRaw: 179900,
    badge: "BEST VALUE",
    popular: false,
    subtitle: "Built for agencies and high-volume brands.",
    valueHighlights: [
      "100 Commercial Videos OR 500 Campaign Images",
      "Lowest effective cost per commercial asset",
      "Dedicated multi-user team workspace",
    ],
    features: [
      "Studio-quality commercial assets",
      "Luxury product visuals",
      "Meta-ready ad creatives",
      "Commercial usage rights",
      "Fast cloud rendering",
      "Secure asset storage",
      "Priority rendering",
      "Faster production queue",
      "Batch commercial generation",
      "Team workspace & shared credits",
      "Premium 24/7 priority support",
      "Highest priority rendering queue",
    ],
  },
];

const faqs = [
  {
    question: "What is a credit?",
    answer:
      "A credit is our unified unit of commercial production. 1 Credit can be redeemed for 1 Commercial Product Video (up to 4K resolution) OR 5 Premium Campaign Images. You can use your credits flexibly based on your campaign requirements.",
  },
  {
    question: "Do credits expire?",
    answer:
      "No. All purchased credits remain active in your workspace ledger indefinitely until used. There are no monthly forced expiration dates.",
  },
  {
    question: "Can I mix videos and images?",
    answer:
      "Yes, completely. For example, with a 10 Credit Starter Pack, you can produce 7 Commercial Product Videos + 15 Performance Campaign Images (7 credits + 3 credits = 10 credits total).",
  },
  {
    question: "Can multiple team members use the same credits?",
    answer:
      "Yes. The Scale plan includes shared team workspaces where all team members consume from the organization's central credit pool.",
  },
  {
    question: "What file formats are exported?",
    answer:
      "Commercial Videos are exported in 4K ProRes MOV & MP4 (16:9 & 9:16 vertical for Instagram/Reels/TikTok). Images are exported in uncompressed 4K PNG & WebP.",
  },
  {
    question: "Is there a commercial license included?",
    answer:
      "Yes. All assets created on Cinroom come with an unrestricted worldwide commercial license for digital advertising, broadcast TV, e-commerce, and social media campaigns.",
  },
  {
    question: "Can unused credits roll over?",
    answer:
      "Since Cinroom uses non-expiring Credit Packs rather than monthly reset quotas, 100% of your unused credits automatically stay in your balance.",
  },
];

export function Pricing() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const startCheckout = async (packId: string) => {
    setLoadingPack(packId);
    try {
      const response = await fetch("/api/checkout/dodopayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.info(`Initializing Checkout for ${packId}...`);
        setTimeout(() => setLoadingPack(null), 1200);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Error connecting to checkout gateway. Please try again.");
      setLoadingPack(null);
    }
  };

  return (
    <section id="pricing" className="py-28 bg-[#050505] relative z-20 border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-3 block">
            // COMMERCIAL PRODUCTION CREDITS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Invest in <span className="gold-text-gradient font-normal italic">High-Converting</span> Creatives
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            Cinroom replaces traditional ₹5L+ commercial film shoots with instant, studio-grade performance assets for luxury jewelry houses.
          </p>
        </div>

        {/* Credit Flexibility Explanation Card */}
        <div className="mb-16 p-6 rounded-2xl glass-panel gold-border-glow bg-gradient-to-r from-amber-950/20 via-[#0e0e12] to-amber-950/10 border border-amber-200/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-200/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <h4 className="text-base font-medium text-white mb-1">Unified Credit Flexibility Rule</h4>
                <p className="text-xs text-neutral-400 font-light">
                  <span className="text-amber-200 font-mono font-medium">1 Credit</span> = 1 Commercial Product Video <span className="text-neutral-500">OR</span> 5 Premium Campaign Images
                </p>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-3">
              <span className="text-amber-200 font-bold">10 Credits Example:</span>
              <span>7 Commercial Videos + 15 Campaign Assets</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
          {creditPacks.map((pack) => {
            const isPopular = pack.popular;
            return (
              <div
                key={pack.id}
                className={`glass-panel rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "border-amber-200/50 shadow-[0_0_60px_rgba(197,168,128,0.2)] bg-gradient-to-b from-[#14141a] via-[#0d0d10] to-[#070709] scale-105 z-20"
                    : "border-white/[0.08] hover:border-white/20 bg-[#08080a]"
                }`}
              >
                {/* Badge */}
                {pack.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      {pack.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Credits */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-light text-white tracking-tight">{pack.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono font-semibold">
                        {pack.credits} Credits
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-2">{pack.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-light text-white font-serif tracking-tight">{pack.price}</span>
                      <span className="text-xs font-mono text-neutral-500 uppercase">/ pack</span>
                    </div>
                    <p className="text-[11px] font-mono text-amber-200/70 mt-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                      One-time payment • Never expires
                    </p>
                  </div>

                  {/* Value Highlights */}
                  <div className="mb-8 space-y-2.5">
                    {pack.valueHighlights.map((val, vIdx) => (
                      <div key={vIdx} className="flex items-center gap-2 text-xs font-mono text-amber-100">
                        <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Included Features List */}
                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light">
                        <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                  <Button
                    onClick={() => startCheckout(pack.id)}
                    disabled={loadingPack === pack.id}
                    className={`w-full h-12 text-xs font-mono tracking-[0.15em] uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                      isPopular
                        ? "bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.3)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)]"
                        : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                    }`}
                  >
                    {loadingPack === pack.id ? "Initializing..." : "Buy Credits"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <a
                    href="mailto:concierge@cinroom.com?subject=Inquiry%20about%20Cinroom%20Atelier%20Credits"
                    className="block text-center text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Book a Demo →
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Comprehensive Feature Comparison Matrix */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              // SPECIFICATION MATRIX
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight">Feature & Privilege Comparison</h3>
          </div>

          <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-4 text-xs font-mono uppercase text-neutral-400 font-normal">Commercial Capabilities</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Starter (10 Cr)</th>
                    <th className="p-4 text-xs font-mono uppercase text-amber-200 text-center font-semibold bg-amber-400/5">Growth (50 Cr)</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Scale (100 Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-xs font-light text-neutral-300">
                  <tr>
                    <td className="p-4">Studio-Quality Commercial Assets</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Luxury Product Visuals (4K PNG)</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Meta-Ready Vertical Ad Creatives (9:16)</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Unrestricted Commercial Usage Rights</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓</td>
                    <td className="p-4 text-center text-amber-200">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Priority Production Queue</td>
                    <td className="p-4 text-center text-neutral-600">—</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓ Priority</td>
                    <td className="p-4 text-center text-amber-200">✓ Highest Priority</td>
                  </tr>
                  <tr>
                    <td className="p-4">Batch Generation Engine</td>
                    <td className="p-4 text-center text-neutral-600">—</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓ Included</td>
                    <td className="p-4 text-center text-amber-200">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="p-4">Team Workspace & Shared Credits</td>
                    <td className="p-4 text-center text-neutral-600">—</td>
                    <td className="p-4 text-center text-neutral-600 bg-amber-400/5">—</td>
                    <td className="p-4 text-center text-amber-200">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="p-4">Dedicated Account Director Support</td>
                    <td className="p-4 text-center text-neutral-600">Standard Email</td>
                    <td className="p-4 text-center text-neutral-300 bg-amber-400/5">Priority Email</td>
                    <td className="p-4 text-center text-amber-200">24/7 Dedicated Director</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              // CLARIFICATIONS
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 font-light">Everything you need to know about Cinroom commercial credits.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-xl border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm text-white hover:text-amber-200 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-amber-200 font-mono text-lg shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 font-light border-t border-white/[0.04] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
