import type { Metadata } from "next";
import { Paper } from "@/components/Paper";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Support",
  description: "Answers to common GiftVault questions and how to reach us.",
};

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Why can't GiftVault check my balance for me?",
    a: "No store offers a way for apps to read gift card balances. Any app that claims to is scraping the store's website or guessing. GiftVault logs what you spend so the running balance is honest, and the Check balance button opens the store's own balance page with your number already copied.",
  },
  {
    q: "The scanner at the register can't read my screen.",
    a: "Some laser scanners cannot read phone screens. The register view shows the number in large, copyable text beneath the barcode so the cashier can type it. Tap Show card to see the card face and PIN.",
  },
  {
    q: "Which barcodes are supported?",
    a: "Code 128, QR, PDF417, Aztec, EAN-13, UPC-A and ITF. Scanning picks the right one automatically; you can change it when editing a card.",
  },
  {
    q: "Where are my cards stored?",
    a: "On your iPhone, encrypted at rest. With iCloud on, they also sync to your other devices through your own iCloud account with end-to-end encrypted numbers and PINs.",
  },
  {
    q: "How do I add a card to Apple Wallet?",
    a: "Open the card and tap Add to Wallet. The pass carries the store name, balance and barcode as plain text and graphics; no logos, no card data leaves your phone beyond a signed manifest.",
  },
  {
    q: "Can I get my data out?",
    a: "Settings has a JSON export of every card, balance and transaction. Keep that file private: it contains numbers and PINs.",
  },
  {
    q: "Does it work on iPhone Duo?",
    a: "Yes. The layout follows the display size, so the outer and inner screens each get a fitting layout, and the tab bar becomes a sidebar on the inner display.",
  },
  {
    q: "Is it really free?",
    a: "Yes. There is no subscription, no in-app purchase, no ads and no account.",
  },
];

export default function SupportPage() {
  return (
    <Paper title="Support" lede="Most questions are answered below. If yours isn't, get in touch." updated="October 2026" pose="wave">
      <section>
        <h2>Contact</h2>
        <p>
          {site.supportEmail ? (
            <>Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. Include your iOS version and what you expected to happen.</>
          ) : (
            <>Open an issue on <a href={`${site.repoUrl}/issues`}>GitHub</a> and include your iOS version and what you expected to happen.</>
          )}
        </p>
      </section>
      {faqs.map((f) => (
        <section key={f.q}>
          <h2>{f.q}</h2>
          <p>{f.a}</p>
        </section>
      ))}
    </Paper>
  );
}
