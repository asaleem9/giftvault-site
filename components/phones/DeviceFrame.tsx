import type { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Width in CSS px; every radius, bezel and the island scale with it. */
  width?: number;
  landscape?: boolean;
};

/**
 * A CSS-only phone: titanium rim, black bezel, dynamic island, screen slot.
 * Proportions follow a 6.9" iPhone: island ≈ 31% of the screen width and 8% tall, corner radius ≈ 16% of the width.
 */
export function DeviceFrame({ children, className = "", style, width = 320, landscape = false }: Props) {
  const rim = Math.max(3, Math.round(width * 0.019));
  const bezel = Math.max(3, Math.round(width * 0.019));
  const screenW = width - 2 * (rim + bezel);
  const screenH = Math.round(screenW * (2868 / 1320));
  const w = landscape ? screenH + 2 * (rim + bezel) : width;
  const h = landscape ? width : screenH + 2 * (rim + bezel);
  const rOuter = Math.round(width * 0.165);
  const rInner = rOuter - rim;
  const rScreen = rInner - bezel;
  const islandW = Math.round(screenW * 0.31);
  const islandH = Math.round(screenW * 0.082);
  const islandTop = Math.round(screenW * 0.038);
  return (
    <div
      className={`relative shrink-0 bg-[#1b1d1c] shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_30px_80px_-20px_rgb(0_0_0/0.7),0_2px_0_rgb(255_255_255/0.06)_inset] ${className}`}
      style={{ width: w, height: h, padding: rim, borderRadius: rOuter, ...style }}
    >
      <div className="relative h-full w-full overflow-hidden bg-black" style={{ padding: bezel, borderRadius: rInner }}>
        <div className="relative h-full w-full overflow-hidden bg-ground" style={{ borderRadius: rScreen }}>
          {children}
        </div>
        <div
          aria-hidden="true"
          className="absolute rounded-full bg-black"
          style={
            landscape
              ? { left: bezel + islandTop, top: "50%", width: islandH, height: islandW, transform: "translateY(-50%)" }
              : { left: "50%", top: bezel + islandTop, width: islandW, height: islandH, transform: "translateX(-50%)" }
          }
        />
      </div>
    </div>
  );
}
