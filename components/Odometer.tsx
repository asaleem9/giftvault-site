"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/scroll";

type Props = {
  /** Value in cents. */
  cents: number;
  className?: string;
  /** Animate from this value when the element scrolls into view (cents). */
  from?: number;
  /** When set, the value is driven externally and no scroll trigger is created. */
  live?: boolean;
};

function format(cents: number) {
  const dollars = Math.floor(cents / 100);
  const rest = Math.abs(cents % 100).toString().padStart(2, "0");
  return `$${dollars.toLocaleString("en-US")}.${rest}`;
}

/**
 * Rolling digits like the app's balances: each digit column slides to its new value, with a brass flash on settle.
 * The DOM holds a static formatted value for no-JS and reduced motion.
 */
export function Odometer({ cents, className = "", from, live = false }: Props) {
  const el = useRef<HTMLSpanElement>(null);
  const shown = useRef(from ?? cents);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduced = prefersReducedMotion();
    const render = (v: number) => {
      const text = format(Math.round(v));
      // Re-render columns only when the string shape changes; otherwise update digit transforms.
      if (node.dataset.shape !== text.replace(/\d/g, "0")) {
        node.dataset.shape = text.replace(/\d/g, "0");
        node.replaceChildren(
          ...[...text].map((ch) => {
            const span = document.createElement("span");
            span.className = /\d/.test(ch) ? "odometer-digit" : "odometer-sep";
            if (/\d/.test(ch)) {
              const col = document.createElement("span");
              col.className = "odometer-col";
              col.textContent = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
              span.append(col);
            } else span.textContent = ch;
            return span;
          }),
        );
      }
      const cols = node.querySelectorAll<HTMLElement>(".odometer-col");
      let i = 0;
      for (const ch of text) {
        if (/\d/.test(ch)) {
          cols[i++].style.transform = `translateY(${-Number(ch) * 10}%)`;
        }
      }
      node.setAttribute("aria-label", text);
    };
    render(shown.current);
    if (live || reduced) {
      render(cents);
      return;
    }
    const { gsap } = ensureGsap();
    const obj = { v: shown.current };
    const tween = gsap.to(obj, {
      v: cents,
      duration: 1.4,
      ease: "power3.out",
      paused: true,
      onUpdate: () => render(obj.v),
      onComplete: () => {
        node.classList.add("odometer-flash");
        setTimeout(() => node.classList.remove("odometer-flash"), 700);
      },
    });
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        tween.play();
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(node);
    return () => {
      io.disconnect();
      tween.kill();
    };
  }, [cents, live]);

  // Imperative live updates (the vault) call this through the DOM; keep the static text for SSR.
  return (
    <span ref={el} role="text" aria-label={format(cents)} data-cents={cents} className={`odometer tabular inline-flex overflow-hidden font-mono ${className}`}>
      {format(from ?? cents)}
    </span>
  );
}
