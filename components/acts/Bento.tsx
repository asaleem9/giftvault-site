import { HyperframesPlayer } from "@/components/media/HyperframesPlayer";
import { LazyClip } from "@/components/media/LazyClip";
import { Screen } from "@/components/Screen";
import { DeviceFrame } from "@/components/phones/DeviceFrame";
import { clips } from "@/lib/clips";

function Clip({ name, label }: { name: keyof typeof clips; label: string }) {
  return <LazyClip className="h-full w-full object-cover object-top" src={`/clips/${name}.mp4`} poster={`/clips/${name}.webp`} label={label} />;
}

const Tile = ({ children, className = "", title, body, eyebrow }: { children?: React.ReactNode; className?: string; title: string; body: string; eyebrow?: string }) => (
  <article className={`reveal group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface ${className}`}>
    {children ? <div className="relative min-h-0 flex-1">{children}</div> : null}
    <div className="relative p-5">
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h3 className="text-lg font-semibold tracking-tight text-linen">{title}</h3>
      <p className="mt-1.5 text-sm text-mist">{body}</p>
    </div>
  </article>
);

/** Act 5. Private by design, and everything else the app does, in a grid that reveals on scroll (CSS scroll timelines). */
export function Bento() {
  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto w-[min(100%-2rem,72rem)] py-[14svh]">
      <div className="reveal max-w-2xl">
        <p className="eyebrow">Private by design</p>
        <h2 id="features-title" className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-tight tracking-[-0.02em]">
          Your cards are money. The app treats them that way.
        </h2>
        <p className="mt-4 text-balance text-mist">No account to create, no server that sees your numbers, no analytics. Everything below runs on your phone.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile className="sm:col-span-2" eyebrow="Widgets and notifications" title="A card's balance, one tap from the register." body="Small, medium, Lock Screen and inline widgets. Reminders 30, 7 and 1 day before a card with money on it expires.">
          <HyperframesPlayer src="/compositions/widgets-loop/index.html" poster="/media/widgets-loop.webp" fallbackMp4="/media/widgets-loop.mp4" label="GiftVault widgets and an expiry notification" className="aspect-video w-full" />
        </Tile>

        <Tile className="sm:col-span-2" eyebrow="Apple Wallet" title="Passes that carry no card data off your phone." body="Store cards you can add to Wallet. Only a signed manifest leaves the device; the barcode and balance are built locally.">
          <HyperframesPlayer src="/compositions/wallet-loop/index.html" poster="/media/wallet-loop.webp" fallbackMp4="/media/wallet-loop.mp4" label="A GiftVault pass sliding into Apple Wallet" className="aspect-video w-full" />
        </Tile>

        <Tile eyebrow="App Lock" title="Face ID at the door." body="Lock immediately, after a minute, or after five. Card details are hidden in the app switcher.">
          <div className="flex h-56 items-center justify-center p-6">
            <svg viewBox="0 0 96 96" className="h-24 w-24 text-brass" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 30V20a8 8 0 0 1 8-8h10M66 12h10a8 8 0 0 1 8 8v10M84 66v10a8 8 0 0 1-8 8H66M30 84H20a8 8 0 0 1-8-8V66" />
              <path d="M34 38v6M62 38v6M48 40v14h-5" />
              <path d="M36 62c3 4 8 6 12 6s9-2 12-6" />
            </svg>
          </div>
        </Tile>

        <Tile eyebrow="iCloud" title="Synced, end-to-end encrypted." body="Numbers, PINs and barcodes are encrypted fields in your own iCloud. Apple can't read them; neither can we.">
          <div className="flex h-56 items-end justify-center overflow-hidden px-6 pt-6">
            <Screen name="settings" alt="Settings: cards sync through your iCloud account; numbers and PINs are end-to-end encrypted" sizes="200px" className="block w-40 translate-y-6 overflow-hidden rounded-2xl border border-hairline" />
          </div>
        </Tile>

        <Tile className="sm:col-span-2" eyebrow="Scan" title="Point the camera. Barcode, number and PIN in one pass." body="Code 128, QR, PDF417, Aztec, EAN-13, UPC-A and ITF. Or import a photo, or type it.">
          <div className="grid h-56 grid-cols-2 gap-4 overflow-hidden px-5 pt-5">
            <div className="h-full overflow-hidden rounded-t-2xl border border-b-0 border-hairline"><Clip name="add-card" label="Adding a Sephora card by hand" /></div>
            <div className="h-full overflow-hidden rounded-t-2xl border border-b-0 border-hairline"><Clip name="spend" label="Logging a purchase and watching the balance update" /></div>
          </div>
        </Tile>

        <Tile eyebrow="Light and dark" title="Follows your phone." body="Bottle green at night, linen by day. The barcode is always black on white.">
          <div className="flex h-56 justify-center overflow-hidden px-5 pt-5">
            <div className="h-full w-40 overflow-hidden rounded-t-2xl border border-b-0 border-hairline"><Clip name="hurry-register" label="Light mode: from the list to the barcode in two taps" /></div>
          </div>
        </Tile>

        <Tile eyebrow="iPhone Duo" title="Unfolds with the phone." body="Layout keys off the display, not the device. The tab bar becomes a sidebar on the inner screen.">
          <div className="flex h-56 items-start justify-center overflow-hidden px-5 pt-5">
            <div className="h-full w-full overflow-hidden rounded-t-2xl border border-b-0 border-hairline"><Clip name="duo" label="GiftVault on the iPhone Duo outer display" /></div>
          </div>
        </Tile>

        <Tile className="sm:col-span-2" eyebrow="Siri, Spotlight, Shortcuts" title="“Show my Starbucks card.”" body="Cards are indexed by name and balance, never by number. A Shortcut opens straight to the register view.">
          <div className="flex h-56 items-end justify-center gap-4 overflow-hidden px-5 pt-5">
            <DeviceFrame width={150} className="translate-y-6"><Screen name="search" alt="Searching cards" sizes="150px" /></DeviceFrame>
            <DeviceFrame width={150} className="translate-y-6"><Screen name="amazon-register" alt="An Amazon digital code at the register" sizes="150px" /></DeviceFrame>
            <DeviceFrame width={150} className="hidden translate-y-6 sm:block"><Screen name="expiring" alt="The Expiring tab" sizes="150px" /></DeviceFrame>
          </div>
        </Tile>
      </div>
    </section>
  );
}
