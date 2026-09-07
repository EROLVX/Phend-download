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
      className="relative overflow-hidden bg-black pt-28 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32"
    >
      <HeroGrid />

      {/* Corner light: brightest at the very top-left edge and decaying
          diagonally. Anchoring the gradient at 0% 0% is what stops it from
          reading as a floating circle. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute left-0 top-0 h-[620px] w-[860px] max-w-full"
          style={{
            background:
              "radial-gradient(115% 95% at 0% 0%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.055) 26%, rgba(255,255,255,0.018) 50%, transparent 76%)",
          }}
        />
        <div
          className="absolute left-0 top-0 h-[320px] w-[460px] max-w-full"
          style={{
            background:
              "radial-gradient(100% 90% at 0% 0%, rgba(255,255,255,0.11), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Badge tone="neutral" className="mb-5 sm:mb-6">
              Chrome &amp; Edge compatible
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-balance text-[clamp(1.3rem,5.8vw,3.4rem)] leading-[1.15] text-white pixel-shadow">
              Protect yourself
              <br />
              from phishing.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3.5 max-w-md text-[13px] leading-relaxed text-white/60 sm:mt-6 sm:text-[17px]">
              Runs entirely on your device. No account required. Phend scans
              every site you visit and blocks phishing before it loads.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-9 sm:gap-3">
              <Button href="#download" size="lg">
                <span className="relative h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]">
                  <Image src="/icons/browsers/chrome.png" alt="" fill sizes="18px" className="object-contain" />
                </span>
                Download for Chrome
              </Button>
              <Button href="#download" variant="secondary" size="lg">
                <span className="relative h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]">
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
