import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { site } from "@/lib/config";

export function Nav({ theme = "dark" }: { theme?: "dark" | "paper" }) {
  const paper = theme === "paper";
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="progress-hairline absolute inset-x-0 top-0 h-px bg-brass" aria-hidden="true" />
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto mt-4 flex h-12 w-[min(100%-2rem,72rem)] items-center justify-between rounded-full border px-4 backdrop-blur-xl ${
          paper ? "border-paper-hairline bg-paper-surface/70 text-paper-linen" : "border-hairline bg-glass text-linen"
        }`}
      >
        <Link href="/" className="rounded-full" aria-label="GiftVault home">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link href="/#features" className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 sm:inline-block">
            Features
          </Link>
          <Link href="/privacy" className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 sm:inline-block">
            Privacy
          </Link>
          <Link href="/support" className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 sm:inline-block">
            Support
          </Link>
          <a
            href={site.appStoreUrl}
            className={`ml-2 rounded-full px-3.5 py-1.5 font-medium transition-colors ${
              paper ? "bg-paper-brass text-white hover:bg-paper-linen" : "bg-brass text-brass-ink hover:bg-linen"
            }`}
          >
            Get the app
          </a>
        </div>
      </nav>
    </header>
  );
}
