// Fetches each merchant's brand icon once, at build time, from the brand's own site (apple-touch-icon) with Google's
// favicon service as the fallback. Writes PNGs for the site (public/logos) and for the app's core package
// (Resources/logo-<id>.png) so the app ships them and never fetches at runtime.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const appDir = process.env.GIFTVAULT_APP_DIR ?? resolve(process.cwd(), "../giftcard-manager");
const catalog = JSON.parse(readFileSync(join(appDir, "GiftVault/Packages/GiftVaultCore/Sources/GiftVaultCore/Resources/merchants.json"), "utf8"));
const siteOut = resolve(process.cwd(), "public/logos");
const appOut = join(appDir, "GiftVault/Packages/GiftVaultCore/Sources/GiftVaultCore/Resources/Logos");
mkdirSync(siteOut, { recursive: true });
mkdirSync(appOut, { recursive: true });
const only = process.argv[2]; // optional single id

async function get(url) {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10000), headers: { "user-agent": "Mozilla/5.0 (Macintosh) AppleWebKit/605 (KHTML, like Gecko) Safari/605" } });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    const meta = await sharp(buf).metadata().catch(() => null);
    if (!meta || !meta.width || meta.width < 48) return null;
    return { buf, size: meta.width };
  } catch {
    return null;
  }
}

const report = [];
for (const m of catalog) {
  if (only && m.id !== only) continue;
  if (!m.domain) { report.push(`${m.id}: no domain`); continue; }
  const target = join(siteOut, `${m.id}.png`);
  if (existsSync(target) && !process.env.REFRESH) continue;
  const candidates = [
    `https://${m.domain}/apple-touch-icon.png`,
    `https://www.${m.domain}/apple-touch-icon.png`,
    `https://${m.domain}/apple-touch-icon-precomposed.png`,
    `https://www.google.com/s2/favicons?domain=${m.domain}&sz=256`,
    `https://www.google.com/s2/favicons?domain=${m.domain}&sz=128`,
  ];
  let best = null;
  for (const url of candidates) {
    const got = await get(url);
    if (got && (!best || got.size > best.size)) best = { ...got, url };
    if (best && best.size >= 160) break;
  }
  if (!best) { report.push(`${m.id}: no icon found for ${m.domain}`); continue; }
  // Normalise: square, 256 px, keep alpha, flatten tiny icons on white so dark marks stay visible on dark cards.
  const png = await sharp(best.buf).resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  writeFileSync(target, png);
  writeFileSync(join(appOut, `logo-${m.id}.png`), png);
  report.push(`${m.id}: ${best.size}px from ${new URL(best.url).host}`);
}
writeFileSync(resolve(process.cwd(), "scripts/logos-report.txt"), report.join("\n") + "\n");
console.log(report.join("\n"));
