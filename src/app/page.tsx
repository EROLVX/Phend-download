import { GridBackground } from "@/components/ui/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DownloadSection } from "@/components/DownloadSection";
import { BrowserCompatibility } from "@/components/BrowserCompatibility";
import { InstallGuide } from "@/components/InstallGuide";
import { HowToUse } from "@/components/HowToUse";
import { AutoUpdates } from "@/components/AutoUpdates";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrowserCompatibility />
        <InstallGuide />
        <HowToUse />
        <AutoUpdates />
        <Faq />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
