"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Upload,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  Info,
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

  // Common Required Inputs
  const [duration, setDuration] = useState<"5s" | "10s" | "15s">("10s");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");

  // Image File States & Preview URLs
  const [jewelryFile, setJewelryFile] = useState<File | null>(null);
  const [jewelryPreview, setJewelryPreview] = useState<string>("/hero-ring.png");
  const [brandFile, setBrandFile] = useState<File | null>(null);
  const [brandPreview, setBrandPreview] = useState<string | null>(null);

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

  const activeModeConfig =
    GENERATION_MODES.find((m) => m.id === selectedMode) || GENERATION_MODES[0];

  const creditCost = 3; // 3 credits per 4K Commercial Video

  const handleJewelryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setJewelryFile(file);
      setJewelryPreview(URL.createObjectURL(file));
      toast.success(`Selected Jewelry Asset: ${file.name}`);
    }
  };

  const handleBrandUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBrandFile(file);
      setBrandPreview(URL.createObjectURL(file));
      toast.success(`Selected Brand Guideline: ${file.name}`);
    }
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

      // 1. Upload Jewelry Image to R2 if a new file was uploaded
      let uploadedJewelryUrl = jewelryPreview;
      if (jewelryFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", jewelryFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedJewelryUrl = uploadData.url;
        }
        setIsUploading(false);
      }

      // 2. Upload Brand Guideline Image if provided
      let uploadedBrandUrl = brandPreview || null;
      if (brandFile) {
        const formData = new FormData();
        formData.append("file", brandFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedBrandUrl = uploadData.url;
        }
      }

      // 3. Fetch user wallet balance
      const { data: wallet } = await supabase
        .from("user_wallets")
        .select("available_credits")
        .eq("user_id", userId)
        .single();

      const availableCredits = Number(wallet?.available_credits || 0);

      if (availableCredits < creditCost) {
        toast.error(
          `Insufficient credits (${availableCredits} available). This render requires ${creditCost} credits.`,
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
        jewelry_image: uploadedJewelryUrl,
        brand_guideline_image: uploadedBrandUrl || undefined,
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

      // 5. Deduct Credits
      const { data: rpcRes, error: rpcErr } = await supabase.rpc("deduct_user_credits", {
        p_user_id: userId,
        p_cost: creditCost,
        p_asset_type: "COMMERCIAL_VIDEO",
        p_description: `Render Mode: ${activeModeConfig.title} (${aspectRatio})`,
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
          description: `Render Mode: ${activeModeConfig.title} (${aspectRatio})`,
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
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Page Header */}
      <div className="border-b border-white/[0.06] pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-1 block">
          // CINROOM STUDIO ENGINE
        </span>
        <h1 className="text-3xl font-light text-white tracking-tight">Jewelry Video Generator</h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Select a mode, upload your jewelry piece, and render an ad-quality 4K cinematic commercial.
        </p>
      </div>

      {/* MODE SELECTOR CARDS (5 MODES) */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
          Select Video Generation Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {GENERATION_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-amber-400/10 border-amber-200/60 shadow-[0_0_25px_rgba(197,168,128,0.2)] text-white scale-[1.02]"
                    : "bg-[#09090c] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected
                          ? "bg-amber-400/20 text-amber-200 border border-amber-200/40"
                          : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      {renderIcon(mode.iconName)}
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-200/80 uppercase border border-white/5">
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{mode.title}</h3>
                  <p className="text-[10px] text-neutral-400 font-light line-clamp-2 leading-relaxed">
                    {mode.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.06] text-[9px] font-mono text-neutral-500">
                  {mode.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN FORM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: ASSET UPLOAD & LIVE PREVIEW */}
        <div className="lg:col-span-1 space-y-6">
          {/* Jewelry Image Upload (REQUIRED) */}
          <Card className="glass-panel border-white/10 bg-[#08080a] p-5 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-3">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-amber-200 flex items-center justify-between">
                <span>1. Upload Jewelry Image</span>
                <span className="text-[9px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  REQUIRED
                </span>
              </CardTitle>
              <CardDescription className="text-[11px] text-neutral-400 font-light">
                Single source of truth. Your product is preserved 100% exactly.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-3">
              {/* Preview Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10 group flex items-center justify-center">
                <img
                  src={jewelryPreview}
                  alt="Jewelry Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-200/40 flex items-center justify-center text-amber-200 mb-2 backdrop-blur-md">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-white font-medium">Change Jewelry Image</span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-1">PNG or JPG up to 25MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleJewelryUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Brand Guideline Image Upload (OPTIONAL) */}
          <Card className="glass-panel border-white/10 bg-[#08080a] p-5 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-3">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>2. Brand Color / Guideline</span>
                <span className="text-[9px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                  OPTIONAL
                </span>
              </CardTitle>
              <CardDescription className="text-[11px] text-neutral-400 font-light">
                Optional brand palette or aesthetic guide. If omitted, AI auto-creates a luxury visual identity.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              <label className="border border-dashed border-white/15 hover:border-amber-200/40 rounded-xl p-4 flex items-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                {brandPreview ? (
                  <img
                    src={brandPreview}
                    alt="Brand Preview"
                    className="w-10 h-10 rounded-lg object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-mono text-white">
                    {brandFile ? brandFile.name : "Upload Brand Palette"}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500">Click to attach brand image</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBrandUpload}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>

          {/* Production Cost Summary */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-200/20 bg-amber-500/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Render Cost:</span>
              <span className="text-amber-200 font-bold text-sm">{creditCost} Credits</span>
            </div>
            <p className="text-[10px] font-mono text-neutral-500 leading-relaxed">
              Deducted automatically from your Atelier Credit Wallet upon rendering.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC WORKFLOW INPUTS */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-white/10 bg-[#08080a] p-6 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/80 block mb-1">
                    WORKFLOW CONFIGURATION
                  </span>
                  <CardTitle className="text-xl font-light text-white flex items-center gap-2">
                    {renderIcon(activeModeConfig.iconName)}
                    {activeModeConfig.title} Workflow
                  </CardTitle>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 text-xs font-mono">
                  {activeModeConfig.badge}
                </span>
              </div>
              <CardDescription className="text-xs text-neutral-400 font-light mt-2">
                {activeModeConfig.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 pt-6 space-y-6">
              {/* MODE 5: AI DIRECTOR CREATIVE PROMPT */}
              {selectedMode === "ai_director" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                      Creative Concept Prompt <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-amber-200/80">
                      Single word or full paragraph
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={creativePrompt}
                    onChange={(e) => setCreativePrompt(e.target.value)}
                    placeholder="e.g. Royal Wedding, Luxury Museum, Paris Fashion Week, or describe your complete concept..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-200/50 transition-colors"
                  />

                  {/* Preset Clickable Ideas */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      Quick Creative Ideas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AI_DIRECTOR_EXAMPLES.map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => setCreativePrompt(ex)}
                          className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-amber-400/10 border border-white/10 hover:border-amber-200/30 text-[10px] font-mono text-neutral-300 hover:text-amber-200 transition-colors cursor-pointer"
                        >
                          + {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 3: FANTASY WORLD OPTIONAL THEME */}
              {selectedMode === "fantasy_world" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                      Fantasy Realm / World Theme
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">OPTIONAL</span>
                  </div>
                  <Input
                    type="text"
                    value={fantasyTheme}
                    onChange={(e) => setFantasyTheme(e.target.value)}
                    placeholder="e.g. Floating Crystal Palace, Starlight Nebula, Ethereal Forest (Leave blank for AI choice)"
                    className="h-11 bg-white/[0.03] border-white/10 text-white font-mono text-xs placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                  <p className="text-[10px] font-mono text-neutral-500">
                    If left blank, the AI will automatically generate the most suitable fantasy world.
                  </p>
                </div>
              )}

              {/* MODE 4: ANIMAL CAMPAIGN OPTIONAL ANIMAL */}
              {selectedMode === "animal_campaign" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                      Majestic Companion Animal
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">OPTIONAL</span>
                  </div>
                  <Input
                    type="text"
                    value={animal}
                    onChange={(e) => setAnimal(e.target.value)}
                    placeholder="e.g. Black Panther, Snow Leopard, White Peacock, Royal Eagle (Leave blank for AI choice)"
                    className="h-11 bg-white/[0.03] border-white/10 text-white font-mono text-xs placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                  <p className="text-[10px] font-mono text-neutral-500">
                    If left blank, the AI automatically selects the animal best matching the jewelry aesthetics.
                  </p>
                </div>
              )}

              {/* MODEL CHARACTERISTICS (FOR MODES 2, 3, 5) */}
              {activeModeConfig.requiresModelInfo && (
                <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                  <label className="text-xs font-mono text-amber-200 uppercase tracking-wider block">
                    Model & Character Profile
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gender */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ backgroundColor: "#0c0c10", color: "#ffffff" }}
                        className="w-full bg-[#0c0c10] text-white border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono focus:outline-none focus:border-amber-200/50"
                      >
                        <option value="Female" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">Female Model</option>
                        <option value="Male" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">Male Model</option>
                        <option value="Unisex" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">Unisex / High Fashion</option>
                      </select>
                    </div>

                    {/* Age Range */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Age Range</label>
                      <select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ backgroundColor: "#0c0c10", color: "#ffffff" }}
                        className="w-full bg-[#0c0c10] text-white border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono focus:outline-none focus:border-amber-200/50"
                      >
                        <option value="18-25" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">18–25 Years</option>
                        <option value="25-35" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">25–35 Years (Editorial Standard)</option>
                        <option value="35-45" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">35–45 Years (Mature Luxury)</option>
                        <option value="45+" style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">45+ Years (Heritage Luxury)</option>
                      </select>
                    </div>

                    {/* Country */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Country Origin</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ backgroundColor: "#0c0c10", color: "#ffffff" }}
                        className="w-full bg-[#0c0c10] text-white border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono focus:outline-none focus:border-amber-200/50"
                      >
                        {COUNTRIES_LIST.map((c) => (
                          <option key={c} value={c} style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ethnicity */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Ethnicity</label>
                      <select
                        value={ethnicity}
                        onChange={(e) => setEthnicity(e.target.value)}
                        style={{ backgroundColor: "#0c0c10", color: "#ffffff" }}
                        className="w-full bg-[#0c0c10] text-white border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono focus:outline-none focus:border-amber-200/50"
                      >
                        {ETHNICITIES_LIST.map((eth) => (
                          <option key={eth} value={eth} style={{ backgroundColor: "#0c0c10", color: "#ffffff" }} className="bg-[#0c0c10] text-white py-2">
                            {eth}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* COMMON REQUIRED INPUTS: DURATION & ASPECT RATIO */}
              <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                      Video Duration <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["5s", "10s", "15s"] as const).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setDuration(val)}
                          className={`py-2.5 rounded-xl text-xs font-mono transition-all border ${
                            duration === val
                              ? "border-amber-200/60 bg-amber-400/10 text-amber-200 font-bold shadow-[0_0_10px_rgba(197,168,128,0.15)]"
                              : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                      Aspect Ratio <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "16:9", icon: Monitor },
                        { id: "9:16", icon: Smartphone },
                        { id: "1:1", icon: Square },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAspectRatio(opt.id as any)}
                          className={`py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition-all border ${
                            aspectRatio === opt.id
                              ? "border-amber-200/60 bg-amber-400/10 text-amber-200 font-bold shadow-[0_0_10px_rgba(197,168,128,0.15)]"
                              : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                          }`}
                        >
                          <opt.icon className="w-3.5 h-3.5" />
                          <span>{opt.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STRICT PRODUCT PRESERVATION GUARANTEE */}
              <div className="p-4 rounded-xl glass-panel bg-amber-500/[0.03] border border-amber-200/20 text-xs font-mono text-neutral-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-200 font-bold mb-0.5">Strict Product Integrity Guarantee</div>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                    The uploaded jewelry image is the single source of truth. The AI preserves your product 100% exactly as provided with zero alterations to gems, metal structure, or design.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GENERATE SUBMIT BUTTON */}
          <Button
            onClick={handleGenerate}
            disabled={isSubmitting || isUploading}
            className="w-full h-13 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-2xl shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? "Initializing Render Pipeline..."
              : `Generate ${activeModeConfig.title} Commercial (${creditCost} Credits)`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
