"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Video,
  Image as ImageIcon,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clapperboard,
  UserCheck,
  Compass,
  PawPrint,
  Wand2,
  Copy,
  Layers,
  Activity,
  Zap,
  Lock,
} from "lucide-react";

interface AdminMetrics {
  totalAccounts: number;
  totalVideos: number;
  totalImages: number;
  mrr: number;
  arr: number;
  totalRevenue: number;
  plans: {
    free: number;
    starter: number;
    pro: number;
    enterprise: number;
  };
  recentTransactions: any[];
}

interface PromptConfig {
  studio_type: "video" | "image";
  mode_id: string;
  name: string;
  description: string;
  icon: any;
  defaultPrompt: string;
  variables: string[];
}

// 10 Master Prompt Definitions
const PROMPT_CONFIGS: PromptConfig[] = [
  // VIDEO STUDIO PROMPTS (5)
  {
    studio_type: "video",
    mode_id: "product_hero",
    name: "Product Hero Shot",
    description: "Pure product macro commercial with raytraced caustics and physically correct lighting.",
    icon: Sparkles,
    defaultPrompt: `LUXURY JEWELRY HERO CAMPAIGN ENGINE v4.0`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{VIDEO_DURATION}", "{ASPECT_RATIO}"],
  },
  {
    studio_type: "video",
    mode_id: "model_campaign",
    name: "Luxury Fashion Campaign",
    description: "Vogue editorial commercial featuring a high-fashion model wearing the fine jewelry.",
    icon: UserCheck,
    defaultPrompt: `LUXURY FASHION CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "video",
    mode_id: "outdoor_campaign",
    name: "Outdoor Campaign",
    description: "Cinematic commercial in breathtaking real-world architectural & natural outdoor settings.",
    icon: Compass,
    defaultPrompt: `OUTDOOR CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "video",
    mode_id: "animal_campaign",
    name: "Animal Campaign",
    description: "High-contrast luxury commercial pairing fine jewelry with a regal companion wildlife animal.",
    icon: PawPrint,
    defaultPrompt: `LUXURY ANIMAL CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{COMPANION_ANIMAL}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "video",
    mode_id: "ai_director",
    name: "AI Director (Video)",
    description: "Takes any short text prompt or dream concept and expands it into an 8K luxury commercial.",
    icon: Clapperboard,
    defaultPrompt: `AI DIRECTOR ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{USER_CREATIVE_VISION}"],
  },

  // IMAGE STUDIO PROMPTS (5)
  {
    studio_type: "image",
    mode_id: "product_hero",
    name: "Luxurious Jewelry Product Hero",
    description: "Iconic luxury product photography campaign where the uploaded jewelry is the masterpiece.",
    icon: Sparkles,
    defaultPrompt: `LUXURY JEWELRY PRODUCT HERO`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}"],
  },
  {
    studio_type: "image",
    mode_id: "model_campaign",
    name: "Luxury Jewelry Model Campaign",
    description: "High-fashion Vogue editorial image campaign featuring casting, wardrobe & eye flow engines.",
    icon: UserCheck,
    defaultPrompt: `LUXURY JEWELRY MODEL CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "image",
    mode_id: "fantasy_world",
    name: "Outdoor Epic Environment Campaign",
    description: "Unforgettable luxury campaign inside extraordinary real-world destinations.",
    icon: Compass,
    defaultPrompt: `LUXURY JEWELRY EPIC ENVIRONMENT CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{EPIC_ENVIRONMENT}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "image",
    mode_id: "animal_campaign",
    name: "Luxury Jewelry Animal Campaign",
    description: "Unforgettable luxury image campaign pairing fine jewelry with a magnificent companion animal.",
    icon: PawPrint,
    defaultPrompt: `LUXURY JEWELRY ANIMAL CAMPAIGN ENGINE`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{COMPANION_ANIMAL}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}"],
  },
  {
    studio_type: "image",
    mode_id: "ai_director",
    name: "CINROOM AI DIRECTOR (Image)",
    description: "Transforms any dream or single-word idea into a world-class luxury jewelry image campaign.",
    icon: Clapperboard,
    defaultPrompt: `CINROOM AI DIRECTOR`,
    variables: ["{PRODUCT_IMAGE}", "{BRAND_GUIDELINE_IMAGE}", "{USER_CREATIVE_IDEA}", "{GENDER}", "{AGE_RANGE}", "{COUNTRY_ORIGIN}", "{ETHNICITY}", "{IMAGE_ASPECT_RATIO}"],
  },
];

