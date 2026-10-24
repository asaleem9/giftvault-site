"use client";

/** Shared scroll helpers. GSAP ScrollTrigger (+ Lenis on pointer devices) is the one scroll source on the page. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

/** Publishes an act's 0..1 progress as `--sc-p` on its element and calls `onUpdate`. */
export function trackProgress(el: HTMLElement, opts: { start?: string; end?: string; onUpdate?: (p: number) => void } = {}) {
  const { ScrollTrigger } = ensureGsap();
  return ScrollTrigger.create({
    trigger: el,
    start: opts.start ?? "top bottom",
    end: opts.end ?? "bottom top",
    onUpdate: (self) => {
      el.style.setProperty("--sc-p", self.progress.toFixed(4));
      opts.onUpdate?.(self.progress);
    },
  });
}

/** Critically damped-ish smoothing for scrub values, in seconds of lag. */
export function smoother(lag = 0.12) {
  let value = 0;
  let target = 0;
  let last = 0;
  return {
    set(t: number) {
      target = t;
    },
    step(now: number) {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const k = 1 - Math.exp(-dt / lag);
      value += (target - value) * k;
      return value;
    },
    get value() {
      return value;
    },
    settled() {
      return Math.abs(target - value) < 0.0005;
    },
  };
}
