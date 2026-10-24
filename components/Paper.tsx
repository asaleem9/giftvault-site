import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Mascot, type MascotPose } from "./Mascot";

/** Light "paper" layout for the legal pages. */
export function Paper({ title, lede, updated, pose, children }: { title: string; lede: string; updated: string; pose?: MascotPose; children: React.ReactNode }) {
  return (
    <div data-theme="paper" className="flex min-h-full flex-1 flex-col bg-paper-ground text-paper-linen">
      <Nav theme="paper" />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow !text-paper-mist">Updated {updated}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-paper-mist">{lede}</p>
          </div>
          {pose ? <Mascot pose={pose} alt="" width={200} className="hidden w-[200px] shrink-0 sm:block" /> : null}
        </div>
        <div className="prose-paper mt-10 space-y-8 text-[17px] leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_a]:text-paper-brass [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer theme="paper" />
    </div>
  );
}
