"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, RefreshCw, Building2, HelpCircle, Layers, Star, Award, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  type: "free" | "onetime" | "subscription";
  price: string;
  billing: string;
  credits: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const pricingPlans: Plan[] = [
  {
    id: "free_tier",
    name: "FREE",
    type: "free",
    price: "₹0",
    billing: "forever free access",
    credits: "0 Credits",
    subtitle: "Explore the studio workspace and templates before purchasing commercial credits.",
    features: [
      "Create Atelier Workspace",
      "Browse Studio Dashboard",
      "Upload Product Photos",
      "Explore 24+ Campaign Rigs",
      "Save Studio Projects",
      "0 Credits included",
    ],
    cta: "Create Free Account",
  },
  {
    id: "starter_onetime",
    name: "STARTER",
    type: "onetime",
    price: "₹3,999",
    billing: "one-time purchase",
    credits: "10 Credits",
    subtitle: "Best for trying the platform and producing your first launch campaign.",
    features: [
      "10 Production Credits",
      "2 Commercial Videos OR 10 Images",
      "1 Video + 5 Images equivalent",
      "Full commercial usage rights",
      "Standard studio rendering queue",
      "Secure asset cloud storage",
    ],
    cta: "Buy Credits",
  },
  {
    id: "growth_monthly",
    name: "GROWTH",
    type: "subscription",
    price: "₹9,999",
    billing: "per month",
    credits: "30 Credits / mo",
    badge: "MOST POPULAR",
    popular: true,
    subtitle: "The primary commercial production engine for growing luxury jewelry brands.",
    features: [
      "30 Credits renewed every month",
      "Priority Rendering Queue",
      "Faster Asset Processing Queue",
      "Lower Effective Cost Per Credit",
      "Unrestricted Commercial License",
      "Premium 24/7 Dedicated Support",
      "Instant Top-Up Recharge Enabled",
    ],
    cta: "Subscribe",
  },
  {
    id: "business_monthly",
    name: "BUSINESS",
    type: "subscription",
    price: "₹24,999",
    billing: "per month",
    credits: "80 Credits / mo",
    subtitle: "Built for scaling jewelry houses, agencies, and high-volume marketing teams.",
    features: [
      "80 Credits renewed every month",
      "Shared Team Credit Pool",
      "Multi-User Team Workspace",
      "Priority Dedicated Support",
      "Highest Rendering Priority",
      "Custom Motion Brand Watermarks",
      "ProRes MOV 4K Exports",
    ],
    cta: "Upgrade",
  },
];

const topUpPacks = [
  { id: "topup_5", credits: 5, label: "5 Credits Pack" },
  { id: "topup_10", credits: 10, label: "10 Credits Pack", popular: true },
  { id: "topup_20", credits: 20, label: "20 Credits Pack" },
  { id: "topup_50", credits: 50, label: "50 Credits Pack" },
];

const creditExamples = [
  { title: "Example A", desc: "2 Commercial Videos OR 10 Images", breakdown: "10 Credits" },
  { title: "Example B", desc: "1 Commercial Video + 5 Images", breakdown: "10 Credits" },
  { title: "Example C", desc: "4 Commercial Videos + 10 Images", breakdown: "30 Credits (Growth)" },
];

const faqs = [
  {
    question: "What are Credits?",
    answer:
      "A Credit is the unified unit of production on Cinroom. 1 Performance Creative (Image) = 1 Credit. 1 Commercial Video = 5 Credits.",
  },
  {
    question: "How do Credits work?",
    answer:
      "Credits are stored in your Atelier Credit Wallet and deducted automatically whenever you render commercial videos or export performance ad creatives.",
  },
  {
    question: "Can I mix Videos and Images?",
    answer:
      "Yes. Credits are completely flexible. For instance, 10 Credits can produce 2 Commercial Videos (2x5=10) OR 1 Commercial Video + 5 Performance Creatives (5+5=10).",
  },
  {
    question: "Can I recharge anytime?",
    answer:
      "Yes. You can purchase top-up credit packs (5, 10, 20, or 50 credits) anytime directly from your dashboard without changing your subscription.",
  },
  {
    question: "Do Credits expire?",
    answer:
      "Top-up credit packs never expire. Subscription credits roll over each month as long as your workspace subscription remains active.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time with a single click in your workspace billing settings.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. You can upgrade from Starter or Growth to Business/Enterprise at any time.",
  },
  {
    question: "Can my team share Credits?",
    answer:
      "Yes. On Business and Enterprise plans, all workspace team members draw from a shared organization credit pool.",
  },
];

