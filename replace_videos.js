const fs = require('fs');
const path = require('path');

const replacements = {
  'porfolio/videos/Alpine%20Sapphire.mp4': 'porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4',
  'porfolio/videos/Emerald%20Precision.mp4': 'porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4',
  'porfolio/videos/Golden%20Serpent.mp4': 'porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4',
  'porfolio/videos/Island%20Vows.mp4': 'porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4',
  'porfolio/videos/Royal%20Radiance%20.mp4': 'porfolio/videos/reduce%20size/Royal%20Radiance%20%20reduce%20size.mp4',
  'porfolio/videos/Sunset%20Elegance.mp4': 'porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4',
  'porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty.mp4': 'porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4',
  'porfolio/videos/The%20Blue%20Dynasty.mp4': 'porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4',
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const [key, value] of Object.entries(replacements)) {
    if (content.includes(key)) {
      content = content.split(key).join(value);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
