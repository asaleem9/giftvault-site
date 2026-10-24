// Screenshot strip: the landing page at every 10% of scroll, desktop and phone, normal and reduced motion,
// in Chromium and WebKit. Usage: node scripts/shoot.mjs [baseUrl] (default http://localhost:3000)
import { chromium, webkit } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const out = resolve(process.cwd(), "shots");
mkdirSync(out, { recursive: true });

const viewports = { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };
const engines = { chromium, webkit };
const steps = 10;

for (const [engineName, engine] of Object.entries(engines)) {
  const browser = await engine.launch();
  for (const [vpName, vp] of Object.entries(viewports)) {
    for (const reduced of [false, true]) {
      const ctx = await browser.newContext({ ...vp, reducedMotion: reduced ? "reduce" : "no-preference", colorScheme: "dark" });
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
      await page.goto(base, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      for (let i = 0; i <= steps; i++) {
        const y = Math.round((total * i) / steps);
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
        await page.waitForTimeout(reduced ? 250 : 900);
        const tag = `${engineName}-${vpName}${reduced ? "-rm" : ""}-${String(i * 10).padStart(3, "0")}`;
        await page.screenshot({ path: resolve(out, `${tag}.png`) });
      }
      const vault = await page.evaluate(() => document.querySelector("[data-count]")?.getAttribute("data-count"));
      console.log(`${engineName} ${vpName}${reduced ? " reduced" : ""}: scrollable ${total}px, vault count at end ${vault}, ${errors.length} errors`);
      for (const e of errors.slice(0, 8)) console.log("   ", e);
      await ctx.close();
    }
  }
  await browser.close();
}
console.log(`wrote screenshots to ${out}`);
