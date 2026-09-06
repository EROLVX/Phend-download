import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroGrid } from "@/components/ui/HeroGrid";
import { PopupPreview } from "@/components/PopupPreview";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-black pt-28 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32"
    >
      <HeroGrid />

      {/* Soft flashlight spilling in from the top-left corner */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-[560px] w-full max-w-[900px]"
        aria-hidden
      >
        <div
          className="absolute left-[-160px] top-0 h-[480px] w-[900px] blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 40% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 45%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-[-80px] top-0 h-[320px] w-[520px] blur-[55px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 42% 0%, rgba(255,255,255,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Badge tone="warning" className="mb-5 sm:mb-6">
              Beta · Chrome &amp; Edge compatible
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-balance text-[clamp(1.6rem,7vw,3.4rem)] leading-[1.15] text-white pixel-shadow">
              Protect yourself
              <br />
              from phishing.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60 sm:mt-6 sm:text-[17px]">
              Runs entirely on your device. No account required. Phend scans
              every site you visit and blocks phishing before it loads.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
              <Button href="#download" size="lg">
                <span className="relative h-[18px] w-[18px] shrink-0">
                  <Image src="/icons/browsers/chrome.png" alt="" fill sizes="18px" className="object-contain" />
                </span>
                Download for Chrome
              </Button>
              <Button href="#download" variant="secondary" size="lg">
                <span className="relative h-[18px] w-[18px] shrink-0">
                  <Image src="/icons/browsers/edge.png" alt="" fill sizes="18px" className="object-contain" />
                </span>
                Download for Edge
              </Button>
            </div>
          </Reveal>

        
        </div>

        <Reveal direction="left" delay={0.1} className="flex justify-center lg:justify-end">
          <PopupPreview />
        </Reveal>
      </div>
    </section>
  );
}
