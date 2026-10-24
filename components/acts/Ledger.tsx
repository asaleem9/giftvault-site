import { Odometer } from "@/components/Odometer";
import { Screen } from "@/components/Screen";
import { DeviceFrame } from "@/components/phones/DeviceFrame";

const rows = [
  { label: "Added card", date: "Sep 16", delta: 4855, after: 4855 },
  { label: "Latte", date: "Oct 18", delta: -645, after: 4210 },
  { label: "Purchase", date: "Oct 18", delta: -500, after: 3710 },
];

const money = (c: number) => `${c < 0 ? "−" : "+"}$${(Math.abs(c) / 100).toFixed(2)}`;

/**
 * Act 4. Balances you can trust: the ledger. Every change is a row, the running balance is arithmetic,
 * and the app says plainly that no store lets it read balances.
 */
export function Ledger() {
  return (
    <section id="balances" aria-labelledby="ledger-title" className="relative mx-auto w-[min(100%-2rem,72rem)] py-[18svh]">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Balances you can trust</p>
          <h2 id="ledger-title" className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-[-0.02em]">
            Log what you spend. The balance takes care of itself.
          </h2>
          <p className="mt-4 max-w-md text-balance text-mist">
            Spent, Added, Mark as used: each one is a line in the card's ledger with a running total. Backdate a purchase and the column recomputes.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface">
            <div className="flex items-baseline justify-between px-5 pt-5">
              <span className="text-sm text-mist">Starbucks</span>
              <Odometer cents={3710} from={4855} className="text-[2.2rem] font-semibold text-linen" />
            </div>
            <ul className="mt-4 divide-y divide-hairline text-sm">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between px-5 py-3">
                  <span>
                    <span className="block text-linen">{r.label}</span>
                    <span className="block text-xs text-mist">{r.date}, 2026</span>
                  </span>
                  <span className="text-right">
                    <span className={`tabular block font-mono ${r.delta < 0 ? "text-linen" : "text-fern"}`}>{money(r.delta)}</span>
                    <span className="tabular block font-mono text-xs text-mist">${(r.after / 100).toFixed(2)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="mt-8 border-l-2 border-brass pl-5">
            <p className="text-balance text-lg text-linen">No store lets apps read balances. GiftVault doesn't pretend to.</p>
            <p className="mt-2 text-sm text-mist">
              Check balance copies the number and PIN for two minutes and opens the store's own balance page. When you come back, it asks if the balance changed.
            </p>
          </blockquote>
        </div>

        <div className="reveal flex justify-center">
          <DeviceFrame width={300}>
            <Screen name="spend" alt="The Spent sheet: how much did you spend, with the balance after the purchase shown underneath." sizes="300px" />
          </DeviceFrame>
        </div>
      </div>
    </section>
  );
}
