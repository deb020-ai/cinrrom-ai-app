"use client";

import { useState } from "react";
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Page Header */}
      <div className="border-b border-white/[0.06] pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-1 block">
          // CINROOM IMAGE STUDIO ENGINE
        </span>
        <h1 className="text-3xl font-light text-white tracking-tight">Jewelry Image Generator</h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Select a template mode, upload your jewelry images, and generate world-class editorial photography campaigns.
        </p>
      </div>

      {/* MODE SELECTOR CARDS (5 MODES) */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
          Select Image Generation Template Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {IMAGE_GENERATION_MODES.map((mode) => {
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
        {/* LEFT COLUMN: MULTI-IMAGE UPLOADS */}
        <div className="lg:col-span-1 space-y-6">
          {/* MULTIPLE JEWELRY IMAGES UPLOAD */}
          <Card className="glass-panel border-white/10 bg-[#08080a] p-5 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-3">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-amber-200 flex items-center justify-between">
                <span>1. Upload Jewelry Images</span>
                <span className="text-[9px] text-amber-200/80 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-200/20">
                  {jewelryItems.length} {jewelryItems.length === 1 ? "Image" : "Images"}
                </span>
              </CardTitle>
              <CardDescription className="text-[11px] text-neutral-400 font-light">
                Upload 1 or multiple angles of your jewelry. Preserved 100% exactly.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {/* Primary Main Preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                <img
                  src={jewelryItems[0]?.previewUrl || "/hero-ring.png"}
                  alt="Primary Jewelry View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-amber-200">
                  Primary Angle
                </div>
              </div>

              {/* Multi-Image Thumbnails Gallery Grid */}
              <div className="grid grid-cols-3 gap-2">
                {jewelryItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-black group"
                  >
                    <img
                      src={item.previewUrl}
                      alt={`Jewelry Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeJewelryItem(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 hover:bg-red-500 cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add More Button */}
                <label className="aspect-square rounded-lg border border-dashed border-white/20 hover:border-amber-200/50 bg-white/[0.02] hover:bg-amber-400/10 flex flex-col items-center justify-center cursor-pointer transition-all text-neutral-400 hover:text-amber-200">
                  <Plus className="w-5 h-5 mb-0.5" />
                  <span className="text-[9px] font-mono text-center">Add Angle</span>
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

          {/* MULTIPLE BRAND GUIDELINES / COLORS UPLOAD */}
          <Card className="glass-panel border-white/10 bg-[#08080a] p-5 rounded-2xl">
            <CardHeader className="px-0 pt-0 pb-3">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>2. Brand Guidelines / Colors</span>
                <span className="text-[9px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded font-mono">
                  {brandItems.length > 0 ? `${brandItems.length} Attached` : "OPTIONAL"}
                </span>
              </CardTitle>
              <CardDescription className="text-[11px] text-neutral-400 font-light">
                Upload brand color swatches, logos, or architectural reference guides.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-3">
              {brandItems.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {brandItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-black group"
                    >
                      <img
                        src={item.previewUrl}
                        alt={`Brand Guide ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeBrandItem(idx)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 hover:bg-red-500 cursor-pointer"
                        title="Remove brand image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="border border-dashed border-white/15 hover:border-amber-200/40 rounded-xl p-3.5 flex items-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-amber-200 shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-white font-medium">
                    {brandItems.length > 0 ? "+ Add More Brand Files" : "Upload Brand Palette(s)"}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500">Applied strictly to environment</div>
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

          {/* Render Cost Summary */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-200/20 bg-amber-500/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Image Render Cost:</span>
              <span className="text-amber-200 font-bold text-sm">{creditCost} Credit</span>
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
                    EDITORIAL IMAGE WORKFLOW
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
                    placeholder="e.g. Royal Wedding, Paris Fashion Week, Scandinavian Luxury, Black & Gold, Modern Museum..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-200/50 transition-colors"
                  />

                  {/* Preset Clickable Ideas */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      Quick Editorial Concepts:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {IMAGE_AI_DIRECTOR_EXAMPLES.map((ex) => (
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
                      Fantasy Realm / Environment Theme
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
                    If left blank, the AI will build a single cohesive fantasy world matching your jewelry.
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
                    The animal complements the composition without dominating the jewelry piece.
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

              {/* COMMON REQUIRED INPUT: ASPECT RATIO */}
              <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                    Image Aspect Ratio <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "16:9", label: "16:9 Landscape", icon: Monitor },
                      { id: "9:16", label: "9:16 Portrait", icon: Smartphone },
                      { id: "1:1", label: "1:1 Square", icon: Square },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAspectRatio(opt.id as any)}
                        className={`py-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all border ${
                          aspectRatio === opt.id
                            ? "border-amber-200/60 bg-amber-400/10 text-amber-200 font-bold shadow-[0_0_10px_rgba(197,168,128,0.15)]"
                            : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                        }`}
                      >
                        <opt.icon className="w-3.5 h-3.5" />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STRICT PRODUCT PRESERVATION GUARANTEE */}
              <div className="p-4 rounded-xl glass-panel bg-amber-500/[0.03] border border-amber-200/20 text-xs font-mono text-neutral-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <div className="text-amber-200 font-bold mb-0.5">Strict Global Product Preservation Guarantee</div>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                    The uploaded jewelry image is the single source of truth. Zero redesigns, zero extra gemstones or metal alterations. A cohesive architectural campaign environment is rendered around your exact product.
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
              ? "Rendering Editorial Image Campaign..."
              : `Generate ${activeModeConfig.title} Image Campaign (${creditCost} Credit)`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
