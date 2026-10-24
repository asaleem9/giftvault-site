import { site } from "@/lib/config";

type Props = { className?: string; size?: "md" | "lg" };

/** App Store link styled as a badge. Swap in Apple's official artwork once the listing is live. */
export function AppStoreBadge({ className = "", size = "md" }: Props) {
  const h = size === "lg" ? "h-14 px-5 text-base" : "h-11 px-4 text-sm";
  return (
    <a
      href={site.appStoreUrl}
      className={`group inline-flex items-center gap-3 rounded-full bg-linen text-ground ${h} font-medium shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_10px_30px_-12px_rgb(0_0_0/0.6)] transition-transform duration-300 ease-(--ease-spring) hover:scale-[1.03] active:scale-[0.98] ${className}`}
      data-cta="app-store"
    >
      <svg viewBox="0 0 24 24" width={size === "lg" ? 22 : 18} height={size === "lg" ? 22 : 18} aria-hidden="true" fill="currentColor">
        <path d="M16.37 12.76c-.02-2.4 1.96-3.56 2.05-3.62-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.91-.85-3.14-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.91-.43 7.21 1.21 9.57.8 1.16 1.75 2.46 3 2.41 1.2-.05 1.66-.78 3.11-.78 1.45 0 1.86.78 3.13.75 1.3-.02 2.12-1.18 2.91-2.34.92-1.34 1.3-2.64 1.32-2.71-.03-.01-2.53-.97-2.54-3.81zM14 5.7c.66-.8 1.11-1.92.99-3.03-.95.04-2.11.64-2.79 1.44-.61.71-1.15 1.85-1.01 2.94 1.06.08 2.15-.54 2.81-1.35z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-70">Download on the</span>
        <span className="text-[1.05em] font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}
