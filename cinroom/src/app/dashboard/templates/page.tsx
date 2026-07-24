import { TemplateCard, Template } from "@/components/features/templates/template-card";

const templates: Template[] = [
  {
    id: "obsidian-rotation",
    title: "Obsidian 360 Rotation",
    description: "Slow, cinematic 360-degree orbit on dark glass surface focusing on central diamond radiance.",
    duration: "10s",
    aspectRatio: "16:9",
    category: "HIGH JEWELRY",
    previewUrl: "/hero-ring.png",
  },
  {
    id: "museum-reveal",
    title: "Museum Emerald Reveal",
    description: "Directional spotlight sweeping across platinum prongs and rich green emerald facets.",
    duration: "15s",
    aspectRatio: "16:9",
    category: "COLLECTION LAUNCH",
    previewUrl: "/emerald-necklace.png",
  },
  {
    id: "gold-macro",
    title: "18K Gold Velvet Pan",
    description: "Ultra close-up macro tracking shot traversing textured gold surfaces with diamond highlights.",
    duration: "10s",
    aspectRatio: "9:16",
    category: "SOCIAL REELS",
    previewUrl: "/gold-bracelet.png",
  },
  {
    id: "floating-caustics",
    title: "Floating Solitaire Caustics",
    description: "Floating diamond in weightless mid-air with abstract ray-traced bokeh light reflections.",
    duration: "10s",
    aspectRatio: "1:1",
    category: "EDITORIAL AD",
    previewUrl: "/hero-ring.png",
  },
  {
    id: "golden-hour",
    title: "Warm Champagne Studio",
    description: "Soft warm golden studio lighting highlighting rich warm tones and yellow diamonds.",
    duration: "15s",
    aspectRatio: "16:9",
    category: "WARM STUDIO",
    previewUrl: "/gold-bracelet.png",
  },
  {
    id: "black-infinity",
    title: "Black Studio Minimal",
    description: "Stark, high-contrast monochrome lighting emphasizing extreme metal purity.",
    duration: "5s",
    aspectRatio: "9:16",
    category: "MINIMALIST",
    previewUrl: "/emerald-necklace.png",
  }
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/70 mb-2 block">
            // CINEMATIC PRESETS
          </span>
          <h1 className="text-3xl font-light text-white tracking-tight">Lighting & Camera Presets</h1>
        </div>
        <p className="text-xs text-neutral-400 font-mono">
          24 PRESETS AVAILABLE • OPTICAL ENGINE v2.4
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
