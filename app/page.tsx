import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { site } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow">Free iOS gift card manager</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">{site.tagline}</h1>
          <p className="mt-6 max-w-xl text-lg text-mist">{site.description}</p>
          <AppStoreBadge className="mt-10" size="lg" />
        </section>
      </main>
      <Footer />
    </>
  );
}
