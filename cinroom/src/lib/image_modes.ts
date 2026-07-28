/**
 * 5 Image Generation Modes for Cinroom Jewelry Image Studio
 * Uses GPT Image 2 / DALL-E 3 API behind the scenes.
 * Preserves uploaded jewelry exactly as single source of truth.
 */

export type ImageGenerationModeId =
  | "product_hero"
  | "model_campaign"
  | "fantasy_world"
  | "animal_campaign"
  | "ai_director";

export interface ImageModeOption {
  id: ImageGenerationModeId;
  title: string;
  badge: string;
  description: string;
  iconName: "Sparkles" | "UserCheck" | "Wand2" | "PawPrint" | "Clapperboard";
  tagline: string;
  requiresModelInfo: boolean;
}

export const IMAGE_GENERATION_MODES: ImageModeOption[] = [
  {
    id: "product_hero",
    title: "Product Hero",
    badge: "PURE PRODUCT EDITORIAL",
    description: "Create a world-class luxury product photography campaign featuring only the uploaded jewelry.",
    iconName: "Sparkles",
    tagline: "Medium-Format Studio Lighting & Caustics",
    requiresModelInfo: false,
  },
  {
    id: "model_campaign",
    title: "Model Campaign",
    badge: "VOGUE EDITORIAL",
    description: "Create a premium luxury fashion campaign featuring a model wearing the uploaded jewelry.",
    iconName: "UserCheck",
    tagline: "High-Fashion Editorial & Cultural Styling",
    requiresModelInfo: true,
  },
  {
    id: "fantasy_world",
    title: "Fantasy World",
    badge: "ETHEREAL REALM",
    description: "Create a breathtaking luxury campaign inside a spectacular fantasy or exotic environment.",
    iconName: "Wand2",
    tagline: "Cohesive Mystic Environments & Lighting",
    requiresModelInfo: true,
  },
  {
    id: "animal_campaign",
    title: "Animal Campaign",
    badge: "MAJESTIC WILD",
    description: "Create a luxury campaign where the uploaded jewelry is beautifully paired with a majestic animal.",
    iconName: "PawPrint",
    tagline: "Complemented by Regal Wildlife",
    requiresModelInfo: false,
  },
  {
    id: "ai_director",
    title: "AI Director",
    badge: "CONCEPT EXPANDER",
    description: "Describe your idea in a few words or write a detailed concept. The AI transforms it into a premium luxury jewelry campaign.",
    iconName: "Clapperboard",
    tagline: "Any Concept Expanded into 8K Editorial",
    requiresModelInfo: true,
  },
];

export interface ImageModeInputState {
  mode: ImageGenerationModeId;
  jewelry_images?: string[];
  brand_guideline_images?: string[];
  aspect_ratio: "16:9" | "9:16" | "1:1";
  gender?: string;
  age?: string;
  country?: string;
  ethnicity?: string;
  fantasy_theme?: string;
  animal?: string;
  creative_prompt?: string;
}

export const STRICT_IMAGE_JEWELRY_GUARDRAIL =
  "GLOBAL PRODUCT PRESERVATION DIRECTIVE: The uploaded jewelry image is the single source of truth. Never redesign or modify the jewelry. Never regenerate a different version of the jewelry. Never add extra chains, stones, pendants, layers, or decorative elements. Never remove visible details. Preserve the exact geometry, proportions, materials, and craftsmanship. Generate one cohesive campaign world rather than unrelated backgrounds. Apply brand guidelines to the environment and lighting—not the jewelry.";

export function buildImageMasterPrompt(inputs: ImageModeInputState): string {
  const {
    mode,
    jewelry_images = [],
    brand_guideline_images = [],
    gender = "Female",
    age = "25-35",
    country = "France",
    ethnicity = "Caucasian",
    fantasy_theme,
    animal,
    creative_prompt,
  } = inputs;

  let masterPrompt = "";

  const multiAngleNote =
    jewelry_images.length > 1
      ? ` (Multi-angle product reference attached: ${jewelry_images.length} views provided for exact 3D reproduction)`
      : "";

  const brandGuideNote =
    brand_guideline_images.length > 0
      ? ` (Brand guidelines attached: ${brand_guideline_images.length} color swatches and visual identity guides applied to architectural environment)`
      : "";

  switch (mode) {
    case "product_hero":
      masterPrompt =
        `PRODUCT HERO LUXURY EDITORIAL CAMPAIGN${multiAngleNote}${brandGuideNote}: World-class luxury editorial product photography campaign featuring only the uploaded fine jewelry piece. Built inside a single cohesive architectural studio environment inspired by the metal color, gemstone color, craftsmanship, and brand visual identity. Hasselblad medium-format camera focus, raytraced caustics, macro light dispersion.`;
      break;

    case "model_campaign":
      masterPrompt =
        `MODEL CAMPAIGN HIGH-FASHION EDITORIAL${multiAngleNote}${brandGuideNote}: Premium luxury fashion campaign featuring a ${age} year old ${ethnicity} ${gender} model from ${country} wearing the uploaded jewelry piece. Cultural styling and fashion attire appropriate for ${country} and ${ethnicity}. Shot on 85mm f/1.2 lens with soft key lighting, shallow depth of field, Vogue editorial aesthetic.`;
      break;

    case "fantasy_world": {
      const selectedWorld = fantasy_theme?.trim()
        ? fantasy_theme.trim()
        : "an ethereal crystal starlight sanctuary with floating luminescent particles and obsidian glass caustics";
      masterPrompt =
        `FANTASY WORLD LUXURY CAMPAIGN${multiAngleNote}${brandGuideNote}: Breathtaking luxury jewelry editorial photography set inside a single cohesive fantasy realm: "${selectedWorld}". Features a ${age} year old ${ethnicity} ${gender} model from ${country} wearing the uploaded jewelry piece amidst ethereal atmospheric haze and raytraced reflections. Blend fantasy with premium luxury aesthetics.`;
      break;
    }

    case "animal_campaign": {
      const selectedAnimal = animal?.trim()
        ? animal.trim()
        : "a regal panther with a sleek dark coat and golden eyes";
      masterPrompt =
        `ANIMAL CAMPAIGN MAJESTIC LUXURY${multiAngleNote}${brandGuideNote}: High-converting luxury editorial photography pairing the uploaded fine jewelry with ${selectedAnimal}. High-contrast obsidian studio architecture, majestic companion presence complementing the jewelry piece without dominating composition.`;
      break;
    }

    case "ai_director": {
      const expandedConcept = creative_prompt?.trim()
        ? creative_prompt.trim()
        : "Paris Fashion Week High Jewelry Gala";
      masterPrompt =
        `AI DIRECTOR EXPANDED CONCEPT CAMPAIGN${multiAngleNote}${brandGuideNote}: World-class editorial luxury jewelry photography based on concept: "${expandedConcept}". Intelligently expanded into a complete high-fashion advertising campaign featuring a ${age} year old ${ethnicity} ${gender} model from ${country} in an immersive luxury architectural setting.`;
      break;
    }
  }

  return `${masterPrompt} ${STRICT_IMAGE_JEWELRY_GUARDRAIL}`;
}

export const IMAGE_AI_DIRECTOR_EXAMPLES = [
  "Royal Wedding",
  "Paris Fashion Week",
  "Scandinavian Luxury",
  "Black & Gold",
  "Modern Museum",
  "Underwater Elegance",
  "Futuristic Jewelry Campaign",
];
