// Encodes the mascot poses (PNG with alpha, generated once with an image model) into AVIF/WebP for the site.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const src = resolve(process.cwd(), "scripts/mascot-src");
const out = resolve(process.cwd(), "public/mascot");
mkdirSync(out, { recursive: true });
const poses = { hero: "mascot-01-hero.png", wave: "mascot-02-wave.png", register: "mascot-03-register.png", empty: "mascot-04-empty.png", portrait: "mascot-05-portrait.png" };
for (const [pose, file] of Object.entries(poses)) {
  for (const w of [480, 960]) {
    const base = sharp(resolve(src, file)).resize({ width: w });
    await base.clone().webp({ quality: 88, alphaQuality: 90 }).toFile(resolve(out, `${pose}-${w}.webp`));
    await base.clone().avif({ quality: 60 }).toFile(resolve(out, `${pose}-${w}.avif`));
  }
}
await sharp(resolve(src, poses.hero)).resize({ width: 560 }).png({ compressionLevel: 9, palette: true }).toFile(resolve(out, "hero-og.png"));
console.log("mascot poses encoded:", Object.keys(poses).join(", "));
