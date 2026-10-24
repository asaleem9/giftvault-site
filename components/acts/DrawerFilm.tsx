"use client";

import { useRef } from "react";
import { ScrubVideo } from "@/components/hero/ScrubVideo";

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
          duration={5}
          triggerRef={section}
          className="absolute inset-0"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ground to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ground to-transparent" aria-hidden="true" />
        <div className="absolute left-1/2 top-[8svh] z-10 w-[min(92vw,44rem)] -translate-x-1/2 text-center">
          <p className="eyebrow">The drawer</p>
          <h2 id="drawer-title" className="mt-3 text-balance text-[clamp(1.9rem,5vw,3.6rem)] font-semibold leading-tight tracking-[-0.02em]">
            Physical cards, Costco packs, DoorDash codes, emailed cards.
          </h2>
          <p className="mt-3 text-balance text-mist">Scan or type them once. They stay in order, with their balances, where you can find them.</p>
        </div>
      </div>
    </section>
  );
}
