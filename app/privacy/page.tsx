import type { Metadata } from "next";
import { Paper } from "@/components/Paper";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What GiftVault stores, where it goes, and what it never collects.",
};

export default function PrivacyPage() {
  return (
    <Paper title="Privacy" lede="GiftVault keeps your gift cards on your devices. There is no GiftVault account, no server that sees your cards, and no tracking." updated="October 2026">
      <section>
        <h2>What the app stores</h2>
        <p>
          Card names, numbers, PINs, barcodes, balances, expiry dates, notes and the balance history you log. All of it lives in a local database on your
          iPhone. Card numbers, PINs and barcode payloads are additionally encrypted at rest.
        </p>
      </section>
      <section>
        <h2>iCloud sync</h2>
        <p>
          If you are signed into iCloud, your cards sync between your devices through your own iCloud account using Apple's CloudKit. Card numbers, PINs and
          barcode payloads are end-to-end encrypted fields: Apple cannot read them and neither can we. You can turn sync off in iOS Settings for GiftVault at any time.
        </p>
      </section>
      <section>
        <h2>Apple Wallet passes</h2>
        <p>
          Adding a card to Apple Wallet builds the pass on your phone. To sign it, the app sends only the pass's manifest (a list of file hashes) to our signing
          service. The card number, PIN, barcode and balance never leave your device. The service keeps no logs of pass contents.
        </p>
      </section>
      <section>
        <h2>Balance checks</h2>
        <p>
          No store lets apps read gift card balances automatically. When you tap Check balance, GiftVault copies the number and PIN to a local, short-lived
          clipboard and opens the store's own balance page in your browser. What happens on that page is covered by the store's privacy policy, not ours.
        </p>
      </section>
      <section>
        <h2>Permissions</h2>
        <ul>
          <li><strong>Camera</strong>, only while you scan a card. Frames are processed on the device and never stored.</li>
          <li><strong>Photos</strong>, only when you import a card from a picture you choose.</li>
          <li><strong>Notifications</strong>, for expiry reminders 30, 7 and 1 day before a card with money on it expires. Scheduled locally.</li>
          <li><strong>Face ID or Touch ID</strong>, if you turn on App Lock. Biometric data stays in the Secure Enclave; the app only learns whether unlock succeeded.</li>
          <li><strong>Motion</strong>, for the card sheen effect. Readings are used live and never recorded.</li>
        </ul>
      </section>
      <section>
        <h2>What we never collect</h2>
        <p>
          No analytics SDKs, no advertising identifiers, no crash reporting beyond what you opt into with Apple, no accounts, no email addresses. The app makes
          no network requests except iCloud sync, Wallet pass signing, and the store balance pages you open yourself.
        </p>
      </section>
      <section>
        <h2>Siri, Spotlight and widgets</h2>
        <p>
          Card names and balances can appear in Spotlight results, Siri Shortcuts and widgets so you can reach a card quickly. Numbers and PINs are never
          indexed and never shown on a widget.
        </p>
      </section>
      <section>
        <h2>Export</h2>
        <p>
          You can export every card as a JSON file from Settings. That file contains numbers and PINs in the clear, so treat it like cash.
        </p>
      </section>
      <section>
        <h2>This website</h2>
        <p>
          This site uses Vercel Web Analytics and Speed Insights, which are cookieless and record aggregate page views and performance only. It sets no cookies and
          loads no advertising.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy: {site.supportEmail ? <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> : <a href={`${site.repoUrl}/issues`}>open an issue</a>}.
        </p>
      </section>
    </Paper>
  );
}
