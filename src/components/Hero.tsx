import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PopupPreview } from "@/components/PopupPreview";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr]">
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

          <Reveal delay={0.2}>
            <p className="mt-8 text-[13px] text-white/35">
              Free during beta &middot; No credit card &middot; ~2 minute install
            </p>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.1} className="flex justify-center lg:justify-end">
          <PopupPreview />
        </Reveal>
      </div>
    </section>
  );
}
