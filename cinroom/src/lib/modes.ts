/**
 * 5 Video Generation Modes for Cinroom
 * Preserves uploaded jewelry exactly as single source of truth.
 */

export type GenerationModeId =
  | "product_hero"
  | "model_campaign"
  | "fantasy_world"
  | "animal_campaign"
  | "ai_director";

export interface ModeOption {
  id: GenerationModeId;
  title: string;
  badge: string;
  description: string;
  iconName: "Sparkles" | "UserCheck" | "Wand2" | "PawPrint" | "Clapperboard";
  tagline: string;
  requiresModelInfo: boolean;
}

export const GENERATION_MODES: ModeOption[] = [
  {
    id: "product_hero",
    title: "Product Hero",
    badge: "PURE PRODUCT",
    description: "Create a luxury cinematic product commercial featuring only the uploaded jewelry.",
    iconName: "Sparkles",
    tagline: "360° Studio Lighting & Caustics",
    requiresModelInfo: false,
  },
  {
    id: "model_campaign",
    title: "Model Campaign",
    badge: "HIGH FASHION",
    description: "Create a premium luxury fashion campaign featuring a model wearing the uploaded jewelry.",
    iconName: "UserCheck",
    tagline: "Vogue-Style High Fashion Editorial",
    requiresModelInfo: true,
  },
  {
    id: "fantasy_world",
    title: "Fantasy World",
    badge: "ETHEREAL REALM",
    description: "Create a cinematic luxury campaign inside a breathtaking fantasy or exotic world while preserving the uploaded jewelry exactly.",
    iconName: "Wand2",
    tagline: "Ethereal & Mystic Environments",
    requiresModelInfo: true,
  },
  {
    id: "animal_campaign",
    title: "Animal Campaign",
    badge: "MAJESTIC WILD",
    description: "Create a cinematic luxury campaign featuring the uploaded jewelry with a majestic animal while preserving the jewelry exactly.",
    iconName: "PawPrint",
    tagline: "Paired with Regal Wildlife",
    requiresModelInfo: false,
  },
  {
    id: "ai_director",
    title: "AI Director",
    badge: "CONCEPT EXPANDER",
    description: "Describe your idea in a few words or write a complete concept. The AI expands it into a world-class luxury jewelry commercial while preserving the uploaded jewelry exactly.",
    iconName: "Clapperboard",
    tagline: "Any Concept Expanded into 4K Cinema",
    requiresModelInfo: true,
  },
];

export interface ModeInputState {
  mode: GenerationModeId;
  jewelry_images?: string[];
  brand_guideline_images?: string[];
  duration: "5s" | "10s" | "15s";
  aspect_ratio: "16:9" | "9:16" | "1:1";
  gender?: string;
  age?: string;
  country?: string;
  ethnicity?: string;
  fantasy_theme?: string;
  animal?: string;
  creative_prompt?: string;
}

export const STRICT_JEWELRY_GUARDRAIL =
  "CRITICAL PRODUCT INTEGRITY REQUIREMENT: The uploaded jewelry images are the single source of truth for the product's appearance. Preserve the uploaded jewelry EXACTLY as provided across all angles, with no redesign, no additional jewelry pieces, no extra gemstones, no metal changes, and no structural alterations. Only the camera motion, lighting, environment, characters, and atmosphere are generated around the exact jewelry piece.";

export function buildMasterPrompt(inputs: ModeInputState): string {
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
      ? ` (Multi-angle product reference attached: ${jewelry_images.length} views provided for 360-degree geometric accuracy)`
      : "";

  const brandGuideNote =
    brand_guideline_images.length > 0
      ? ` (Brand guidelines attached: ${brand_guideline_images.length} reference palettes provided for color matching)`
      : "";

  switch (mode) {
    case "product_hero":
      masterPrompt =
        `LUXURY PRODUCT HERO COMMERCIAL${multiAngleNote}${brandGuideNote}: Solo high-jewelry presentation of the uploaded piece. Set in an ultra-clean obsidian mirror studio with 360-degree orbital camera motion, raytraced caustics, macro light flares, and 8K cinematic focus.`;
      break;

    case "model_campaign":
      masterPrompt =
        `HIGH-FASHION EDITORIAL MODEL CAMPAIGN${multiAngleNote}${brandGuideNote}: A luxury fashion campaign featuring a ${age} year old ${ethnicity} ${gender} model from ${country} elegantly wearing the uploaded jewelry piece. Shot on 85mm lens with soft cinematic key lighting, shallow depth of field, high-end Vogue magazine aesthetic.`;
      break;

    case "fantasy_world": {
      const selectedWorld = fantasy_theme?.trim()
        ? fantasy_theme.trim()
        : "an ethereal crystal starlight sanctuary with floating bioluminescent particles and obsidian glass caustics";
      masterPrompt =
        `ETHEREAL FANTASY WORLD CAMPAIGN${multiAngleNote}${brandGuideNote}: A breathtaking luxury fantasy commercial set inside ${selectedWorld}. Features a ${age} year old ${ethnicity} ${gender} model from ${country} wearing the uploaded jewelry piece with cinematic atmospheric lighting and floating particle reflections.`;
      break;
    }

    case "animal_campaign": {
      const selectedAnimal = animal?.trim()
        ? animal.trim()
        : "a regal panther with a sleek dark coat and golden eyes";
      masterPrompt =
        `MAJESTIC ANIMAL LUXURY CAMPAIGN${multiAngleNote}${brandGuideNote}: High-converting luxury commercial pairing the uploaded fine jewelry with ${selectedAnimal}. High-contrast obsidian studio lighting, slow-motion grace, majestic atmosphere, 4K film grade.`;
      break;
    }

    case "ai_director": {
      const expandedConcept = creative_prompt?.trim()
        ? creative_prompt.trim()
        : "Paris Fashion Week High Jewelry Gala";
      masterPrompt =
        `AI DIRECTOR EXPANDED CONCEPT${multiAngleNote}${brandGuideNote}: World-class luxury jewelry commercial based on the concept: "${expandedConcept}". Intelligently expanded into a high-fashion cinematic film featuring a ${age} year old ${ethnicity} ${gender} model from ${country} in an immersive luxury environment tailored to the concept.`;
      break;
    }
  }

  return `${masterPrompt} ${STRICT_JEWELRY_GUARDRAIL}`;
}

export const COUNTRIES_LIST = [
  "France",
  "Italy",
  "United States",
  "United Kingdom",
  "India",
  "Japan",
  "Brazil",
  "United Arab Emirates",
  "Switzerland",
  "Spain",
  "Australia",
  "South Korea",
];

export const ETHNICITIES_LIST = [
  "Caucasian",
  "East Asian",
  "South Asian",
  "Black / African",
  "Hispanic / Latina",
  "Middle Eastern",
  "Multiracial",
];

export const AI_DIRECTOR_EXAMPLES = [
  "Royal Wedding",
  "Luxury Museum",
  "Elegant Black & Gold",
  "Paris Fashion Week",
  "Underwater Diamond Campaign",
];
