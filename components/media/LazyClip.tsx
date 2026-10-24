"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; className?: string };

/** A looping, muted clip that only downloads and plays while it is near the viewport. */
export function LazyClip({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          void v.play().catch(() => {});
        } else if (v.src) {
          v.pause();
        }
      },
      { rootMargin: "40% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} className={className} poster={poster} muted playsInline loop preload="none" aria-label={label} />;
}
