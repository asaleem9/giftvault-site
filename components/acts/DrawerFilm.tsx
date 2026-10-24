"use client";

import { useRef } from "react";
import { ScrubVideo } from "@/components/hero/ScrubVideo";
import { media } from "@/lib/media";

/** Act 2. The drawer: every card you own, scattered, gathers into the stack under your scroll (a HyperFrames film, scrubbed). */
export function DrawerFilm() {
  const section = useRef<HTMLElement>(null);
  return (
    <section ref={section} id="drawer" aria-labelledby="drawer-title" className="relative h-[260svh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <ScrubVideo
          src="/media/drawer-to-stack.mp4"
          srcMobile="/media/drawer-to-stack-720.mp4"
          poster="/media/drawer-to-stack.webp"
          endPoster="/media/drawer-to-stack-end.webp"
          duration={media["drawer-to-stack"].duration}
          triggerRef={section}
          className="absolute inset-0"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ground to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ground to-transparent" aria-hidden="true" />
        <div className="absolute bottom-[9svh] left-[max(1rem,calc(50vw-36rem))] z-10 w-[min(92vw,26rem)]">
          <p className="eyebrow">The drawer</p>
          <h2 id="drawer-title" className="mt-3 text-balance text-[clamp(1.7rem,3.6vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em]">
            Physical cards, Costco packs, DoorDash codes, emailed cards.
          </h2>
          <p className="mt-3 text-balance text-sm text-mist sm:text-base">Scan or type them once. They stay in order, with their balances, where you can find them.</p>
        </div>
      </div>
    </section>
  );
}
