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
    title: "Outdoor Epic Environment Campaign",
    badge: "EPIC ENVIRONMENT",
    description: "Create an unforgettable luxury campaign where an extraordinary real-world environment amplifies the uploaded jewelry.",
    iconName: "Wand2",
    tagline: "Breathtaking Real-World Luxury Destinations",
    requiresModelInfo: true,
  },
  {
    id: "animal_campaign",
    title: "Luxury Jewelry Animal Campaign",
    badge: "MAJESTIC WILD",
    description: "Create an unforgettable luxury campaign where a magnificent companion animal elevates the emotional value of the uploaded jewelry.",
    iconName: "PawPrint",
    tagline: "Complemented by Regal Wildlife",
    requiresModelInfo: true,
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
If the uploaded reference contains one jewelry item, preserve that exact item.
If the uploaded reference contains multiple jewelry items, preserve the complete jewelry collection exactly as shown.
Never invent matching accessories.
Never add rings, earrings, necklaces, bracelets, bangles, pendants, chains or any additional jewelry unless they already exist in the uploaded reference.
Every frame must depict the exact same approved jewelry collection.
Every frame must contain the EXACT SAME jewelry.
No redesign.
No reinterpretation.
No regeneration.
No improvement.
No simplification.
The jewelry must remain 100% visually identical to the uploaded reference.
Only the following may change throughout the commercial:
• Camera
• Composition
• Lens
• Lighting
• Focus
• Environment
• Atmosphere
• Reflections
• Storytelling
The jewelry itself is permanently locked.
Product accuracy always has higher priority than cinematic beauty.
If any generated frame changes the jewelry in any way, reject that frame and regenerate using the uploaded reference.
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
CAMERA FRAMING ENGINE
###############################################################
Choose the camera framing based on maximizing both emotional connection and product visibility.
Avoid extreme close-ups that crop out the model's identity.
Avoid wide fashion shots where the jewelry becomes too small to appreciate.
Prioritize elegant medium close-up or medium portrait compositions where both the model's face and the featured jewelry remain clearly visible and visually important.
The jewelry should occupy enough of the frame for its craftsmanship, gemstones and details to be immediately recognizable without zooming.
The model's face should remain visible to communicate emotion, beauty and luxury.
Frame the composition around the featured jewelry.
For earrings, prioritize the head, face and upper shoulders.
For necklaces, prioritize the face, neck and upper torso.
For rings, prioritize elegant compositions that clearly show both the hand and the face whenever naturally possible.
For bracelets and watches, compose to clearly showcase the wrist while maintaining facial presence.
The framing should always adapt to the jewelry category while preserving a strong emotional connection with the model.
The image should feel like a luxury jewelry advertisement, not a fashion editorial where clothing or the environment dominates.
If the jewelry cannot be clearly appreciated within one second of viewing, move the camera closer or redesign the composition until the jewelry becomes immediately readable.
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
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const epicEnvironmentVal = fantasy_theme?.trim() ? fantasy_theme.trim() : "dramatic coastal marble cliffs overlooking a calm crystal azure ocean";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";
      const modelAgeVal = age?.trim() ? age.trim() : "25-35";
      const modelCountryVal = country?.trim() ? country.trim() : "France";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";

      masterPrompt = `###############################################################
LUXURY JEWELRY EPIC ENVIRONMENT CAMPAIGN ENGINE 
###############################################################
ROLE
You are the world's leading Luxury Campaign Creative Director, Luxury Fashion Photographer, Environmental Production Designer, Location Director, Fashion Stylist, Beauty Director and Editorial Art Director.
Your task is NOT to create a travel photograph.
Your task is NOT to create landscape photography.
Your task is to create an unforgettable luxury jewelry campaign where an extraordinary real-world environment amplifies the emotional value of the uploaded jewelry.
The jewelry is always the product being sold.
The environment creates the story.
The model creates emotional connection.
The final image should feel like an international luxury campaign requiring months of location scouting, production planning and an unlimited production budget.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE
${productImageRef}
BRAND_GUIDELINE_IMAGE (Optional)
${brandGuideRef}
EPIC_ENVIRONMENT (Optional)
${epicEnvironmentVal}
GENDER
${modelGenderVal}
AGE_RANGE
${modelAgeVal}
COUNTRY_ORIGIN
${modelCountryVal}
ETHNICITY
${modelEthnicityVal}
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
If the uploaded reference contains one jewelry item, preserve that exact item.
If the uploaded reference contains multiple jewelry items, preserve the complete jewelry collection exactly as shown.
Never invent matching accessories.
Never add rings, earrings, necklaces, bracelets, bangles, pendants, chains or any additional jewelry unless they already exist in the uploaded reference.
Every frame must depict the exact same approved jewelry collection.
Every frame must contain the EXACT SAME jewelry.
No redesign.
No reinterpretation.
No regeneration.
No improvement.
No simplification.
The jewelry must remain 100% visually identical to the uploaded reference.
Only the following may change throughout the commercial:
• Camera
• Composition
• Lens
• Lighting
• Focus
• Environment
• Atmosphere
• Reflections
• Storytelling
The jewelry itself is permanently locked.
Product accuracy always has higher priority than cinematic beauty.
If any generated frame changes the jewelry in any way, reject that frame and regenerate using the uploaded reference.
###############################################################
BRAND DNA
###############################################################
If BRAND_GUIDELINE_IMAGE exists, extract only the brand's visual identity, luxury positioning, color language, styling philosophy, artistic direction and emotional tone.
Apply these only to the campaign world.
Never modify the jewelry.
###############################################################
EPIC ENVIRONMENT INTELLIGENCE
###############################################################
If EPIC_ENVIRONMENT is provided, faithfully build the campaign around that destination while elevating it into a world-class luxury production.
If no environment is provided, analyze the jewelry and automatically select the most appropriate iconic location.
The chosen environment should naturally complement the jewelry's craftsmanship, geometry, elegance and emotional character.
Avoid fantasy.
Avoid science fiction.
Avoid impossible architecture.
Prioritize breathtaking yet believable locations that could exist in the real world.
Examples include dramatic coastlines, marble quarries, alpine peaks, volcanic landscapes, ancient temples, luxury yachts, desert dunes, crystal lakes, waterfalls, bamboo forests, sculptural architecture, Mediterranean cliffs, tropical islands and extraordinary natural environments.
The location should feel exclusive, cinematic and globally recognizable without becoming a tourist photograph.
###############################################################
MODEL PROFILE ENGINE
###############################################################
Create one highly believable luxury fashion model.
Gender:
${modelGenderVal}
Age:
${modelAgeVal}
Country Origin:
${modelCountryVal}
Ethnicity:
${modelEthnicityVal}
The model should naturally represent the selected profile with authentic beauty and realism.
Natural skin.
Natural eyes.
Natural hair.
Natural anatomy.
Elegant hands.
Nothing should reveal AI generation.
###############################################################
CHARACTER AUTHORITY
###############################################################
The model exists to elevate the jewelry.
The environment exists to strengthen the story.
Neither should overpower the product.
The viewer should emotionally connect with the model while immediately recognizing the jewelry as the hero of the campaign.
###############################################################
WARDROBE & STYLING ENGINE
###############################################################
Design timeless luxury wardrobe appropriate for the selected environment.
Every outfit should feel custom tailored using premium materials.
Wardrobe colors should harmonize with both the jewelry and the surrounding environment.
Avoid loud prints.
Avoid distracting accessories.
Avoid trend-driven fashion.
Luxury should be communicated through refinement, tailoring and material quality.
###############################################################
HAIR • MAKEUP • EXPRESSION • POSE
###############################################################
Hair should respond naturally to the outdoor environment while remaining elegant.
Makeup should remain refined and editorial.
Expression should feel authentic, confident, aspirational and emotionally engaging.
Avoid exaggerated fashion expressions.
Every pose should naturally showcase the jewelry.
Hands must remain elegant.
Finger positioning must feel relaxed.
Never hide the jewelry behind clothing, hair or body position.
Every body angle should guide attention back toward the jewelry.
The model should appear naturally present within the environment rather than obviously posing for the camera.
###############################################################
EPIC WORLD BUILDING ENGINE
Design a breathtaking real-world luxury environment that feels impossible to produce, yet completely believable.
The campaign should feel as though the world's best architects, environmental artists, production designers, cinematographers and luxury photographers collaborated to build it.
Never create a generic landscape.
Never create a tourist photograph.
Never create fantasy.
Instead create an extraordinary real location elevated through exceptional production design.
The environment should become an extension of the jewelry's craftsmanship.
Curved jewelry inspires flowing landscapes.
Geometric jewelry inspires architectural compositions.
Gemstone colors subtly influence surrounding materials, vegetation, minerals, water or atmosphere.
Every environmental decision should reinforce the luxury identity of the jewelry.
###############################################################
LOCATION DESIGN ENGINE
###############################################################
Create one iconic destination worthy of a global luxury campaign.
The environment should feel exclusive and inaccessible.
Draw inspiration from dramatic coastlines, alpine mountains, marble quarries, crystal lakes, ancient stone architecture, Mediterranean cliffs, volcanic landscapes, waterfalls, premium gardens, sculptural deserts, luxury yachts, private islands and world-class architectural landmarks.
Nature should feel curated rather than wild.
Everything should appear intentionally designed.
Nothing should feel random.
###############################################################
EDITORIAL COMPOSITION ENGINE
###############################################################
Compose the campaign like a luxury editorial photographed by the world's finest commercial photographers.
Visual hierarchy:
1. Jewelry
2. Model
3. Environment
4. Atmosphere
The jewelry should immediately attract attention.
The model guides emotional connection.
The environment creates aspiration.
Every composition should feel balanced, elegant and timeless.
Use premium negative space, visual rhythm, leading lines and refined geometry.
###############################################################
CAMERA FRAMING ENGINE
###############################################################
Avoid extremely wide landscape photography.
Avoid tiny subjects inside massive environments.
Avoid extreme close-ups.
Prioritize medium portrait compositions where the face and jewelry remain clearly visible while enough of the environment communicates scale and grandeur.
Frame around the jewelry.
The environment should provide context rather than dominate the image.
If the jewelry cannot be appreciated within one second, redesign the framing.
###############################################################
VISUAL HIERARCHY ENGINE
###############################################################
The environment should impress.
The jewelry should mesmerize.
The model should emotionally connect.
The viewer must first notice the jewelry.
Second, the model.
Finally the extraordinary environment.
If the environment becomes the primary attraction, simplify it immediately.
Luxury is communicated through restraint, not visual overload.
###############################################################
LIGHTING & COLOR SCIENCE
###############################################################
Use physically believable natural luxury lighting.
Golden hour.
Soft overcast.
Elegant sunrise.
Sophisticated sunset.
Natural atmospheric diffusion.
Premium gemstone brilliance.
Realistic skin rendering.
Authentic material response.
Maintain restrained color harmony.
Avoid oversaturation.
Avoid artificial glow.
Avoid excessive HDR.
###############################################################
HUMAN REALISM ENGINE
###############################################################
The model must appear completely authentic.
Natural facial anatomy.
Visible skin texture.
Realistic pores.
Natural asymmetry.
Authentic eyes.
Believable hair movement.
Correct body mechanics.
Elegant hands.
Natural interaction with the environment.
Nothing should reveal AI generation.
###############################################################
IMAGE QUALITY
###############################################################
Ultra-photorealistic.
Luxury commercial photography.
Museum-quality production.
Exceptional material realism.
Natural optics.
Premium color science.
Every pixel should communicate refinement.
The image should appear captured by an elite international production crew using the highest level of commercial photography.
###############################################################
MARKETING OBJECTIVE
###############################################################
Create a campaign that immediately communicates exclusivity, aspiration and extraordinary craftsmanship.
The image should stop scrolling naturally through beauty, composition and emotional impact rather than visual noise.
Immediately suitable for Meta Ads, Instagram campaigns, luxury websites, editorial magazines, premium print campaigns and global luxury branding.
###############################################################
CAMPAIGN CAMERA DIRECTOR
###############################################################
This is a luxury JEWELRY campaign, not a travel campaign.
The purpose of the environment is to increase the perceived value of the jewelry, not to dominate the frame.
The camera must always prioritize product readability over environmental scale.
Never choose an establishing shot.
Never choose a wide landscape composition.
Never position the model as a small figure inside a large environment.
Never allow the jewelry to become visually insignificant.
Instead, compose the image as a luxury commercial portrait where the model occupies most of the frame while the environment remains clearly recognizable behind them.
Preferred framing:
• Medium Close-Up
• Medium Portrait
• Three-Quarter Portrait
The model should typically occupy approximately 60–80% of the frame.
The jewelry must remain large enough for its craftsmanship, gemstones and premium materials to be immediately appreciated without zooming.
The environment should occupy approximately 20–40% of the frame, providing context and aspiration without becoming the primary subject.
Frame every image around the featured jewelry.
The viewer should first see the jewelry.
Then the model.
Then discover the extraordinary environment.
If the environment becomes more memorable than the jewelry, redesign the composition and move the camera closer.
###############################################################
COMMERCIAL CROP INTELLIGENCE
###############################################################
Every image should appear as though selected by a luxury advertising agency for a global campaign.
Prioritize commercially usable compositions over cinematic spectacle.
The jewelry must remain clearly readable at Instagram feed size, Meta Ad thumbnail size and mobile viewing size.
If the jewelry cannot be identified instantly on a smartphone screen, the composition has failed.
Move the camera closer until the product is immediately recognizable.
###############################################################
NEGATIVE PROMPT
###############################################################
No altered jewelry.
No fantasy creatures.
No magical effects.
No science fiction.
No floating objects.
No unrealistic landscapes.
No generic travel photography.
No tourist imagery.
No distracting wardrobe.
No exaggerated poses.
No distorted anatomy.
No extra fingers.
No broken hands.
No visual clutter.
No unrealistic lighting.
No fake reflections.
No text.
No logos.
No watermark.
No AI artifacts.
###############################################################
FINAL OBJECTIVE
###############################################################
Create an unforgettable international luxury jewelry campaign where an iconic real-world environment amplifies the emotional power of the jewelry without ever competing with it. The jewelry remains the commercial hero, the model creates aspiration, and the environment creates wonder. Every artistic decision—from location, wardrobe, pose, lighting, composition and production design—should increase the perceived value of the jewelry. The final image must be indistinguishable from a real multi-million-dollar luxury campaign produced by the world's leading advertising agency, immediately ready for Meta Ads, premium social media, editorial magazines and global luxury brand marketing.`;
      break;
    }

    case "animal_campaign": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const selectedAnimalVal = animal?.trim() ? animal.trim() : "a regal Black Panther";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";
      const modelAgeVal = age?.trim() ? age.trim() : "25-35";
      const modelCountryVal = country?.trim() ? country.trim() : "France";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";

      masterPrompt = `###############################################################
LUXURY JEWELRY ANIMAL CAMPAIGN ENGINE 
###############################################################
ROLE
You are the world's leading Luxury Campaign Creative Director, Wildlife Art Director, Luxury Fashion Photographer, Animal Behavior Director, Production Designer, Fashion Stylist, Beauty Director and Editorial Art Director.
Your task is NOT to create wildlife photography.
Your task is NOT to create an animal portrait.
Your task is to create an unforgettable luxury jewelry campaign where the model and a magnificent companion animal elevate the emotional value and symbolism of the uploaded jewelry.
The jewelry is always the product being sold.
The model creates emotional connection.
The companion animal represents the spirit, personality and emotional identity of the jewelry.
The final image should feel like an international luxury campaign photographed by the world's finest commercial production team with an unlimited production budget.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE
${productImageRef}
BRAND_GUIDELINE_IMAGE (Optional)
${brandGuideRef}
COMPANION_ANIMAL (Optional)
${selectedAnimalVal}
GENDER
${modelGenderVal}
AGE_RANGE
${modelAgeVal}
COUNTRY_ORIGIN
${modelCountryVal}
ETHNICITY
${modelEthnicityVal}
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
If the uploaded reference contains one jewelry item, preserve that exact item.
If the uploaded reference contains multiple jewelry items, preserve the complete jewelry collection exactly as shown.
Never invent matching accessories.
Never add rings, earrings, necklaces, bracelets, bangles, pendants, chains or any additional jewelry unless they already exist in the uploaded reference.
Every frame must depict the exact same approved jewelry collection.
Every frame must contain the EXACT SAME jewelry.
No redesign.
No reinterpretation.
No regeneration.
No improvement.
No simplification.
The jewelry must remain 100% visually identical to the uploaded reference.
Only the following may change throughout the commercial:
• Camera
• Composition
• Lens
• Lighting
• Focus
• Environment
• Atmosphere
• Reflections
• Storytelling
The jewelry itself is permanently locked.
Product accuracy always has higher priority than cinematic beauty.
If any generated frame changes the jewelry in any way, reject that frame and regenerate using the uploaded reference.
###############################################################
BRAND DNA
###############################################################
If BRAND_GUIDELINE_IMAGE exists, extract only the brand's visual identity, luxury positioning, styling philosophy, artistic direction, color language and emotional atmosphere.
Apply these only to the campaign world.
Never modify the jewelry.
###############################################################
COMPANION ANIMAL INTELLIGENCE
###############################################################
If COMPANION_ANIMAL is provided, faithfully use that exact animal.
If left empty, deeply analyze the jewelry and automatically choose the most suitable luxury companion animal.
The selection should be based on elegance, symbolism, craftsmanship, gemstone colors, visual rhythm and emotional character.
Examples:
Black Panther — mystery, power, black diamonds.
Snow Leopard — rarity, elegance, white diamonds.
White Swan — grace, pearls.
Falcon — precision, geometric jewelry.
Arabian Horse — prestige and heritage.
White Peacock — couture luxury.
Golden Eagle — authority.
Elephant — royalty and strength.
Butterfly — delicate femininity.
The chosen animal must naturally strengthen the emotional story of the jewelry.
Never select an animal simply because it looks impressive.
###############################################################
MODEL PROFILE ENGINE
###############################################################
Create one highly believable luxury fashion model.
Gender:
${modelGenderVal}
Age:
${modelAgeVal}
Country Origin:
${modelCountryVal}
Ethnicity:
${modelEthnicityVal}
The model should naturally represent the selected profile.
Natural skin texture.
Visible pores.
Realistic eyes.
Healthy hair.
Elegant hands.
Authentic anatomy.
Nothing should reveal AI generation.
###############################################################
CHARACTER AUTHORITY
###############################################################
The jewelry remains the commercial hero.
The model creates emotional aspiration.
The companion animal strengthens the narrative.
The animal should never become the primary visual subject.
The relationship between the model and the companion animal should feel authentic, calm and emotionally powerful.
Every artistic decision must increase the perceived value of the jewelry.
###############################################################
CINEMATIC INTERACTION ENGINE
###############################################################
The companion animal is not background decoration.
It is an equal storytelling partner.
Create one authentic cinematic interaction between the model and the companion animal.
Every interaction should feel emotionally meaningful and naturally photographed.
Examples include:
The model walks beside a black panther through dense rainforest while maintaining effortless eye contact with the camera.
A snow leopard gracefully walks slightly ahead while the model confidently follows through an alpine landscape.
A white horse runs beside the model across an open coastline with flowing fabric moving naturally in the wind.
A falcon lands gently on the model's arm while she confidently looks toward the horizon.
An elephant calmly walks beside the model through ancient stone architecture.
A wolf quietly accompanies the model through a misty forest.
A white peacock slowly opens its feathers behind the model, naturally framing the jewelry without overpowering it.
The interaction should feel spontaneous rather than staged.
Avoid static standing poses.
Avoid the animal behaving like a statue.
Avoid the model posing beside the animal.
Instead, capture a believable moment shared between them.
The viewer should feel they are witnessing a real relationship rather than a photoshoot.
###############################################################
WARDROBE & STYLING ENGINE
###############################################################
Design timeless luxury wardrobe appropriate for both the jewelry and the companion animal.
Every outfit should communicate quiet luxury.
Use premium fabrics including silk, cashmere, linen, fine wool and couture-quality tailoring.
Avoid loud prints.
Avoid distracting accessories.
Avoid trend-driven fashion.
The wardrobe should frame the jewelry while harmonizing with the companion animal and surrounding environment.
###############################################################
HAIR • MAKEUP • EXPRESSION • POSE
###############################################################
Hair should feel naturally styled and elegant.
Makeup should remain refined and understated.
Expression should communicate confidence, elegance, serenity and emotional depth.
Avoid exaggerated fashion expressions.
Every pose should naturally showcase the jewelry.
Hands must remain elegant.
Finger positioning should feel relaxed and anatomically correct.
Never hide the jewelry behind clothing, hair, body posture or the companion animal.
The model and companion animal should feel emotionally connected while maintaining a sophisticated editorial presence.
Every pose should guide the viewer's attention back toward the jewelry.
###############################################################
WILD WORLD BUILDING ENGINE
Design a breathtaking luxury campaign where nature, architecture and the companion animal exist in perfect harmony.
The environment should feel extraordinary yet completely believable.
Avoid fantasy.
Avoid magical worlds.
Avoid science fiction.
Avoid zoo environments.
Avoid safari photography.
Instead, create a custom-built luxury production where nature feels intentionally curated for the jewelry.
Every environmental decision should reinforce the emotional identity of the jewelry and the companion animal.
###############################################################
LIVING HABITAT ENGINE
###############################################################
Every companion animal should exist inside an elevated version of its natural habitat.
Do not create a generic jungle or forest.
Instead design the world's most beautiful interpretation of that habitat.
Black Panther:
Luxury rainforest with wet volcanic stone, filtered sunlight and premium tropical textures.
Snow Leopard:
Snow-covered mountain ridges with sculptural ice formations and soft atmospheric snowfall.
White Horse:
Golden coastal dunes with dramatic cliffs and flowing grass.
Wolf:
Ancient pine forest with cinematic fog.
Falcon:
Mountain cliffs above the clouds.
White Peacock:
Royal botanical gardens inspired by palace architecture.
Elephant:
Ancient sandstone temples reclaimed by nature.
Every habitat should feel like millions of dollars were invested into creating the perfect luxury campaign location.
The environment should never resemble wildlife photography.
It should resemble luxury advertising inspired by nature.
###############################################################
EDITORIAL COMPOSITION ENGINE
###############################################################
Compose the image like an international luxury jewelry campaign.
Visual hierarchy must always remain:
1. Jewelry
2. Model
3. Companion Animal
4. Environment
The environment creates atmosphere.
The animal creates symbolism.
The model creates emotion.
The jewelry creates desire.
Everything exists to increase the perceived value of the jewelry.
###############################################################
CAMPAIGN CAMERA DIRECTOR
###############################################################
This is a luxury jewelry campaign.
It is NOT wildlife photography.
It is NOT a travel campaign.
It is NOT an animal documentary.
Never use ultra-wide landscape compositions.
Never make the companion animal dominate the frame.
Never allow the jewelry to become visually insignificant.
Prioritize medium portrait or three-quarter portrait compositions where the model, jewelry and companion animal remain clearly visible.
The model should occupy approximately 60–70% of the frame.
The companion animal should naturally support the composition without overpowering it.
The environment should provide context rather than become the subject.
Frame the composition around the featured jewelry.
If the jewelry cannot be appreciated instantly, redesign the composition and move the camera closer.
###############################################################
JEWELRY VISIBILITY ENGINE
###############################################################
The featured jewelry must always remain clearly visible.
Never hide the jewelry behind hair, clothing, body posture or the companion animal.
Use pose, lighting and composition to naturally emphasize the jewelry.
The jewelry should remain readable even when viewed as a small mobile advertisement.
###############################################################
VISUAL HIERARCHY ENGINE
###############################################################
The jewelry is always the commercial hero.
The model creates aspiration.
The companion animal strengthens emotion.
The environment creates atmosphere.
If the companion animal attracts more attention than the jewelry, simplify the composition immediately.
Luxury should feel effortless.
Never allow visual spectacle to overpower product communication.
###############################################################
LIGHTING & COLOR SCIENCE
###############################################################
Use physically believable luxury lighting.
Golden hour.
Soft overcast.
Elegant sunrise.
Luxury sunset.
Natural atmospheric diffusion.
Beautiful gemstone brilliance.
Natural metal reflections.
Premium skin rendering.
Realistic animal fur, feathers or scales with authentic material response.
Maintain sophisticated color harmony.
Avoid oversaturation.
Avoid artificial glow.
Avoid excessive HDR.
###############################################################
HUMAN & ANIMAL REALISM ENGINE
###############################################################
The model and companion animal must appear completely authentic.
Natural anatomy.
Correct proportions.
Natural movement.
Authentic muscle structure.
Realistic fur, feathers or skin texture.
Natural eye reflections.
Correct interaction between the model and companion animal.
Authentic contact shadows.
Natural environmental interaction.
Nothing should reveal AI generation.
###############################################################
IMAGE QUALITY
###############################################################
Ultra-photorealistic.
Museum-quality luxury advertising.
World-class commercial photography.
Exceptional material realism.
Premium color science.
Perfect craftsmanship.
Every pixel should communicate luxury, refinement and authenticity.
###############################################################
MARKETING OBJECTIVE
###############################################################
Create an unforgettable luxury jewelry campaign that immediately communicates rarity, prestige, emotional connection and extraordinary craftsmanship.
The image should naturally stop scrolling without relying on visual noise.
Immediately suitable for Meta Ads, Instagram campaigns, luxury websites, editorial magazines, premium print campaigns and global luxury branding.
###############################################################
JEWELRY PLACEMENT INTELLIGENCE
###############################################################
Before generating the image, identify the category of the uploaded jewelry.
Preserve realistic placement exactly as the jewelry is intended to be worn.
Necklace:
Naturally rests around the neck with correct length, gravity and contact with the body.
Earrings:
Correctly aligned with the ears, following natural anatomy.
Ring:
Placed on a realistic finger with correct scale and natural finger posture.
Bracelet:
Naturally wraps around the wrist with believable fit and contact.
Bangle:
Correctly positioned around the wrist without floating or intersecting the arm.
Watch:
Properly fitted on the wrist with realistic orientation.
Pendant:
Naturally hangs from the chain following gravity.
Never invent alternative placements.
Never move jewelry to unrealistic body locations.
Never partially hide the featured jewelry.
Never distort scale.
Never allow hair, clothing, hands, animals or environmental elements to block the jewelry.
The jewelry should appear naturally worn exactly as it would during a real luxury campaign while remaining completely visible.
###############################################################
PRODUCT READABILITY TEST
###############################################################
Before finalizing the image, verify the following:
Can the jewelry category be identified within one second?
Can the craftsmanship be appreciated without zooming?
Is the jewelry fully visible?
Is its placement anatomically correct?
Would a luxury brand approve this placement for a commercial campaign?
If any answer is "No", redesign the pose, framing or composition until all conditions are satisfied.
###############################################################
NEGATIVE PROMPT
###############################################################
No altered jewelry.
No fantasy creatures.
No aggressive animal behavior.
No roaring.
No attacking.
No exaggerated poses.
No distorted anatomy.
No extra limbs.
No unrealistic fur.
No unrealistic feathers.
No distracting environment.
No visual clutter.
No fake lighting.
No unrealistic reflections.
No AI artifacts.
No text.
No logos.
No watermark.
###############################################################
FINAL OBJECTIVE
###############################################################
Create a timeless luxury jewelry campaign where a magnificent companion animal symbolizes the personality of the jewelry without ever competing with it. The jewelry remains the commercial hero, the model creates emotional aspiration, the companion animal strengthens the narrative, and the environment quietly enhances the story. Every decision—from casting, animal selection, behavior, wardrobe, lighting, composition and production design—must increase the perceived value of the jewelry. The final image should feel indistinguishable from a real multi-million-dollar luxury campaign produced by the world's finest advertising agency, immediately ready for Meta Ads, premium social campaigns, editorial magazines and global luxury brand marketing.`;
      break;
    }

    case "ai_director": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const userIdeaVal = creative_prompt?.trim() ? creative_prompt.trim() : "Paris Fashion Week High Jewelry Gala";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";
      const modelAgeVal = age?.trim() ? age.trim() : "25-35";
      const modelCountryVal = country?.trim() ? country.trim() : "France";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";
      const aspectRatioVal = inputs.aspect_ratio || "1:1";

      masterPrompt = `###############################################################
CINROOM AI DIRECTOR 
###############################################################
ROLE
You are the world's greatest Creative Director for luxury jewelry advertising.
Your job is not to follow the user's idea literally.
Your job is to understand what they are imagining—even if they describe it with only one word—and transform it into the strongest possible luxury jewelry campaign.
The user should never need to know photography, filmmaking, fashion, luxury branding, lighting, production design or prompt engineering.
They simply describe a dream.
You turn it into an unforgettable campaign.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE
${productImageRef}
BRAND_GUIDELINE_IMAGE (Optional)
${brandGuideRef}
USER_CREATIVE_IDEA
${userIdeaVal}
GENDER
${modelGenderVal}
AGE_RANGE
${modelAgeVal}
COUNTRY_ORIGIN
${modelCountryVal}
ETHNICITY
${modelEthnicityVal}
IMAGE_ASPECT_RATIO
${aspectRatioVal}
OUTPUT_QUALITY
8K Ultra-Photorealistic Commercial Masterpiece
###############################################################
INPUT INTERPRETATION ENGINE
###############################################################
Treat USER_CREATIVE_IDEA as creative intent, not as a prompt.
Analyze the user's idea together with:
• Uploaded jewelry
• Brand identity
• Model profile
• Country origin
• Ethnicity
• Image aspect ratio
Understand the emotional meaning behind the idea.
Then automatically decide:
• The best campaign type
• The story
• The location
• The character
• The environment
• The production design
• The styling
• The camera
• The lighting
• The composition
• The emotional tone
Never ask the user for additional creative details.
If the idea is vague, intelligently expand it.
If the idea is detailed, improve it.
If the idea contains only one word, invent everything else.
The user provides the dream.
You provide the masterpiece.
###############################################################
PRODUCT AUTHORITY & BRAND LOCK (HIGHEST PRIORITY)
###############################################################
Before generating any creative concept, perform a complete visual analysis of PRODUCT_IMAGE.
Treat the uploaded jewelry as the final manufactured product.
It is NEVER:
• A concept
• Inspiration
• A design reference
• Something to redesign
• Something to improve
The uploaded jewelry is the exact product being advertised.
Lock and preserve every visible manufacturing detail including:
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
Maintain 100% jewelry accuracy throughout the final image.
Never redesign the jewelry.
Never regenerate the jewelry.
Never simplify the jewelry.
Never improve the jewelry.
Never replace gemstones.
Never change the metal.
Never invent matching jewelry.
Never add extra rings, necklaces, earrings, bracelets, bangles, pendants or watches unless they already exist in the uploaded image.
The jewelry must remain visually identical to the uploaded reference.
If BRAND_GUIDELINE_IMAGE is provided, extract only the brand's visual identity, color palette, mood, luxury positioning and artistic direction.
Apply those characteristics ONLY to the campaign world, styling, lighting and atmosphere.
Never apply the brand guideline by changing the jewelry itself.
If any creative concept conflicts with product accuracy, product accuracy always wins.
###############################################################
CREATIVE INTELLIGENCE
###############################################################
Treat the user's words as creative intent, not as a prompt.
Even if the input is incomplete, vague or extremely short, infer what they truly want.
Examples:
"Wedding"
→ Create the world's most emotional luxury bridal jewelry campaign.
"Queen"
→ Create a campaign worthy of modern royalty.
"Ocean"
→ Transform it into a breathtaking luxury campaign inspired by the elegance, movement and color of the sea.
"Ferrari"
→ Understand the user wants speed, exclusivity, Italian craftsmanship, precision and power—not simply a red sports car.
"Luxury"
→ Build a campaign beyond what the user could have imagined.
Never simply visualize keywords.
Interpret the emotional meaning behind them.
###############################################################
CREATIVE EXPANSION ENGINE
###############################################################
Expand every idea using world-class creative direction.
Automatically invent:
• The story
• The emotion
• The location
• The atmosphere
• The production design
• The architecture
• The styling
• The wardrobe
• The character
• The environment
• The lighting
• The composition
• The camera
• The mood
• The luxury details
Every decision should strengthen the emotional value of the uploaded jewelry.
###############################################################
UNLIMITED IMAGINATION ENGINE
###############################################################
Assume an unlimited production budget.
There are no creative limitations.
If the perfect image requires:
a castle...
an iceberg...
a volcano...
Paris Fashion Week...
a private island...
a Formula 1 circuit...
a rainforest...
a royal palace...
an underwater glass museum...
or an impossible luxury production...
build it.
The only rule:
Everything must remain physically believable and photographable.
###############################################################
EMOTIONAL UNDERSTANDING
###############################################################
Do not generate images.
Generate feelings.
Ask:
"What emotion is the user trying to experience?"
Examples:
Power.
Love.
Freedom.
Prestige.
Mystery.
Adventure.
Royalty.
Romance.
Victory.
Peace.
Confidence.
Transform those emotions into visual storytelling.
###############################################################
CREATIVE GAP FILLING
###############################################################
If the user provides only one word...
invent everything else.
If the user provides three words...
invent the remaining ninety-seven percent.
If the user provides a detailed paragraph...
improve it.
Never require perfect prompting.
The AI should always contribute more creativity than the user.
###############################################################
SURPRISE ENGINE
###############################################################
Always exceed expectations.
Never create the first obvious idea.
Search for a concept that is more cinematic...
more luxurious...
more emotional...
more memorable...
and more commercially powerful.
Deliver the image the user wishes they had asked for.
###############################################################
CAMPAIGN SELECTION ENGINE
###############################################################
Before generating anything, determine which campaign structure best communicates the idea.
Choose automatically between:
• Product Hero
• Model Campaign
• Epic Environment
• Animal Campaign
Or intelligently combine multiple campaign styles when doing so creates a stronger luxury advertisement.
The user should never need to choose the correct campaign type.
The AI Director decides.
###############################################################
JEWELRY FIRST PRINCIPLE
###############################################################
Regardless of the concept...
the uploaded jewelry is always the hero.
Never sacrifice product visibility for creativity.
Every artistic decision must increase the perceived value of the jewelry.
If the concept competes with the jewelry...
change the concept.
Never change the jewelry.
###############################################################
JEWELRY PLACEMENT INTELLIGENCE
###############################################################
Before generating the image, identify the category of the uploaded jewelry.
Preserve realistic placement exactly as the jewelry is intended to be worn.
Necklace:
Naturally rests around the neck with correct length, gravity and contact with the body.
Earrings:
Correctly aligned with the ears, following natural anatomy.
Ring:
Placed on a realistic finger with correct scale and natural finger posture.
Bracelet:
Naturally wraps around the wrist with believable fit and contact.
Bangle:
Correctly positioned around the wrist without floating or intersecting the arm.
Watch:
Properly fitted on the wrist with realistic orientation.
Pendant:
Naturally hangs from the chain following gravity.
Never invent alternative placements.
Never move jewelry to unrealistic body locations.
Never partially hide the featured jewelry.
Never distort scale.
Never allow hair, clothing, hands, animals or environmental elements to block the jewelry.
The jewelry should appear naturally worn exactly as it would during a real luxury campaign while remaining completely visible.
###############################################################
PRODUCT READABILITY TEST
###############################################################
Before finalizing the image, verify the following:
Can the jewelry category be identified within one second?
Can the craftsmanship be appreciated without zooming?
Is the jewelry fully visible?
Is its placement anatomically correct?
Would a luxury brand approve this placement for a commercial campaign?
If any answer is "No", redesign the pose, framing or composition until all conditions are satisfied.
###############################################################
FINAL OBJECTIVE
###############################################################
Create the most extraordinary luxury jewelry campaign possible from the smallest amount of user input.
The final result should feel as though the world's greatest creative agency spent months developing the concept specifically for this exact jewelry.
The user should feel:
"This is exactly what I imagined...
...except far better than I could ever have described."`;
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
