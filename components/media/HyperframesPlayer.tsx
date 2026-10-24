"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

type Props = {
  /** Path to a composition bundle's index.html under /public/compositions. */
  src: string;
  poster: string;
  /** H.264 fallback used under reduced motion or if the player fails to load. */
  fallbackMp4?: string;
  loop?: boolean;
  /** Play only while in view (default) or let the viewer control it. */
  mode?: "inview" | "controls";
  className?: string;
  label: string;
};

type PlayerEl = HTMLElement & { play(): Promise<void> | void; pause(): void; ready?: boolean; muted: boolean };

/**
 * The HyperFrames player web component, registered on the client only. The composition is the same HTML the
 * film was authored in; the player runs it live in a sandboxed iframe and drives its paused timeline.
 */
export function HyperframesPlayer({ src, poster, fallbackMp4, loop = true, mode = "inview", className = "", label }: Props) {
  const ref = useRef<PlayerEl>(null);
  const [defined, setDefined] = useState(false);
  const [failed, setFailed] = useState(false);

  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("@hyperframes/player")
          .then(() => {
            if (!cancelled) setDefined(true);
          })
          .catch(() => setFailed(true));
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!defined || !el || mode !== "inview") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play?.();
        else el.pause?.();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const onError = () => setFailed(true);
    el.addEventListener("error", onError);
    return () => {
      io.disconnect();
      el.removeEventListener("error", onError);
    };
  }, [defined, mode]);

  if (failed && fallbackMp4) {
    return (
      <video className={className} src={fallbackMp4} poster={poster} muted playsInline loop={loop} autoPlay={mode === "inview"} controls={mode === "controls"} aria-label={label} />
    );
  }

  return (
    <div ref={host} className={`relative ${className}`} role="img" aria-label={label}>
      <img src={poster} alt="" aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${defined ? "opacity-0" : "opacity-100"}`} loading="lazy" decoding="async" />
      {defined ? (
        <hyperframes-player
          ref={ref}
          src={src}
          muted=""
          loop={loop ? "" : undefined}
          controls={mode === "controls" ? "" : undefined}
          low-power-idle=""
          disable-click-to-play={mode === "inview" ? "" : undefined}
          className="absolute inset-0 block h-full w-full"
        />
      ) : null}
    </div>
  );
}
