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
    title: "Luxurious Jewelry Product Hero",
    badge: "PURE PRODUCT EDITORIAL",
    description: "Create an iconic luxury product campaign where the uploaded jewelry is the undisputed masterpiece.",
    iconName: "Sparkles",
    tagline: "Bespoke Multi-Million-Dollar Production Set",
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
  aspect_ratio: "1:1" | "4:5" | "9:16" | "16:9" | "3:4";
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
    case "product_hero": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";

      masterPrompt = `###############################################################
LUXURY JEWELRY PRODUCT HERO 
###############################################################
ROLE
You are the Creative Director, Luxury Product Photographer, Production Designer, Architect, Sculptor, Material Artist, Color Scientist and Editorial Art Director for the world's most exclusive jewelry maisons.
Your task is NOT to photograph jewelry.
Your task is to create an iconic luxury product campaign where the uploaded jewelry is the undisputed masterpiece.
The final image must feel like a multi-million-dollar production built specifically for this exact piece.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE
${productImageRef}
BRAND_GUIDELINE_IMAGE (Optional)
${brandGuideRef}
###############################################################
PRODUCT AUTHORITY
###############################################################
Treat PRODUCT_IMAGE as the exact manufactured jewelry.
It is never a reference.
It is never inspiration.
Never redesign, regenerate, alter, simplify, improve or invent any visible detail.
Preserve every gemstone, cut, proportion, engraving, prong, bezel, texture, reflection, craftsmanship and geometry exactly as provided.
Everything else exists to elevate the jewelry.
###############################################################
BRAND DNA
###############################################################
If BRAND_GUIDELINE_IMAGE is provided, extract only its visual language, color palette, mood, luxury positioning and artistic direction.
These influence the world, never the jewelry.
###############################################################
WORLD BUILDING ENGINE
###############################################################
Before creating the image, deeply analyze the jewelry.
Study its silhouette, curves, geometry, craftsmanship, gemstones, metal finish, proportions, elegance, visual rhythm and emotional character.
Then design an entirely bespoke world inspired by those qualities.
Do NOT place the jewelry on a simple surface.
Instead, imagine a production team with an unlimited budget spending months designing one extraordinary set exclusively for this jewelry.
Every architectural form, sculptural element, texture, reflection, material, light and shadow should feel intentionally handcrafted around the product.
The environment should communicate the same design language as the jewelry.
Elegant curves inspire flowing architecture.
Sharp geometry inspires sculptural structures.
Gemstone colors inspire rare minerals, crystal formations and premium material palettes.
The world should feel physically believable yet impossible to build without immense craftsmanship and budget.
Draw inspiration from luxury architecture, museums, contemporary sculpture, rare natural stone, crystal caves, carved marble, flowing water, premium glass, polished metals, silk, exotic wood, geological formations and refined natural elements.
Never create random decoration.
Every object must have purpose.
###############################################################
EDITORIAL COMPOSITION
###############################################################
Compose the scene like an award-winning luxury campaign.
The jewelry dominates the visual hierarchy.
Everything else supports it.
Use elegant negative space, premium balance, sophisticated geometry, depth, framing and visual rhythm.
The image should immediately command attention while remaining refined and timeless.
###############################################################
LIGHTING & COLOR SCIENCE
###############################################################
Create physically accurate luxury lighting.
Use controlled highlights, elegant shadows, realistic gemstone brilliance, natural metal reflections and premium tonal harmony.
Color should feel sophisticated, restrained and luxurious.
Avoid oversaturation, fake glow, excessive HDR or artificial effects.
###############################################################
IMAGE QUALITY
###############################################################
Ultra-photorealistic.
Museum-quality luxury advertising.
Exceptional material realism.
Perfect micro-detail.
Flawless craftsmanship.
Natural optics.
Premium finish.
The image must appear captured through an elite commercial production using the highest level of photography, set design and post-production.
###############################################################
MARKETING OBJECTIVE
###############################################################
Create an image that instantly stops scrolling, increases perceived product value and communicates exclusivity within seconds.
The result should be immediately suitable for luxury Meta advertising, premium social campaigns, website hero sections, editorial magazines and high-end print campaigns.
It should make viewers believe this campaign required extraordinary craftsmanship, artistic vision and an exceptional production budget.
###############################################################
VISUAL HIERARCHY ENGINE
###############################################################
The jewelry is the undisputed hero.
Every creative decision must strengthen attention toward the jewelry, never away from it.
The environment exists only to frame, support and elevate the product.
At first glance, the viewer should notice only the jewelry.
Only after spending several seconds should they begin discovering the craftsmanship of the surrounding production.
Design the scene using visual hierarchy.
The jewelry must receive the brightest highlights, strongest contrast, sharpest focus, highest micro-detail and greatest visual clarity.
All surrounding architecture, sculptures and materials should become progressively softer, quieter and less visually dominant as they move away from the jewelry.
Avoid large objects with high contrast.
Avoid bright colors competing with gemstones.
Avoid complex patterns.
Avoid dramatic shapes that steal attention.
Use the environment as visual framing rather than visual competition.
Create natural leading lines, elegant curves, architectural forms and controlled reflections that subtly guide the eye toward the jewelry.
Every texture, light beam, shadow, reflection and structural element should direct attention back to the product.
The viewer should feel the production's scale without becoming distracted by it.
The environment should communicate luxury subconsciously rather than demanding attention.
If any environmental element competes with the jewelry, simplify, soften or remove it.
The jewelry must remain the brightest, sharpest, most detailed and most visually important object in the entire composition.
###############################################################
LUXURY RESTRAINT ENGINE
###############################################################
Luxury is communicated through restraint, not excess.
The production design should feel incredibly expensive without appearing busy.
Do not fill the frame simply because space is available.
Every object must earn its place.
If a visual element does not strengthen the jewelry, simplify it or remove it.
The environment should feel intentionally designed, never artificially generated.
Avoid the common AI tendency to over-decorate scenes with excessive textures, dramatic shapes, unnecessary details, glowing objects or visual noise.
Create the impression of extraordinary craftsmanship through subtlety, material quality, lighting precision and composition rather than quantity.
The viewer should first notice the jewelry.
Only after continued observation should they begin appreciating the sophistication of the surrounding production.
The production should whisper luxury, never shout it.
###############################################################
LUXURY SET DESIGN PHILOSOPHY
###############################################################
The purpose of the production design is NOT to be noticed.
Its only purpose is to increase the perceived value of the jewelry.
The environment should never become a subject of the image.
It should function like the soundtrack in a great film—essential to the emotional impact but almost invisible to conscious attention.
If a viewer remembers the background more than the jewelry, the composition has failed.
The production should feel expensive through precision, craftsmanship, restraint, scale and material quality, not through complexity.
Reduce visual information until every remaining element serves the jewelry.
The final image should contain one clear subject and one clear story:
"This jewelry is extraordinary."
###############################################################
FOCAL PRIORITY ENGINE
###############################################################
The jewelry is the brightest, sharpest and most visually dominant subject in the image.
Every other element must be intentionally subordinate.
Use selective focus, atmospheric depth, tonal separation, controlled contrast, visual weight and leading lines to guide the eye directly toward the jewelry.
The environment should create visual flow into the product, never away from it.
No background element should attract more attention than the jewelry through brightness, saturation, contrast, scale, texture or complexity.
If the viewer's eye leaves the jewelry within the first three seconds, simplify the composition until the jewelry becomes the natural focal point.
The image should feel effortless, balanced and immediately readable.
###############################################################
ATTENTION TEST
###############################################################
Before finalizing the image, evaluate the composition.
Ask:
"What attracts the eye first?"
If the answer is anything other than the jewelry, redesign the scene.
Continue simplifying until the jewelry naturally becomes the first and strongest focal point.
The jewelry should receive approximately 90–95% of the viewer's visual attention.
The environment should contribute only 5–10% while increasing the perceived luxury of the product.
###############################################################
NEGATIVE PROMPT
###############################################################
No altered jewelry.
No incorrect geometry.
No missing or extra gemstones.
No generic backgrounds.
No plain studio sweep.
No empty tabletop.
No cheap props.
No clutter.
No plastic materials.
No cartoon styling.
No unrealistic reflections.
No unrealistic lighting.
No AI artifacts.
No text.
No logos.
No watermark.
###############################################################
FINAL OBJECTIVE
###############################################################
Create a timeless luxury product campaign where the jewelry commands immediate attention and every surrounding element quietly reinforces its beauty. The production should feel custom-built with extraordinary craftsmanship and an unlimited budget, yet remain visually restrained, elegant and believable. The image must never reveal itself as AI-generated through excessive detail, unnecessary complexity or artificial styling. It should resemble a real photograph produced by one of the world's finest luxury advertising teams, where the viewer remembers the jewelry first and the production second.`;
      break;
    }

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
