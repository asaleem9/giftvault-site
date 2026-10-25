import { Screen } from "@/components/Screen";
import { DeviceFrame } from "@/components/phones/DeviceFrame";

/** Tested with nine personas: Dynamic Type to AX5, VoiceOver, right-to-left, 200 cards. */
export function Localised() {
  return (
    <section aria-labelledby="tested-title" className="mx-auto w-[min(100%-2rem,72rem)] py-[10svh]">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="reveal max-w-md">
          <p className="eyebrow">Testing</p>
          <h2 id="tested-title" className="mt-3 text-balance text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold tracking-[-0.02em]">Nine personas and a vault with two hundred cards.</h2>
          <p className="mt-4 text-balance text-mist">
            UI tests drive every screen with an accessibility audit attached: Dynamic Type at its largest size, VoiceOver labels, Arabic right to left, Japanese,
            and a two-hundred-card vault that scrolls like a five-card one.
          </p>
        </div>
        <div className="reveal flex justify-center gap-4">
          <DeviceFrame width={150}><Screen name="ja" alt="GiftVault in Japanese" sizes="150px" /></DeviceFrame>
          <DeviceFrame width={150} className="translate-y-8"><Screen name="ar" alt="GiftVault in Arabic, right to left" sizes="150px" /></DeviceFrame>
          <DeviceFrame width={150} className="hidden sm:block"><Screen name="volume" alt="A vault with two hundred cards" sizes="150px" /></DeviceFrame>
        </div>
      </div>
    </section>
  );
}
