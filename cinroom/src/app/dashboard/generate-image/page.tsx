"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  IMAGE_GENERATION_MODES,
  ImageGenerationModeId,
  IMAGE_AI_DIRECTOR_EXAMPLES,
} from "@/lib/image_modes";
import { COUNTRIES_LIST, ETHNICITIES_LIST } from "@/lib/modes";

interface UploadedItem {
  file?: File;
  previewUrl: string;
}

export default function GenerateImagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialModeParam = searchParams.get("mode") as ImageGenerationModeId | null;

  // Selected Mode
  const [selectedMode, setSelectedMode] = useState<ImageGenerationModeId>(
    initialModeParam && IMAGE_GENERATION_MODES.some((m) => m.id === initialModeParam)
      ? initialModeParam
      : "product_hero"
  );

  // Common Inputs
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

  const activeModeConfig =
    IMAGE_GENERATION_MODES.find((m) => m.id === selectedMode) || IMAGE_GENERATION_MODES[0];

  const creditCost = 1; // 1 credit per Image Campaign Render

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
      toast.error("Please provide a Creative Concept prompt for AI Director mode.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        toast.error("Please sign in to generate luxury campaign images.");
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

      // 3. Call backend /api/generate-image API
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          mode: selectedMode,
          jewelryImages: uploadedJewelryUrls,
          brandGuidelineImages: uploadedBrandUrls,
          aspectRatio,
          gender,
          age,
          country,
          ethnicity,
          fantasyTheme,
          animal,
          creativePrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Failed to generate luxury image campaign.");
        return;
      }

      toast.success(`Deducted ${creditCost} Credit. Editorial Image Campaign Rendered!`);
      router.push(`/dashboard/result?id=${data.id}`);
    } catch (err: any) {
      console.error("Image Generation Error:", err);
      toast.error("An error occurred while generating campaign image.");
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
        return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-28">
      {/* Page Header */}
      <div className="border-b border-blue-500/15 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-300 block">
            // CINROOM IMAGE STUDIO ENGINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">Jewelry Image Generator</h1>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-mono text-blue-300 bg-blue-600/15 px-3 py-1 rounded-full border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            GPT IMAGE 2 • 1 CREDIT
          </span>
        </div>
      </div>

      {/* STEP 1: MODE SELECTOR CARDS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-white font-semibold uppercase tracking-wider block">
            STEP 1: SELECT TEMPLATE MODE
          </label>
          <span className="text-[10px] font-mono text-slate-400">Choose 1 of 5 Image Workflows</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {IMAGE_GENERATION_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600/20 border-blue-400/60 shadow-[0_0_25px_rgba(59,130,246,0.25)] text-white scale-[1.02]"
                    : "bg-[#080d22] border-blue-500/10 text-slate-300 hover:text-white hover:border-blue-400/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-1.5 rounded-xl ${
                        isSelected
                          ? "bg-blue-500/30 text-blue-300 border border-blue-400/50"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {renderIcon(mode.iconName)}
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 uppercase border border-blue-400/20">
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white mb-0.5">{mode.title}</h3>
                  <p className="text-[9px] text-slate-400 font-light line-clamp-2 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN FORM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: UPLOADS */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="glass-panel border-blue-500/15 bg-[#080d22]/80 p-4 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-blue-300 flex items-center justify-between">
                <span>STEP 2: UPLOAD JEWELRY</span>
                <span className="text-[9px] text-blue-300 font-mono bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                  {jewelryItems.length} {jewelryItems.length === 1 ? "Image" : "Images"}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-blue-500/20 flex items-center justify-center">
                <img
                  src={jewelryItems[0]?.previewUrl || "/hero-ring.png"}
                  alt="Primary Jewelry View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-blue-400/30 text-[9px] font-mono text-blue-300">
                  Primary Angle
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {jewelryItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-blue-500/20 bg-black group"
                  >
                    <img
                      src={item.previewUrl}
                      alt={`Jewelry Angle ${idx + 1}`}
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

                <label className="aspect-square rounded-lg border border-dashed border-blue-400/30 hover:border-blue-400/60 bg-blue-900/10 hover:bg-blue-600/20 flex flex-col items-center justify-center cursor-pointer transition-all text-slate-300 hover:text-white">
                  <Plus className="w-4 h-4 mb-0.5 text-blue-400" />
                  <span className="text-[8px] font-mono text-center">Add Angle</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleJewelryUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* BRAND GUIDELINE UPLOAD */}
          <Card className="glass-panel border-blue-500/15 bg-[#080d22]/80 p-4 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>BRAND PALETTES (OPTIONAL)</span>
                <span className="text-[9px] text-slate-400 bg-white/5 px-2 py-0.5 rounded font-mono">
                  {brandItems.length > 0 ? `${brandItems.length} Attached` : "OPTIONAL"}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-2">
              {brandItems.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {brandItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden border border-blue-500/20 bg-black group"
                    >
                      <img
                        src={item.previewUrl}
                        alt={`Brand Guide ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeBrandItem(idx)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="border border-dashed border-blue-500/20 hover:border-blue-400/50 rounded-xl p-3 flex items-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-white font-medium">
                    {brandItems.length > 0 ? "+ Add More Files" : "Upload Brand Palette"}
                  </div>
                  <div className="text-[8px] font-mono text-slate-400">Color swatches & guides</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleBrandUpload}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: WORKFLOW CONFIGURATION */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="glass-panel border-blue-500/15 bg-[#080d22]/80 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-3">
              <h2 className="text-base font-light text-white flex items-center gap-2">
                {renderIcon(activeModeConfig.iconName)}
                STEP 3: {activeModeConfig.title} Details
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-300 text-[10px] font-mono uppercase">
                {activeModeConfig.badge}
              </span>
            </div>

            {/* AI DIRECTOR CONCEPT */}
            {selectedMode === "ai_director" && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-white font-semibold uppercase tracking-wider block">
                  Creative Concept Prompt <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={creativePrompt}
                  onChange={(e) => setCreativePrompt(e.target.value)}
                  placeholder="e.g. Royal Wedding, Paris Fashion Week, Scandinavian Luxury..."
                  className="w-full bg-slate-950/80 border border-blue-500/20 rounded-xl p-3 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400/60"
                />
                <div className="flex flex-wrap gap-1.5">
                  {IMAGE_AI_DIRECTOR_EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setCreativePrompt(ex)}
                      className="px-2 py-0.5 rounded-full bg-blue-900/30 hover:bg-blue-600/30 border border-blue-400/30 text-[9px] font-mono text-slate-300 hover:text-white cursor-pointer"
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
                <label className="text-xs font-mono text-white font-semibold uppercase tracking-wider block">
                  Fantasy Realm / Theme (Optional)
                </label>
                <Input
                  type="text"
                  value={fantasyTheme}
                  onChange={(e) => setFantasyTheme(e.target.value)}
                  placeholder="e.g. Floating Crystal Palace, Starlight Sanctuary..."
                  className="h-10 bg-slate-950/80 border-blue-500/20 text-white font-mono text-xs rounded-xl"
                />
              </div>
            )}

            {/* ANIMAL */}
            {selectedMode === "animal_campaign" && (
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white font-semibold uppercase tracking-wider block">
                  Companion Animal (Optional)
                </label>
                <Input
                  type="text"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value)}
                  placeholder="e.g. Black Panther, Snow Leopard, White Peacock..."
                  className="h-10 bg-slate-950/80 border-blue-500/20 text-white font-mono text-xs rounded-xl"
                />
              </div>
            )}

            {/* MODEL PROFILE */}
            {activeModeConfig.requiresModelInfo && (
              <div className="space-y-3 pt-2 border-t border-blue-500/15">
                <label className="text-xs font-mono text-blue-300 font-semibold uppercase tracking-wider block">
                  Model & Character Profile
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">GENDER</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={{ backgroundColor: "#090e24", color: "#ffffff" }}
                      className="w-full bg-[#090e24] text-white border border-blue-500/20 rounded-xl py-2 px-2.5 text-xs font-mono"
                    >
                      <option value="Female">Female Model</option>
                      <option value="Male">Male Model</option>
                      <option value="Unisex">Unisex / High Fashion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">AGE RANGE</label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{ backgroundColor: "#090e24", color: "#ffffff" }}
                      className="w-full bg-[#090e24] text-white border border-blue-500/20 rounded-xl py-2 px-2.5 text-xs font-mono"
                    >
                      <option value="18-25">18–25 Years</option>
                      <option value="25-35">25–35 Years</option>
                      <option value="35-45">35–45 Years</option>
                      <option value="45+">45+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">COUNTRY ORIGIN</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      style={{ backgroundColor: "#090e24", color: "#ffffff" }}
                      className="w-full bg-[#090e24] text-white border border-blue-500/20 rounded-xl py-2 px-2.5 text-xs font-mono"
                    >
                      {COUNTRIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">ETHNICITY</label>
                    <select
                      value={ethnicity}
                      onChange={(e) => setEthnicity(e.target.value)}
                      style={{ backgroundColor: "#090e24", color: "#ffffff" }}
                      className="w-full bg-[#090e24] text-white border border-blue-500/20 rounded-xl py-2 px-2.5 text-xs font-mono"
                    >
                      {ETHNICITIES_LIST.map((eth) => (
                        <option key={eth} value={eth}>{eth}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ASPECT RATIO */}
            <div className="pt-2 border-t border-blue-500/15">
              <label className="text-[10px] font-mono text-slate-300 uppercase block mb-1.5">
                IMAGE ASPECT RATIO
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "16:9", label: "16:9 Landscape", icon: Monitor },
                  { id: "9:16", label: "9:16 Portrait", icon: Smartphone },
                  { id: "1:1", label: "1:1 Square", icon: Square },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAspectRatio(opt.id as any)}
                    className={`py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 border transition-all ${
                      aspectRatio === opt.id
                        ? "border-blue-400/60 bg-blue-600/30 text-white font-bold"
                        : "border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <opt.icon className="w-3 h-3" />
                    <span>{opt.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STRICT GUARANTEE */}
            <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-400/30 text-[11px] font-mono text-slate-200 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Strict Global Product Preservation: 100% exact jewelry reproduction.</span>
            </div>
          </Card>
        </div>
      </div>

      {/* FIXED STICKY GENERATE BAR AT THE BOTTOM */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-40 p-3 sm:p-4 bg-[#050a18]/95 border-t border-blue-500/30 backdrop-blur-2xl shadow-[0_-15px_40px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
            {renderIcon(activeModeConfig.iconName)}
          </div>
          <div>
            <div className="text-xs font-mono text-white font-semibold">
              {activeModeConfig.title} Image Campaign
            </div>
            <div className="text-[10px] font-mono text-blue-300">
              Requires {creditCost} Credit • {aspectRatio}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isSubmitting || isUploading}
          className="flex-1 sm:flex-initial h-12 px-6 sm:px-8 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Rendering..." : `Generate Image (${creditCost} Credit)`}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
