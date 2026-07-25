"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, RefreshCw, Building2, HelpCircle, Layers, Star, Award, ShieldAlert, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  type: "onetime" | "subscription";
  price: string;
  billing: string;
  credits: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  benefits: string[];
  cta: string;
}

const mainPlans: Plan[] = [
  {
    id: "starter_onetime",
    name: "Starter",
    type: "onetime",
    price: "₹3,999",
    billing: "one-time purchase",
    credits: "2 Credits",
    subtitle: "Perfect for brands that want to experience the platform before committing to a subscription.",
    benefits: [
      "2 Premium Commercial Videos OR 10 Performance Creatives",
      "Studio-quality commercial assets",
      "Full commercial usage rights",
      "Standard cloud rendering queue",
      "Secure asset cloud storage",
    ],
    cta: "Start Creating",
  },
  {
    id: "growth_monthly",
    name: "Growth",
    type: "subscription",
    price: "₹9,999",
    billing: "per month",
    credits: "10 Credits / mo",
    badge: "MOST POPULAR",
    popular: true,
    subtitle: "The primary commercial production engine for growing jewelry brands.",
    benefits: [
      "10 Credits renewed every month",
      "Priority Rendering Queue",
      "Faster Asset Processing",
      "Lower Effective Cost Per Credit",
      "Commercial Usage Rights",
      "Premium 24/7 Dedicated Support",
    ],
    cta: "Subscribe",
  },
];

const topUpPacks = [
  { id: "topup_small", name: "Small Pack", credits: 2, label: "2 Credits" },
  { id: "topup_medium", name: "Medium Pack", credits: 5, label: "5 Credits", popular: true },
  { id: "topup_large", name: "Large Pack", credits: 10, label: "10 Credits" },
  { id: "topup_xlarge", name: "Scale Pack", credits: 25, label: "25 Credits" },
];

const creditExamples = [
  { label: "Example A", desc: "2 Commercial Videos + 10 Performance Creatives", breakdown: "2 Credits" },
  { label: "Example B", desc: "4 Commercial Videos", breakdown: "4 Credits" },
  { label: "Example C", desc: "20 Performance Creatives", breakdown: "4 Credits" },
];

const faqs = [
  {
    question: "What are Credits?",
    answer:
      "A Credit is our studio's unit of production. 1 Credit can be redeemed for 1 Premium Commercial Video (up to 4K resolution) OR 5 Premium Performance Creatives.",
  },
  {
    question: "How do Credits work?",
    answer:
      "Credits are stored in your Atelier Credit Wallet and deducted automatically whenever you render commercial videos or export performance ad creatives.",
  },
  {
    question: "Can I mix videos and creatives?",
    answer:
      "Yes. Credits are completely flexible. You can use your credits for any combination of commercial videos and performance creatives.",
  },
  {
    question: "Can I buy more Credits later?",
    answer:
      "Yes. You can recharge top-up credit packs anytime directly from your user dashboard without changing or upgrading your subscription plan.",
  },
  {
    question: "Do Credits expire?",
    answer:
      "Top-up credit packs never expire. Subscription credits roll over each month as long as your workspace subscription remains active.",
  },
  {
    question: "Can I upgrade my subscription?",
    answer:
      "Yes. You can upgrade, downgrade, or pause your monthly subscription anytime from your workspace settings with zero lock-in contracts.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time with a single click in your billing settings.",
  },
];

