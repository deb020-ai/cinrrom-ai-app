"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, RefreshCw, Users, Layers, Star, Building, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SubscriptionPlan {
  id: string;
  name: string;
  type: "onetime" | "monthly" | "custom";
  credits: string;
  price: string;
  billing: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  benefits: string[];
  cta: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter_onetime",
    name: "Starter",
    type: "onetime",
    credits: "4 Credits",
    price: "₹3,999",
    billing: "one-time purchase",
    subtitle: "Perfect for first-time customers who want to experience the studio platform.",
    benefits: [
      "4 Commercial Product Videos OR 20 Performance Creatives",
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
    type: "monthly",
    credits: "10 Credits / mo",
    price: "₹8,999",
    billing: "per month",
    badge: "MOST POPULAR",
    popular: true,
    subtitle: "The standard engine for growing luxury jewelry brands.",
    benefits: [
      "10 Commercial Videos OR 50 Performance Creatives / mo",
      "Priority Rendering Queue",
      "Faster Asset Processing",
      "Credits Renew Monthly",
      "Lower Effective Cost Per Credit",
      "Batch Campaign Generation",
    ],
    cta: "Subscribe",
  },
  {
    id: "business_monthly",
    name: "Business",
    type: "monthly",
    credits: "25 Credits / mo",
    price: "₹19,999",
    billing: "per month",
    subtitle: "Built for scaling jewelry houses and active marketing teams.",
    benefits: [
      "25 Commercial Videos OR 125 Performance Creatives / mo",
      "Multi-User Team Workspace",
      "Shared Organization Credits",
      "Premium 24/7 Dedicated Support",
      "Highest Rendering Queue Priority",
      "Custom Brand Motion Watermarks",
    ],
    cta: "Scale Your Team",
  },
  {
    id: "enterprise_contact",
    name: "Enterprise",
    type: "custom",
    credits: "Custom Quotas",
    price: "Custom",
    billing: "tailored billing",
    subtitle: "High-volume generation pipeline for global luxury houses.",
    benefits: [
      "Unlimited Team Members",
      "Direct API & Webhook Access",
      "Dedicated Private Infrastructure",
      "Custom GPU Capacity Allocation",
      "Dedicated Account Manager",
      "Custom SLA & Security Compliance",
    ],
    cta: "Contact Sales",
  },
];

const topUpPacks = [
  { id: "topup_2", credits: 2, price: "₹2,999", perCredit: "₹1,499 / credit" },
  { id: "topup_5", credits: 5, price: "₹6,999", perCredit: "₹1,399 / credit", popular: true },
  { id: "topup_10", credits: 10, price: "₹12,999", perCredit: "₹1,299 / credit" },
  { id: "topup_25", credits: 25, price: "₹29,999", perCredit: "₹1,199 / credit" },
];

const creditBreakdowns = [
  { title: "Option A (All Commercial Videos)", videos: "10 Commercial Videos", images: "0 Performance Creatives", icon: Zap },
  { title: "Option B (All Campaign Creatives)", videos: "0 Commercial Videos", images: "50 Performance Creatives", icon: Sparkles },
  { title: "Option C (Balanced Mix)", videos: "6 Commercial Videos", images: "20 Performance Creatives", icon: Layers },
  { title: "Option D (High Visual Volume)", videos: "3 Commercial Videos", images: "35 Performance Creatives", icon: Star },
];

const faqs = [
  {
    question: "What is a Credit?",
    answer:
      "A Credit is the unified unit of production on Cinroom. 1 Credit grants you 1 Premium Commercial Video (up to 4K resolution) OR 5 Premium Performance Ad Creatives.",
  },
  {
    question: "How are Credits used?",
    answer:
      "Credits are automatically deducted from your workspace wallet as you render commercial videos or export performance ad creatives in the studio workspace.",
  },
  {
    question: "Can I mix videos and images?",
    answer:
      "Yes. Credits are completely flexible. For example, 10 Credits can be redeemed for 6 Commercial Videos + 20 Performance Ad Creatives (6 + 4 = 10 credits).",
  },
  {
    question: "Do unused subscription credits roll over?",
    answer:
      "Yes. Unused subscription credits roll over into your balance and remain active as long as your workspace subscription remains active.",
  },
  {
    question: "How do Top-Up Credits work?",
    answer:
      "Top-Up Credits are instant one-time purchases that immediately load into your credit wallet without modifying or canceling your existing subscription.",
  },
  {
    question: "Can I recharge anytime?",
    answer:
      "Yes. You can recharge top-up credit packs at any moment directly from your Studio Dashboard whenever you need extra campaign volume.",
  },
  {
    question: "Can my team share credits?",
    answer:
      "Yes. On Business and Enterprise plans, all workspace team members share a central organization credit wallet.",
  },
  {
    question: "Can I upgrade or downgrade my subscription?",
    answer:
      "Yes. You can upgrade, downgrade, or pause your monthly subscription anytime from your Studio Settings with zero lock-in contracts.",
  },
  {
    question: "Do Top-Up Credits expire?",
    answer:
      "No. Top-Up credit packs never expire. They stay in your account balance until you choose to redeem them.",
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-3 block">
            // COMMERCIAL PRODUCTION PLANS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Invest in <span className="gold-text-gradient font-normal italic">Conversion-Driven</span> Creatives
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            High-efficiency commercial asset production for luxury jewelry brands. Scale marketing campaigns without traditional production overhead.
          </p>
        </div>

        {/* Flexible Credit Usage Visual Section */}
        <div className="mb-20 p-8 rounded-2xl glass-panel gold-border-glow bg-gradient-to-r from-amber-950/20 via-[#0e0e12] to-amber-950/10 border border-amber-200/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/90 mb-1 block">
              FLEXIBLE ASSET REDEMPTION
            </span>
            <h3 className="text-xl font-light text-white">1 Credit = 1 Commercial Video OR 5 Performance Creatives</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditBreakdowns.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-amber-200/40 transition-all">
                  <IconComp className="w-5 h-5 text-amber-200 mx-auto mb-2" />
                  <div className="text-xs font-mono font-semibold text-white mb-2">{item.title}</div>
                  <div className="text-[11px] font-mono text-amber-200">{item.videos}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{item.images}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-24">
          {subscriptionPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "border-amber-200/50 shadow-[0_0_60px_rgba(197,168,128,0.25)] bg-gradient-to-b from-[#16161d] via-[#0e0e11] to-[#070709] lg:-translate-y-2 z-20"
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
                  {/* Plan Name & Credits */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-light text-white tracking-tight">{plan.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-[10px] font-mono font-semibold">
                        {plan.credits}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-2">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-light text-white font-serif tracking-tight">{plan.price}</span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">{plan.billing}</span>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Button */}
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

        {/* TOP-UP CREDITS (RECHARGE SECTION) */}
        <div id="topup" className="mb-28 p-8 rounded-2xl glass-panel border border-white/10 bg-[#08080b]">
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
                    <span className="text-lg font-light text-white font-serif">{pack.credits} Credits</span>
                    {pack.popular && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 uppercase">
                        POPULAR TOP-UP
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-light text-white mb-1 font-serif">{pack.price}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mb-4">{pack.perCredit}</div>
                </div>

                <Button
                  onClick={() => startCheckout(pack.id)}
                  disabled={loadingPack === pack.id}
                  variant="outline"
                  className="w-full h-9 text-xs font-mono uppercase border-white/10 text-neutral-200 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  {loadingPack === pack.id ? "Loading..." : "Recharge Credits"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              // CLARIFICATIONS & POLICIES
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 font-light">Everything you need to know about Cinroom studio credit packs and subscriptions.</p>
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
