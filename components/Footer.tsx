import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { site } from "@/lib/config";

export function Footer({ theme = "dark" }: { theme?: "dark" | "paper" }) {
  const paper = theme === "paper";
  return (
    <footer className={`mt-auto border-t px-6 py-10 text-sm ${paper ? "border-paper-hairline text-paper-mist" : "border-hairline text-mist"}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Wordmark className={paper ? "text-paper-linen [&>span:last-child]:text-paper-brass" : "text-linen"} />
          <p>A free gift card app for iPhone.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/support" className="hover:underline">Support</Link>
          <a href={site.repoUrl} className="hover:underline">Site source</a>
          <a href={site.appStoreUrl} className="hover:underline">App Store</a>
        </nav>
      </div>
      <p className="mx-auto mt-8 w-full max-w-6xl text-xs">
        © {site.copyrightYear} GiftVault. Apple, the Apple logo, iPhone, Face ID and Apple Wallet are trademarks of Apple Inc. Store names belong to their owners;
        GiftVault is not affiliated with any of them.
      </p>
    </footer>
  );
}
