"use client";

import { useEffect, useRef, useState } from "react";
import type { CardScene } from "@/lib/card-scene";
import { prefersReducedMotion } from "@/lib/scroll";
import { CardSheenFallback } from "./CardSheenFallback";

type Props = {
  /** 0..1 flip progress, read from a ref so scroll never re-renders React. */
  flipRef: React.RefObject<number>;
  className?: string;
};

/**
 * Mounts the three.js card once the browser is idle. Pointer position moves the light (and a 6°/4° parallax,
 * the app's limits); on iOS, device motion can take over after a tap grants permission.
 */
export function CardSheen({ flipRef, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "fallback">("idle");
  const sceneRef = useRef<CardScene | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStatus("fallback");
      return;
    }
    let cancelled = false;
    let scene: CardScene | null = null;
    let raf = 0;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 1200 }) : window.setTimeout(cb, 120));

    idle(async () => {
      try {
        const { createCardScene } = await import("@/lib/card-scene");
        if (cancelled || !canvasRef.current) return;
        scene = await createCardScene(canvasRef.current);
        if (cancelled) {
          scene.destroy();
          return;
        }
        sceneRef.current = scene;
        setStatus("ready");
        const tick = () => {
          scene?.setFlip(flipRef.current ?? 0);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch {
        setStatus("fallback");
      }
    });

    const onPointer = (e: PointerEvent) => {
      const s = sceneRef.current;
      if (!s) return;
      const nx = e.clientX / window.innerWidth; // 0..1
      const ny = e.clientY / window.innerHeight;
      s.setLight(0.1 + nx * 0.8, 0.05 + ny * 0.6);
      s.setTilt((nx - 0.5) * 2, (ny - 0.5) * 2);
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      const s = sceneRef.current;
      if (!s || e.gamma == null || e.beta == null) return;
      const roll = Math.max(-1, Math.min(1, e.gamma / 36));
      const pitch = Math.max(-1, Math.min(1, (e.beta - 40) / 36));
      s.setLight(0.25 + roll * 0.45, 0.15 + pitch * 0.5);
      s.setTilt(roll, pitch);
    };
    const onResize = () => sceneRef.current?.resize();

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    if (typeof DeviceOrientationEvent !== "undefined" && !("requestPermission" in DeviceOrientationEvent)) {
      window.addEventListener("deviceorientation", onOrientation);
    }
    // iOS asks permission inside a user gesture; the first tap on the hero enables motion.
    const enableMotion = () => {
      const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<"granted" | "denied"> };
      D.requestPermission?.().then((r) => {
        if (r === "granted") window.addEventListener("deviceorientation", onOrientation);
      }).catch(() => {});
    };
    canvasRef.current?.addEventListener("click", enableMotion, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("deviceorientation", onOrientation);
      scene?.destroy();
      sceneRef.current = null;
    };
  }, [flipRef]);

  return (
    <div className={className}>
      {status === "fallback" ? (
        <div className="flex h-full w-full items-center justify-center"><CardSheenFallback /></div>
      ) : null}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`h-full w-full transition-opacity duration-700 ${status === "ready" ? "opacity-100" : "opacity-0"} ${status === "fallback" ? "hidden" : ""}`}
      />
    </div>
  );
}
