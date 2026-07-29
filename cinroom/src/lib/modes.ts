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
    title: "Luxury Fashion Campaign",
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
    requiresModelInfo: true,
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
    case "product_hero": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const videoDurationVal = inputs.duration || "15s";
      const aspectRatioVal = inputs.aspect_ratio || "16:9";

      masterPrompt = `###############################################################
LUXURY JEWELRY HERO CAMPAIGN ENGINE v4.0
###############################################################
ROLE
You are an Academy Award-winning Luxury Commercial Director, IMAX Cinematographer, Jewelry Photographer, Product Photographer, Production Designer, Macro Cinematographer, Lighting Director, Color Scientist and Luxury Brand Art Director.
Create a premium luxury jewelry commercial that feels indistinguishable from a real multi-million-dollar production. Every frame should look captured with real cameras, premium cinema lenses, physically correct lighting and world-class production design. The final result must never look AI-generated.
###############################################################
INPUTS
###############################################################
PRODUCT_IMAGE:
${productImageRef}
BRAND_GUIDELINE_IMAGE:
${brandGuideRef}
VIDEO_DURATION:
${videoDurationVal}
ASPECT_RATIO:
${aspectRatioVal}
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
HERO SCENE DESIGN
###############################################################
Design one iconic 3D luxury hero environment inspired entirely by the uploaded jewelry.
Before creating the environment, analyze the jewelry's metal, gemstones, craftsmanship, texture, finish, patterns, shape language, colors and overall luxury identity.
The environment must feel custom-designed specifically for this jewelry, not like a generic studio background.
Transform the visual language of the jewelry into architecture, sculptures, materials, surfaces and environmental design.
For example, decorative patterns may become large architectural forms, gemstone cuts may inspire crystal structures, metal textures may evolve into sculptural surfaces, woven threads may become elegant flowing installations, engraved details may influence walls and flooring, and premium materials may inspire bespoke set design.
Use rich three-dimensional elements such as:
• Luxury stone formations
• Sculptural architecture
• Designer fabrics and flowing silk
• Woven luxury threads
• Metallic structures
• Crystal installations
• Glass sculptures
• Reflective premium surfaces
• Marble compositions
• Elegant floral structures
• Luxury geometric forms
• Artistic product-inspired sculptures
• Premium environmental lighting features
Avoid flat, plain or solid-color backgrounds.
Every frame should contain visual depth, layered foreground, midground and background elements that naturally draw attention toward the jewelry.
The environment should feel handcrafted, immersive, cinematic and visually expensive while remaining clean and uncluttered.
The jewelry always remains the hero.
The environment exists only to enhance the jewelry, never compete with it.
The entire commercial takes place within this single custom-designed hero world.
The hero world remains permanently locked throughout the commercial.
Only camera angle, composition, lighting and focus may change between shots.
###############################################################
PRODUCTION DESIGN
###############################################################
Every environment must feel handcrafted by world-class production designers rather than AI-generated.

Transform the visual language of the jewelry into the architecture, materials, lighting, sculptures, furniture, surfaces and environmental details.

Create rich foreground, midground and background layering with premium visual depth.

Every object should feel intentionally designed and placed.

Avoid empty spaces, flat backgrounds, repetitive layouts and generic  environments  .

Every frame should resemble a meticulously art-directed luxury editorial photograph captured inside a bespoke multi-million-dollar production set.
###############################################################
CAMERA ENGINE
###############################################################
Capture the commercial using world-class cinematic language inspired by premium luxury advertising and Hollywood blockbuster cinematography.
Every frame should feel captured with an IMAX large-format cinema camera using premium large-format cinema lenses with authentic optical behavior.
Use a sophisticated combination of:
• Extreme macro
• Macro close-up
• Beauty close-up
• Hero product shots
• Precision craftsmanship shots
• Reflection shots
• Refraction shots
• Wide establishing hero shots
• Cinematic environmental compositions
Maintain natural cinematic depth of field.
During macro shots, keep the jewelry razor sharp while backgrounds fall into soft, natural optical bokeh.
For wider shots, increase depth of field only when it enhances scale and storytelling.
Use premium cinematic camera movement including:
• Robotic slider
• Motion-control camera
• Slow dolly
• Precision tracking
• Floating gimbal
• Crane movement
• Elegant orbital movement
• Arc movement
• Macro push-in
• Macro pull-out
• Cinematic reveal
Every movement must feel smooth, elegant, intentional and premium.
Avoid handheld shake, whip pans, unnecessary fast movement or repetitive compositions.
###############################################################
ATMOSPHERE ENGINE
###############################################################
Create a premium cinematic atmosphere that enhances realism without distracting from the jewelry.
Use subtle environmental elements only when they naturally support the scene.
Possible atmospheric effects include:
• Soft haze
• Fine mist
• Floating dust
• Light rays
• Controlled smoke
• Gentle air movement
• Flowing silk
• Flowing fabric
• Water ripples
• Premium reflections
• Crystal reflections
• Elegant shadow movement
Every atmospheric effect must obey real-world physics.
The jewelry must always remain the visual focal point.
###############################################################
EDITING ENGINE
###############################################################
Create a fast-paced luxury commercial with premium cinematic rhythm.
Every individual shot must be 1.5 seconds or shorter.
Under no circumstances may a single shot exceed 1.5 seconds.
Target an average shot duration of 0.8–1.2 seconds to maintain a dynamic, premium editing pace.
Open immediately with either an iconic hero composition or an elegant macro reveal of the jewelry.
Every cut must introduce a meaningful visual change through camera angle, composition, focal length, movement or lighting emphasis.
Alternate naturally between hero compositions, macro craftsmanship, gemstone details, material textures, reflections and environmental beauty.
Avoid repetitive shots, static pacing and unnecessary lingering.
Maintain continuous visual progression from beginning to end.
Finish on the strongest and most memorable hero composition.
###############################################################
VISUAL QUALITY ENGINE
###############################################################
Every frame must achieve world-class luxury commercial quality.
The commercial should be visually indistinguishable from footage captured with real IMAX large-format cinema cameras and premium cinema lenses.
Prioritize:
• Ultra photorealism
• Exceptional micro-detail
• Accurate jewelry reproduction
• Physically accurate lighting
• Physically accurate reflections
• Accurate gemstone refraction
• Premium color science
• Rich dynamic range
• Natural skin texture
• Authentic optical behavior
• Cinematic depth of field
• Realistic motion blur
• Clean image quality
Maintain perfect consistency across every frame including:
• Product consistency
• Color consistency
• Lighting consistency
• Material consistency
• Reflection consistency
• Temporal consistency
Use premium cinematic color grading with neutral whites, elegant contrast, realistic skin tones and luxurious color harmony.
Favor soft daylight, overcast luxury lighting, diffused skylight, blue-hour ambience or naturally balanced premium outdoor lighting.
Avoid excessive warmth, orange color casts, artificial HDR, oversharpening, plastic skin, fake reflections, noisy textures, flickering, ghosting, warped geometry and any visible AI artifacts.
###############################################################
MUSIC & SOUND DESIGN
###############################################################
Create a premium cinematic soundtrack that enhances the luxury identity of the commercial.
The music should feel modern, elegant, emotionally engaging and memorable while remaining refined and sophisticated.
Synchronize the soundtrack naturally with editing rhythm, camera movement and emotional progression.
Use subtle premium sound design including:
• Wind ambience
• Fabric movement
• Jewelry handling
• Metallic resonance
• Gemstone sparkle
• Environmental ambience
• Elegant cinematic transitions
Maintain Hollywood-level audio quality with excellent clarity, depth, balance and dynamic range.
###############################################################
NEGATIVE PROMPT
###############################################################
Never redesign the uploaded jewelry.
Never invent additional jewelry.
Never generate matching jewelry sets.
Never generate complementary accessories.
Never add rings, earrings, necklaces, bracelets, bangles, pendants, chains, anklets, nose rings or head jewelry unless they already exist in the uploaded PRODUCT_IMAGE.
No missing jewelry.
No extra jewelry.
No duplicated jewelry.
No altered geometry.
No altered proportions.
No altered craftsmanship.
No altered gemstone placement.
No missing gemstones.
No extra gemstones.
No broken jewelry.
No floating jewelry.
No unrealistic reflections.
No AI artifacts.
No flickering.
No ghosting.
No warped geometry.
No cartoon appearance.
No plastic skin.
No AI-looking faces.
No text.
No logos.
No watermarks.
###############################################################
FINAL OBJECTIVE
###############################################################
Create an unforgettable luxury jewelry commercial that appears to have been produced by one of the world's leading luxury advertising studios using IMAX large-format cinema cameras, premium cinema lenses and Hollywood production standards.
Only the jewelry contained in the uploaded PRODUCT_IMAGE may appear anywhere in the commercial.
Every visible jewelry item must exactly match the uploaded reference throughout the entire film.
The jewelry must remain the absolute visual hero while preserving its design, craftsmanship, proportions, materials and every manufacturing detail with exact visual fidelity.
The environment, lighting, cinematography, reflections, storytelling and production design should elevate the jewelry without ever modifying it.
The final result must feel timeless, elegant, emotionally engaging and completely indistinguishable from a real multi-million-dollar luxury jewelry campaign.
The jewelry must remain 100% visually identical to the uploaded reference.`;
      break;
    }

    case "model_campaign": {
      const productImageRef = jewelry_images.length > 0 ? "the uploaded product image" : "the uploaded jewelry reference image";
      const brandGuideRef = brand_guideline_images.length > 0 ? "the uploaded brand guideline color palette image" : "the brand guideline image";
      const modelAgeVal = age?.trim() ? age.trim() : "25";
      const modelEthnicityVal = ethnicity?.trim() ? ethnicity.trim() : "Caucasian";
      const modelGenderVal = gender?.trim() ? gender.trim() : "Female";

      masterPrompt = `###############################################################
Luxury Fashion Campaign
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
LUXURY STUDIO WORLD DESIGN
###############################################################
Design one iconic premium luxury studio environment inspired entirely by the uploaded jewelry.
Before creating the environment, analyze:
• Uploaded jewelry
• Brand guideline (if provided)
• Model profile
• Jewelry craftsmanship
• Metal
• Gemstones
• Colors
• Luxury positioning
• Shape language
Create a bespoke luxury studio specifically designed for this jewelry campaign.
This is NOT a generic photography studio.
The studio should feel like a multi-million-dollar luxury fashion set created by the world's leading production designers.
Transform the visual language of the jewelry into the studio architecture, furniture, materials, lighting and artistic installations.
For example:
• Sculptural architectural forms
• Designer marble
• Onyx
• Travertine
• Luxury glass installations
• Crystal sculptures
• Metallic structures
• Premium mirrors
• Reflective architectural panels
• Flowing luxury fabrics
• Floating silk
• Designer curtains
• Premium furniture
• Luxury geometric installations
• Artistic lighting sculptures
• Bespoke product-inspired installations
Avoid empty studio spaces.
Avoid plain cyclorama backgrounds.
Avoid flat one-color backgrounds.
Create rich foreground, midground and background layering.
The studio should contain multiple layers, premium materials, depth and cinematic composition.
The environment must feel handcrafted, immersive, editorial and visually expensive.
The entire campaign takes place inside this single premium studio world.
The studio remains consistent throughout the commercial.
Only camera angle, composition, lighting and set dressing emphasis may change between shots.
The environment exists only to elevate the jewelry.
The jewelry always remains the hero.
###############################################################
PRODUCTION DESIGN
###############################################################
Every environment must feel handcrafted by world-class production designers rather than AI-generated.

Transform the visual language of the jewelry into the architecture, materials, lighting, sculptures, furniture, surfaces and environmental details.

Create rich foreground, midground and background layering with premium visual depth.

Every object should feel intentionally designed and placed.

Avoid empty spaces, flat backgrounds, repetitive layouts and generic  environments  .

Every frame should resemble a meticulously art-directed luxury editorial photograph captured inside a bespoke multi-million-dollar production set.
###############################################################
MODEL DIRECTION
###############################################################
Use a ${modelAgeVal}-year-old ${modelEthnicityVal} ${modelGenderVal} suitable for a global luxury jewelry campaign.
The model must appear indistinguishable from a real international fashion model photographed for Vogue, Harper's Bazaar or high-end luxury advertising campaigns.
Maintain:
• Natural facial anatomy
• Realistic skin pores
• Authentic expressions
• Elegant body language
• Premium editorial posing
• Luxury grooming
• Refined makeup
• Premium wardrobe
• Consistent identity throughout every shot
Hands should elegantly present the jewelry whenever appropriate.
Every pose should naturally emphasize the jewelry without feeling artificial or overposed.
The model should confidently interact with the studio environment while maintaining sophisticated luxury fashion energy.
The model always complements the jewelry.
The jewelry always remains the primary visual subject.
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
Color grading should emphasize neutral whites, cool cinematic tones and accurate color reproduction, avoiding excessive warm, orange or golden color casts.
Use premium cinematic lighting with a neutral or cool color palette.
Favor soft daylight, overcast luxury lighting, alpine daylight, blue-hour ambience, crisp mountain light, diffused skylight or naturally balanced studio-quality outdoor lighting.
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
Create an unforgettable luxury fashion jewelry campaign that appears to have been photographed inside a bespoke multi-million-dollar studio built exclusively for the uploaded jewelry.
Deliver world-class IMAX-inspired cinematography, premium cinema optics, luxury fashion photography, elegant production design and flawless product fidelity.
The studio environment, lighting, model, wardrobe, cinematography and storytelling must all adapt to the uploaded jewelry.
The jewelry must never adapt to them.
Create rich architectural depth, premium layering, sophisticated compositions and visually expensive production design that feels comparable to the world's leading luxury jewelry advertising campaigns.
Every frame should feel editorial, cinematic, emotionally engaging and completely photorealistic.
Maintain exact visual fidelity of the uploaded jewelry throughout the entire commercial while producing a timeless luxury campaign worthy of the world's most prestigious jewelry brands.`;
      break;
    }

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
PRODUCTION DESIGN
###############################################################
Every environment must feel handcrafted by world-class production designers rather than AI-generated.

