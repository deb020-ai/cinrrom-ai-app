const fs = require('fs');
const path = require('path');

const replacements = {
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Alpine%20Sapphire%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Emerald%20Precision%20Reduce%20Size%202.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Golden%20Serpent%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Royal%20Radiance%20%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Royal%20Radiant%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Royal%20Radiance%20%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Sunset%20Elegance%20Reduce%20Size.mp4",
  "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4": "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/The%20Blue%20Dynasty%20Reduce%20Size(3).mp4"
};

const files = [
  "c:/cinrrom/src/components/sections/Archive.tsx",
  "c:/cinrrom/src/components/sections/Campaigns.tsx",
  "c:/cinrrom/src/components/sections/Process.tsx",
  "c:/cinrrom/src/components/sections/Services.tsx",
  "c:/cinrrom/src/components/sections/Unforgettable.tsx",
  "c:/cinrrom/src/components/sections/jewelry/JewelryCta.tsx",
  "c:/cinrrom/src/components/sections/jewelry/JewelryHero.tsx",
  "c:/cinrrom/src/components/sections/jewelry/JewelryLaunchHero.tsx",
  "c:/cinrrom/src/components/sections/jewelry/JewelryPortfolio.tsx",
  "c:/cinrrom/src/components/sections/jewelry/JewelryPsychology.tsx"
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  for (const [oldUrl, newUrl] of Object.entries(replacements)) {
    content = content.split(oldUrl).join(newUrl);
  }
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
