type Props = { className?: string };

/** The vault-wheel mark beside the name, with "Vault" in brass. */
export function Wordmark({ className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em] ${className}`}>
      <img src="/brand/mark-64.png" width={22} height={22} alt="" aria-hidden="true" className="h-[22px] w-[22px]" />
      <span className="inline-flex items-baseline">
        <span>Gift</span>
        <span className="text-brass">Vault</span>
      </span>
    </span>
  );
}
