import type { Metadata } from "next";
import { GridBackground } from "@/components/ui/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Halftone } from "@/components/ui/Halftone";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "James Erol Lagonero — Phend",
  description:
    "Full-stack developer building web and mobile apps, and the developer behind Phend.",
};

// Fill in a URL and the link appears. Empty ones are skipped, so a
// half-filled profile never ships a dead link.
const socials = [
  { label: "github", href: "https://github.com/EROLVX" },
  { label: "instagram", href: "" },
  { label: "linkedin", href: "" },
].filter((s) => s.href);

export default function AboutPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="flex-1">
        <section id="top" className="relative border-b border-white/[0.06] pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
          {/* same corner light as the hero, so the page feels part of the site */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div
              className="absolute left-0 top-0 h-[560px] w-[820px] max-w-full"
              style={{
                background:
                  "radial-gradient(115% 95% at 0% 0%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.045) 26%, rgba(255,255,255,0.015) 50%, transparent 76%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <Reveal>
              <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">
                Developer
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 items-start gap-8 sm:mt-10 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-10 lg:gap-14">
              <Reveal delay={0.05}>
                <div className="border border-white/[0.08] bg-white/[0.02] p-1.5">
                  <Halftone
                    src="/profile.jpg"
                    alt="Portrait of James Erol Lagonero"
                    cols={150}
                    aspect={0.82}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display text-[clamp(1.3rem,5.2vw,2.6rem)] leading-tight text-white">
                  James Erol Lagonero
                </h1>

                <div className="mt-5 max-w-xl space-y-4 text-[13.5px] leading-relaxed text-white/60 sm:mt-6 sm:text-[15px]">
                  <p>
                    I&rsquo;m a full-stack developer. I build web and mobile
                    apps front to back, and I use AI as part of how I work
                    &mdash; not to skip the thinking, but to move faster and
                    reach further than I could on my own.
                  </p>
                  <p>
                    I design as much as I develop. Clean, modern interfaces are
                    the part I care about most, and graphic design is where
                    that eye came from.
                  </p>
                  <p>
                    Most weeks I&rsquo;m shipping something small on the side.
                    I&rsquo;m drawn to where security and AI meet &mdash; Phend
                    started there &mdash; and when I&rsquo;m not building,
                    I&rsquo;m usually deep in a game, a film, or something new
                    on repeat.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-8">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-0.5 font-mono text-[12px] text-white/45 transition-colors hover:text-white sm:text-[13px]"
                    >
                      {s.label}
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
