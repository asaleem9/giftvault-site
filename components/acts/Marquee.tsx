import { brandCards } from "@/lib/brand-cards";
import { BrandLogo } from "@/components/BrandLogo";

/** The 38 stores in the catalog, as colour chips with plain names (no logos). Two rows drift in opposite directions. */
export function Marquee() {
  // Three drifting rows, each a third of the catalog; the rows alternate direction.
  const third = Math.ceil(brandCards.length / 3);
  const rows = [brandCards.slice(0, third), brandCards.slice(third, 2 * third), brandCards.slice(2 * third)];
  return (
    <section aria-labelledby="stores-title" className="overflow-hidden py-[10svh]">
      <div className="mx-auto mb-8 w-[min(100%-2rem,72rem)]">
        <p className="eyebrow">Stores</p>
        <h2 id="stores-title" className="mt-3 text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold tracking-[-0.02em]">The stores you already shop at, with their balance pages built in. Any card works.</h2>
      </div>
      <div className="flex flex-col gap-3" aria-hidden="true">
        {rows.map((row, i) => (
          <div key={i} className="marquee flex gap-3" style={{ "--marquee-duration": `${90 + i * 18}s`, "--marquee-dir": i % 2 ? "reverse" : "normal" } as React.CSSProperties}>
            {[...row, ...row].map((c, j) => (
              <span
                key={`${c.id}-${j}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm text-linen"
              >
                <BrandLogo id={c.id} name={c.name} size={18} />
                {c.name}
              </span>
            ))}
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {brandCards.map((c) => <li key={c.id}>{c.name}</li>)}
      </ul>
    </section>
  );
}