export function Pricing() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const startCheckout = async (productId: string) => {
    setLoadingPack(productId);
    try {
      if (productId === "free_tier") {
        window.location.href = "/signup";
        return;
      }

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
            Invest in <span className="gold-text-gradient font-normal italic">High-Converting</span> Marketing Assets
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            High-efficiency commercial asset production for luxury jewelry brands. Scale marketing campaigns without traditional studio overhead.
          </p>
        </div>

        {/* No Free Generation Policy Banner */}
        <div className="mb-14 max-w-2xl mx-auto p-4 rounded-xl glass-panel bg-amber-500/[0.03] border border-amber-200/20 text-center">
          <p className="text-xs font-mono text-amber-200/90 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-200 shrink-0" />
            <span>Notice: Free accounts include full dashboard & workspace access with 0 credits. Every asset is rendered on high-performance studio infrastructure.</span>
          </p>
        </div>

        {/* 4 MAIN PRICING CARDS (Free, Starter, Growth ⭐, Business) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
          {pricingPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "border-amber-200/50 shadow-[0_0_70px_rgba(197,168,128,0.25)] bg-gradient-to-b from-[#181820] via-[#0e0e12] to-[#070709] lg:-translate-y-2 z-20"
                    : "border-white/[0.08] hover:border-white/20 bg-[#08080a]"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-mono text-[9px] font-bold tracking-widest uppercase shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-light text-white tracking-tight">{plan.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-[10px] font-mono font-semibold">
                        {plan.credits}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-2">{plan.subtitle}</p>
                  </div>

                  <div className="mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-light text-white font-serif tracking-tight">{plan.price}</span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">{plan.billing}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => startCheckout(plan.id)}
                  disabled={loadingPack === plan.id}
                  className={`w-full h-11 text-xs font-mono tracking-[0.15em] uppercase rounded-xl transition-all duration-300 cursor-pointer mt-4 ${
                    isPopular
                      ? "bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.3)] hover:shadow-[0_0_35px_rgba(197,168,128,0.5)]"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                  }`}
                >
                  {loadingPack === plan.id ? "Processing..." : plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* CREDIT CONSUMPTION EXPLANATION */}
        <div className="mb-20 p-8 rounded-2xl glass-panel gold-border-glow bg-gradient-to-r from-amber-950/20 via-[#0e0e12] to-amber-950/10 border border-amber-200/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/90 mb-1 block">
              SIMPLE WHOLE-NUMBER CONSUMPTION
            </span>
            <h3 className="text-xl font-light text-white mb-1">1 Performance Creative = 1 Credit | 1 Commercial Video = 5 Credits</h3>
            <p className="text-xs text-neutral-400 font-light">No complicated decimal math. Credits provide complete flexibility across all campaign formats.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {creditExamples.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-200/40 transition-all">
                <div className="text-[10px] font-mono text-amber-200 uppercase tracking-widest mb-2">{item.title}</div>
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
            <p className="text-xs text-neutral-400 font-light">Purchase additional Credits instantly without changing your subscription.</p>
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
                  <p className="text-xs text-neutral-400 font-light mb-4">Instant top-up recharge pack</p>
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
                For agencies, manufacturers and high-volume jewelry brands requiring custom GPU capacity and API access.
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
            <h3 className="text-2xl font-light text-white tracking-tight">Feature & Capability Comparison</h3>
          </div>

          <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th className="p-4 text-xs font-mono uppercase text-neutral-400 font-normal">Capability</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Starter (10 Cr)</th>
                    <th className="p-4 text-xs font-mono uppercase text-amber-200 text-center font-semibold bg-amber-400/5">Growth (30 Cr/mo)</th>
                    <th className="p-4 text-xs font-mono uppercase text-neutral-300 text-center font-normal">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-xs font-light text-neutral-300">
                  <tr>
                    <td className="p-4">Commercial Videos (5 Cr each)</td>
                    <td className="p-4 text-center text-amber-200">2 Included</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">6 Included / mo</td>
                    <td className="p-4 text-center text-amber-200">Custom Volume</td>
                  </tr>
                  <tr>
                    <td className="p-4">Performance Creatives (1 Cr each)</td>
                    <td className="p-4 text-center text-amber-200">10 Included</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">30 Included / mo</td>
                    <td className="p-4 text-center text-amber-200">Custom Volume</td>
                  </tr>
                  <tr>
                    <td className="p-4">Priority Queue</td>
                    <td className="p-4 text-center text-neutral-600">Standard</td>
                    <td className="p-4 text-center text-amber-200 bg-amber-400/5">✓ Priority Queue</td>
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