export function Pricing() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const startCheckout = async (productId: string) => {
    setLoadingPack(productId);
    try {
      if (productId === "enterprise_contact") {
        window.location.href = "mailto:concierge@cinroom.com?subject=Cinroom%20Enterprise%20Studio%20Inquiry";
        setLoadingPack(null);
        return;
      }

      const response = await fetch("/api/checkout/dodopayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId: productId }),
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.info(`Initializing Dodo Payment Gateway for product: ${productId}...`);
        setTimeout(() => setLoadingPack(null), 1200);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Error connecting to payment gateway.");
      setLoadingPack(null);
    }
  };

  return (
    <section id="pricing" className="py-28 bg-[#050505] relative z-20 border-t border-white/[0.06] overflow-hidden">
      
      {/* Glow Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-3 block">
            // COMMERCIAL PRODUCTION PLANS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Invest in <span className="gold-text-gradient font-normal italic">Conversion-Driven</span> Marketing Assets
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            High-efficiency commercial asset production for luxury jewelry brands. Scale marketing campaigns without traditional studio overhead.
          </p>
        </div>

        {/* No Free Trial Banner */}
        <div className="mb-14 max-w-2xl mx-auto p-4 rounded-xl glass-panel bg-amber-500/[0.03] border border-amber-200/20 text-center">
          <p className="text-xs font-mono text-amber-200/90 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-200 shrink-0" />
            <span>Every asset is rendered on dedicated studio GPUs. We do not offer free trials to maintain master output quality.</span>
          </p>
        </div>

        {/* 2 MAIN PRICING CARDS (Starter & Growth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-20">
          {mainPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "border-amber-200/50 shadow-[0_0_70px_rgba(197,168,128,0.25)] bg-gradient-to-b from-[#181820] via-[#0e0e12] to-[#070709] md:scale-105 z-20"
                    : "border-white/[0.08] hover:border-white/20 bg-[#08080a]"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-light text-white tracking-tight">{plan.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono font-semibold">
                        {plan.credits}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-2">{plan.subtitle}</p>
                  </div>

                  <div className="mb-8 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-light text-white font-serif tracking-tight">{plan.price}</span>
                      <span className="text-xs font-mono text-neutral-500 uppercase">{plan.billing}</span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light">
                        <Check className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => startCheckout(plan.id)}
                  disabled={loadingPack === plan.id}
                  className={`w-full h-12 text-xs font-mono tracking-[0.15em] uppercase rounded-xl transition-all duration-300 cursor-pointer ${
                    isPopular
                      ? "bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.3)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)]"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                  }`}
                >
                  {loadingPack === plan.id ? "Processing..." : plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* FLEXIBLE CREDIT USAGE EXPLANATION */}
        <div className="mb-20 p-8 rounded-2xl glass-panel gold-border-glow bg-gradient-to-r from-amber-950/20 via-[#0e0e12] to-amber-950/10 border border-amber-200/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/90 mb-1 block">
              FLEXIBLE ASSET REDEMPTION
            </span>
            <h3 className="text-xl font-light text-white mb-1">1 Credit = 1 Commercial Video OR 5 Performance Creatives</h3>
            <p className="text-xs text-neutral-400 font-light">Credits give you complete flexibility to produce videos or images as your campaign demands.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {creditExamples.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-200/40 transition-all">
                <div className="text-[10px] font-mono text-amber-200 uppercase tracking-widest mb-2">{item.label}</div>
                <div className="text-xs font-mono text-white mb-2">{item.desc}</div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-[10px] font-mono">
                  {item.breakdown}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP-UP CREDITS (RECHARGE SECTION) */}
        <div id="topup" className="mb-20 p-8 rounded-2xl glass-panel border border-white/10 bg-[#08080b]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/80 mb-2 block">
              INSTANT CREDIT RECHARGE
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mb-1">Need More Credits?</h3>
            <p className="text-xs text-neutral-400 font-light">Recharge instantly without changing your subscription.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topUpPacks.map((pack) => (
              <div
                key={pack.id}
                className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                  pack.popular
                    ? "bg-amber-400/5 border-amber-200/40 shadow-[0_0_20px_rgba(197,168,128,0.1)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-light text-white font-serif">{pack.label}</span>
                    {pack.popular && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 uppercase">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 font-light mb-4">Top-up credit pack</p>
                </div>

                <Button
                  onClick={() => startCheckout(pack.id)}
                  disabled={loadingPack === pack.id}
                  variant="outline"
                  className="w-full h-10 text-xs font-mono uppercase border-white/10 text-neutral-200 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  {loadingPack === pack.id ? "Loading..." : "Recharge Credits"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* COMPACT ENTERPRISE SECTION */}
        <div className="mb-24 p-8 rounded-2xl glass-panel border border-white/10 bg-gradient-to-r from-[#0d0d12] via-[#12121a] to-[#0d0d12]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-amber-200" />
                <h3 className="text-2xl font-light text-white tracking-tight">Enterprise Studio</h3>
              </div>
              <p className="text-xs text-neutral-400 font-light max-w-xl">
                For agencies, manufacturers and high-volume jewelry brands requiring custom pipeline integration.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300 pt-2">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Unlimited Team Members</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> API Access</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Dedicated Infrastructure</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Custom SLA</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Account Manager</span>
              </div>
            </div>

            <Button
              onClick={() => startCheckout("enterprise_contact")}
              className="h-12 px-8 text-xs font-mono tracking-widest uppercase bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 rounded-xl shrink-0 cursor-pointer"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* FEATURE COMPARISON MATRIX */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              // SPECIFICATION MATRIX
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight">Feature Comparison</h3>
          </div>

          <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-4 text-xs font-mono uppercase text-neutral-400 font-normal">Capability</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Starter (2 Cr)</th>
                    <th className="p-4 text-xs font-mono uppercase text-amber-200 text-center font-semibold bg-amber-400/5">Growth (10 Cr/mo)</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-xs font-light text-neutral-300">
                  <tr>
                    <td className="p-4">Commercial Videos</td>
                    <td className="p-4 text-center text-amber-200">2 Included</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">10 Included / mo</td>
                    <td className="p-4 text-center text-amber-200">Custom Volume</td>
                  </tr>
                  <tr>
                    <td className="p-4">Performance Creatives</td>
                    <td className="p-4 text-center text-amber-200">Up to 10</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">Up to 50 / mo</td>
                    <td className="p-4 text-center text-amber-200">Custom Volume</td>
                  </tr>
                  <tr>
                    <td className="p-4">Priority Queue</td>
                    <td className="p-4 text-center text-neutral-600">Standard</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓ Priority</td>
                    <td className="p-4 text-center text-amber-200">✓ Dedicated Queue</td>
                  </tr>
                  <tr>
                    <td className="p-4">Commercial License</td>
                    <td className="p-4 text-center text-amber-200">✓ Included</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓ Included</td>
                    <td className="p-4 text-center text-amber-200">✓ Custom Licensing</td>
                  </tr>
                  <tr>
                    <td className="p-4">Team Members</td>
                    <td className="p-4 text-center text-neutral-300">1 Seat</td>
                    <td className="p-4 text-center text-neutral-300 bg-amber-400/5">1 Seat</td>
                    <td className="p-4 text-center text-amber-200">✓ Unlimited Seats</td>
                  </tr>
                  <tr>
                    <td className="p-4">Support</td>
                    <td className="p-4 text-center text-neutral-400">Standard</td>
                    <td className="p-4 text-center text-neutral-300 bg-amber-400/5">Premium 24/7</td>
                    <td className="p-4 text-center text-amber-200">Dedicated Account Mgr</td>
                  </tr>
                  <tr>
                    <td className="p-4">API Access</td>
                    <td className="p-4 text-center text-neutral-600">—</td>
                    <td className="p-4 text-center text-neutral-600 bg-amber-400/5">—</td>
                    <td className="p-4 text-center text-amber-200">✓ Full API & Webhooks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              // CLARIFICATIONS & POLICIES
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 font-light">Everything you need to know about Cinroom studio credit wallet and subscription options.</p>
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
