import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <Mascot pose="empty" alt="The GiftVault boy shrugging with an empty wallet" width={280} className="w-[280px]" priority />
        <p className="eyebrow mt-4">Nothing here</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">That page is not in the vault.</h1>
        <Link href="/" className="mt-6 rounded-md bg-linen px-4 py-2 text-sm font-medium text-ground hover:bg-brass">Back to the start</Link>
      </main>
      <Footer />
    </>
  );
}
