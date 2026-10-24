"use client";

import { useEffect, useRef } from "react";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { CardSheen } from "@/components/card/CardSheen";
import { ensureGsap, prefersReducedMotion } from "@/lib/scroll";
import { site } from "@/lib/config";

/**
 * Act 1. A brass gift card in real light. Scrolling turns it over to its barcode while the headline gives way
 * to the register line, the app's first signature motion performed by the visitor's own hand.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const flipRef = useRef(0);

  useEffect(() => {
    if (!section.current || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.to(flipRef, { current: 1, ease: "power2.inOut", duration: 1 }, 0)
        .to(headline.current, { opacity: 0, y: -40, filter: "blur(6px)", ease: "power2.in", duration: 0.35 }, 0.05)
        .fromTo(caption.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }, 0.62);
      ScrollTrigger.create({ trigger: section.current, start: "top top", end: "bottom bottom", onLeave: () => section.current?.setAttribute("data-flipped", "true"), onEnterBack: () => section.current?.removeAttribute("data-flipped") });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="top" aria-labelledby="hero-title" className="relative h-[220svh]">
      <div ref={stage} className="sticky top-0 flex h-svh w-full flex-col items-center justify-center overflow-hidden">
        {/* ambient: a slow brass glow behind the card */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgb(216_192_138/0.14),transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_80%,rgb(111_169_139/0.10),transparent_70%)]" />

        <CardSheen flipRef={flipRef} className="absolute inset-0 h-full w-full" />

        <div ref={headline} className="absolute inset-x-0 bottom-[7svh] z-10 flex flex-col items-center px-6 text-center">
          <p className="eyebrow">Free iOS gift card manager</p>
          <h1 id="hero-title" className="mt-3 max-w-4xl text-balance text-[clamp(2.2rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {site.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-balance text-base text-mist sm:text-lg">
            Scan it once. Show it at the register. Trust the balance. No accounts, no ads, no tracking.
          </p>
          <AppStoreBadge className="mt-6" size="lg" />
        </div>

        <p ref={caption} className="pointer-events-none absolute bottom-[14svh] left-1/2 z-10 w-[min(90vw,32rem)] -translate-x-1/2 text-center text-lg text-linen opacity-0 sm:text-xl">
          Tap a card and it turns into a bright, scannable barcode.
          <span className="mt-1 block text-sm text-mist">With the number right there, in case the scanner can't read screens.</span>
        </p>

        <div aria-hidden="true" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-mist">
          Scroll
        </div>
      </div>
    </section>
  );
}
