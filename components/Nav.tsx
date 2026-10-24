import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { site } from "@/lib/config";

/** A plain top bar: wordmark, three links, one button. No glass, no pills. */
export function Nav({ theme = "dark" }: { theme?: "dark" | "paper" }) {
  const paper = theme === "paper";
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b ${paper ? "border-paper-hairline bg-paper-ground/95 text-paper-linen" : "border-hairline/70 bg-ground/92 text-linen"}`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-14 w-[min(100%-2rem,72rem)] items-center justify-between">
        <Link href="/" aria-label="GiftVault home" className="py-2">
          <Wordmark className={paper ? "[&>span:last-child]:text-paper-brass" : ""} />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/#features" className={`hidden sm:inline-block ${paper ? "text-paper-mist hover:text-paper-linen" : "text-mist hover:text-linen"}`}>
            Features
          </Link>
          <Link href="/privacy" className={`hidden sm:inline-block ${paper ? "text-paper-mist hover:text-paper-linen" : "text-mist hover:text-linen"}`}>
            Privacy
          </Link>
          <Link href="/support" className={`hidden sm:inline-block ${paper ? "text-paper-mist hover:text-paper-linen" : "text-mist hover:text-linen"}`}>
            Support
          </Link>
          <a
            href={site.appStoreUrl}
            className={`rounded-md px-3 py-1.5 font-medium ${paper ? "bg-paper-linen text-paper-ground hover:bg-paper-brass" : "bg-linen text-ground hover:bg-brass"}`}
          >
            Get the app
          </a>
        </div>
      </nav>
    </header>
  );
}
