"use client";

import { useEffect, useRef } from "react";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { Odometer } from "@/components/Odometer";
import { brandCardById } from "@/lib/brand-cards";
import { ensureGsap, prefersReducedMotion } from "@/lib/scroll";
import { vaultCards, vaultTotal } from "@/components/vault/Vault";

const fmt = (c: number) => `$${(c / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

/**
 * Act 6, the close. The corner vault hands off: the five cards fan out across the centre, the total lands at $387.40,
 * and the only thing left to do is get the app.
 */
export function Cta() {
  const section = useRef<HTMLElement>(null);
  const fan = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!section.current || !fan.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const cards = fan.current.querySelectorAll<HTMLElement>("li");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { x: () => window.innerWidth / 2 - 60, y: () => window.innerHeight / 2 + 40, rotate: -6, scale: 0.5, opacity: 0 },
        {
          x: 0, y: 0, scale: 1, opacity: 1,
          rotate: (i) => (i - 2) * 7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section.current, start: "top 70%", end: "top 20%", scrub: 0.5 },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="close" aria-labelledby="close-title" className="relative flex min-h-[72svh] flex-col items-center justify-center overflow-hidden px-6 py-[8svh] text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_60%,rgb(216_192_138/0.16),transparent_70%)]" />
      <ul ref={fan} className="relative mb-8 flex h-[130px] items-end justify-center" aria-label="The five demo cards">
        {vaultCards.map((c, i) => {
          const b = brandCardById.get(c.id)!;
          return (
            <li
              key={c.id}
              className="absolute bottom-0 flex h-[120px] w-[190px] flex-col justify-between rounded-2xl p-4 text-left shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)]"
              style={{ background: `linear-gradient(135deg, ${b.start}, ${b.end})`, color: b.ink, left: `calc(50% - 95px + ${(i - 2) * 48}px)`, zIndex: i, transformOrigin: "50% 120%" }}
            >
              <span className="text-sm font-semibold">{b.name}</span>
              <span className="tabular self-end font-mono text-lg font-semibold">{fmt(c.cents)}</span>
            </li>
          );
        })}
      </ul>
      <p className="eyebrow">Total across 5 cards</p>
      <Odometer cents={vaultTotal} from={0} className="mt-2 text-[clamp(2.6rem,8vw,5.5rem)] font-semibold text-linen" />
      <h2 id="close-title" className="mt-6 max-w-2xl text-balance text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em]">
        Money you already have, where you can actually use it.
      </h2>
      <p className="mt-4 max-w-md text-balance text-mist">Free. No accounts, no ads, no tracking. iPhone and iPhone Duo, iOS 27 and later.</p>
      <AppStoreBadge className="mt-10" size="lg" />
    </section>
  );
}
