"use client";

import { useEffect, useRef, useState } from "react";
import { brandCardById } from "@/lib/brand-cards";
import { ensureGsap, prefersReducedMotion } from "@/lib/scroll";

/** The five demo cards, in the app's order. Each act of the page drops one onto the visitor's vault. */
export const vaultCards = [
  { id: "starbucks", cents: 4210, act: "#drawer" },
  { id: "target", cents: 2500, act: "#register" },
  { id: "doordash", cents: 10000, act: "#balances" },
  { id: "amazon", cents: 14530, act: "#film" },
  { id: "homedepot", cents: 7500, act: "#features" },
] as const;

export const vaultTotal = vaultCards.reduce((s, c) => s + c.cents, 0);

const fmt = (c: number) => `$${(c / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

/**
 * The signature move. A small vault pinned to the corner fills with one real card per act as you scroll, and its
 * brass total rolls up exactly like the app's. Each card is a link back to its act. At the close it hands off to the CTA.
 */
export function Vault() {
  const root = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = prefersReducedMotion();
    const shown = { v: 0 };
    let current = 0;
    const setTotal = (cents: number) => {
      if (totalRef.current) totalRef.current.textContent = fmt(cents);
    };
    const roll = (n: number) => {
      const target = vaultCards.slice(0, n).reduce((s, c) => s + c.cents, 0);
      if (reduced) {
        shown.v = target;
        setTotal(target);
        return;
      }
      gsap.to(shown, { v: target, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: () => setTotal(shown.v) });
    };
    const triggers = vaultCards.map((c, i) =>
      ScrollTrigger.create({
        trigger: c.act,
        start: "top 60%",
        onEnter: () => {
          if (current < i + 1) {
            current = i + 1;
            setCount(current);
            roll(current);
          }
        },
        onLeaveBack: () => {
          if (current > i) {
            current = i;
            setCount(current);
            roll(current);
          }
        },
      }),
    );
    const show = ScrollTrigger.create({ trigger: "#drawer", start: "top 80%", onEnter: () => setVisible(true), onLeaveBack: () => setVisible(false) });
    const dock = ScrollTrigger.create({ trigger: "#close", start: "top 70%", onEnter: () => setDocked(true), onLeaveBack: () => setDocked(false) });
    return () => {
      triggers.forEach((t) => t.kill());
      show.kill();
      dock.kill();
    };
  }, []);

  return (
    <aside
      ref={root}
      aria-label="Your vault so far"
      data-count={count}
      className={`fixed bottom-4 right-4 z-40 w-[172px] transition-[opacity,transform] duration-500 ease-(--ease-out-expo) sm:bottom-6 sm:right-6 ${
        visible && !docked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-hairline bg-glass p-3 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow !text-[10px]">Your vault</span>
          <span ref={totalRef} className="tabular font-mono text-sm font-semibold text-brass">{fmt(0)}</span>
        </div>
        <ol className="relative mt-2 h-[92px]" aria-live="polite">
          {vaultCards.map((c, i) => {
            const brand = brandCardById.get(c.id)!;
            const on = i < count;
            return (
              <li
                key={c.id}
                className="absolute inset-x-0 transition-[transform,opacity] duration-500 ease-(--ease-spring)"
                style={{ top: i * 16, zIndex: i, transform: on ? "translateY(0) rotate(0deg)" : "translateY(-28px) rotate(-6deg)", opacity: on ? 1 : 0 }}
              >
                <a
                  href={c.act}
                  className="flex h-[30px] items-center justify-between rounded-md px-2.5 text-[11px] font-medium shadow-[0_6px_14px_-6px_rgb(0_0_0/0.6)]"
                  style={{ background: `linear-gradient(135deg, ${brand.start}, ${brand.end})`, color: brand.ink }}
                  tabIndex={on ? 0 : -1}
                  aria-hidden={!on}
                >
                  <span>{brand.name}</span>
                  <span className="tabular font-mono">{fmt(c.cents)}</span>
                </a>
              </li>
            );
          })}
        </ol>
        <p className="mt-1.5 text-[10px] text-mist">{count} of {vaultCards.length} cards</p>
      </div>
    </aside>
  );
}
