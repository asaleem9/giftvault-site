import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { Hero } from "@/components/acts/Hero";
import { DrawerFilm } from "@/components/acts/DrawerFilm";
import { PhoneStage } from "@/components/acts/PhoneStage";
import { Ledger } from "@/components/acts/Ledger";
import { Film } from "@/components/acts/Film";
import { Bento } from "@/components/acts/Bento";
import { Marquee } from "@/components/acts/Marquee";
import { Localised } from "@/components/acts/Localised";
import { Cta } from "@/components/acts/Cta";
import { Vault } from "@/components/vault/Vault";

export default function Home() {
  return (
    <ScrollProvider>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <DrawerFilm />
        <PhoneStage />
        <Ledger />
        <Film />
        <Bento />
        <Marquee />
        <Localised />
        <Cta />
      </main>
      <Vault />
      <Footer />
    </ScrollProvider>
  );
}
