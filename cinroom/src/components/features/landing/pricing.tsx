"use client";

import { useState, useEffect } from "react";
import { Check, ShieldCheck, ArrowRight, Building2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface Plan {
  id: string;
  name: string;
  type: "onetime" | "subscription";
  priceUsd: string;
  billing: string;
  credits: number;
  creditsLabel: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}

const paidPlans: Plan[] = [
  {
    id: "starter_onetime",
    name: "STARTER",
    type: "onetime",
    priceUsd: "$49",
    billing: "one-time purchase",
    credits: 7,
    creditsLabel: "7 Credits",
    subtitle: "Perfect for brands that want to experience the platform before committing to a subscription.",
    features: [
      "7 Production Credits",
      "Full commercial usage rights",
      "Standard studio rendering queue",
      "Secure asset cloud storage",
      "Instant top-up recharge enabled",
    ],
  },
  {
    id: "growth_monthly",
    name: "GROWTH",
    type: "subscription",
    priceUsd: "$129",
    billing: "per month",
    credits: 18,
    creditsLabel: "18 Credits every month",
    badge: "MOST POPULAR",
    popular: true,
    subtitle: "The primary commercial production engine for growing luxury jewelry brands.",
    features: [
      "18 Credits renewed every month",
      "Priority Rendering Queue",
      "Faster Asset Processing",
      "Lower Effective Cost Per Credit",
      "Commercial Usage Rights",
      "Premium 24/7 Dedicated Support",
      "Recharge Credits Anytime",
    ],
  },
  {
    id: "business_monthly",
    name: "BUSINESS",
    type: "subscription",
    priceUsd: "$279",
    billing: "per month",
    credits: 48,
    creditsLabel: "48 Credits every month",
    subtitle: "Built for scaling jewelry houses, agencies, and high-volume marketing teams.",
    features: [
      "48 Credits renewed every month",
      "Shared Team Credit Pool",
      "Multi-User Team Workspace",
      "Highest Rendering Priority",
      "Priority Dedicated Support",
      "Custom Motion Brand Watermarks",
      "ProRes MOV 4K Exports",
    ],
  },
];

const topUpPacks = [
  { id: "topup_6", credits: 6, priceUsd: "$45", perCredit: "$7.50/cr" },
  { id: "topup_12", credits: 12, priceUsd: "$79", perCredit: "$6.58/cr" },
  { id: "topup_24", credits: 24, priceUsd: "$149", perCredit: "$6.20/cr", popular: true },
  { id: "topup_48", credits: 48, priceUsd: "$289", perCredit: "$6.02/cr" },
  { id: "topup_96", credits: 96, priceUsd: "$549", perCredit: "$5.71/cr", bestValue: true },
];

const faqs = [
  {
    question: "What are Credits?",
    answer:
      "A Credit is CINROOM's unit of production. Credits are used to produce Commercial Videos and Performance Creatives.",
  },
  {
    question: "How do Credits work?",
    answer:
      "Credits are stored in your Atelier Credit Wallet and deducted automatically whenever you render commercial videos or export performance ad creatives.",
  },
  {
    question: "How are Commercial Videos charged?",
    answer:
      "1 Commercial Product Video (up to 4K resolution) consumes 3 Credits.",
  },
  {
    question: "How are Performance Creatives charged?",
    answer:
      "Performance Creatives consume 0.2 Credits each. That means 5 Performance Creatives = 1 Credit.",
  },
  {
    question: "Can I recharge Credits anytime?",
    answer:
      "Yes. You can purchase top-up credit packs (6, 12, 24, 48, or 96 credits) anytime directly from your dashboard without changing your subscription.",
  },
  {
    question: "Do Credits expire?",
    answer:
      "Top-up credit packs never expire. Subscription credits roll over each month as long as your workspace subscription remains active.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. You can upgrade from Starter to Growth or Business at any time with a single click.",
  },
  {
    question: "Can my team share Credits?",
    answer:
      "Yes. On Business and Enterprise plans, all workspace team members draw from a shared organization credit pool.",
  },
];

interface PricingProps {
  activePlanTier?: string;
}

export function Pricing({ activePlanTier }: PricingProps = {}) {
  const [selectedTopUp, setSelectedTopUp] = useState("topup_24");
  const [modalCredits, setModalCredits] = useState<number | null>(null);
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [userTier, setUserTier] = useState<string>(activePlanTier || "free");

  const activeTopUpObj = topUpPacks.find((t) => t.id === selectedTopUp) || topUpPacks[2];

  useEffect(() => {
    async function fetchUserTier() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: walletRes } = await supabase
            .from("user_wallets")
            .select("plan_tier")
            .eq("user_id", session.user.id)
            .single();

          if (walletRes?.plan_tier) {
            setUserTier(walletRes.plan_tier);
          }
        }
      } catch (err) {
        console.error("Error fetching user plan tier:", err);
      }
    }

    if (activePlanTier) {
      setUserTier(activePlanTier);
    } else {
      fetchUserTier();
    }
  }, [activePlanTier]);

  // Dynamic Subscription Button Logic based on User Active Plan Tier
  const getPlanButtonState = (cardPlanId: string) => {
    const currentTier = (userTier || "free").toLowerCase();

    // Tier Ranks: free=0, starter=1, growth=2, business=3
    const getRank = (tierOrId: string) => {
      const str = tierOrId.toLowerCase();
      if (str.includes("business")) return 3;
      if (str.includes("growth")) return 2;
      if (str.includes("starter")) return 1;
      return 0; // free / not subscribed
    };

    const currentRank = getRank(currentTier);
    const cardRank = getRank(cardPlanId);

    if (currentRank === 0) {
      return {
        label: "Subscribe Now",
        isCurrent: false,
        isDisabled: false,
      };
    }

    if (currentRank === cardRank) {
      return {
        label: "Subscribed (Current Plan)",
        isCurrent: true,
        isDisabled: true,
      };
    }

    if (cardRank > currentRank) {
      return {
        label: "Upgrade",
        isCurrent: false,
        isDisabled: false,
      };
    }

    return {
      label: "Downgrade",
      isCurrent: false,
      isDisabled: false,
    };
  };

  const startCheckout = async (productId: string) => {
    setLoadingPack(productId);
    try {
      if (productId === "enterprise_contact") {
        window.location.href = "mailto:concierge@cinroom.com?subject=CINROOM%20Enterprise%20Studio%20Inquiry";
        setLoadingPack(null);
        return;
      }

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = session?.user?.email || "";
      const userId = session?.user?.id || "";

      const response = await fetch("/api/checkout/dodopayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId: productId,
          userEmail: userEmail,
          userId: userId,
        }),
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank", "noopener,noreferrer");
        toast.success("Payment checkout opened in a new tab. Complete your purchase there!");
        setTimeout(() => setLoadingPack(null), 1500);
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
    <section id="pricing" className="py-28 bg-[#060608] relative z-20 border-t border-white/[0.06] overflow-hidden">
      
      {/* Glow Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-amber-200/80 mb-3 block">
            GLOBAL COMMERCIAL PRODUCTION PLANS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            Invest in <span className="gold-text-gradient font-normal italic">High-Converting</span> Marketing Assets
          </h2>
          <p className="text-sm text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
            High-efficiency commercial asset production for luxury jewelry brands. Scale marketing campaigns without traditional studio overhead.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="mb-14 max-w-2xl mx-auto p-4 rounded-xl glass-panel bg-amber-500/[0.03] border border-amber-200/20 text-center">
          <p className="text-xs font-sans text-amber-200/90 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" />
            <span>Create your account for free. Purchase Credits or subscribe when you're ready to generate commercial assets.</span>
          </p>
        </div>

        {/* 3 BALANCED PAID PRICING CARDS (Starter, Growth ⭐, Business) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mb-20">
          {paidPlans.map((plan) => {
            const isPopular = plan.popular;
            const btnState = getPlanButtonState(plan.id);

            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  btnState.isCurrent
                    ? "border-emerald-500/50 bg-[#0d1612] shadow-[0_0_50px_rgba(16,185,129,0.15)]"
                    : isPopular
                    ? "border-amber-200/50 shadow-[0_0_70px_rgba(197,168,128,0.2)] bg-[#0d0d10] md:scale-105 z-20"
                    : "border-white/[0.08] hover:border-white/20 bg-[#0a0a0d]"
                }`}
              >
                {/* Badge */}
                {btnState.isCurrent ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-4 py-1 rounded-full bg-emerald-500 text-black font-sans text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      CURRENT SUBSCRIBED PLAN
                    </span>
                  </div>
                ) : plan.badge ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-sans text-[10px] font-bold tracking-widest uppercase shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                ) : null}

                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-serif text-white tracking-tight">{plan.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono font-semibold">
                        {plan.credits} Credits
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light min-h-[36px] mt-2">{plan.subtitle}</p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-light text-white font-serif tracking-tight">{plan.priceUsd}</span>
                      <span className="text-xs font-mono text-neutral-500 uppercase">{plan.billing}</span>
                    </div>

                    <button
                      onClick={() => setModalCredits(plan.credits)}
                      className="text-[11px] font-sans text-amber-200/90 underline hover:text-white transition-colors mt-3 flex items-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5" /> What can I create with {plan.credits} Credits?
                    </button>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light">
                        <Check className="w-4 h-4 text-amber-200 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => !btnState.isDisabled && startCheckout(plan.id)}
                  disabled={btnState.isDisabled || loadingPack === plan.id}
                  className={`w-full h-12 text-xs font-sans tracking-[0.15em] uppercase rounded-xl transition-all duration-300 cursor-pointer font-semibold ${
                    btnState.isCurrent
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default opacity-90"
                      : isPopular
                      ? "bg-white text-black hover:bg-neutral-200 shadow-lg border border-amber-200/30"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                  }`}
                >
                  {loadingPack === plan.id
                    ? "Processing..."
                    : btnState.label}
                  {!btnState.isCurrent && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            );
          })}
        </div>

        {/* CREDIT CONVERSION MATH EXPLANATION */}
        <div className="mb-20 p-8 rounded-2xl glass-panel gold-border-glow bg-[#0d0d10] border border-amber-200/20 shadow-2xl max-w-5xl mx-auto text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-200/90 mb-2 block">
            UNIFIED CREDIT CONVERSION RULE
          </span>
          <h3 className="text-xl font-serif text-white mb-2">1 Commercial Video = 3 Credits | 1 Editorial Image = 1 Credit</h3>
          <p className="text-xs text-neutral-400 font-light max-w-xl mx-auto">
            Credits give you complete studio freedom across both Video and Image generation engines.
          </p>
        </div>

        {/* RECHARGE CREDITS SECTION */}
        <div id="topup" className="mb-20 p-8 rounded-2xl glass-panel border border-white/10 bg-[#0a0a0d] max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-200/80 mb-2 block">
              INSTANT CREDIT RECHARGE
            </span>
            <h3 className="text-2xl font-serif text-white tracking-tight mb-1">Recharge Credits</h3>
            <p className="text-xs text-neutral-400 font-light">Purchase additional Credits anytime without changing your subscription.</p>
          </div>

          {/* Recharge Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {topUpPacks.map((pack) => {
              const isSelected = selectedTopUp === pack.id;

              return (
                <div
                  key={pack.id}
                  onClick={() => setSelectedTopUp(pack.id)}
                  className={`p-5 rounded-xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? "bg-amber-400/10 border-amber-200/60 shadow-[0_0_20px_rgba(197,168,128,0.2)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  {pack.popular ? (
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 uppercase mb-2 inline-block">
                      POPULAR
                    </span>
                  ) : pack.bestValue ? (
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase mb-2 inline-block">
                      BEST VALUE
                    </span>
                  ) : null}
                  <div className="text-xl font-serif text-white mb-1">{pack.credits} Credits</div>
                  <div className="text-sm font-mono text-amber-200 font-semibold">{pack.priceUsd}</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-1">{pack.perCredit}</div>
                </div>
              );
            })}
          </div>

          {/* Purchase Summary & Action Button */}
          <div className="max-w-md mx-auto p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="flex items-center justify-between text-xs font-sans text-neutral-300 mb-2 pb-2 border-b border-white/10">
              <span>Selected Pack:</span>
              <span className="text-amber-200 font-bold">{activeTopUpObj.credits} Credits ({activeTopUpObj.perCredit})</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans text-neutral-300 mb-6">
              <span>Price:</span>
              <span className="text-white font-bold">{activeTopUpObj.priceUsd}</span>
            </div>

            <Button
              onClick={() => startCheckout(activeTopUpObj.id)}
              disabled={loadingPack === activeTopUpObj.id}
              className="w-full h-12 text-xs font-sans tracking-widest uppercase bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 cursor-pointer shadow-lg border border-amber-200/30"
            >
              {loadingPack === activeTopUpObj.id
                ? "Processing..."
                : `Recharge ${activeTopUpObj.credits} Credits • ${activeTopUpObj.priceUsd}`}
            </Button>
          </div>
        </div>

        {/* ENTERPRISE SECTION */}
        <div className="mb-24 p-8 rounded-2xl glass-panel border border-white/10 bg-[#0a0a0d] max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-amber-200" />
                <h3 className="text-2xl font-serif text-white tracking-tight">Enterprise</h3>
              </div>
              <p className="text-xs text-neutral-400 font-light max-w-xl">
                For agencies, manufacturers and high-volume jewelry brands requiring custom GPU capacity and SLA.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-300 pt-2">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Unlimited Team Members</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Dedicated Infrastructure</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> SLA</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-200" /> Dedicated Account Manager</span>
              </div>
            </div>

            <Button
              onClick={() => startCheckout("enterprise_contact")}
              className="h-12 px-8 text-xs font-sans tracking-widest uppercase bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 rounded-xl shrink-0 cursor-pointer"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div id="faq" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              CLARIFICATIONS & POLICIES
            </span>
            <h3 className="text-2xl font-serif text-white tracking-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 font-light">Everything you need to know about CINROOM studio credit wallet and subscription options.</p>
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

      {/* DYNAMIC CREDIT CALCULATION MODAL */}
      {modalCredits !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md glass-panel gold-border-glow p-6 rounded-2xl bg-[#0c0c10] border border-amber-200/40 relative">
            <button
              onClick={() => setModalCredits(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-200 mb-1 block">
                CREDIT BREAKDOWN
              </span>
              <h3 className="text-xl font-serif text-white">What can I create with {modalCredits} Credits?</h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-sans text-amber-200 font-bold mb-1">Option 1: Max Commercial Videos</div>
                <div className="text-xs font-sans text-white">
                  {Math.floor(modalCredits / 3)} Commercial Videos + {modalCredits % 3} Editorial Images
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-sans text-amber-200 font-bold mb-1">Option 2: Max Editorial Images</div>
                <div className="text-xs font-sans text-white">
                  {modalCredits} Editorial Images
                </div>
              </div>
            </div>

            <Button
              onClick={() => setModalCredits(null)}
              className="w-full h-10 text-xs font-sans uppercase bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

    </section>
  );
}
