// Fetches each merchant's brand icon once, at build time, from the brand's own site (apple-touch-icon) with Google's
// favicon service as the fallback. Writes PNGs for the site (public/logos) and for the app's core package
// (Resources/logo-<id>.png) so the app ships them and never fetches at runtime.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const appDir = process.env.GIFTVAULT_APP_DIR ?? resolve(process.cwd(), "../giftcard-manager");
const catalog = JSON.parse(readFileSync(process.env.CATALOG ?? join(appDir, "GiftVault/Packages/GiftVaultCore/Sources/GiftVaultCore/Resources/merchants.json"), "utf8"));
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
    if (!meta || !meta.width || meta.width < 32) return null;
    return { buf, size: meta.width };
  } catch {
    return null;
  }
}

/** Icons the homepage declares (apple-touch-icon, icon, og:image), largest declared size first. */
async function declaredIcons(domain) {
  for (const origin of [`https://www.${domain}`, `https://${domain}`]) {
    try {
      const r = await fetch(origin, { redirect: "follow", signal: AbortSignal.timeout(10000), headers: { "user-agent": "Mozilla/5.0 (Macintosh) AppleWebKit/605 (KHTML, like Gecko) Safari/605", accept: "text/html" } });
      if (!r.ok) continue;
      const html = (await r.text()).slice(0, 400000);
      const links = [...html.matchAll(/<link[^>]+>/gi)].map((x) => x[0]).filter((t) => /rel=["'][^"']*(apple-touch-icon|icon)/i.test(t));
      const scored = links.map((t) => {
        const href = /href=["']([^"']+)["']/i.exec(t)?.[1];
        const size = Number(/sizes=["'](\d+)x/i.exec(t)?.[1] ?? (/apple-touch-icon/i.test(t) ? 180 : 32));
        return href ? { href, size } : null;
      }).filter(Boolean).sort((a, b) => b.size - a.size);
      const urls = scored.filter((x) => !/\.ico(\?|$)/i.test(x.href) && !/\.svg(\?|$)/i.test(x.href)).map((x) => new URL(x.href, r.url).toString());
      if (urls.length) return urls.slice(0, 3);
    } catch {
      /* try the next origin */
    }
  }
  return [];
}

const report = [];
for (const m of catalog) {
  if (only && m.id !== only) continue;
  if (!m.domain) { report.push(`${m.id}: no domain`); continue; }
  const target = join(siteOut, `${m.id}.png`);
  if (existsSync(target) && !process.env.REFRESH) continue;
  const candidates = [
    ...(await declaredIcons(m.domain)),
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
  // Normalise: square 128 px (badges render at 20–28 pt), keep alpha, palette PNG to keep the app bundle small.
  const png = await sharp(best.buf).resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ palette: true, compressionLevel: 9 }).toBuffer();
  writeFileSync(target, png);
  writeFileSync(join(appOut, `logo-${m.id}.png`), png);
  report.push(`${m.id}: ${best.size}px from ${new URL(best.url).host}`);
}
writeFileSync(resolve(process.cwd(), "scripts/logos-report.txt"), report.join("\n") + "\n");
console.log(report.join("\n"));