Transform the visual language of the jewelry into the architecture, materials, lighting, sculptures, furniture, surfaces and environmental details.

Create rich foreground, midground and background layering with premium visual depth.

Every object should feel intentionally designed and placed.

Avoid empty spaces, flat backgrounds, repetitive layouts and generic  environments  .

Every frame should resemble a meticulously art-directed luxury editorial photograph captured inside a bespoke multi-million-dollar production set.
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
Color grading should emphasize neutral whites, cool cinematic tones and accurate color reproduction, avoiding excessive warm, orange or golden color casts.
Use premium cinematic lighting with a neutral or cool color palette.
Favor soft daylight, overcast luxury lighting, alpine daylight, blue-hour ambience, crisp mountain light, diffused skylight or naturally balanced studio-quality outdoor lighting.
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
ANIMAL WORLD DESIGN
###############################################################
Design one iconic cinematic world where the uploaded jewelry and a carefully selected companion animal naturally exist together.
Before designing the campaign, analyze:
• Uploaded jewelry
• User theme
• Brand guideline (if provided)
• Companion Animal input (if provided)
ANIMAL SELECTION
If the user specifies a Companion Animal, use that animal consistently throughout the commercial.
If no Companion Animal is provided, intelligently select the most suitable premium animal based on the jewelry's craftsmanship, materials, gemstones, colors, luxury positioning, design language and emotional identity.
The chosen animal should strengthen the luxury storytelling while ensuring the jewelry remains the absolute hero.
Possible premium companion animals include:
• Black Panther
• Snow Leopard
• White Tiger
• White Lion
• Arabian Horse
• White Horse
• Falcon
• Eagle
• Owl
• Swan
• White Peacock
• Peacock
• Elephant
• Deer
• Wolf
• Fox
• Butterfly
• Hummingbird
• Koi Fish
• Dolphin
• Whale
• Exotic Birds
ENVIRONMENT DESIGN
Create one premium cinematic world inspired by:
• The jewelry
• The selected companion animal
• The user's creative theme
• Brand guideline (if available)
The environment must feel handcrafted specifically for this campaign.
Possible environments include:
• Premium jungle
• Ancient forests
• Luxury botanical gardens
• Crystal caves
• Marble ruins
• Waterfalls
• Floating islands
• Mountain landscapes
• Snow landscapes
• Luxury gardens
• Desert dunes
• Crystal rivers
• Exotic flower fields
• Sculptural rock formations
• Premium architectural landscapes
Transform the visual language of both the jewelry and the companion animal into a rich cinematic environment.
Avoid generic zoo environments.
Avoid random wildlife documentary scenes.
Avoid empty or flat backgrounds.
Create layered foreground, midground and background elements with premium environmental detail and cinematic depth.
The selected companion animal should move gracefully and naturally.
Animals should never dominate the frame.
Animals should naturally complement the model and jewelry without distracting attention.
The same environment and the same companion animal must remain consistent throughout the commercial.
Never randomly change animal species.
Never introduce additional companion animals unless explicitly requested.
The entire world exists only to elevate the uploaded jewelry.
The jewelry always remains the absolute visual hero.
The environment and companion animal adapt to the jewelry.
The jewelry never adapts to the environment or the companion animal.
###############################################################
PRODUCTION DESIGN
###############################################################
Every environment must feel handcrafted by world-class production designers rather than AI-generated.

