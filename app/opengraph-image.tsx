import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(160deg,#163730 0%,#0f2a22 60%,#0b1f19 100%)", color: "#f1efe6", fontFamily: "sans-serif", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: 90, top: 120, width: 420, height: 264, borderRadius: 28, background: "linear-gradient(135deg,#e6d2a2,#b8984f)", transform: "rotate(-10deg)", boxShadow: "0 40px 80px rgba(0,0,0,0.45)", display: "flex" }} />
        <div style={{ position: "absolute", right: 90, top: 120, width: 420, height: 264, borderRadius: 28, transform: "rotate(-10deg)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28, color: "#2a2410" }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>GiftVault</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2 }}><span>•••• 4471</span><span>GIFT CARD</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 620 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9db5a9", textTransform: "uppercase" }}>Free iOS gift card manager</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.0, marginTop: 16 }}><span>Every gift card.</span><span>One place.</span></div>
          <div style={{ fontSize: 28, color: "#9db5a9", marginTop: 24 }}>Scan it once. Show it at the register. Trust the balance.</div>
        </div>
      </div>
    ),
    size,
  );
}
