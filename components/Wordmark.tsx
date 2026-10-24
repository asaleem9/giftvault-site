type Props = { className?: string; withText?: boolean };

/** Card mark + wordmark. The mark echoes the app icon: a tilted brass card on bottle green. */
export function Wordmark({ className = "", withText = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="shrink-0">
        <rect width="28" height="28" rx="7" fill="var(--color-surface)" />
        <g transform="rotate(-12 14 14)">
          <rect x="6" y="9" width="16" height="10.5" rx="2" fill="var(--color-brass)" />
          <rect x="6" y="12" width="16" height="2" fill="var(--color-brass-ink)" opacity="0.55" />
          <rect x="8" y="15.5" width="4" height="2" rx="0.6" fill="var(--color-brass-ink)" opacity="0.35" />
        </g>
      </svg>
      {withText ? <span className="text-[17px] font-semibold tracking-tight">GiftVault</span> : null}
    </span>
  );
}
