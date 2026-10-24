/** The card without WebGPU/WebGL: a CSS card with a static highlight, the same proportions as the 3D one. */
export function CardSheenFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[300/190] w-[min(78vw,560px)] -rotate-12 rounded-[28px] bg-[linear-gradient(135deg,#ecd69e_0%,#d8c08a_38%,#a8864a_100%)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)] ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-[52%] h-[13%] bg-brass-ink/35" />
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_55%_at_28%_20%,rgb(255_255_255/0.55),transparent_60%)]" />
      <div className="absolute bottom-5 left-6 font-mono text-[clamp(12px,2.2vw,16px)] tracking-[0.2em] text-brass-ink/80">•••• 4471</div>
      <div className="absolute bottom-5 right-6 text-[clamp(10px,1.6vw,12px)] font-medium tracking-[0.18em] text-brass-ink/70">GIFT CARD</div>
    </div>
  );
}
