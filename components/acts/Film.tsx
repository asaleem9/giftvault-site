"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Watch the film." The launch film is a HyperFrames composition rendered to video. It plays muted when it scrolls
 * into view; one tap unmutes and shows controls.
 */
export function Film() {
  const video = useRef<HTMLVideoElement>(null);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section id="film" aria-labelledby="film-title" className="mx-auto w-[min(100%-2rem,72rem)] py-[12svh]">
      <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">The film</p>
          <h2 id="film-title" className="mt-3 text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold tracking-[-0.02em]">Forty seconds, start to register.</h2>
        </div>
        <p className="max-w-sm text-sm text-mist">Real screens, real clips from the app's own test runs. Nothing mocked.</p>
      </div>
      <div className="reveal relative overflow-hidden rounded-3xl border border-hairline bg-surface shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
        <video
          ref={video}
          className="aspect-video w-full"
          src="/media/launch-film.mp4"
          poster="/media/launch-film.webp"
          muted={!engaged}
          playsInline
          loop={!engaged}
          controls={engaged}
          preload="metadata"
          aria-label="GiftVault launch film"
        />
        {!engaged ? (
          <button
            type="button"
            onClick={() => {
              setEngaged(true);
              const v = video.current;
              if (v) {
                v.muted = false;
                v.currentTime = 0;
                void v.play();
              }
            }}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-glass px-4 py-2 text-sm text-linen backdrop-blur-xl transition-colors hover:bg-surface-elevated"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-brass" />
            Play with sound
          </button>
        ) : null}
      </div>
    </section>
  );
}