export default function SuperAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "prompts">("analytics");
  const [studioFilter, setStudioFilter] = useState<"video" | "image">("video");
  const [selectedPromptKey, setSelectedPromptKey] = useState<string>("video_product_hero");

  // Security & Metrics State
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // Prompts State
  const [promptOverrides, setPromptOverrides] = useState<Record<string, any>>({});
  const [editorText, setEditorText] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Metrics & Prompts on mount
  useEffect(() => {
    fetchMetrics();
    fetchPrompts();
  }, []);

  // Update editor text when selected prompt changes
  useEffect(() => {
    const override = promptOverrides[selectedPromptKey];
    if (override && override.template_text) {
      setEditorText(override.template_text);
    } else {
      // Find default placeholder text
      const currentConfig = PROMPT_CONFIGS.find((p) => `${p.studio_type}_${p.mode_id}` === selectedPromptKey);
      setEditorText(currentConfig ? `[Loading default template for ${currentConfig.name}...]` : "");
    }
  }, [selectedPromptKey, promptOverrides]);

  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const res = await fetch("/api/admin/metrics");
      if (res.status === 403) {
        setIsUnauthorized(true);
        return;
      }
      const data = await res.json();
      if (data.success && data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/admin/prompts");
      const data = await res.json();
      if (data.success && data.overrides) {
        setPromptOverrides(data.overrides);
      }
    } catch (err) {
      console.error("Failed to fetch prompts:", err);
    }
  };

  const handleSavePrompt = async () => {
    const currentConfig = PROMPT_CONFIGS.find((p) => `${p.studio_type}_${p.mode_id}` === selectedPromptKey);
    if (!currentConfig) return;

    setIsSaving(true);
    showToast(null);

    try {
      const res = await fetch("/api/admin/prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studio_type: currentConfig.studio_type,
          mode_id: currentConfig.mode_id,
          name: currentConfig.name,
          template_text: editorText,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPromptOverrides((prev) => ({
          ...prev,
          [selectedPromptKey]: {
            id: selectedPromptKey,
            template_text: editorText,
            updated_at: new Date().toISOString(),
          },
        }));
        showToast({ type: "success", text: `Prompt "${currentConfig.name}" updated platform-wide!` });
      } else {
        showToast({ type: "error", text: data.error || "Failed to save prompt" });
      }
    } catch (err: any) {
      showToast({ type: "error", text: err.message || "Exception saving prompt" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPrompt = async () => {
    const currentConfig = PROMPT_CONFIGS.find((p) => `${p.studio_type}_${p.mode_id}` === selectedPromptKey);
    if (!currentConfig) return;

    if (!confirm(`Are you sure you want to reset "${currentConfig.name}" to its default code template?`)) {
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studio_type: currentConfig.studio_type,
          mode_id: currentConfig.mode_id,
          action: "reset",
        }),
      });

      const data = await res.json();
      if (data.success) {
        const nextOverrides = { ...promptOverrides };
        delete nextOverrides[selectedPromptKey];
        setPromptOverrides(nextOverrides);
        showToast({ type: "success", text: `Reset "${currentConfig.name}" to hardcoded code template.` });
      }
    } catch (err: any) {
      showToast({ type: "error", text: "Reset failed" });
    } finally {
      setIsSaving(false);
    }
  };

  const insertVariable = (variableStr: string) => {
    setEditorText((prev) => prev + " " + variableStr);
  };

  const showToast = (msg: { type: "success" | "error"; text: string } | null) => {
    setToastMessage(msg);
    if (msg) {
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredConfigs = PROMPT_CONFIGS.filter((p) => p.studio_type === studioFilter);
  const activeConfig = PROMPT_CONFIGS.find((p) => `${p.studio_type}_${p.mode_id}` === selectedPromptKey);
  const isOverridden = Boolean(promptOverrides[selectedPromptKey]?.template_text);

  if (isUnauthorized) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white font-mono tracking-wider">403 FORBIDDEN - SUPERADMIN LOCKOUT</h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Access to the Cinroom SuperAdmin Control Center is strictly locked and restricted to verified administrator accounts.
          </p>
        </div>
        <a
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-semibold text-white transition-all shadow-lg"
        >
          Return to Member Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-black to-neutral-950 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(220,38,38,0.3)]">
                <ShieldCheck className="w-3 h-3 text-red-400" /> SUPERADMIN ACCESS LOCK
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" /> RAM Cache Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Cinroom SuperAdmin Executive Center
            </h1>
            <p className="text-xs text-neutral-400">
              Real-time Business Metrics, Revenue Analytics & Platform-Wide Master Prompt Engine.
            </p>
          </div>

          {/* MAIN TAB SELECTOR */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/60 border border-white/10 z-10">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                activeTab === "analytics"
                  ? "bg-red-600/20 border border-red-500/60 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span>Executive Metrics</span>
            </button>
            <button
              onClick={() => setActiveTab("prompts")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                activeTab === "prompts"
                  ? "bg-amber-500/20 border border-amber-500/60 text-amber-200 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Master Prompt Studio</span>
            </button>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono font-semibold transition-all ${
              toastMessage.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                : "bg-red-950/80 border-red-500/60 text-red-200 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            }`}
          >
            <div className="flex items-center gap-2">
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* TAB 1: EXECUTIVE ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            
            {/* METRICS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* MRR CARD */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">MONTHLY RECURRING REVENUE</span>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  ${loadingMetrics ? "..." : (metrics?.mrr || 0).toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">/mo</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Calculated live from active recurring paid subscriptions.
                </p>
              </div>

              {/* ARR CARD */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-amber-500/30 relative overflow-hidden group hover:border-amber-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">ANNUAL RECURRING REVENUE</span>
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-amber-300">
                  ${loadingMetrics ? "..." : (metrics?.arr || 0).toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">/yr</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Annualized run-rate (MRR × 12).
                </p>
              </div>

              {/* TOTAL ACCOUNTS CARD */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-blue-500/30 relative overflow-hidden group hover:border-blue-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">TOTAL ACCOUNTS</span>
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-blue-300">
                  {loadingMetrics ? "..." : (metrics?.totalAccounts || 0).toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">registered users</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Active user accounts & wallets created.
                </p>
              </div>

              {/* TOTAL VIDEOS GENERATED */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-red-500/30 relative overflow-hidden group hover:border-red-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">TOTAL VIDEOS GENERATED</span>
                  <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                    <Video className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-red-400">
                  {loadingMetrics ? "..." : (metrics?.totalVideos || 0).toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">commercials</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Total BytePlus video render completions.
                </p>
              </div>

              {/* TOTAL IMAGES GENERATED */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-purple-500/30 relative overflow-hidden group hover:border-purple-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">TOTAL IMAGES GENERATED</span>
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-purple-300">
                  {loadingMetrics ? "..." : (metrics?.totalImages || 0).toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">campaign stills</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Total DALL-E 3 image generation completions.
                </p>
              </div>

              {/* TOTAL LIFETIME REVENUE */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-teal-500/30 relative overflow-hidden group hover:border-teal-500/60 transition-all shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">TOTAL PLATFORM REVENUE</span>
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-teal-300">
                  ${loadingMetrics ? "..." : (metrics?.totalRevenue || 0).toLocaleString()}
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 font-sans">
                  Aggregate billing transaction revenue.
                </p>
              </div>

            </div>

            {/* SUBSCRIPTION PLAN BREAKDOWN */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4">
              <h3 className="text-sm font-mono text-amber-200 uppercase tracking-wider font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" /> Active Subscription Plan Distribution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <div className="text-xs text-neutral-400 font-mono">STARTER ($149/mo)</div>
                  <div className="text-2xl font-bold font-mono text-white">{metrics?.plans.starter || 0} active</div>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-amber-500/30 space-y-1">
                  <div className="text-xs text-amber-400 font-mono">PRO ($499/mo)</div>
                  <div className="text-2xl font-bold font-mono text-amber-300">{metrics?.plans.pro || 0} active</div>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-red-500/30 space-y-1">
                  <div className="text-xs text-red-400 font-mono">ENTERPRISE ($1,999/mo)</div>
                  <div className="text-2xl font-bold font-mono text-red-300">{metrics?.plans.enterprise || 0} active</div>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <div className="text-xs text-neutral-500 font-mono">FREE TIER</div>
                  <div className="text-2xl font-bold font-mono text-neutral-300">{metrics?.plans.free || 0} accounts</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MASTER PROMPT STUDIO */}
        {activeTab === "prompts" && (
          <div className="space-y-6">
            
            {/* STUDIO FILTER BUTTONS */}
            <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-neutral-900/80 border border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setStudioFilter("video");
                    setSelectedPromptKey("video_product_hero");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                    studioFilter === "video"
                      ? "bg-red-600/20 border border-red-500/60 text-red-200 font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Video className="w-4 h-4 text-red-400" />
                  <span>Video Studio Master Prompts (5)</span>
                </button>
                <button
                  onClick={() => {
                    setStudioFilter("image");
                    setSelectedPromptKey("image_product_hero");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                    studioFilter === "image"
                      ? "bg-purple-600/20 border border-purple-500/60 text-purple-200 font-bold shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  <span>Image Studio Master Prompts (5)</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 hidden sm:block">
                ⚡ Platform-Wide Instant RAM Override Engine Enabled
              </div>
            </div>

            {/* TWO COLUMN STUDIO WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: PROMPT SELECTOR LIST (4 cols) */}
              <div className="lg:col-span-4 space-y-2.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  SELECT MASTER PROMPT TEMPLATE TO EDIT
                </label>
                {filteredConfigs.map((config) => {
                  const key = `${config.studio_type}_${config.mode_id}`;
                  const isSelected = selectedPromptKey === key;
                  const isCustom = Boolean(promptOverrides[key]?.template_text);
                  const Icon = config.icon;

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPromptKey(key)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 relative overflow-hidden ${
                        isSelected
                          ? "bg-neutral-900 border-amber-500/60 text-white shadow-[0_0_16px_rgba(245,158,11,0.15)]"
                          : "bg-black/40 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono font-bold text-xs">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-neutral-500"}`} />
                          <span className={isSelected ? "text-amber-200" : "text-white"}>{config.name}</span>
                        </div>
                        {isCustom ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 font-bold">
                            LIVE OVERRIDE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10 text-[9px] font-mono text-neutral-400">
                            DEFAULT CODE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans line-clamp-2 leading-tight">
                        {config.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT COLUMN: LIVE CODE EDITOR & ACTION BAR (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* ACTIVE PROMPT HEADER & VARIABLE CHIPS */}
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-mono font-bold text-amber-300 flex items-center gap-2">
                        <span>{activeConfig?.name}</span>
                        {isOverridden && (
                          <span className="text-[10px] font-sans font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Active Live DB Override
                          </span>
                        )}
                      </h2>
                      <p className="text-xs text-neutral-400 font-sans">{activeConfig?.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isOverridden && (
                        <button
                          onClick={handleResetPrompt}
                          disabled={isSaving}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
                          title="Reset back to default code template"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Default</span>
                        </button>
                      )}
                      <button
                        onClick={handleSavePrompt}
                        disabled={isSaving}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-xs font-mono font-bold text-white flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? "Saving..." : "Save & Apply Platform-Wide"}</span>
                      </button>
                    </div>
                  </div>

                  {/* VARIABLE CHIPS INSERTION BAR */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      INSERT VARIABLE PLACEHOLDERS:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {activeConfig?.variables.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => insertVariable(v)}
                          className="px-2.5 py-1 rounded-md bg-black/60 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/50 text-[10px] font-mono text-neutral-300 hover:text-amber-200 flex items-center gap-1 transition-all"
                        >
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>{v}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TEXTAREA EDITOR */}
                <div className="relative rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl">
                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    rows={22}
                    className="w-full p-4 bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-amber-500/30 selection:text-white"
                    placeholder="Enter Master Prompt Template text here..."
                    spellCheck={false}
                  />
                  <div className="p-2 bg-neutral-900/90 border-t border-white/10 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                    <span>LENGTH: {editorText.length} characters</span>
                    <span>AUTOMATIC RAM CACHE OVERRIDE READY</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
