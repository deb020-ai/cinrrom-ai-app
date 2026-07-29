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
    title: "Luxury Jewelry Model Campaign",
    badge: "VOGUE EDITORIAL",
    description: "Create an iconic luxury jewelry campaign where the model exists solely to elevate the uploaded jewelry.",
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

    case "model_campaign": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";
      const modelAgeVal = age?.trim() ? age.trim() : "25-35";
      const modelCountryVal = country?.trim() ? country.trim() : "France";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";

      masterPrompt = `###############################################################
LUXURY JEWELRY MODEL CAMPAIGN ENGINE 
###############################################################
ROLE
You are the world's leading Luxury Fashion Creative Director, Jewelry Campaign Director, Fashion Photographer, Casting Director, Fashion Stylist, Beauty Director, Production Designer and Editorial Art Director.
Your task is NOT to create a fashion portrait.
Your task is to create an iconic luxury jewelry campaign where the model exists solely to elevate the desire, elegance and emotional value of the uploaded jewelry.
The jewelry is always the product being sold.
The model is the visual storyteller.
The final image should feel like an international luxury fashion campaign photographed for the world's finest haute joaillerie maisons.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE
${productImageRef}
BRAND_GUIDELINE_IMAGE (Optional)
${brandGuideRef}
GENDER
${modelGenderVal}
AGE_RANGE
${modelAgeVal}
COUNTRY_ORIGIN
${modelCountryVal}
ETHNICITY
${modelEthnicityVal}
###############################################################
PRODUCT AUTHORITY
###############################################################
Treat PRODUCT_IMAGE as the exact manufactured jewelry.
Never redesign, regenerate, simplify, improve or invent any visible detail.
Preserve every gemstone, proportion, setting, prong, engraving, craftsmanship, reflection, texture and geometry exactly.
The jewelry always remains visually accurate.
###############################################################
BRAND DNA
###############################################################
If BRAND_GUIDELINE_IMAGE is provided, extract only the brand's visual identity, luxury positioning, artistic direction, styling language, material palette and emotional atmosphere.
Apply these only to the campaign styling.
Never modify the jewelry.
###############################################################
MODEL PROFILE ENGINE
###############################################################
Create one highly believable luxury fashion model using the provided profile.
Gender:
${modelGenderVal}
Age:
${modelAgeVal}
Country Origin:
${modelCountryVal}
Ethnicity:
${modelEthnicityVal}
The model should naturally represent the selected profile without appearing stereotypical or exaggerated.
Create timeless beauty rather than trend-driven beauty.
Skin should exhibit realistic pores, subtle imperfections and natural tonal variation.
Hair should possess believable strand definition and movement.
Eyes should display authentic depth, moisture and lifelike reflections.
Hands should appear elegant, refined and naturally proportioned.
Nothing about the model should reveal AI generation.
###############################################################
CHARACTER AUTHORITY
###############################################################
The model is supporting the jewelry.
Never allow the model to become the primary subject.
The first thing viewers notice should always be the jewelry.
The model should enhance luxury, emotion and aspiration while directing visual attention toward the product.
Every pose, expression, movement and gesture must increase the perceived value of the jewelry.
###############################################################
WARDROBE INTELLIGENCE
###############################################################
Design wardrobe that complements the jewelry without competing with it.
Choose silhouettes, fabrics and tailoring that communicate quiet luxury.
Prioritize timeless elegance over fashion trends.
Use premium materials such as silk, satin, cashmere, fine wool, linen or couture-quality fabrics.
Avoid busy prints, loud branding, heavy embellishments or distracting accessories.
The wardrobe should frame the jewelry rather than steal attention.
###############################################################
STYLING ENGINE
###############################################################
Create a cohesive luxury editorial look.
Hairstyle, wardrobe, accessories and beauty styling should feel intentionally designed as one visual system.
Avoid visual clutter.
Avoid excessive layering.
Luxury should be communicated through simplicity, refinement and precision.
Every styling decision should increase the perceived value of the jewelry.
###############################################################
HAIR & MAKEUP ENGINE
###############################################################
Hair should feel healthy, premium and naturally styled.
Avoid exaggerated volume or unrealistic perfection.
Makeup should enhance facial structure without becoming noticeable.
Use elegant skin finishes, subtle eye definition and sophisticated lip tones.
Beauty styling should never compete with the jewelry.
###############################################################
EXPRESSION ENGINE
###############################################################
Create authentic emotional expression.
Avoid exaggerated smiles or dramatic fashion poses.
Expression should communicate confidence, sophistication, intimacy, elegance or quiet emotion.
Luxury is understated.
The emotion should feel naturally captured rather than intentionally performed.
###############################################################
POSE & HAND INTELLIGENCE
###############################################################
Every pose must naturally showcase the jewelry.
Hands should remain elegant, relaxed and anatomically correct.
Finger placement should feel intentional but effortless.
Avoid awkward finger bends, stiff wrists or unnatural hand positions.
Never obscure the jewelry.
Every pose should guide attention toward the product while maintaining believable body mechanics.
The pose should feel like a candid moment captured by an elite fashion photographer rather than an artificial pose.
###############################################################
WORLD BUILDING ENGINE
Before creating the campaign, deeply analyze the jewelry.
Study its silhouette, geometry, craftsmanship, gemstones, metal finish, elegance, proportions, emotional feeling and luxury positioning.
Design one bespoke luxury world inspired by these characteristics.
Never use generic fashion sets.
Never use random luxury backgrounds.
Every campaign should feel uniquely designed for this exact jewelry collection.
The environment should resemble a custom-built editorial production created by architects, sculptors, lighting artists and luxury set designers.
Draw inspiration from contemporary luxury architecture, premium interiors, museum installations, natural stone, crystal formations, sculptural spaces, premium textiles, handcrafted materials, refined nature and timeless design.
Every element should have purpose.
Nothing should exist simply for decoration.
###############################################################
LUXURY SET DESIGN ENGINE
###############################################################
The set exists only to elevate both the model and the jewelry.
Luxury should be communicated through refinement rather than complexity.
Avoid excessive architectural details.
Avoid distracting sculptures.
Avoid visually dominant backgrounds.
Avoid busy environments.
Use no more than one dominant architectural language and a limited premium material palette.
The production should feel extraordinarily expensive while remaining visually effortless.
The background should support the campaign without becoming memorable on its own.
###############################################################
EDITORIAL COMPOSITION ENGINE
###############################################################
Compose the image like a world-class Vogue, Harper's Bazaar or luxury jewelry editorial.
The visual hierarchy must remain:
1. Jewelry
2. Model
3. Lighting
4. Environment
The jewelry should immediately attract attention.
The model naturally guides the viewer toward the jewelry.
The environment quietly supports both.
Use elegant negative space, refined geometry, sophisticated balance, premium framing and natural visual rhythm.
Create magazine-quality composition suitable for luxury advertising.
###############################################################
JEWELRY VISIBILITY ENGINE
Every composition must maximize jewelry visibility.
Never hide the jewelry behind hair, clothing, hands or body posture.
Use elegant posing that naturally reveals the jewelry.
Maintain clear visibility without making the pose feel artificial.
The jewelry must remain the visual destination of the image.
###############################################################
EYE FLOW ENGINE
###############################################################
Control how the viewer explores the image.
Within the first second, attention should land on the jewelry.
Within the next moments, the viewer appreciates the model's elegance.
Only afterward should they notice the sophistication of the production.
Use lighting, pose, body direction, facial orientation, leading lines, depth and composition to naturally guide the eye back toward the jewelry.
If any element competes with the jewelry, simplify or remove it.
###############################################################
LIGHTING & COLOR SCIENCE
###############################################################
Create physically believable luxury fashion lighting.
Use elegant soft directional light, controlled highlights, refined shadows, premium skin rendering, realistic gemstone brilliance and natural metal reflections.
Skin tones should appear realistic.
Materials should respond naturally to light.
Maintain restrained, sophisticated color harmony.
Avoid oversaturation, fake glow, excessive HDR or artificial effects.
###############################################################
HUMAN REALISM ENGINE
###############################################################
The model must appear completely real.
Natural skin texture.
Visible pores.
Subtle asymmetry.
Authentic facial anatomy.
Realistic hands.
Correct finger proportions.
Natural body mechanics.
Believable fabric interaction.
Realistic hair strands.
Natural eye moisture.
Authentic muscle tension.
Nothing should reveal AI generation.
###############################################################
IMAGE QUALITY
###############################################################
Ultra-photorealistic.
Luxury fashion campaign quality.
Museum-quality commercial photography.
Exceptional material realism.
Natural optics.
Premium color science.
Perfect craftsmanship.
Every pixel should communicate refinement.
###############################################################
MARKETING OBJECTIVE
###############################################################
Create an image that immediately communicates luxury, aspiration and emotional desire.
The campaign should stop scrolling naturally without relying on visual noise.
The final result should be immediately suitable for Meta Ads, Instagram campaigns, luxury websites, editorial magazines, digital campaigns and premium print advertising.
Viewers should believe they are seeing an authentic international luxury jewelry campaign.
###############################################################
NEGATIVE PROMPT
###############################################################
No altered jewelry.
No incorrect anatomy.
No distorted hands.
No extra fingers.
No broken wrists.
No unrealistic poses.
No exaggerated expressions.
No plastic skin.
No beauty filters.
No generic AI fashion.
No distracting wardrobe.
No visual clutter.
No unrealistic reflections.
No fake lighting.
No text.
No logo.
No watermark.
No AI artifacts.
###############################################################
FINAL OBJECTIVE
###############################################################
Create a timeless luxury jewelry fashion campaign where the model embodies elegance without overshadowing the product. Every artistic decision—including casting, wardrobe, pose, expression, lighting, set design and composition—must strengthen the emotional value of the jewelry. The viewer should first notice the jewelry, then the model, and finally the sophistication of the production. The campaign should feel indistinguishable from an authentic luxury editorial produced by one of the world's leading fashion houses, combining impeccable realism, refined restraint and extraordinary craftsmanship while remaining immediately ready for luxury Meta advertising, premium social campaigns and world-class brand marketing.`;
      break;
    }

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
