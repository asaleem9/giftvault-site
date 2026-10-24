import type { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Width in CSS px; height follows the 1320×2868 screen aspect plus bezels. */
  width?: number;
  landscape?: boolean;
};

/**
 * A CSS-only phone: titanium rim, black bezel, dynamic island, screen slot.
 * No device artwork is shipped, so it never goes out of date and costs no bytes.
 */
export function DeviceFrame({ children, className = "", style, width = 320, landscape = false }: Props) {
  const screenW = width - 24;
  const screenH = Math.round(screenW * (2868 / 1320));
  const w = landscape ? screenH + 24 : width;
  const h = landscape ? width : screenH + 24;
  return (
    <div
      className={`relative shrink-0 rounded-[52px] bg-[#1b1d1c] p-[6px] shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_30px_80px_-20px_rgb(0_0_0/0.7),0_2px_0_rgb(255_255_255/0.06)_inset] ${className}`}
      style={{ width: w, height: h, ...style }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[46px] bg-black p-[6px]">
        <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-ground">{children}</div>
        <div
          aria-hidden="true"
          className={`absolute rounded-full bg-black ${landscape ? "left-[14px] top-1/2 h-[92px] w-[26px] -translate-y-1/2" : "left-1/2 top-[14px] h-[26px] w-[92px] -translate-x-1/2"}`}
        />
      </div>
    </div>
  );
}