Transform the visual language of the jewelry into the architecture, materials, lighting, sculptures, furniture, surfaces and environmental details.

Create rich foreground, midground and background layering with premium visual depth.

Every object should feel intentionally designed and placed.

Avoid empty spaces, flat backgrounds, repetitive layouts and generic  environments  .

Every frame should resemble a meticulously art-directed luxury editorial photograph captured inside a bespoke multi-million-dollar production set.
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
COMPANION ANIMAL DIRECTION
###############################################################
Render the companion animal with complete photorealism.
Maintain realistic anatomy, proportions, fur, feathers, scales, skin textures, muscle movement and natural behavior throughout the commercial.
Preserve consistent identity, appearance and scale across every shot.
Animal movement should feel elegant, calm, emotionally expressive and naturally integrated into the cinematic storytelling.
The companion animal may interact with the model and environment but must never block, hide or overpower the jewelry.
Maintain clear visual hierarchy:
1. Jewelry
2. Model
3. Companion Animal
4. Environment
The companion animal should enhance the emotional atmosphere without becoming the primary subject.
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
Color grading should emphasize neutral whites, cool cinematic tones and accurate color reproduction, avoiding excessive warm, orange or golden color casts.
Use premium cinematic lighting with a neutral or cool color palette.
Favor soft daylight, overcast luxury lighting, alpine daylight, blue-hour ambience, crisp mountain light, diffused skylight or naturally balanced studio-quality outdoor lighting.
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
Create an unforgettable outdoor luxury jewelry campaign that looks like it was captured for a global luxury brand with IMAX-level cinematic quality and Hollywood production value, while maintaining 100% PRECISE, 100% ACCURATE visual reproduction of the uploaded jewelry in every single frame. The environment, lighting, camera, model, wardrobe and storytelling must adapt to the jewelry—the jewelry must never adapt to them.
Build a breathtaking cinematic world around the jewelry using a carefully selected companion animal, premium production design, realistic environments, elegant cinematography and emotionally engaging storytelling.
If the user specifies a companion animal, preserve that animal consistently throughout the campaign.
If no companion animal is specified, intelligently select the most appropriate premium companion animal based on the uploaded jewelry and maintain it consistently throughout the commercial.
The jewelry must remain the absolute visual hero in every frame.
The environment, companion animal, lighting, cinematography, wardrobe, model and storytelling must all adapt to the jewelry.
The jewelry must never adapt to them.
Deliver a timeless, emotionally engaging, visually unforgettable luxury commercial with flawless product accuracy, cinematic realism and world-class production quality.`;
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
