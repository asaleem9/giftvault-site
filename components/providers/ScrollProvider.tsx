"use client";

import { useEffect } from "react";
import { ensureGsap, isCoarsePointer, prefersReducedMotion } from "@/lib/scroll";

/**
 * Lenis smooth scroll on pointer devices, feeding GSAP ScrollTrigger. Touch devices keep native scrolling.
 * Refreshes ScrollTrigger once fonts and images have settled so pinned ranges measure correctly.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    let cleanup = () => {};
    let cancelled = false;

    if (!prefersReducedMotion() && !isCoarsePointer()) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, syncTouch: false, anchors: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      cancelled = true;
      cleanup();
      ro.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
