"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, prefersReducedMotion, smoother } from "@/lib/scroll";

type Props = {
  /** Desktop and mobile sources (dense-GOP H.264). */
  src: string;
  srcMobile?: string;
  poster: string;
  /** Poster for the end of the clip, shown once the scrub completes or under reduced motion. */
  endPoster?: string;
  duration: number;
  /** Element whose scroll range drives the clip. Defaults to the video's parent section. */
  triggerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Called with progress 0..1 on every scroll update. */
  onProgress?: (p: number) => void;
};

/**
 * A video scrubbed by scroll. The file is fetched as a Blob so seeking never waits on range requests,
 * and the frame is driven through a short smoothing lag so wheel steps read as camera motion.
 */
export function ScrubVideo({ src, srcMobile, poster, endPoster, duration, triggerRef, className = "", onProgress }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }
    const { ScrollTrigger } = ensureGsap();
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const url = mobile && srcMobile ? srcMobile : src;
    const controller = new AbortController();
    let objectUrl: string | null = null;
    let raf = 0;
    const smooth = smoother(0.14);
    let trigger: ScrollTrigger | null = null;

    const loop = (now: number) => {
      const t = smooth.step(now) * duration;
      if (video.readyState >= 1 && Math.abs(video.currentTime - t) > 1 / 60) {
        video.currentTime = Math.min(duration - 0.02, Math.max(0, t));
      }
      raf = requestAnimationFrame(loop);
    };

    const whenNear = new Promise<void>((resolve) => {
      const target = triggerRef?.current ?? video.parentElement;
      if (!target) return resolve();
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            io.disconnect();
            resolve();
          }
        },
        { rootMargin: "150% 0px" },
      );
      io.observe(target);
      controller.signal.addEventListener("abort", () => io.disconnect());
    });
    const whenLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    Promise.all([whenNear, whenLoaded])
      .then(() => fetch(url, { signal: controller.signal }))
      .then((r) => r.blob())
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
        const onLoaded = () => {
          setReady(true);
          video.removeEventListener("loadeddata", onLoaded);
        };
        video.addEventListener("loadeddata", onLoaded);
        trigger = ScrollTrigger.create({
          trigger: triggerRef?.current ?? video.parentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            smooth.set(self.progress);
            onProgress?.(self.progress);
          },
        });
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {});

    return () => {
      controller.abort();
      cancelAnimationFrame(raf);
      trigger?.kill();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, srcMobile, duration, triggerRef, onProgress]);

  return (
    <div className={className}>
      <img
        src={reduced && endPoster ? endPoster : poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
        fetchPriority="high"
        decoding="async"
      />
      <video ref={videoRef} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
