import type { DetailedHTMLProps, HTMLAttributes } from "react";

type PlayerAttributes = {
  src?: string;
  poster?: string;
  autoplay?: boolean | "";
  loop?: boolean | "";
  muted?: boolean | "";
  controls?: boolean | "";
  "low-power-idle"?: boolean | "";
  "disable-click-to-play"?: boolean | "";
  "assets-loading-ui"?: string;
  "playback-rate"?: number | string;
};

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "hyperframes-player": DetailedHTMLProps<HTMLAttributes<HTMLElement> & PlayerAttributes, HTMLElement>;
    }
  }
}

export {};
