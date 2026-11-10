import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const iconSrc = path.resolve('public/images/app-icon.png');
const resDir = path.resolve('android/app/src/main/res');

const iconSizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

console.log('Generating Android icons from', iconSrc);

iconSizes.forEach(({ folder, size }) => {
  const targetDir = path.join(resDir, folder);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const targets = [
    path.join(targetDir, 'ic_launcher.png'),
    path.join(targetDir, 'ic_launcher_round.png'),
    path.join(targetDir, 'ic_launcher_foreground.png'),
  ];

  targets.forEach((target) => {
    execSync(`sips -z ${size} ${size} "${iconSrc}" --out "${target}"`, { stdio: 'ignore' });
  });
  console.log(`Updated ${folder} (${size}x${size})`);
});

// Splash screens
const splashFolders = [
  'drawable',
  'drawable-port-mdpi',
  'drawable-port-hdpi',
  'drawable-port-xhdpi',
  'drawable-port-xxhdpi',
  'drawable-port-xxxhdpi',
  'drawable-land-mdpi',
  'drawable-land-hdpi',
  'drawable-land-xhdpi',
  'drawable-land-xxhdpi',
  'drawable-land-xxxhdpi',
];

splashFolders.forEach((folder) => {
  const targetDir = path.join(resDir, folder);
  if (fs.existsSync(targetDir)) {
    const splashPath = path.join(targetDir, 'splash.png');
    fs.copyFileSync(iconSrc, splashPath);
  }
});
console.log('Updated splash screens across drawable folders.');
