/**
 * 5 Video Generation Modes for Cinroom
 * Preserves uploaded jewelry exactly as single source of truth.
 */

export type GenerationModeId =
  | "product_hero"
  | "model_campaign"
  | "fantasy_world"
  | "outdoor_campaign"
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
    title: "Outdoor Epic Environment Campaign",
    badge: "OUTDOOR EPIC",
    description: "Create a world-class luxury outdoor jewelry commercial in extraordinary natural environments while preserving the uploaded jewelry exactly.",
    iconName: "Wand2",
    tagline: "Hollywood Blockbuster Outdoor Cinema",
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
    age = "25",
    country = "France",
    ethnicity = "Caucasian",
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
        `LUXURY PRODUCT HERO COMMERCIAL${multiAngleNote}${brandGuideNote}: Solo high-jewelry presentation of the uploaded piece. Set in an ultra-clean obsidian mirror studio with 360-degree orbital camera motion, raytraced caustics, macro light flares, and 8K cinematic focus. ${STRICT_JEWELRY_GUARDRAIL}`;
      break;

    case "model_campaign":
      masterPrompt =
        `HIGH-FASHION EDITORIAL MODEL CAMPAIGN${multiAngleNote}${brandGuideNote}: A luxury fashion campaign featuring a ${age} year old ${ethnicity} ${gender} model from ${country} elegantly wearing the uploaded jewelry piece. Shot on 85mm lens with soft cinematic key lighting, shallow depth of field, high-end Vogue magazine aesthetic. ${STRICT_JEWELRY_GUARDRAIL}`;
      break;

    case "fantasy_world":
    case "outdoor_campaign": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const modelAgeVal = age?.trim() ? age.trim() : "25";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";

      masterPrompt = `###############################################################
OUTDOOR CAMPAIGN ENGINE
###############################################################
Create a world-class luxury outdoor jewelry commercial where the uploaded jewelry remains the absolute hero.
###############################################################
PRODUCT ANALYSIS & LOCK (HIGHEST PRIORITY)
###############################################################
Before generating any frame, perform an exhaustive visual analysis of ${productImageRef}.
Analyze and permanently lock:
• Overall silhouette
• Geometry
• Proportions
• Metal type
• Metal color
• Metal finish
• Surface texture
• Craftsmanship
• Stone count
• Stone size
• Stone shape
• Stone cut
• Stone placement
• Stone spacing
• Stone orientation
• Prongs
• Bezels
• Pavé layout
• Chain construction
• Clasp
• Engravings
• Every visible manufacturing detail
The uploaded jewelry is a finished manufactured product.
It is NOT a concept.
It is NOT inspiration.
It is NOT a design reference.
Treat it exactly like a real physical object being filmed.
Maintain 100% PRECISE jewelry accuracy throughout every frame.
Every frame must contain the EXACT SAME jewelry.
No redesign.
No reinterpretation.
No regeneration.
No improvement.
No simplification.
The jewelry must remain 100% visually identical to the uploaded reference.
###############################################################
BRAND GUIDELINE
###############################################################
If ${brandGuideRef} is provided, analyze it carefully.
Extract only:
• Brand colors
• Mood
• Styling
• Lighting philosophy
• Luxury positioning
• Production design
• Art direction
The final commercial must follow the same color theme and emotional identity while preserving the uploaded jewelry exactly.
###############################################################
ENVIRONMENT DESIGN
Analyze the jewelry before selecting the environment.
The environment must be intelligently inspired by the jewelry's material, metal tone, gemstone colors, craftsmanship, texture, finish, shape language and luxury positioning.
Create one cohesive outdoor world that feels extraordinary, premium and visually unforgettable.
Avoid generic or repetitive locations.
Favor iconic, cinematic and unexpected natural environments such as snow-capped mountains, alpine lakes, dramatic cliffs, crystal beaches, Mediterranean coastlines, volcanic landscapes, golden deserts, white salt flats, lush waterfalls, ancient forests, floating mist valleys, blooming flower fields, Japanese gardens, luxury vineyards, tropical islands, frozen glaciers, canyon landscapes and other visually spectacular outdoor locations.
Every environment should feel worthy of a Hollywood blockbuster and elevate the perceived value of the jewelry.
The environment should contain rich natural details including terrain, vegetation, water, weather, atmosphere and architectural elements when appropriate.
The world must feel alive, immersive and premium without distracting from the jewelry.
The environment always adapts to the jewelry.
The jewelry never adapts to the environment.
###############################################################
MODEL
Use a ${modelAgeVal}-year-old ${modelEthnicityVal} ${modelGenderVal} suitable for a premium luxury jewelry campaign.
The model must appear completely photorealistic and indistinguishable from a real professional fashion model photographed by a cinema camera.
Prioritize natural facial anatomy, realistic skin texture, authentic expressions and elegant body language.
Maintain consistent facial identity, body proportions and appearance throughout every frame.
Skin must appear naturally detailed with realistic pores, subtle imperfections, fine facial hair and physically accurate light interaction.
Hair should have realistic strand detail and natural movement, responding believably to wind and environmental conditions.
Hands must be anatomically correct, elegant and naturally present the jewelry without distortion or extra fingers.
The model should interact naturally with the environment and jewelry, avoiding stiff or artificial poses.
Maintain luxury editorial styling, refined makeup and premium wardrobe that complements the jewelry without overpowering it.
The model should always look like a real person captured during a high-end Hollywood fashion campaign, never like an AI-generated character.
###############################################################
CAMERA
Hollywood blockbuster cinematography.
IMAX large-format cinema camera language.
IMAX-quality image capture.
Premium large-format cinematic optics with anamorphic characteristics.
Luxury macro cinematography.
Beautiful natural bokeh where appropriate.
Deep focus when storytelling requires.
Natural lens breathing.
Premium optical compression.
Dynamic cinematic camera movement with purpose.
Use combinations of slow dolly, tracking, crane, jib, orbital, arc shots, macro push-ins, pull-outs, aerial reveals, parallax movement, floating gimbal movement, low-angle hero shots, overhead shots and cinematic perspective changes.
Camera movement should feel elegant, premium and dynamic, never static or repetitive.
Avoid unnecessary handheld, shaky footage, whip pans or amateur camera movement.
###############################################################
ATMOSPHERE
###############################################################
Use cinematic environmental effects only when they naturally improve the shot.
Examples:
• Natural wind moving hair and wardrobe
• Flowing fabric
• Gentle fog
• Atmospheric smoke
• Dust particles
• Mist
• Floating leaves
• Water reflections
• Light rays
Every atmospheric effect must feel physically believable.
###############################################################
EDITING
Fast luxury commercial pacing.
The opening may begin with a brief cinematic establishing shot of the environment before revealing the jewelry.
The establishing shot must never exceed 1 second.
Jewelry should become clearly visible immediately after the establishing shot.
Maximum individual shot duration: 1.5 seconds.
Every shot must introduce new visual information.
Avoid repetitive framing and filler shots.
Maintain a premium cinematic rhythm throughout the commercial.
###############################################################
QUALITY CONTROL
###############################################################
Hollywood production quality.
Hollywood VFX quality standards.
Luxury campaign quality.
Ultra photorealistic.
Film-grade color science.
Physically accurate lighting.
Physically accurate reflections.
Accurate gemstone refraction.
Natural skin.
Natural motion.
No AI artifacts.
No flicker.
No temporal inconsistency.
----------
VISUAL QUALITY ENGINE
Every frame must achieve premium luxury commercial quality comparable to world-class jewelry advertising and high-end cinematic productions.
The image must feel captured with an IMAX large-format cinema camera using premium cinema lenses, not generated by AI.
Prioritize exceptional image quality, micro-detail, realism and natural optical behavior.
Jewelry must exhibit razor-sharp detail, crisp edges, realistic metal textures, flawless gemstone clarity and physically accurate reflections.
Skin must retain natural pores, fine hair, subtle imperfections and realistic subsurface scattering without appearing overly smooth or AI-generated.
Maintain rich dynamic range with clean highlights, detailed shadows and natural color separation.
Use premium cinematic color grading with elegant contrast, refined saturation, realistic skin tones and luxurious color harmony.
Every frame should feel expensive, timeless and editorial rather than synthetic or overprocessed.
Depth of field must follow real cinematic optics.
For macro and close-up shots, keep the jewelry perfectly sharp while the background falls into a beautifully soft, creamy, natural bokeh with strong subject separation.
For wider environmental shots, use deeper focus only when it improves storytelling and scale.
Never use artificial blur or unrealistic depth of field.
Use physically accurate lens characteristics including natural bokeh, subtle lens breathing, realistic focus falloff and authentic optical compression.
Maintain perfect temporal consistency, lighting consistency, color consistency and product consistency throughout the entire commercial.
Avoid flat lighting, washed-out colors, oversharpening, excessive HDR, plastic skin, fake reflections, noisy textures, AI artifacts, flickering, ghosting, warped geometry or any visual element that reveals AI generation.
----
MUSIC & SOUND DESIGN
Create a premium cinematic soundtrack that enhances the luxury, emotion and memorability of the campaign.
The music should feel modern, sophisticated, emotionally engaging and instantly memorable, with a strong premium identity suitable for a global luxury jewelry brand.
The soundtrack should have a catchy, addictive and commercially appealing rhythm while remaining elegant and refined, never cheap or generic.
Synchronize the music naturally with camera movement, editing rhythm and emotional beats.
Use high-end cinematic sound design including subtle whooshes, fabric movement, wind ambience, footsteps, jewelry handling sounds, gemstone sparkle, metallic resonance, environmental ambience and tasteful transition effects wherever appropriate.
Every sound effect should feel realistic, immersive and seamlessly integrated into the soundtrack.
Maintain professional Hollywood-level audio production with exceptional clarity, depth, balance and dynamic range.
The final audio should feel emotionally powerful, luxurious, memorable and worthy of a premium global advertising campaign.
###############################################################
NEGATIVE PROMPT
###############################################################
No missing jewelry.
No extra jewelry.
No missing stones.
No extra stones.
No missing metal parts.
No extra metal parts.
No altered geometry.
No altered proportions.
No altered craftsmanship.
No altered gemstone placement.
No duplicated jewelry.
No floating jewelry.
No broken jewelry.
No unrealistic reflections.
No text.
No logo.
No watermark.
No cartoon appearance.
No AI-looking faces.
###############################################################
FINAL OBJECTIVE
###############################################################
Create an unforgettable outdoor luxury jewelry campaign that looks like it was captured for a global luxury brand with IMAX-level cinematic quality and Hollywood production value, while maintaining 100% PRECISE, 100% ACCURATE visual reproduction of the uploaded jewelry in every single frame. The environment, lighting, camera, model, wardrobe and storytelling must adapt to the jewelry—the jewelry must never adapt to them.`;
      break;
    }

    case "animal_campaign": {
      const selectedAnimal = animal?.trim()
        ? animal.trim()
        : "a regal panther with a sleek dark coat and golden eyes";
      masterPrompt =
        `MAJESTIC ANIMAL LUXURY CAMPAIGN${multiAngleNote}${brandGuideNote}: High-converting luxury commercial pairing the uploaded fine jewelry with ${selectedAnimal}. High-contrast obsidian studio lighting, slow-motion grace, majestic atmosphere, 4K film grade. ${STRICT_JEWELRY_GUARDRAIL}`;
      break;
    }

    case "ai_director": {
      const expandedConcept = creative_prompt?.trim()
        ? creative_prompt.trim()
        : "Paris Fashion Week High Jewelry Gala";
      masterPrompt =
        `AI DIRECTOR EXPANDED CONCEPT${multiAngleNote}${brandGuideNote}: World-class luxury jewelry commercial based on the concept: "${expandedConcept}". Intelligently expanded into a high-fashion cinematic film featuring a ${age} year old ${ethnicity} ${gender} model from ${country} in an immersive luxury environment tailored to the concept. ${STRICT_JEWELRY_GUARDRAIL}`;
      break;
    }
  }

  return masterPrompt;
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
