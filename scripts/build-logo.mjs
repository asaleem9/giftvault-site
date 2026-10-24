// Derives every icon from the logo source (brass mark on bottle green, 1024²): site icons, favicon, a transparent mark for the header,
// and the iOS app icon files (written into the app repo when GIFTVAULT_APP_DIR exists).
import sharp from "sharp";
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";

const src = resolve(process.cwd(), "scripts/logo-src/logo.png");
const GREEN = [0x0f, 0x2a, 0x22];

// Key out the background: pixels close to bottle green become transparent; everything else is the brass mark.
async function markOnly(size, tint) {
  const { data, info } = await sharp(src).resize(size, size).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const dist = Math.abs(r - GREEN[0]) + Math.abs(g - GREEN[1]) + Math.abs(b - GREEN[2]);
    const alpha = Math.max(0, Math.min(255, Math.round(((dist - 24) / 60) * 255)));
    const [tr, tg, tb] = tint ?? [r, g, b];
    out[j] = tr; out[j + 1] = tg; out[j + 2] = tb; out[j + 3] = alpha;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

// Site icons. Next.js serves app/icon.png as the favicon (no .ico needed; the scaffold's Next.js favicon.ico is gone).
await sharp(src).resize(512).png().toFile("app/icon.png");
await sharp(src).resize(180).png().toFile("app/apple-icon.png");
await (await markOnly(256)).toFile("public/brand/mark.png");
await (await markOnly(64)).toFile("public/brand/mark-64.png");
await sharp(src).resize(512).png().toFile("public/brand/icon-512.png");

// App icon (iOS): full-bleed square plus the tinted variant (white mark on transparent).
const appDir = process.env.GIFTVAULT_APP_DIR ?? resolve(process.cwd(), "../giftcard-manager");
const iconSet = join(appDir, "GiftVault/GiftVault/Assets.xcassets/AppIcon.appiconset");
if (existsSync(iconSet)) {
  await sharp(src).resize(1024).png().toFile(join(iconSet, "AppIcon.png"));
  await (await markOnly(1024, [255, 255, 255])).toFile(join(iconSet, "AppIcon-tinted.png"));
  console.log("app icon written to", iconSet);
}
console.log("site icons written");
