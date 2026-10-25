import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/config";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mascot = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/mascot/hero-og.png"))).toString("base64")}`;
  const mark = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/mark.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(160deg,#163730 0%,#0f2a22 60%,#0b1f19 100%)", color: "#f1efe6", fontFamily: "sans-serif", padding: 72, position: "relative" }}>
        <img src={mascot} width={560} height={560} style={{ position: "absolute", right: 40, bottom: -30 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}><img src={mark} width={56} height={56} alt="" /><span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>GiftVault</span></div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9db5a9", textTransform: "uppercase" }}>Free gift card app for iPhone</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 62, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, marginTop: 16 }}><span>Gift cards you can</span><span>find when you're</span><span>standing at the</span><span>register.</span></div>
          <div style={{ fontSize: 28, color: "#9db5a9", marginTop: 24 }}>Scan a card once. GiftVault keeps the barcode, number, PIN and balance.</div>
        </div>
      </div>
    ),
    size,
  );
}
