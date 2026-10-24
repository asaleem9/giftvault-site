"use client";

import { ViewTransition, addTransitionType, startTransition, useEffect, useRef, useState } from "react";
import { DeviceFrame } from "@/components/phones/DeviceFrame";
import { Screen } from "@/components/Screen";
import { ensureGsap, prefersReducedMotion } from "@/lib/scroll";
import type { ScreenName } from "@/lib/screens";

type Stage = { screen: ScreenName; eyebrow: string; title: string; body: string };

const stages: Stage[] = [
  { screen: "cards", eyebrow: "Your vault", title: "Every card, in order.", body: "The stack keeps merchant colours so you find a card by sight. Drag to reorder; the total is always at the top." },
  { screen: "detail", eyebrow: "One tap", title: "Show it at the register.", body: "The detail screen is one button away from the barcode. Spent, Added and Check balance sit right under it." },
  { screen: "register", eyebrow: "At the counter", title: "Hold the barcode to the scanner.", body: "The screen goes to full brightness, the barcode renders at the size scanners read, and the number is there in large type if they need to key it." },
];

/**
 * Act 3. The phone stays pinned while its screen advances list → detail → register. Screen swaps use React 19.3
 * View Transitions, typed forward or back from the scroll direction. At the register the page brightens, like the app.
 */
export function PhoneStage() {
  const section = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!section.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = prefersReducedMotion();
    const go = (next: number) => {
      if (next === indexRef.current) return;
      const dir = next > indexRef.current ? "screen-forward" : "screen-back";
      indexRef.current = next;
      startTransition(() => {
        addTransitionType(dir);
        setIndex(next);
      });
    };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          go(Math.min(stages.length - 1, Math.floor(self.progress * stages.length)));
          if (!reduced && glow.current) {
            const p = Math.max(0, (self.progress - 0.66) / 0.2);
            glow.current.style.opacity = String(Math.min(1, p) * 0.9);
          }
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const stage = stages[index];

  return (
    <section ref={section} id="register" aria-labelledby="register-title" className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        <div ref={glow} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,rgb(241_239_230/0.92),rgb(241_239_230/0.4)_40%,transparent_75%)] opacity-0 mix-blend-screen" />
        <div className="mx-auto grid w-[min(100%-2rem,72rem)] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 md:order-1">
            <ViewTransition default="none" update="none" enter="screen-forward" exit="screen-forward" key={index}>
              <div className="max-w-md">
                <p className="eyebrow">{stage.eyebrow}</p>
                <h2 id="register-title" className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-[-0.02em]">{stage.title}</h2>
                <p className="mt-4 text-balance text-mist">{stage.body}</p>
              </div>
            </ViewTransition>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <DeviceFrame width={300} className="md:[width:320px]">
              <ViewTransition name="phone-screen" share="screen-forward" enter="screen-forward" exit="screen-forward" key={stage.screen}>
                <div className="h-full w-full">
                  <Screen name={stage.screen} alt={`GiftVault ${stage.screen} screen`} sizes="320px" priority={index === 0} />
                </div>
              </ViewTransition>
            </DeviceFrame>
          </div>
          <ol className="order-3 hidden gap-3 md:flex md:flex-col" aria-label="Steps">
            {stages.map((s, i) => (
              <li key={s.screen} className={`flex items-center gap-3 text-sm transition-colors ${i === index ? "text-linen" : "text-mist"}`}>
                <span className={`h-px w-8 transition-all ${i === index ? "bg-brass w-12" : "bg-hairline"}`} aria-hidden="true" />
                {s.eyebrow}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
