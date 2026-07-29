"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  UserCheck,
  Wand2,
  PawPrint,
  Clapperboard,
  Monitor,
  Smartphone,
  Square,
  ArrowRight,
  ShieldCheck,
  Plus,
  X,
  Video,
  Upload,
  Download,
  Film,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  GENERATION_MODES,
  GenerationModeId,
  buildMasterPrompt,
  COUNTRIES_LIST,
  ETHNICITIES_LIST,
  AI_DIRECTOR_EXAMPLES,
} from "@/lib/modes";

interface UploadedItem {
  file?: File;
  previewUrl: string;
}

interface VideoHistoryItem {
  id: string;
  output_url: string | null;
  status: string;
  created_at: string;
  prompt: string;
  aspect_ratio: string;
}

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialModeParam = searchParams.get("mode") as GenerationModeId | null;

  // Selected Mode
  const [selectedMode, setSelectedMode] = useState<GenerationModeId>(
    initialModeParam && GENERATION_MODES.some((m) => m.id === initialModeParam)
      ? initialModeParam
      : "product_hero"
  );

  // Common Required Inputs (10s = 2 credits, 15s = 3 credits)
  const [duration, setDuration] = useState<"10s" | "15s">("15s");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");

  // MULTIPLE JEWELRY IMAGES STATE
  const [jewelryItems, setJewelryItems] = useState<UploadedItem[]>([
    { previewUrl: "/hero-ring.png" },
  ]);

  // MULTIPLE BRAND GUIDELINE IMAGES STATE
  const [brandItems, setBrandItems] = useState<UploadedItem[]>([]);

  // Model Info Inputs
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("25-35");
  const [country, setCountry] = useState("France");
  const [ethnicity, setEthnicity] = useState("Caucasian");

  // Mode Specific Optional Inputs
  const [fantasyTheme, setFantasyTheme] = useState("");
  const [animal, setAnimal] = useState("");
  const [creativePrompt, setCreativePrompt] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentVideos, setRecentVideos] = useState<VideoHistoryItem[]>([]);

  const activeModeConfig =
    GENERATION_MODES.find((m) => m.id === selectedMode) || GENERATION_MODES[0];

  // Dynamic Credit Cost: 10s = 2 Credits, 15s = 3 Credits
  const creditCost = duration === "15s" ? 3 : 2;

  // Fetch recent generated videos for current user
  useEffect(() => {
    async function fetchUserVideos() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data } = await supabase
            .from("generation_history")
            .select("id, output_url, status, created_at, prompt, aspect_ratio")
            .eq("user_id", session.user.id)
            .eq("asset_type", "COMMERCIAL_VIDEO")
            .order("created_at", { ascending: false })
            .limit(12);

          if (data) setRecentVideos(data as VideoHistoryItem[]);
        }
      } catch (err) {
        console.error("Error fetching user videos:", err);
      }
    }
    fetchUserVideos();
  }, []);

  // Handle Uploading Multiple Jewelry Images
  const handleJewelryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newItems: UploadedItem[] = filesArray.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      if (jewelryItems.length === 1 && !jewelryItems[0].file) {
        setJewelryItems(newItems);
      } else {
        setJewelryItems((prev) => [...prev, ...newItems]);
      }
      toast.success(`Added ${filesArray.length} Jewelry Image(s)`);
    }
  };

  const removeJewelryItem = (index: number) => {
    if (jewelryItems.length === 1) {
      setJewelryItems([{ previewUrl: "/hero-ring.png" }]);
    } else {
      setJewelryItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle Uploading Multiple Brand Guideline Images
  const handleBrandUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newItems: UploadedItem[] = filesArray.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setBrandItems((prev) => [...prev, ...newItems]);
      toast.success(`Added ${filesArray.length} Brand Guideline Image(s)`);
    }
  };

  const removeBrandItem = (index: number) => {
    setBrandItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (selectedMode === "ai_director" && !creativePrompt.trim()) {
      toast.error("Please provide a Creative Concept idea for AI Director mode.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        toast.error("Please sign in to generate luxury commercial assets.");
        router.push("/login");
        return;
      }

      const userId = session.user.id;
      setIsUploading(true);

      // 1. Upload all Jewelry Images to Cloudflare R2
      const uploadedJewelryUrls: string[] = [];
      for (const item of jewelryItems) {
        if (item.file) {
          const formData = new FormData();
          formData.append("file", item.file);
          formData.append("user_id", userId);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (data.url) uploadedJewelryUrls.push(data.url);
        } else {
          uploadedJewelryUrls.push(item.previewUrl);
        }
      }

      // 2. Upload all Brand Guideline Images to Cloudflare R2
      const uploadedBrandUrls: string[] = [];
      for (const item of brandItems) {
        if (item.file) {
          const formData = new FormData();
          formData.append("file", item.file);
          formData.append("user_id", userId);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (data.url) uploadedBrandUrls.push(data.url);
        } else {
          uploadedBrandUrls.push(item.previewUrl);
        }
      }

      setIsUploading(false);

      // 3. Fetch user wallet balance
      const { data: wallet } = await supabase
        .from("user_wallets")
        .select("available_credits")
        .eq("user_id", userId)
        .single();

      const availableCredits = Number(wallet?.available_credits || 0);

      if (availableCredits < creditCost) {
        toast.error(
          `Insufficient credits (${availableCredits} available). Required: ${creditCost} credits for ${duration} video.`,
          {
            action: {
              label: "Recharge Credits",
              onClick: () => router.push("/dashboard/settings#topup"),
            },
          }
        );
        return;
      }

      // 4. Construct Hidden Master Prompt internally
      const masterPrompt = buildMasterPrompt({
        mode: selectedMode,
        jewelry_images: uploadedJewelryUrls,
        brand_guideline_images: uploadedBrandUrls,
        duration,
        aspect_ratio: aspectRatio,
        gender,
        age,
        country,
        ethnicity,
        fantasy_theme: fantasyTheme,
        animal,
        creative_prompt: creativePrompt,
      });

      // 5. Deduct Credits dynamically based on duration (2 credits for 10s, 3 credits for 15s)
      const { data: rpcRes, error: rpcErr } = await supabase.rpc("deduct_user_credits", {
        p_user_id: userId,
        p_cost: creditCost,
        p_asset_type: "COMMERCIAL_VIDEO",
        p_description: `Render Mode: ${activeModeConfig.title} (${duration}, ${aspectRatio})`,
        p_reference_id: `gen_${Date.now()}`,
      });

      if (rpcErr || (rpcRes && !rpcRes.success)) {
        const newBalance = availableCredits - creditCost;
        await supabase
          .from("user_wallets")
          .update({
            available_credits: newBalance,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        await supabase.from("credit_transactions").insert({
          user_id: userId,
          amount: -creditCost,
          balance_before: availableCredits,
          balance_after: newBalance,
          type: "deduction",
          description: `Render Mode: ${activeModeConfig.title} (${duration}, ${aspectRatio})`,
          created_at: new Date().toISOString(),
        });
      }

      // 6. Record Generation History Entry
      const { data: genRecord } = await supabase
        .from("generation_history")
        .insert({
          user_id: userId,
          asset_type: "COMMERCIAL_VIDEO",
          credits_consumed: creditCost,
          prompt: masterPrompt,
          aspect_ratio: aspectRatio,
          status: "RENDERING",
          created_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      toast.success(`Deducted ${creditCost} Credits. Initializing ${activeModeConfig.title} Engine...`);

      const genId = genRecord?.id || `gen_${Date.now()}`;
      router.push(`/dashboard/render?id=${genId}&mode=${selectedMode}&cost=${creditCost}`);
    } catch (err: any) {
      console.error("Generation Error:", err);
      toast.error("An error occurred while initializing render pipeline.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "UserCheck":
        return <UserCheck className="w-4 h-4" />;
      case "Wand2":
        return <Wand2 className="w-4 h-4" />;
      case "PawPrint":
        return <PawPrint className="w-4 h-4" />;
      case "Clapperboard":
        return <Clapperboard className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-28">
      {/* Page Header */}
      <div className="border-b border-white/[0.06] pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-red-400 block mb-0.5 font-semibold">
            ATELIER CREATIVE SUITE
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">Jewelry Video Generator</h1>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-sans text-red-200 bg-red-950/50 px-3 py-1 rounded-full border border-red-500/30 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
            {creditCost} CREDITS ({duration.toUpperCase()})
          </span>
        </div>
      </div>

      {/* STEP 1: VISUAL TEMPLATE MODE SELECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-sans text-neutral-300 uppercase tracking-widest block font-medium">
            1. Select Campaign Mode
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {GENERATION_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`p-4 rounded-2xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#140b0d] border border-red-500/60 shadow-[0_0_25px_rgba(220,38,38,0.25)] text-white scale-[1.02]"
                    : "bg-[#0a0a0d] border border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      {renderIcon(mode.iconName)}
                    </div>
                    <span className="text-[8px] font-sans px-1.5 py-0.5 rounded bg-white/5 text-red-300/90 uppercase border border-red-500/20">
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-white mb-1 font-serif">{mode.title}</h3>
                  <p className="text-[10px] text-neutral-400 font-light line-clamp-2 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: HERO DRAG AND DROP UPLOAD ZONE */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="glass-panel border-white/10 bg-[#0a0a0d] p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-sans uppercase tracking-widest text-red-400 font-semibold">
                2. Upload Jewelry
              </span>
              <span className="text-[9px] text-neutral-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                {jewelryItems.length} {jewelryItems.length === 1 ? "File" : "Files"}
              </span>
            </div>

            {/* MASSIVE DROP ZONE HERO */}
            <label className="border border-dashed border-white/20 hover:border-red-500/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-white/[0.01] hover:bg-red-950/[0.2] transition-all group relative overflow-hidden">
              {jewelryItems.length > 0 && jewelryItems[0].previewUrl ? (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 mb-3">
                  <img
                    src={jewelryItems[0].previewUrl}
                    alt="Primary Jewelry View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-200">
                    Primary Image
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-amber-200" />
                </div>
              )}

              <div className="text-center">
                <div className="text-xs font-medium text-white mb-0.5">
                  {jewelryItems.length > 0 ? "Click or Drag to Add More Angles" : "Drop Your Jewelry Photo Here"}
                </div>
                <div className="text-[10px] text-neutral-400 font-light">
                  Supports PNG, JPG, WEBP. Preserved 100% exactly.
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleJewelryUpload}
                className="hidden"
              />
            </label>

            {/* Thumbnails list */}
            {jewelryItems.length > 1 && (
              <div className="grid grid-cols-4 gap-2 pt-3">
                {jewelryItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-black group"
                  >
                    <img
                      src={item.previewUrl}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeJewelryItem(idx)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* OPTIONAL BRAND GUIDELINE UPLOAD */}
          <Card className="glass-panel border-white/10 bg-[#0a0a0d] p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans uppercase tracking-wider text-neutral-400">
                Brand Colors (Optional)
              </span>
              <span className="text-[9px] text-neutral-500">
                {brandItems.length > 0 ? `${brandItems.length} Attached` : "OPTIONAL"}
              </span>
            </div>

            <label className="border border-dashed border-white/15 hover:border-amber-200/40 rounded-xl p-3 flex items-center gap-3 cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-amber-200 shrink-0">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs text-white font-medium">
                  {brandItems.length > 0 ? "+ Add Brand Color File" : "Upload Brand Palette"}
                </div>
                <div className="text-[9px] text-neutral-500">Applies to background & lighting</div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleBrandUpload}
                className="hidden"
              />
            </label>
          </Card>
        </div>

        {/* RIGHT COLUMN: WORKFLOW OPTIONS */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="glass-panel border-white/10 bg-[#0a0a0d] p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-base font-serif text-white flex items-center gap-2">
                {renderIcon(activeModeConfig.iconName)}
                3. {activeModeConfig.title} Options
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-red-300 text-[10px] font-mono uppercase">
                {activeModeConfig.badge}
              </span>
            </div>

            {/* AI DIRECTOR CONCEPT */}
            {selectedMode === "ai_director" && (
              <div className="space-y-2">
                <label className="text-xs font-sans text-white font-medium uppercase tracking-wider block">
                  Creative Concept Idea <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={creativePrompt}
                  onChange={(e) => setCreativePrompt(e.target.value)}
                  placeholder="e.g. Royal Wedding, Luxury Museum, Paris Fashion Week..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs font-sans text-white placeholder:text-neutral-600 focus:outline-none focus:border-red-500/50"
                />
                <div className="flex flex-wrap gap-1.5">
                  {AI_DIRECTOR_EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setCreativePrompt(ex)}
                      className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 text-[9px] font-sans text-neutral-300 hover:text-white cursor-pointer"
                    >
                      + {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FANTASY THEME */}
            {selectedMode === "fantasy_world" && (
              <div className="space-y-1.5">
                <label className="text-xs font-sans text-white font-medium uppercase tracking-wider block">
                  Fantasy Realm / Theme (Optional)
                </label>
                <Input
                  type="text"
                  value={fantasyTheme}
                  onChange={(e) => setFantasyTheme(e.target.value)}
                  placeholder="e.g. Floating Crystal Palace, Starlight Sanctuary..."
                  className="h-10 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl"
                />
              </div>
            )}

            {/* ANIMAL */}
            {selectedMode === "animal_campaign" && (
              <div className="space-y-1.5">
                <label className="text-xs font-sans text-white font-medium uppercase tracking-wider block">
                  Companion Animal (Optional)
                </label>
                <Input
                  type="text"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value)}
                  placeholder="e.g. Black Panther, Snow Leopard, White Peacock..."
                  className="h-10 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl"
                />
              </div>
            )}

            {/* MODEL & CASTING PROFILE - ALWAYS OPEN & VISIBLE */}
            {activeModeConfig.requiresModelInfo && (
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                <label className="text-xs font-sans text-red-400 font-semibold uppercase tracking-wider block">
                  Model & Character Profile
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 block mb-1">GENDER</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={{ backgroundColor: "#0a0a0d", color: "#ffffff" }}
                      className="w-full bg-[#0a0a0d] text-white border border-white/10 rounded-xl py-2 px-2.5 text-xs font-sans"
                    >
                      <option value="Female">Female Model</option>
                      <option value="Male">Male Model</option>
                      <option value="Unisex">Unisex / High Fashion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 block mb-1">AGE RANGE</label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{ backgroundColor: "#0a0a0d", color: "#ffffff" }}
                      className="w-full bg-[#0a0a0d] text-white border border-white/10 rounded-xl py-2 px-2.5 text-xs font-sans"
                    >
                      <option value="18-25">18–25 Years</option>
                      <option value="25-35">25–35 Years</option>
                      <option value="35-45">35–45 Years</option>
                      <option value="45+">45+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 block mb-1">COUNTRY ORIGIN</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      style={{ backgroundColor: "#0a0a0d", color: "#ffffff" }}
                      className="w-full bg-[#0a0a0d] text-white border border-white/10 rounded-xl py-2 px-2.5 text-xs font-sans"
                    >
                      {COUNTRIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 block mb-1">ETHNICITY</label>
                    <select
                      value={ethnicity}
                      onChange={(e) => setEthnicity(e.target.value)}
                      style={{ backgroundColor: "#0a0a0d", color: "#ffffff" }}
                      className="w-full bg-[#0a0a0d] text-white border border-white/10 rounded-xl py-2 px-2.5 text-xs font-sans"
                    >
                      {ETHNICITIES_LIST.map((eth) => (
                        <option key={eth} value={eth}>{eth}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* DURATION & ASPECT RATIO (10s = 2 Credits, 15s = 3 Credits) */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
              <div>
                <label className="text-[10px] font-sans text-neutral-300 uppercase block mb-1.5">
                  DURATION
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "10s", label: "10s (2 Credits)" },
                    { id: "15s", label: "15s (3 Credits)" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDuration(opt.id as any)}
                      className={`py-2 rounded-xl text-xs font-sans border transition-all ${
                        duration === opt.id
                          ? "border-red-500/60 bg-red-600/20 text-red-200 font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]"
                          : "border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans text-neutral-300 uppercase block mb-1.5">
                  ASPECT RATIO
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "16:9", icon: Monitor },
                    { id: "9:16", icon: Smartphone },
                    { id: "1:1", icon: Square },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAspectRatio(opt.id as any)}
                      className={`py-2 rounded-xl text-xs font-sans flex items-center justify-center gap-1 border transition-all ${
                        aspectRatio === opt.id
                          ? "border-red-500/60 bg-red-600/20 text-red-200 font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]"
                          : "border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <opt.icon className="w-3 h-3" />
                      <span>{opt.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STRICT GUARANTEE */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] font-sans text-neutral-300 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
              <span>Strict Product Integrity Guarantee: 100% exact jewelry preservation.</span>
            </div>
          </Card>
        </div>
      </div>

      {/* YOUR GENERATED VIDEOS SECTION */}
      <div className="pt-8 border-t border-white/[0.06] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-red-400 block mb-0.5 font-semibold">
              CREATOR VAULT
            </span>
            <h2 className="text-xl font-serif text-white tracking-tight">Your Generated Videos</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {recentVideos.length} {recentVideos.length === 1 ? "Video" : "Videos"} Created
          </span>
        </div>

        {recentVideos.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel bg-[#0a0a0d] border border-white/10 text-center space-y-2">
            <Film className="w-8 h-8 text-neutral-500 mx-auto mb-1" />
            <p className="text-xs text-neutral-300 font-sans">No videos generated yet. Your created videos will automatically appear here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentVideos.map((item) => (
              <Card key={item.id} className="glass-panel bg-[#0a0a0d] border-white/10 overflow-hidden rounded-xl group flex flex-col justify-between">
                <div className="aspect-video relative bg-black flex items-center justify-center overflow-hidden">
                  {item.output_url ? (
                    <video src={item.output_url} controls className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-3">
                      <Film className="w-6 h-6 text-neutral-500 mx-auto mb-1" />
                      <span className="text-[10px] text-neutral-400 font-mono">{item.status}</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded ${
                      item.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-[10px] text-neutral-300 line-clamp-2 font-sans font-light leading-relaxed">
                    "{item.prompt}"
                  </p>
                  {item.output_url && item.status === "COMPLETED" && (
                    <a
                      href={item.output_url}
                      download={`Cinroom_Commercial_${item.id}.mp4`}
                      className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-sans text-[10px] uppercase font-medium flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                    >
                      <Download className="w-3 h-3 text-red-400" /> Download MP4
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* REFINED ACTION BUTTON AT THE BOTTOM STICKY BAR */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-40 p-3 sm:p-4 bg-[#060608]/95 border-t border-white/10 backdrop-blur-2xl shadow-[0_-15px_40px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
            {renderIcon(activeModeConfig.iconName)}
          </div>
          <div>
            <div className="text-xs font-serif text-white font-semibold">
              {activeModeConfig.title} Commercial Video
            </div>
            <div className="text-[10px] font-sans text-neutral-400">
              Requires {creditCost} Credits • {duration} • {aspectRatio}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isSubmitting || isUploading}
          className="flex-1 sm:flex-initial h-12 px-6 sm:px-8 text-xs font-sans tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold rounded-xl cursor-pointer disabled:opacity-50 shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-red-400/40"
        >
          {isSubmitting ? "Initializing Pipeline..." : `Generate Commercial (${creditCost} Credits)`}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
